#!/usr/bin/env python3
"""
Batch image optimizer for static projects.

What it does:
1) Finds heavy JPG/JPEG/PNG files (outliers) under assets/images
2) Converts them to WEBP (without the extension hack)
3) Optionally rewrites references in text files to the new .webp paths
4) Optionally deletes originals after successful reference rewrites
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png"}
TEXT_EXTENSIONS = {
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".json",
    ".html",
    ".css",
    ".md",
    ".txt",
}


@dataclass
class Candidate:
    path: Path
    size_bytes: int


@dataclass
class ConversionResult:
    source: Path
    output: Path
    source_bytes: int
    output_bytes: int
    converted: bool
    webp_ready: bool
    reason: str

    @property
    def saved_bytes(self) -> int:
        return self.source_bytes - self.output_bytes


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Find and optimize heavy images by converting to WEBP."
    )
    parser.add_argument(
        "--repo-root",
        default=".",
        help="Repository root path (default: current directory).",
    )
    parser.add_argument(
        "--images-root",
        default="assets/images",
        help="Directory to scan for images (default: assets/images).",
    )
    parser.add_argument(
        "--min-kb",
        type=int,
        default=1024,
        help="Only process files >= this size in KB (default: 1024).",
    )
    parser.add_argument(
        "--report-limit",
        type=int,
        default=30,
        help="How many files to show in the outlier report (default: 30).",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=80,
        help="WEBP quality 1-100 (default: 80).",
    )
    parser.add_argument(
        "--method",
        type=int,
        default=6,
        help="WEBP encoder method 0-6 (default: 6, better compression).",
    )
    parser.add_argument(
        "--min-savings-kb",
        type=int,
        default=50,
        help="Keep conversion only when saving at least this many KB (default: 50).",
    )
    parser.add_argument(
        "--max-width",
        type=int,
        default=0,
        help="Optional resize max width (0 disables resize).",
    )
    parser.add_argument(
        "--max-height",
        type=int,
        default=0,
        help="Optional resize max height (0 disables resize).",
    )
    parser.add_argument(
        "--overwrite-webp",
        action="store_true",
        help="Overwrite existing .webp outputs.",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Execute conversion. Without this flag, only report outliers.",
    )
    parser.add_argument(
        "--rewrite-refs",
        action="store_true",
        help="Rewrite .jpg/.png references to .webp in text files.",
    )
    parser.add_argument(
        "--delete-originals",
        action="store_true",
        help="Delete source files after conversion (safe only with --rewrite-refs).",
    )
    return parser.parse_args()


def to_abs(root: Path, maybe_relative: str) -> Path:
    path = Path(maybe_relative)
    return path if path.is_absolute() else (root / path)


def kb(num_bytes: int) -> float:
    return round(num_bytes / 1024, 1)


def mb(num_bytes: int) -> float:
    return round(num_bytes / (1024 * 1024), 2)


def collect_candidates(images_root: Path, min_kb_size: int) -> list[Candidate]:
    min_bytes = min_kb_size * 1024
    candidates: list[Candidate] = []

    for path in images_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in IMAGE_EXTENSIONS:
            continue
        size = path.stat().st_size
        if size >= min_bytes:
            candidates.append(Candidate(path=path, size_bytes=size))

    candidates.sort(key=lambda c: c.size_bytes, reverse=True)
    return candidates


def print_report(candidates: list[Candidate], report_limit: int) -> None:
    print("\nTop heavy images:")
    if not candidates:
        print("- No files matched the current threshold.")
        return

    for candidate in candidates[:report_limit]:
        print(f"- {kb(candidate.size_bytes):>8} KB | {mb(candidate.size_bytes):>5} MB | {candidate.path}")


def import_pillow():
    try:
        from PIL import Image, ImageOps  # type: ignore
    except Exception as exc:  # pragma: no cover
        raise RuntimeError(
            "Pillow is required for conversion. Install with: pip install Pillow"
        ) from exc
    return Image, ImageOps


def convert_to_webp(
    candidate: Candidate,
    quality: int,
    method: int,
    min_savings_kb: int,
    max_width: int,
    max_height: int,
    overwrite_webp: bool,
) -> ConversionResult:
    source = candidate.path
    output = source.with_suffix(".webp")
    source_bytes = candidate.size_bytes

    if output.exists() and not overwrite_webp:
        return ConversionResult(
            source=source,
            output=output,
            source_bytes=source_bytes,
            output_bytes=output.stat().st_size,
            converted=False,
            webp_ready=True,
            reason="skipped: existing webp",
        )

    Image, ImageOps = import_pillow()
    resample = getattr(getattr(Image, "Resampling", Image), "LANCZOS")

    tmp_output = output.with_name(f"{output.name}.tmp")
    if tmp_output.exists():
        tmp_output.unlink()

    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)

        if max_width > 0 or max_height > 0:
            width_limit = max_width if max_width > 0 else image.width
            height_limit = max_height if max_height > 0 else image.height
            image.thumbnail((width_limit, height_limit), resample)

        if image.mode not in ("RGB", "RGBA"):
            if image.mode == "P" and "transparency" in image.info:
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

        image.save(
            tmp_output,
            format="WEBP",
            quality=quality,
            method=method,
            optimize=True,
        )

    output_bytes = tmp_output.stat().st_size
    savings_bytes = source_bytes - output_bytes
    min_savings_bytes = min_savings_kb * 1024

    if savings_bytes < min_savings_bytes:
        tmp_output.unlink(missing_ok=True)
        return ConversionResult(
            source=source,
            output=output,
            source_bytes=source_bytes,
            output_bytes=output_bytes,
            converted=False,
            webp_ready=False,
            reason=f"skipped: savings < {min_savings_kb} KB",
        )

    if output.exists():
        output.unlink()
    tmp_output.replace(output)

    return ConversionResult(
        source=source,
        output=output,
        source_bytes=source_bytes,
        output_bytes=output_bytes,
        converted=True,
        webp_ready=True,
        reason="converted",
    )


def list_text_files(repo_root: Path) -> Iterable[Path]:
    for path in repo_root.rglob("*"):
        if not path.is_file():
            continue
        if any(part.startswith(".git") for part in path.parts):
            continue
        if path.suffix.lower() in TEXT_EXTENSIONS:
            yield path


def rewrite_references(repo_root: Path, mapping: dict[str, str]) -> tuple[int, int]:
    updated_files = 0
    replacements = 0

    for text_file in list_text_files(repo_root):
        try:
            content = text_file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        updated = content
        local_replacements = 0
        for old, new in mapping.items():
            if old in updated:
                count = updated.count(old)
                updated = updated.replace(old, new)
                local_replacements += count

        if local_replacements > 0:
            text_file.write_text(updated, encoding="utf-8", newline="\n")
            updated_files += 1
            replacements += local_replacements

    return updated_files, replacements


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    images_root = to_abs(repo_root, args.images_root).resolve()

    if not images_root.exists():
        print(f"Error: images root not found: {images_root}")
        return 1

    candidates = collect_candidates(images_root, args.min_kb)
    print_report(candidates, args.report_limit)
    print(f"\nFound {len(candidates)} candidate(s) at >= {args.min_kb} KB.")

    if not args.apply:
        print("\nDry run only. Use --apply to execute conversion.")
        return 0

    if args.delete_originals and not args.rewrite_refs:
        print("Error: --delete-originals requires --rewrite-refs for safety.")
        return 1

    results: list[ConversionResult] = []
    for candidate in candidates:
        result = convert_to_webp(
            candidate=candidate,
            quality=args.quality,
            method=args.method,
            min_savings_kb=args.min_savings_kb,
            max_width=args.max_width,
            max_height=args.max_height,
            overwrite_webp=args.overwrite_webp,
        )
        results.append(result)

    converted = [r for r in results if r.converted]
    skipped = [r for r in results if not r.converted]
    webp_ready = [r for r in results if r.webp_ready]

    print("\nConversion results:")
    for result in results:
        delta = result.saved_bytes
        sign = "+" if delta >= 0 else ""
        print(
            f"- {result.reason:28} | {result.source.name} -> {result.output.name} "
            f"| {kb(result.source_bytes)} KB -> {kb(result.output_bytes)} KB ({sign}{kb(delta)} KB)"
        )

    total_before = sum(r.source_bytes for r in converted)
    total_after = sum(r.output_bytes for r in converted)
    total_saved = total_before - total_after
    print(
        f"\nConverted: {len(converted)} | Skipped: {len(skipped)} | "
        f"Saved: {kb(total_saved)} KB ({mb(total_saved)} MB)"
    )

    if args.rewrite_refs and webp_ready:
        mapping: dict[str, str] = {}
        for result in webp_ready:
            old_rel = result.source.relative_to(repo_root).as_posix()
            new_rel = result.output.relative_to(repo_root).as_posix()
            mapping[old_rel] = new_rel

        updated_files, replacements = rewrite_references(repo_root, mapping)
        print(
            f"Reference rewrite: updated {updated_files} file(s), "
            f"{replacements} replacement(s)."
        )

        if args.delete_originals:
            deleted = 0
            for result in webp_ready:
                if result.source.exists():
                    result.source.unlink()
                    deleted += 1
            print(f"Deleted {deleted} original image file(s).")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

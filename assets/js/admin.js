/**
 * RPG Awards - Admin Module
 * Funcionalidades administrativas e gerenciamento
 */

const Admin = (function() {
    'use strict';

    // Configurações
    const CONFIG = {
        refreshInterval: 30000, // 30 segundos
        itemsPerPage: 10
    };
    const FEATURE_FLAGS = {
        ENABLE_LIVE_REVEAL: true
    };

    // Estado
    let state = {
        currentView: 'results', // results, voters, settings
        autoRefresh: false,
        refreshTimer: null,
        reveal: {
            active: false,
            categoryIndex: 0,
            step: 0,
            hideScores: true,
            results: []
        }
    };

    /**
     * Inicializa módulo admin
     */
    function init() {
        if (!Storage.isAdmin()) {
            console.warn('Acesso ao admin negado: usuário não é administrador');
            return false;
        }

        setupAdminListeners();
        updateLiveRevealEntryButton();
        return true;
    }

    /**
     * Configura listeners do admin
     */
    function setupAdminListeners() {
        // Botão de exportar
        document.addEventListener('click', (e) => {
            if (e.target.matches('#export-data-btn') || e.target.closest('#export-data-btn')) {
                exportData();
            }
            
            if (e.target.matches('#clear-votes-btn') || e.target.closest('#clear-votes-btn')) {
                confirmClearVotes();
            }
            
            if (e.target.matches('#refresh-btn') || e.target.closest('#refresh-btn')) {
                refreshData();
            }

            if (FEATURE_FLAGS.ENABLE_LIVE_REVEAL && (e.target.matches('#toggle-live-reveal-btn') || e.target.closest('#toggle-live-reveal-btn'))) {
                toggleLiveReveal();
            }

            if (FEATURE_FLAGS.ENABLE_LIVE_REVEAL && (e.target.matches('#live-reveal-close-btn') || e.target.closest('#live-reveal-close-btn'))) {
                closeLiveReveal();
            }

            if (FEATURE_FLAGS.ENABLE_LIVE_REVEAL && (e.target.matches('#live-reveal-next-btn') || e.target.closest('#live-reveal-next-btn'))) {
                advanceLiveReveal();
            }

            if (FEATURE_FLAGS.ENABLE_LIVE_REVEAL && (e.target.matches('#live-reveal-reset-btn') || e.target.closest('#live-reveal-reset-btn'))) {
                resetLiveRevealCategory();
            }

            if (FEATURE_FLAGS.ENABLE_LIVE_REVEAL && (e.target.matches('#live-reveal-toggle-score-btn') || e.target.closest('#live-reveal-toggle-score-btn'))) {
                toggleLiveRevealScores();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!state.reveal.active) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                closeLiveReveal();
            }
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                advanceLiveReveal();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                resetLiveRevealCategory();
            }
        });
    }

    /**
     * Atualiza dados do painel (busca dados frescos do Firestore)
     */
    async function refreshData(silent = false) {
        await Storage.refreshVoters();
        UI.updateAdminPanel();

        if (state.reveal.active) {
            state.reveal.results = Storage.getResults() || [];
            if (state.reveal.categoryIndex >= state.reveal.results.length) {
                state.reveal.categoryIndex = Math.max(0, state.reveal.results.length - 1);
                state.reveal.step = 0;
            }
            renderLiveReveal();
        }

        if (!silent) {
            UI.showToast('Dados atualizados', 'success');
        }
    }

    /**
     * Exporta dados para JSON
     */
    function exportData() {
        const data = Storage.exportData();
        if (!data) {
            UI.showToast('Erro ao exportar dados', 'error');
            return;
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rpg-awards-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        UI.showToast('Dados exportados com sucesso', 'success');
    }

    /**
     * Confirma limpeza de votos
     */
    function confirmClearVotes() {
        const confirmed = confirm(
            'ATENÇÃO: Isso apagará TODOS os votos registrados.\n\n' +
            'Esta ação não pode ser desfeita.\n\n' +
            'Deseja continuar?'
        );

        if (confirmed) {
            const doubleConfirmed = confirm(
                'Confirmação final: Digite "APAGAR" para confirmar.'
            );

            if (doubleConfirmed) {
                const result = Storage.clearVotes();
                if (result) {
                    UI.showToast('Todos os votos foram apagados', 'warning');
                    refreshData();
                } else {
                    UI.showToast('Erro ao apagar votos', 'error');
                }
            }
        }
    }

    /**
     * Obtém relatório detalhado
     * @returns {Object} Relatório completo
     */
    function getDetailedReport() {
        const stats = Storage.getStats();
        const results = Storage.getResults();
        const voters = Storage.getAllVoters();

        if (!stats || !results) {
            return null;
        }

        // Análise de participação
        const participationAnalysis = analyzeParticipation(voters);

        // Análise de resultados
        const resultsAnalysis = analyzeResults(results);

        return {
            generatedAt: new Date().toISOString(),
            summary: stats,
            participation: participationAnalysis,
            results: resultsAnalysis,
            raw: {
                voters: voters,
                results: results
            }
        };
    }

    /**
     * Analisa participação dos votantes
     * @param {Object} voters - Dados dos votantes
     * @returns {Object} Análise
     */
    function analyzeParticipation(voters) {
        const voterList = Object.values(voters);
        
        // Tempo médio entre votos
        let totalVoteTime = 0;
        let voteTimeCount = 0;

        voterList.forEach(voter => {
            const votes = Object.values(voter.votes || {});
            if (votes.length >= 2) {
                const timestamps = votes.map(v => new Date(v.timestamp).getTime()).sort((a, b) => a - b);
                const timeDiff = timestamps[timestamps.length - 1] - timestamps[0];
                totalVoteTime += timeDiff;
                voteTimeCount++;
            }
        });

        const avgVoteTime = voteTimeCount > 0 ? totalVoteTime / voteTimeCount : 0;

        // Distribuição de votos
        const voteDistribution = {};
        CATEGORIES.forEach(cat => {
            voteDistribution[cat.id] = 0;
        });

        voterList.forEach(voter => {
            Object.keys(voter.votes || {}).forEach(catId => {
                if (voteDistribution[catId] !== undefined) {
                    voteDistribution[catId]++;
                }
            });
        });

        return {
            totalVoters: voterList.length,
            averageVotingTime: avgVoteTime,
            categoryParticipation: voteDistribution
        };
    }

    /**
     * Analisa resultados
     * @param {Array} results - Resultados das categorias
     * @returns {Object} Análise
     */
    function analyzeResults(results) {
        const analysis = {
            closestRaces: [],
            biggestWins: [],
            unanimousChoices: []
        };

        results.forEach(result => {
            if (result.nominees.length < 2) return;

            const sorted = [...result.nominees].sort((a, b) => b.votes - a.votes);
            const first = sorted[0];
            const second = sorted[1];
            const voteDiff = first.votes - second.votes;
            const totalVotes = result.totalVotes;

            // Maior diferença
            if (totalVotes > 0) {
                const winMargin = (voteDiff / totalVotes) * 100;
                
                if (winMargin > 50) {
                    analysis.biggestWins.push({
                        category: result.category.title,
                        winner: first.name,
                        margin: winMargin.toFixed(1) + '%',
                        votes: first.votes
                    });
                }

                // Corrida acirrada (diferença menor que 10%)
                if (winMargin < 10 && voteDiff <= 2) {
                    analysis.closestRaces.push({
                        category: result.category.title,
                        first: first.name,
                        second: second.name,
                        difference: voteDiff,
                        margin: winMargin.toFixed(1) + '%'
                    });
                }

                // Escolha unânime (100% dos votos)
                if (first.votes === totalVotes && totalVotes > 0) {
                    analysis.unanimousChoices.push({
                        category: result.category.title,
                        choice: first.name,
                        votes: first.votes
                    });
                }
            }
        });

        // Ordena por margem
        analysis.biggestWins.sort((a, b) => parseFloat(b.margin) - parseFloat(a.margin));
        analysis.closestRaces.sort((a, b) => parseFloat(a.margin) - parseFloat(b.margin));

        return analysis;
    }

    /**
     * Gera relatório em formato texto
     * @returns {string} Relatório formatado
     */
    function generateTextReport() {
        const report = getDetailedReport();
        if (!report) return 'Erro ao gerar relatório';

        let text = '═══════════════════════════════════════════════════\n';
        text += '           RPG AWARDS - RELATÓRIO OFICIAL\n';
        text += '═══════════════════════════════════════════════════\n\n';
        
        text += `Gerado em: ${new Date(report.generatedAt).toLocaleString('pt-BR')}\n\n`;

        // Estatísticas gerais
        text += '────────── ESTATÍSTICAS GERAIS ──────────\n\n';
        text += `Total de Jogadores: ${report.summary.totalPlayers}\n`;
        text += `Votantes: ${report.summary.votedPlayers}\n`;
        text += `Pendentes: ${report.summary.pendingPlayers}\n`;
        text += `Taxa de Conclusão: ${report.summary.completionRate}%\n`;
        text += `Total de Votos: ${report.summary.totalVotes}\n\n`;

        // Corridas acirradas
        if (report.results.closestRaces.length > 0) {
            text += '────────── CORRIDAS ACIRRADAS ──────────\n\n';
            report.results.closestRaces.forEach(race => {
                text += `${race.category}\n`;
                text += `  1º: ${race.first}\n`;
                text += `  2º: ${race.second}\n`;
                text += `  Diferença: ${race.difference} votos (${race.margin})\n\n`;
            });
        }

        // Maiores vitórias
        if (report.results.biggestWins.length > 0) {
            text += '────────── MAIORES VITÓRIAS ──────────\n\n';
            report.results.biggestWins.forEach(win => {
                text += `${win.category}\n`;
                text += `  Vencedor: ${win.winner}\n`;
                text += `  Margem: ${win.margin}\n`;
                text += `  Votos: ${win.votes}\n\n`;
            });
        }

        // Escolhas unânimes
        if (report.results.unanimousChoices.length > 0) {
            text += '────────── ESCOLHAS UNÂNIMES ──────────\n\n';
            report.results.unanimousChoices.forEach(choice => {
                text += `${choice.category}\n`;
                text += `  ${choice.choice}\n`;
                text += `  Votos: ${choice.votes}\n\n`;
            });
        }

        text += '═══════════════════════════════════════════════════\n';
        text += '              FIM DO RELATÓRIO\n';
        text += '═══════════════════════════════════════════════════\n';

        return text;
    }

    /**
     * Inicia auto-refresh
     */
    function startAutoRefresh() {
        if (state.autoRefresh) return;
        
        state.autoRefresh = true;
        state.refreshTimer = setInterval(() => {
            refreshData(true);
        }, CONFIG.refreshInterval);
    }

    /**
     * Para auto-refresh
     */
    function stopAutoRefresh() {
        state.autoRefresh = false;
        if (state.refreshTimer) {
            clearInterval(state.refreshTimer);
            state.refreshTimer = null;
        }
    }

    /**
     * Obtém lista de votantes com detalhes
     * @returns {Array} Lista de votantes
     */
    function getVotersList() {
        const voters = Storage.getAllVoters();
        if (!voters) return [];

        return Object.entries(voters).map(([id, data]) => {
            const voteCount = Object.keys(data.votes || {}).length;
            const isComplete = voteCount === CATEGORIES.length;
            
            return {
                id,
                name: data.name,
                voteCount,
                isComplete,
                firstVote: data.firstVote,
                lastVote: data.lastVote,
                votes: data.votes
            };
        }).sort((a, b) => {
            // Ordena: completos primeiro, depois por nome
            if (a.isComplete !== b.isComplete) {
                return b.isComplete ? 1 : -1;
            }
            return a.name.localeCompare(b.name);
        });
    }

    function getRevealElements() {
        return {
            overlay: document.getElementById('live-reveal-overlay'),
            categoryIndex: document.getElementById('live-reveal-category-index'),
            categoryTitle: document.getElementById('live-reveal-category-title'),
            stepLabel: document.getElementById('live-reveal-step-label'),
            podium: document.getElementById('live-reveal-podium'),
            nextBtn: document.getElementById('live-reveal-next-btn'),
            toggleScoreBtn: document.getElementById('live-reveal-toggle-score-btn'),
            toggleEntryBtn: document.getElementById('toggle-live-reveal-btn')
        };
    }

    function toggleLiveReveal() {
        if (!FEATURE_FLAGS.ENABLE_LIVE_REVEAL) return;
        if (state.reveal.active) {
            closeLiveReveal();
        } else {
            openLiveReveal();
        }
    }

    function openLiveReveal() {
        const results = Storage.getResults();
        if (!results || !results.length) {
            UI.showToast('Sem dados de resultados para iniciar o telão', 'warning');
            return;
        }

        const els = getRevealElements();
        if (!els.overlay) return;

        state.reveal.active = true;
        state.reveal.results = results;
        state.reveal.categoryIndex = Math.max(0, Math.min(state.reveal.categoryIndex, results.length - 1));
        state.reveal.step = 0;
        state.reveal.hideScores = true;

        els.overlay.hidden = false;
        document.body.style.overflow = 'hidden';
        renderLiveReveal();
        UI.showToast('Modo telão ativado', 'success');
    }

    function closeLiveReveal() {
        const els = getRevealElements();
        if (!els.overlay) return;

        state.reveal.active = false;
        els.overlay.hidden = true;
        document.body.style.overflow = '';
        updateLiveRevealEntryButton();
    }

    function getRevealRanksForCategory(result) {
        const nominees = (result?.nominees || []).slice(0, 3);
        const availableRanks = nominees.map((_, idx) => idx + 1);
        return availableRanks.sort((a, b) => b - a);
    }

    function getStepLabelText(step, revealRanks) {
        if (step <= 0) return 'Preparando reveal...';
        const rank = revealRanks[step - 1];
        if (!rank) return 'Categoria revelada';
        if (rank === 1) return 'Vencedor revelado';
        return `${rank}º lugar revelado`;
    }

    function advanceLiveReveal() {
        if (!state.reveal.active) return;
        const current = state.reveal.results[state.reveal.categoryIndex];
        if (!current) return;

        const revealRanks = getRevealRanksForCategory(current);
        const maxStep = revealRanks.length;

        if (state.reveal.step < maxStep) {
            state.reveal.step++;
            renderLiveReveal();
            return;
        }

        if (state.reveal.categoryIndex < state.reveal.results.length - 1) {
            state.reveal.categoryIndex++;
            state.reveal.step = 0;
            renderLiveReveal();
            return;
        }

        UI.showToast('Reveal concluído para todas as categorias', 'success');
    }

    function resetLiveRevealCategory() {
        if (!state.reveal.active) return;
        state.reveal.step = 0;
        renderLiveReveal();
    }

    function toggleLiveRevealScores() {
        if (!state.reveal.active) return;
        state.reveal.hideScores = !state.reveal.hideScores;
        renderLiveReveal();
    }

    function renderLiveReveal() {
        if (!state.reveal.active) return;

        const els = getRevealElements();
        if (!els.overlay || !els.podium || !els.categoryTitle || !els.categoryIndex || !els.stepLabel || !els.nextBtn || !els.toggleScoreBtn) return;

        const result = state.reveal.results[state.reveal.categoryIndex];
        if (!result) return;

        const topNominees = (result.nominees || []).slice(0, 3);
        const revealRanks = getRevealRanksForCategory(result);
        const revealOrder = [2, 1, 3];
        const podiumNominees = revealOrder
            .map(rank => ({ rank, nominee: topNominees[rank - 1] }))
            .filter(entry => !!entry.nominee);

        els.overlay.classList.toggle('hide-scores', state.reveal.hideScores);
        els.categoryIndex.textContent = `Categoria ${String(result.category.number).padStart(2, '0')} de ${state.reveal.results.length}`;
        els.categoryTitle.textContent = result.category.title;
        els.stepLabel.textContent = getStepLabelText(state.reveal.step, revealRanks);

        els.podium.innerHTML = podiumNominees.map(entry => {
            const revealIndex = revealRanks.indexOf(entry.rank) + 1;
            const isRevealed = revealIndex > 0 && state.reveal.step >= revealIndex;
            const nominee = entry.nominee;
            const imageUrl = nominee.image || `https://placehold.co/480x640/1a1a25/d4af37?text=${encodeURIComponent(nominee.name.charAt(0) || '?')}`;

            return `
                <article class="live-reveal-card rank-${entry.rank} ${entry.rank === 1 ? 'winner' : ''} ${isRevealed ? 'revealed' : ''}">
                    <img class="live-reveal-card-image" src="${imageUrl}" alt="${nominee.name}" loading="eager">
                    <div class="live-reveal-card-body">
                        <span class="live-reveal-card-rank">${entry.rank}º Lugar</span>
                        <span class="live-reveal-card-name">${nominee.name}</span>
                        <span class="live-reveal-card-score">${nominee.score} pts</span>
                        <span class="live-reveal-card-meta">1º: ${nominee.firstVotes} | 2º: ${nominee.secondVotes}</span>
                    </div>
                </article>
            `;
        }).join('');

        const maxStep = revealRanks.length;
        if (state.reveal.step < maxStep) {
            els.nextBtn.querySelector('.btn-text').textContent = 'Revelar próximo';
        } else if (state.reveal.categoryIndex < state.reveal.results.length - 1) {
            els.nextBtn.querySelector('.btn-text').textContent = 'Próxima categoria';
        } else {
            els.nextBtn.querySelector('.btn-text').textContent = 'Finalizar reveal';
        }

        els.toggleScoreBtn.textContent = state.reveal.hideScores ? 'Mostrar pontuações' : 'Ocultar pontuações';
        updateLiveRevealEntryButton();
    }

    function updateLiveRevealEntryButton() {
        const { toggleEntryBtn } = getRevealElements();
        if (!toggleEntryBtn) return;
        if (!FEATURE_FLAGS.ENABLE_LIVE_REVEAL) {
            toggleEntryBtn.hidden = true;
            return;
        }
        toggleEntryBtn.hidden = false;
        toggleEntryBtn.textContent = state.reveal.active ? 'Fechar Telão' : 'Modo Telão';
    }

    // API pública
    return {
        init,
        refreshData,
        exportData,
        confirmClearVotes,
        getDetailedReport,
        generateTextReport,
        startAutoRefresh,
        stopAutoRefresh,
        getVotersList,
        toggleLiveReveal,
        closeLiveReveal,
        advanceLiveReveal,
        
        // Config
        CONFIG,
        
        // Estado (read-only)
        getState: () => ({ ...state })
    };
})();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.Admin = Admin;
}
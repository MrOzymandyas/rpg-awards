/**
 * RPG Awards - UI Module
 * Gerencia interface, animações e interações visuais
 */

const UI = (function() {
    'use strict';

    // Elementos DOM
    let elements = {};

    /**
     * Inicializa referências aos elementos DOM
     */
    function init() {
        elements = {
            // Loading
            loadingScreen: document.getElementById('loading-screen'),
            
            // Login
            loginScreen: document.getElementById('login-screen'),
            loginForm: document.getElementById('login-form'),
            playerId: document.getElementById('player-id'),
            playerKey: document.getElementById('player-key'),
            
            // Dashboard
            votingDashboard: document.getElementById('voting-dashboard'),
            playerNameDisplay: document.getElementById('player-name-display'),
            logoutBtn: document.getElementById('logout-btn'),
            votesCompleted: document.getElementById('votes-completed'),
            totalCategories: document.getElementById('total-categories'),
            progressFill: document.getElementById('progress-fill'),
            categoriesGrid: document.getElementById('categories-grid'),
            
            // Modal
            votingModal: document.getElementById('voting-modal'),
            modalClose: document.getElementById('modal-close'),
            modalBackdrop: document.querySelector('.modal-backdrop'),
            modalCategoryNumber: document.getElementById('modal-category-number'),
            modalCategoryTitle: document.getElementById('modal-category-title'),
            modalCategoryDesc: document.getElementById('modal-category-desc'),
            nomineesGrid: document.getElementById('nominees-grid'),
            prevCategory: document.getElementById('prev-category'),
            nextCategory: document.getElementById('next-category'),
            deckCount: document.getElementById('deck-count'),
            deckTotal: document.getElementById('deck-total'),
            
            // Summary
            summaryScreen: document.getElementById('summary-screen'),
            votingSummary: document.getElementById('voting-summary'),
            submitVotesBtn: document.getElementById('submit-votes-btn'),
            reviewVotesBtn: document.getElementById('review-votes-btn'),
            
            // Admin
            adminPanel: document.getElementById('admin-panel'),
            adminLogout: document.getElementById('admin-logout'),
            totalVoters: document.getElementById('total-voters'),
            completionRate: document.getElementById('completion-rate'),
            adminResults: document.getElementById('admin-results'),
            
            // Toast
            toastContainer: document.getElementById('toast-container')
        };

        // Atualiza total de categorias
        if (elements.totalCategories) {
            elements.totalCategories.textContent = CATEGORIES.length;
        }
    }

    // ==================== LOADING ====================

    /**
     * Mostra tela de loading
     */
    function showLoading() {
        if (elements.loadingScreen) {
            elements.loadingScreen.classList.remove('hidden');
        }
    }

    /**
     * Esconde tela de loading
     */
    function hideLoading() {
        if (elements.loadingScreen) {
            elements.loadingScreen.classList.add('hidden');
        }
    }

    /**
     * Simula loading inicial
     */
    function simulateLoading() {
        showLoading();
        setTimeout(() => {
            hideLoading();
        }, 4000);
    }

    // ==================== NAVEGAÇÃO ====================

    /**
     * Mostra tela de login
     */
    function showLogin() {
        hideAllScreens();
        if (elements.loginScreen) {
            elements.loginScreen.style.display = 'flex';
            elements.loginScreen.classList.add('active');
        }
    }

    /**
     * Mostra dashboard de votação
     */
    function showDashboard() {
        hideAllScreens();
        if (elements.votingDashboard) {
            elements.votingDashboard.classList.add('active');
            elements.votingDashboard.style.display = 'block';
        }
        updateDashboard();
    }

    /**
     * Mostra tela de resumo
     */
    function showSummary() {
        hideAllScreens();
        if (elements.summaryScreen) {
            elements.summaryScreen.classList.add('active');
            elements.summaryScreen.style.display = 'block';
        }
        renderSummary();
    }

    /**
     * Mostra painel admin
     */
    function showAdmin() {
        hideAllScreens();
        if (elements.adminPanel) {
            elements.adminPanel.style.display = 'block';
        }
        updateAdminPanel();
    }

    /**
     * Esconde todas as telas
     */
    function hideAllScreens() {
        // Login
        if (elements.loginScreen) {
            elements.loginScreen.classList.remove('active');
            elements.loginScreen.style.display = 'none';
        }
        
        // Dashboard
        if (elements.votingDashboard) {
            elements.votingDashboard.classList.remove('active');
            elements.votingDashboard.style.display = 'none';
        }
        
        // Summary
        if (elements.summaryScreen) {
            elements.summaryScreen.classList.remove('active');
            elements.summaryScreen.style.display = 'none';
        }
        
        // Admin
        if (elements.adminPanel) {
            elements.adminPanel.style.display = 'none';
        }
    }

    // ==================== DASHBOARD ====================

    /**
     * Atualiza dashboard com dados atuais
     */
    function updateDashboard() {
        const user = Storage.getCurrentUser();
        if (!user) return;

        // Atualiza nome do jogador com título nobiliárquico
        if (elements.playerNameDisplay) {
            elements.playerNameDisplay.textContent = user.displayName || user.title || user.name;
        }

        // Atualiza progresso
        const voteCount = Storage.getVoteCount();
        if (elements.votesCompleted) {
            elements.votesCompleted.textContent = voteCount;
        }
        if (elements.progressFill) {
            const progress = (voteCount / CATEGORIES.length) * 100;
            elements.progressFill.style.width = progress + '%';
        }

        // Renderiza categorias
        renderCategories();
    }

    /**
     * Renderiza grid de categorias (cria apenas na 1a vez, depois atualiza in-place)
     */
    function renderCategories() {
        if (!elements.categoriesGrid) return;

        const existingCards = elements.categoriesGrid.querySelectorAll('.category-card');
        const needsFullRender = existingCards.length !== CATEGORIES.length;

        if (needsFullRender) {
            elements.categoriesGrid.innerHTML = '';
        }

        CATEGORIES.forEach((category, idx) => {
            const isComplete = Storage.hasCompletedCategory(category.id);
            const hasPartial = Storage.hasVotedInCategory(category.id) && !isComplete;
            const userVote = Storage.getVote(category.id);
            
            const firstNominee = userVote?.firstChoice ? getNomineeById(category.id, userVote.firstChoice.nomineeId) : null;
            const secondNominee = userVote?.secondChoice ? getNomineeById(category.id, userVote.secondChoice.nomineeId) : null;

            // Monta status e escolhas
            let statusLabel = 'Clique para votar';
            let choicesHtml = '';
            
            if (isComplete) {
                statusLabel = '✓ Completo';
                choicesHtml = `
                    <div class="status-choices">
                        <span class="choice">
                            <span class="choice-badge first">1º</span>
                            <span class="choice-name">${firstNominee?.name || ''}</span>
                        </span>
                        <span class="choice">
                            <span class="choice-badge second">2º</span>
                            <span class="choice-name">${secondNominee?.name || ''}</span>
                        </span>
                    </div>
                `;
            } else if (hasPartial) {
                statusLabel = '⋯ Incompleto';
                if (firstNominee) {
                    choicesHtml = `
                        <div class="status-choices">
                            <span class="choice">
                                <span class="choice-badge first">1º</span>
                                <span class="choice-name">${firstNominee.name}</span>
                            </span>
                        </div>
                    `;
                }
            }

            const statusHtml = `
                <div class="category-status ${isComplete ? 'voted' : ''} ${hasPartial ? 'partial' : ''}">
                    <span class="status-label">${statusLabel}</span>
                    ${choicesHtml}
                </div>
            `;

            if (needsFullRender) {
                // Primeira renderização: cria os cards
                const card = document.createElement('div');
                card.className = 'category-card';
                if (isComplete) card.classList.add('voted');
                if (hasPartial) card.classList.add('partial');
                card.dataset.categoryId = category.id;
                
                card.innerHTML = `
                    <span class="category-number">CATEGORIA ${category.number}</span>
                    <h3 class="category-card-title">${category.title}</h3>
                    <p class="category-card-desc">${category.description}</p>
                    ${statusHtml}
                `;

                card.addEventListener('click', () => openVotingModal(category));
                elements.categoriesGrid.appendChild(card);
            } else {
                // Atualização in-place: apenas muda classes e status
                const card = existingCards[idx];
                card.classList.toggle('voted', isComplete);
                card.classList.toggle('partial', hasPartial);
                
                const statusEl = card.querySelector('.category-status');
                if (statusEl) {
                    statusEl.className = `category-status ${isComplete ? 'voted' : ''} ${hasPartial ? 'partial' : ''}`;
                    statusEl.innerHTML = `<span class="status-label">${statusLabel}</span>${choicesHtml}`;
                }
            }
        });
    }

    /**
     * Obtém indicado por ID
     */
    function getNomineeById(categoryId, nomineeId) {
        const nominees = NOMINEES[categoryId] || [];
        return nominees.find(n => n.id === nomineeId);
    }

    // ==================== MODAL ====================

    let currentCategory = null;
    let currentCategoryIndex = 0;
    const preloadedNomineeImages = new Set();
    const pendingNomineePreloads = new Map();
    const IMAGE_PRELOAD_BUDGET_MS = 700;

    /**
     * Retorna URL da imagem do indicado (com fallback)
     * @param {Object} nominee - Indicado
     * @returns {string}
     */
    function getNomineeImageUrl(nominee) {
        return nominee.image || `https://placehold.co/200x280/1a1a25/d4af37?text=${encodeURIComponent(nominee.name.charAt(0))}`;
    }

    /**
     * Pré-carrega uma imagem e evita requisições duplicadas
     * @param {string} url - URL da imagem
     * @returns {Promise<void>}
     */
    function preloadImage(url) {
        if (!url || preloadedNomineeImages.has(url)) {
            return Promise.resolve();
        }

        const existingPreload = pendingNomineePreloads.get(url);
        if (existingPreload) {
            return existingPreload;
        }

        const preloadPromise = new Promise(resolve => {
            const img = new Image();
            let finished = false;

            const finish = (loaded) => {
                if (finished) return;
                finished = true;
                if (loaded) {
                    preloadedNomineeImages.add(url);
                }
                resolve();
            };

            img.onload = () => finish(true);
            img.onerror = () => finish(false);
            img.src = url;

            if (img.complete) {
                finish(true);
            }
        }).finally(() => {
            pendingNomineePreloads.delete(url);
        });

        pendingNomineePreloads.set(url, preloadPromise);
        return preloadPromise;
    }

    /**
     * Pré-carrega imagens da categoria atual com orçamento de espera curto
     * @param {Object} category - Categoria
     * @param {number} timeoutMs - Tempo máximo de espera em ms
     * @returns {Promise<void>}
     */
    function preloadCategoryNomineeImages(category, timeoutMs = IMAGE_PRELOAD_BUDGET_MS) {
        if (!category) return Promise.resolve();

        const nominees = NOMINEES[category.id] || [];
        const imageUrls = [...new Set(nominees.map(getNomineeImageUrl).filter(Boolean))];

        if (!imageUrls.length) return Promise.resolve();

        const preloads = Promise.allSettled(imageUrls.map(preloadImage)).then(() => undefined);
        if (timeoutMs <= 0) return preloads;

        return Promise.race([
            preloads,
            new Promise(resolve => setTimeout(resolve, timeoutMs))
        ]);
    }

    /**
     * Pré-carrega imagens das categorias vizinhas em segundo plano
     * @param {number} index - Índice da categoria atual
     */
    function preloadAdjacentCategories(index) {
        [index - 1, index + 1].forEach(adjacentIndex => {
            const adjacentCategory = CATEGORIES[adjacentIndex];
            if (!adjacentCategory) return;
            preloadCategoryNomineeImages(adjacentCategory, 0);
        });
    }

    /**
     * Abre modal de votação
     * @param {Object} category - Categoria selecionada
     */
    async function openVotingModal(category) {
        currentCategory = category;
        currentCategoryIndex = CATEGORIES.findIndex(c => c.id === category.id);
        
        // Atualiza conteúdo da categoria
        updateCategoryDisplay(category);

        // Aguarda um curto pré-carregamento para evitar imagens "pipocando" após a animação
        await preloadCategoryNomineeImages(category);

        // Renderiza indicados
        renderNominees(category);

        // Atualiza estado dos botões de navegação
        updateNavButtons();

        // Renderiza o deck com votos existentes
        renderDeck();

        // Mostra modal
        if (elements.votingModal) {
            elements.votingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Aquece categorias adjacentes para navegação mais fluida
        preloadAdjacentCategories(currentCategoryIndex);
    }

    /**
     * Atualiza display da categoria atual
     */
    function updateCategoryDisplay(category) {
        if (elements.modalCategoryNumber) {
            elements.modalCategoryNumber.textContent = `CATEGORIA ${category.number} DE ${CATEGORIES.length}`;
        }
        if (elements.modalCategoryTitle) {
            elements.modalCategoryTitle.textContent = category.title;
        }
        if (elements.modalCategoryDesc) {
            elements.modalCategoryDesc.textContent = category.description;
        }
    }

    /**
     * Atualiza estado dos botões de navegação
     */
    function updateNavButtons() {
        if (elements.prevCategory) {
            elements.prevCategory.disabled = currentCategoryIndex === 0;
        }
        if (elements.nextCategory) {
            elements.nextCategory.disabled = currentCategoryIndex === CATEGORIES.length - 1;
        }
    }

    /**
     * Transição suave entre categorias (fade out -> troca -> fade in)
     */
    function transitionCategory(newIndex) {
        const grid = elements.nomineesGrid;
        if (!grid) return;

        grid.style.transition = 'opacity 0.15s ease';
        grid.style.opacity = '0';

        setTimeout(async () => {
            currentCategoryIndex = newIndex;
            currentCategory = CATEGORIES[currentCategoryIndex];
            updateCategoryDisplay(currentCategory);
            await preloadCategoryNomineeImages(currentCategory);
            renderNominees(currentCategory);
            updateNavButtons();
            renderDeck();
            preloadAdjacentCategories(currentCategoryIndex);

            grid.style.opacity = '1';
        }, 150);
    }

    /**
     * Navega para categoria anterior
     */
    function goToPrevCategory() {
        if (currentCategoryIndex > 0) {
            transitionCategory(currentCategoryIndex - 1);
        }
    }

    /**
     * Navega para próxima categoria
     */
    function goToNextCategory() {
        if (currentCategoryIndex < CATEGORIES.length - 1) {
            transitionCategory(currentCategoryIndex + 1);
        } else {
            // Se era a última categoria e completou, mostra resumo
            if (Storage.hasCompletedVoting()) {
                closeVotingModal();
                showSummary();
            }
        }
    }

    /**
     * Fecha modal de votação
     */
    function closeVotingModal() {
        if (elements.votingModal) {
            elements.votingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        currentCategory = null;
        updateDashboard();
    }

    // ==================== DECK COUNTER ====================

    /**
     * Atualiza o contador do deck (categorias completas / total)
     */
    function renderDeck() {
        if (!elements.deckCount || !elements.deckTotal) return;

        const userVotes = Storage.getUserVotes();
        let completedCategories = 0;

        Object.keys(userVotes).forEach(categoryId => {
            const vote = userVotes[categoryId];
            if (vote.firstChoice && vote.secondChoice) {
                completedCategories++;
            }
        });

        elements.deckCount.textContent = completedCategories;
        elements.deckTotal.textContent = CATEGORIES.length;
    }

    /**
     * Renderiza indicados como cartas de tarô no modal
     * @param {Object} category - Categoria atual
     */
    function renderNominees(category) {
        if (!elements.nomineesGrid) return;

        elements.nomineesGrid.innerHTML = '';
        
        const nominees = NOMINEES[category.id] || [];
        const userVote = Storage.getVote(category.id);
        
        // Determina escolhas atuais
        const firstChoiceId = userVote?.firstChoice?.nomineeId;
        const secondChoiceId = userVote?.secondChoice?.nomineeId;

        nominees.forEach((nominee, index) => {
            const isFirst = firstChoiceId === nominee.id;
            const isSecond = secondChoiceId === nominee.id;
            
            const card = document.createElement('div');
            card.className = 'nominee-card';
            if (isFirst) card.classList.add('first-choice');
            if (isSecond) card.classList.add('second-choice');
            
            card.dataset.nomineeId = nominee.id;
            card.style.animationDelay = `${index * 0.1}s`;

            // Imagem placeholder se não existir - formato vertical para tarô
            const imageUrl = getNomineeImageUrl(nominee);

            // Determina texto do badge
            let badgeText = '';
            if (isFirst) badgeText = '1º';
            if (isSecond) badgeText = '2º';

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="nominee-image">
                            <img src="${imageUrl}" alt="${nominee.name}" loading="eager" decoding="async" fetchpriority="${index < 2 ? 'high' : 'auto'}">
                        </div>
                        <div class="nominee-info">
                            <h4 class="nominee-name">${nominee.name}</h4>
                            <p class="nominee-origin">${nominee.origin}</p>
                            ${nominee.description ? `<p class="nominee-description">${nominee.description}</p>` : ''}
                        </div>
                    </div>
                </div>
                <div class="nominee-badge">${badgeText}</div>
            `;

            card.addEventListener('click', () => selectNominee(nominee.id));
            elements.nomineesGrid.appendChild(card);
        });

        // Animação de entrada das cartas
        animateCardsEntrance();

        // Atualiza instrução
        updateVotingInstruction();
    }

    /**
     * Atualiza texto de instrução baseado no estado atual
     */
    function updateVotingInstruction() {
        const instruction = document.querySelector('.voting-instruction');
        if (!instruction || !currentCategory) return;

        const userVote = Storage.getVote(currentCategory.id);
        const hasFirst = userVote?.firstChoice;
        const hasSecond = userVote?.secondChoice;

        if (!hasFirst) {
            instruction.innerHTML = 'Escolha sua carta de <span>1º lugar</span> (clique para selecionar)';
        } else if (!hasSecond) {
            instruction.innerHTML = 'Agora escolha o <span>2º lugar</span> (clique em outra carta)';
        } else {
            instruction.innerHTML = 'Escolhas completas! <span>Clique para trocar</span> ou avance para próxima';
        }
    }

    /**
     * Anima entrada das cartas de tarô
     */
    function animateCardsEntrance() {
        const cards = document.querySelectorAll('.nominee-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(100px) rotateX(-30deg)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0)';
            }, 100 + (index * 100));
        });
    }

    /**
     * Atualiza visual das cartas sem re-renderizar
     * @param {string} firstId - ID do 1º lugar
     * @param {string} secondId - ID do 2º lugar
     */
    function updateCardSelectionUI(firstId, secondId) {
        // Remove todas as classes de seleção
        document.querySelectorAll('.nominee-card').forEach(card => {
            card.classList.remove('first-choice', 'second-choice');
            const badge = card.querySelector('.nominee-badge');
            if (badge) badge.textContent = '';
        });

        // Aplica 1º lugar
        if (firstId) {
            const firstCard = document.querySelector(`.nominee-card[data-nominee-id="${firstId}"]`);
            if (firstCard) {
                firstCard.classList.add('first-choice');
                const badge = firstCard.querySelector('.nominee-badge');
                if (badge) badge.textContent = '1º';
            }
        }

        // Aplica 2º lugar
        if (secondId) {
            const secondCard = document.querySelector(`.nominee-card[data-nominee-id="${secondId}"]`);
            if (secondCard) {
                secondCard.classList.add('second-choice');
                const badge = secondCard.querySelector('.nominee-badge');
                if (badge) badge.textContent = '2º';
            }
        }

        // Atualiza instrução
        updateVotingInstruction();
    }

    /**
     * Seleciona um indicado (1º ou 2º lugar)
     * @param {string} nomineeId - ID do indicado
     */
    function selectNominee(nomineeId) {
        if (!currentCategory) return;

        const userVote = Storage.getVote(currentCategory.id);
        let firstChoiceId = userVote?.firstChoice?.nomineeId;
        let secondChoiceId = userVote?.secondChoice?.nomineeId;

        // Se clicar na carta já selecionada como 1º, remove
        if (nomineeId === firstChoiceId) {
            Storage.removeVote(currentCategory.id, 'first');
            showToast('1º lugar removido', 'warning');
            updateCardSelectionUI(null, secondChoiceId);
            return;
        }

        // Se clicar na carta já selecionada como 2º, remove
        if (nomineeId === secondChoiceId) {
            Storage.removeVote(currentCategory.id, 'second');
            showToast('2º lugar removido', 'warning');
            updateCardSelectionUI(firstChoiceId, null);
            return;
        }

        // Se não tem 1º lugar, esta carta vira 1º
        if (!firstChoiceId) {
            const success = Storage.vote(currentCategory.id, nomineeId, 'first');
            if (success) {
                showToast('1º lugar escolhido!', 'success');
                updateCardSelectionUI(nomineeId, secondChoiceId);
            }
            return;
        }

        // Se tem 1º mas não tem 2º, esta carta vira 2º
        if (!secondChoiceId) {
            const success = Storage.vote(currentCategory.id, nomineeId, 'second');
            if (success) {
                showToast('2º lugar escolhido! Categoria completa.', 'success');
                updateCardSelectionUI(firstChoiceId, nomineeId);
                
                // Verifica se completou todas as categorias
                setTimeout(() => {
                    if (Storage.hasCompletedVoting()) {
                        setTimeout(() => {
                            closeVotingModal();
                            showSummary();
                        }, 500);
                    } else {
                        // Vai para próxima categoria automaticamente
                        goToNextCategory();
                    }
                }, 1500);
            }
            return;
        }

        // Se já tem ambas, troca o 2º lugar
        const success = Storage.vote(currentCategory.id, nomineeId, 'second');
        if (success) {
            showToast('2º lugar alterado!', 'success');
            updateCardSelectionUI(firstChoiceId, nomineeId);
        }
    }

    /**
     * Abre uma categoria diretamente a partir do resumo
     * @param {string} categoryId - ID da categoria
     */
    function openCategoryFromSummary(categoryId) {
        const category = CATEGORIES.find(c => c.id === categoryId);
        if (!category) return;

        showDashboard();

        // Aguarda o dashboard montar para abrir o modal no contexto correto.
        setTimeout(() => {
            openVotingModal(category);
        }, 120);
    }

    // ==================== SUMMARY ====================

    /**
     * Renderiza resumo de votos
     */
    function renderSummary() {
        if (!elements.votingSummary) return;

        const userVotes = Storage.getUserVotes();
        elements.votingSummary.innerHTML = '';

        CATEGORIES.forEach(category => {
            const vote = userVotes[category.id];
            const firstNominee = vote?.firstChoice ? getNomineeById(category.id, vote.firstChoice.nomineeId) : null;
            const secondNominee = vote?.secondChoice ? getNomineeById(category.id, vote.secondChoice.nomineeId) : null;

            const card = document.createElement('div');
            card.className = 'summary-card';
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Revisar categoria ${category.number}: ${category.title}`);

            const firstImageUrl = firstNominee?.image 
                || `https://placehold.co/80x80/1a1a25/d4af37?text=${firstNominee?.name?.charAt(0) || '?'}`;
            const secondImageUrl = secondNominee?.image 
                || `https://placehold.co/60x60/1a1a25/808080?text=${secondNominee?.name?.charAt(0) || '?'}`;

            card.innerHTML = `
                <span class="summary-card-number">#${String(category.number).padStart(2, '0')}</span>
                <div class="summary-card-info">
                    <span class="summary-card-category">${category.title}</span>
                    <div class="summary-card-choices">
                        <span class="summary-choice first">
                            <span class="choice-badge">1º</span>
                            ${firstNominee ? firstNominee.name : 'Não votado'}
                        </span>
                        <span class="summary-choice second">
                            <span class="choice-badge">2º</span>
                            ${secondNominee ? secondNominee.name : 'Não votado'}
                        </span>
                    </div>
                </div>
                <div class="summary-card-images">
                    <div class="summary-image first">
                        <img src="${firstImageUrl}" alt="${firstNominee?.name || ''}" loading="lazy">
                    </div>
                    <div class="summary-image second">
                        <img src="${secondImageUrl}" alt="${secondNominee?.name || ''}" loading="lazy">
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openCategoryFromSummary(category.id));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCategoryFromSummary(category.id);
                }
            });

            elements.votingSummary.appendChild(card);
        });
    }

    // ==================== ADMIN ====================

    /**
     * Atualiza painel administrativo
     */
    function updateAdminPanel() {
        const stats = Storage.getStats();
        const results = Storage.getResults();

        if (stats) {
            if (elements.totalVoters) {
                elements.totalVoters.textContent = stats.votedPlayers;
            }
            if (elements.completionRate) {
                elements.completionRate.textContent = stats.completionRate + '%';
            }
        }

        if (results && elements.adminResults) {
            renderAdminResults(results);
        }
    }

    /**
     * Renderiza resultados no painel admin
     * @param {Array} results - Resultados das votações
     */
    function renderAdminResults(results) {
        if (!elements.adminResults) return;

        elements.adminResults.innerHTML = '';

        results.forEach(result => {
            const categorySection = document.createElement('div');
            categorySection.className = 'admin-category';

            let nomineesHtml = '';
            const maxScore = result.nominees[0]?.score || 1;
            
            result.nominees.forEach((nominee, index) => {
                const scorePercentage = maxScore > 0 
                    ? Math.round((nominee.score / maxScore) * 100) 
                    : 0;

                nomineesHtml += `
                    <div class="admin-nominee ${index === 0 ? 'winner' : ''}">
                        <span class="admin-nominee-rank">#${index + 1}</span>
                        <div class="admin-nominee-info">
                            <div class="admin-nominee-name">${nominee.name}</div>
                            <div class="admin-nominee-votes">
                                <span class="score-total">${nominee.score} pts</span>
                                <span class="score-detail">
                                    (1º: ${nominee.firstVotes} × 2 + 2º: ${nominee.secondVotes} × 1)
                                </span>
                            </div>
                        </div>
                        <div class="admin-nominee-bar">
                            <div class="admin-nominee-progress" style="width: ${scorePercentage}%"></div>
                        </div>
                    </div>
                `;
            });

            categorySection.innerHTML = `
                <div class="admin-category-header">
                    <h3 class="admin-category-title">${result.category.title}</h3>
                    <span class="admin-category-stats">
                        ${result.totalFirstVotes} votos 1º | ${result.totalSecondVotes} votos 2º
                    </span>
                </div>
                <div class="admin-nominees-list">
                    ${nomineesHtml}
                </div>
            `;

            elements.adminResults.appendChild(categorySection);
        });
    }

    // ==================== TOAST ====================

    /**
     * Mostra notificação toast
     * @param {string} message - Mensagem
     * @param {string} type - Tipo (success, error, warning)
     */
    function showToast(message, type = 'success') {
        if (!elements.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || '•'}</span>
            <span class="toast-message">${message}</span>
        `;

        elements.toastContainer.appendChild(toast);

        // Remove após 3 segundos
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ==================== EVENT LISTENERS ====================

    /**
     * Configura event listeners
     */
    function setupEventListeners() {
        // Login form
        if (elements.loginForm) {
            elements.loginForm.addEventListener('submit', handleLogin);
        }

        // Logout
        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', handleLogout);
        }

        // Admin logout
        if (elements.adminLogout) {
            elements.adminLogout.addEventListener('click', handleLogout);
        }

        // Modal close
        if (elements.modalClose) {
            elements.modalClose.addEventListener('click', closeVotingModal);
        }

        // Category navigation
        if (elements.prevCategory) {
            elements.prevCategory.addEventListener('click', goToPrevCategory);
        }

        if (elements.nextCategory) {
            elements.nextCategory.addEventListener('click', goToNextCategory);
        }

        // Tecla ESC fecha modal, setas navegam
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeVotingModal();
            }
            if (elements.votingModal && elements.votingModal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    goToPrevCategory();
                }
                if (e.key === 'ArrowRight') {
                    goToNextCategory();
                }
            }
        });

        // Summary buttons
        if (elements.submitVotesBtn) {
            elements.submitVotesBtn.addEventListener('click', handleSubmitVotes);
        }

        if (elements.reviewVotesBtn) {
            elements.reviewVotesBtn.addEventListener('click', () => {
                showDashboard();
            });
        }
    }

    /**
     * Handler de login
     * @param {Event} e - Evento de submit
     */
    function handleLogin(e) {
        e.preventDefault();

        const id = elements.playerId.value.trim();
        const key = elements.playerKey.value.trim();

        if (!id || !key) {
            showToast('Vossa Senhoria, por favor forneça tanto o nome quanto a senha de acesso.', 'warning');
            return;
        }

        const user = Storage.authenticate(id, key);

        if (user) {
            const greeting = user.formalGreeting || 'Bem-vindo';
            const displayName = user.displayName || user.name;
            showToast(`${greeting}, ${displayName}!`, 'success');
            
            if (user.role === 'admin') {
                showAdmin();
            } else {
                showDashboard();
            }
        } else {
            const error = Storage.getAuthError(id, key);
            showToast(error.message, 'error');
        }
    }

    /**
     * Handler de logout
     */
    function handleLogout() {
        Storage.logout();
        showLogin();
        showToast('Você saiu da cerimônia', 'success');

        // Limpa formulário
        if (elements.playerId) elements.playerId.value = '';
        if (elements.playerKey) elements.playerKey.value = '';
    }

    /**
     * Handler de submissão final
     */
    function handleSubmitVotes() {
        const hasValidationModule = typeof Voting !== 'undefined' && typeof Voting.validateAllVotes === 'function';

        if (hasValidationModule) {
            const validation = Voting.validateAllVotes();
            if (!validation.valid) {
                const missingCount = validation.missing?.length || 0;
                const plural = missingCount === 1 ? 'categoria pendente' : 'categorias pendentes';
                showToast(`Ainda faltam ${missingCount} ${plural}.`, 'warning');

                const firstMissingTitle = validation.missing?.[0];
                const firstMissingCategory = CATEGORIES.find(c => c.title === firstMissingTitle);
                if (firstMissingCategory) {
                    openCategoryFromSummary(firstMissingCategory.id);
                } else {
                    showDashboard();
                }
                return;
            }
        } else if (!Storage.hasCompletedVoting()) {
            showToast('Ainda há categorias pendentes antes de confirmar.', 'warning');
            showDashboard();
            return;
        }

        showToast('Seus votos foram confirmados! Obrigado por participar.', 'success');
        
        // Efeito de confete
        createConfetti();

        // Logout após alguns segundos
        setTimeout(() => {
            handleLogout();
        }, 5000);
    }

    /**
     * Cria efeito de confete
     */
    function createConfetti() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;

        const colors = ['#d4af37', '#f4d03f', '#b8860b', '#8b7355'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                opacity: ${Math.random() * 0.5 + 0.5};
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Adiciona keyframes do confete
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // API pública
    return {
        init,
        simulateLoading,
        hideLoading,
        showLogin,
        showDashboard,
        showSummary,
        showAdmin,
        showToast,
        updateDashboard,
        updateAdminPanel,
        setupEventListeners
    };
})();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.UI = UI;
}
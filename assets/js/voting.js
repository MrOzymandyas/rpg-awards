/**
 * RPG Awards - Voting Module
 * Lógica específica de votação e validações
 */

const Voting = (function() {
    'use strict';

    // Estado atual
    let state = {
        currentCategory: null,
        selectedNominee: null,
        isVoting: false
    };

    /**
     * Inicializa módulo de votação
     */
    function init() {
        // Configura listeners específicos de votação
        setupVotingListeners();
    }

    /**
     * Configura listeners de votação
     */
    function setupVotingListeners() {
        // Prevenção de cliques duplos
        document.addEventListener('click', (e) => {
            const nomineeCard = e.target.closest('.nominee-card');
            if (nomineeCard && state.isVoting) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    /**
     * Verifica se usuário pode votar em uma categoria
     * @param {string} categoryId - ID da categoria
     * @returns {Object} Resultado da verificação
     */
    function canVote(categoryId) {
        // Verifica autenticação
        if (!Storage.isLoggedIn()) {
            return {
                allowed: false,
                reason: 'not_authenticated',
                message: 'Você precisa estar logado para votar'
            };
        }

        // Verifica se é admin
        if (Storage.isAdmin()) {
            return {
                allowed: false,
                reason: 'is_admin',
                message: 'Administradores não podem votar'
            };
        }

        // Verifica se categoria existe
        const category = CATEGORIES.find(c => c.id === categoryId);
        if (!category) {
            return {
                allowed: false,
                reason: 'invalid_category',
                message: 'Categoria inválida'
            };
        }

        // Verifica se já votou
        if (Storage.hasVotedInCategory(categoryId)) {
            return {
                allowed: true,
                reason: 'already_voted',
                message: 'Você já votou nesta categoria. Clique para alterar seu voto.',
                hasVoted: true
            };
        }

        return {
            allowed: true,
            reason: 'ok',
            message: 'Pronto para votar',
            hasVoted: false
        };
    }

    /**
     * Processa voto
     * @param {string} categoryId - ID da categoria
     * @param {string} nomineeId - ID do indicado
     * @returns {Promise<Object>} Resultado da votação
     */
    async function processVote(categoryId, nomineeId) {
        // Previne votação dupla
        if (state.isVoting) {
            return {
                success: false,
                error: 'Votação em andamento'
            };
        }

        state.isVoting = true;

        try {
            // Validações
            const validation = canVote(categoryId);
            if (!validation.allowed) {
                return {
                    success: false,
                    error: validation.message
                };
            }

            // Verifica indicado
            const nominees = NOMINEES[categoryId] || [];
            const nominee = nominees.find(n => n.id === nomineeId);
            if (!nominee) {
                return {
                    success: false,
                    error: 'Indicado não encontrado'
                };
            }

            // Simula delay de rede para UX
            await simulateNetworkDelay(300);

            // Registra voto
            const success = Storage.vote(categoryId, nomineeId);

            if (success) {
                // Registra analytics (simulado)
                logVoteAnalytics(categoryId, nomineeId);

                return {
                    success: true,
                    message: 'Voto registrado com sucesso',
                    data: {
                        category: CATEGORIES.find(c => c.id === categoryId),
                        nominee: nominee,
                        totalVotes: Storage.getVoteCount()
                    }
                };
            } else {
                return {
                    success: false,
                    error: 'Erro ao registrar voto'
                };
            }

        } catch (error) {
            console.error('Erro na votação:', error);
            return {
                success: false,
                error: 'Erro inesperado. Tente novamente.'
            };
        } finally {
            state.isVoting = false;
        }
    }

    /**
     * Simula delay de rede
     * @param {number} ms - Milissegundos
     * @returns {Promise}
     */
    function simulateNetworkDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Registra analytics de voto
     * @param {string} categoryId - ID da categoria
     * @param {string} nomineeId - ID do indicado
     */
    function logVoteAnalytics(categoryId, nomineeId) {
        // Em produção, isso enviaria para um serviço de analytics
        const analytics = {
            timestamp: new Date().toISOString(),
            category: categoryId,
            nominee: nomineeId,
            user: Storage.getCurrentUser()?.id || 'anonymous'
        };
        
        console.log('Vote Analytics:', analytics);
    }

    /**
     * Obtém progresso da votação
     * @returns {Object} Progresso atual
     */
    function getProgress() {
        const total = CATEGORIES.length;
        const completed = Storage.getVoteCount();
        const remaining = total - completed;
        const percentage = Math.round((completed / total) * 100);

        // Categorias pendentes
        const pendingCategories = CATEGORIES.filter(c => 
            !Storage.hasVotedInCategory(c.id)
        );

        // Categorias completadas
        const completedCategories = CATEGORIES.filter(c => 
            Storage.hasVotedInCategory(c.id)
        );

        return {
            total,
            completed,
            remaining,
            percentage,
            isComplete: completed === total,
            pendingCategories,
            completedCategories
        };
    }

    /**
     * Obtém resumo de votos para exibição
     * @returns {Array} Resumo formatado
     */
    function getVotingSummary() {
        const userVotes = Storage.getUserVotes();
        const summary = [];

        CATEGORIES.forEach(category => {
            const vote = userVotes[category.id];
            const nominees = NOMINEES[category.id] || [];
            const firstNominee = vote?.firstChoice
                ? nominees.find(n => n.id === vote.firstChoice.nomineeId) || null
                : null;
            const secondNominee = vote?.secondChoice
                ? nominees.find(n => n.id === vote.secondChoice.nomineeId) || null
                : null;
            const hasFirstChoice = !!vote?.firstChoice;
            const hasSecondChoice = !!vote?.secondChoice;
            const hasAnyVote = hasFirstChoice || hasSecondChoice;
            const hasCompleteVote = hasFirstChoice && hasSecondChoice;

            summary.push({
                category: category,
                hasVoted: hasAnyVote,
                hasCompleteVote: hasCompleteVote,
                vote: vote,
                firstNominee: firstNominee,
                secondNominee: secondNominee,
                firstTimestamp: vote?.firstChoice?.timestamp || null,
                secondTimestamp: vote?.secondChoice?.timestamp || null
            });
        });

        return summary;
    }

    /**
     * Valida se todos os votos estão corretos antes de submeter
     * @returns {Object} Resultado da validação
     */
    function validateAllVotes() {
        const summary = getVotingSummary();
        const incompleteVotes = summary.filter(s => !s.hasCompleteVote);
        
        if (incompleteVotes.length > 0) {
            return {
                valid: false,
                missing: incompleteVotes.map(s => s.category.title),
                message: `Faltam ${incompleteVotes.length} categoria(s) para concluir`
            };
        }

        return {
            valid: true,
            totalVotes: summary.length,
            message: 'Todos os votos estão completos'
        };
    }

    /**
     * Exporta votos do usuário
     * @returns {Object} Dados de votação
     */
    function exportUserVotes() {
        const user = Storage.getCurrentUser();
        if (!user) return null;

        const summary = getVotingSummary();
        
        return {
            voter: {
                id: user.id,
                name: user.name,
                exportDate: new Date().toISOString()
            },
            votes: summary.map(s => ({
                category: s.category.title,
                firstChoice: s.firstNominee?.name || 'Não votado',
                secondChoice: s.secondNominee?.name || 'Não votado',
                isComplete: s.hasCompleteVote,
                firstTimestamp: s.firstTimestamp,
                secondTimestamp: s.secondTimestamp
            }))
        };
    }

    /**
     * Obtém estatísticas de participação
     * @returns {Object} Estatísticas
     */
    function getParticipationStats() {
        const totalPlayers = PLAYERS.filter(p => p.role === 'player').length;
        const voters = Storage.getAllVoters ? Storage.getAllVoters() : {};
        const votedCount = Object.keys(voters).length;
        
        let completedCount = 0;
        Object.values(voters).forEach(voter => {
            if (Object.keys(voter.votes || {}).length === CATEGORIES.length) {
                completedCount++;
            }
        });

        return {
            totalPlayers,
            votedCount,
            pendingCount: totalPlayers - votedCount,
            completedCount,
            completionRate: totalPlayers > 0 ? (completedCount / totalPlayers) * 100 : 0,
            participationRate: totalPlayers > 0 ? (votedCount / totalPlayers) * 100 : 0
        };
    }

    // API pública
    return {
        init,
        canVote,
        processVote,
        getProgress,
        getVotingSummary,
        validateAllVotes,
        exportUserVotes,
        getParticipationStats,
        
        // Estado (read-only)
        getState: () => ({ ...state })
    };
})();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.Voting = Voting;
}
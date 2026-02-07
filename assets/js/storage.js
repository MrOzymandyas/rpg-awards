/**
 * RPG Awards - Storage Module
 * Gerencia persistência de dados usando localStorage
 * Simula backend para persistência de votos
 */

const Storage = (function() {
    'use strict';

    // Chaves do localStorage
    const KEYS = {
        CURRENT_USER: 'rpg_awards_user',
        VOTES: 'rpg_awards_votes',
        VOTERS: 'rpg_awards_voters',
        SESSION: 'rpg_awards_session'
    };

    /**
     * Salva dados no localStorage
     * @param {string} key - Chave de armazenamento
     * @param {*} data - Dados a serem salvos
     */
    function save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    }

    /**
     * Carrega dados do localStorage
     * @param {string} key - Chave de armazenamento
     * @param {*} defaultValue - Valor padrão se não encontrado
     * @returns {*} Dados carregados ou valor padrão
     */
    function load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return defaultValue;
        }
    }

    /**
     * Remove dados do localStorage
     * @param {string} key - Chave de armazenamento
     */
    function remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Erro ao remover dados:', error);
            return false;
        }
    }

    /**
     * Limpa todos os dados do aplicativo
     */
    function clearAll() {
        Object.values(KEYS).forEach(key => remove(key));
    }

    // ==================== AUTENTICAÇÃO ====================

    /**
     * Autentica um jogador
     * @param {string} id - Identificação do jogador
     * @param {string} key - Chave de acesso
     * @returns {Object|null} Dados do usuário ou null se inválido
     */
    function authenticate(id, key) {
        const player = PLAYERS.find(p => 
            p.id.toUpperCase() === id.toUpperCase() && 
            p.key === key
        );

        if (player) {
            const session = {
                ...player,
                loginTime: new Date().toISOString(),
                sessionId: generateSessionId(),
                displayName: player.title || player.name,
                formalGreeting: player.greeting || 'Bem-vindo'
            };
            save(KEYS.CURRENT_USER, session);
            save(KEYS.SESSION, session);
            return session;
        }

        return null;
    }

    /**
     * Obtém mensagem de erro apropriada para falha de autenticação
     * @param {string} id - ID tentado
     * @param {string} key - Chave tentada
     * @returns {Object} Tipo de erro e mensagem
     */
    function getAuthError(id, key) {
        if (!id || !key) {
            return {
                type: 'missing_fields',
                message: 'Vossa Senhoria, por favor forneça tanto o nome quanto a senha de acesso à cerimônia.'
            };
        }

        const playerExists = PLAYERS.find(p => p.id.toUpperCase() === id.toUpperCase());
        
        if (!playerExists) {
            return {
                type: 'user_not_found',
                message: 'Lamento, mas esse nome não consta na lista de nobres convidados para esta cerimônia.'
            };
        }

        if (playerExists.key !== key) {
            return {
                type: 'wrong_password',
                message: 'A senha fornecida está incorreta. Por favor, verifique suas credenciais de acesso.'
            };
        }

        return {
            type: 'unknown',
            message: 'Ocorreu um erro desconhecido durante a autenticação.'
        };
    }

    /**
     * Gera ID único de sessão
     * @returns {string} ID de sessão
     */
    function generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Verifica se há sessão ativa
     * @returns {Object|null} Sessão ativa ou null
     */
    function getCurrentUser() {
        return load(KEYS.CURRENT_USER);
    }

    /**
     * Verifica se usuário está logado
     * @returns {boolean}
     */
    function isLoggedIn() {
        return !!getCurrentUser();
    }

    /**
     * Verifica se usuário é administrador
     * @returns {boolean}
     */
    function isAdmin() {
        const user = getCurrentUser();
        return user && user.role === 'admin';
    }

    /**
     * Realiza logout
     */
    function logout() {
        remove(KEYS.CURRENT_USER);
        remove(KEYS.SESSION);
    }

    // ==================== VOTOS ====================

    /**
     * Registra uma escolha (1º ou 2º lugar)
     * @param {string} categoryId - ID da categoria
     * @param {string} nomineeId - ID do indicado
     * @param {string} choice - 'first' ou 'second'
     * @returns {boolean} Sucesso da operação
     */
    function vote(categoryId, nomineeId, choice = 'first') {
        const user = getCurrentUser();
        if (!user) {
            console.error('Usuário não autenticado');
            return false;
        }

        // Carrega votos existentes
        const allVotes = load(KEYS.VOTES, {});
        
        // Registra voto
        if (!allVotes[categoryId]) {
            allVotes[categoryId] = { first: {}, second: {} };
        }
        if (!allVotes[categoryId].first) allVotes[categoryId].first = {};
        if (!allVotes[categoryId].second) allVotes[categoryId].second = {};
        
        if (!allVotes[categoryId][choice][nomineeId]) {
            allVotes[categoryId][choice][nomineeId] = [];
        }

        // Remove voto anterior do usuário nesta escolha (se existir)
        Object.keys(allVotes[categoryId][choice]).forEach(nId => {
            allVotes[categoryId][choice][nId] = allVotes[categoryId][choice][nId].filter(
                v => v.userId !== user.id
            );
        });

        // Adiciona voto do usuário
        allVotes[categoryId][choice][nomineeId].push({
            userId: user.id,
            timestamp: new Date().toISOString(),
            sessionId: user.sessionId
        });

        // Salva votos
        save(KEYS.VOTES, allVotes);

        // Atualiza registro do votante
        updateVoterRecord(categoryId, nomineeId, choice);

        return true;
    }

    /**
     * Remove uma escolha
     * @param {string} categoryId - ID da categoria
     * @param {string} choice - 'first' ou 'second'
     */
    function removeVote(categoryId, choice) {
        const user = getCurrentUser();
        if (!user) return false;

        // Remove do registro global
        const allVotes = load(KEYS.VOTES, {});
        if (allVotes[categoryId] && allVotes[categoryId][choice]) {
            Object.keys(allVotes[categoryId][choice]).forEach(nId => {
                allVotes[categoryId][choice][nId] = allVotes[categoryId][choice][nId].filter(
                    v => v.userId !== user.id
                );
            });
            save(KEYS.VOTES, allVotes);
        }

        // Remove do registro do votante
        const voters = load(KEYS.VOTERS, {});
        if (voters[user.id] && voters[user.id].votes[categoryId]) {
            if (choice === 'first') {
                voters[user.id].votes[categoryId].firstChoice = null;
            } else {
                voters[user.id].votes[categoryId].secondChoice = null;
            }
            
            // Se ambos forem null, remove a categoria
            const catVote = voters[user.id].votes[categoryId];
            if (!catVote.firstChoice && !catVote.secondChoice) {
                delete voters[user.id].votes[categoryId];
            }
            
            save(KEYS.VOTERS, voters);
        }

        return true;
    }

    /**
     * Atualiza registro do votante
     * @param {string} categoryId - ID da categoria
     * @param {string} nomineeId - ID do indicado
     * @param {string} choice - 'first' ou 'second'
     */
    function updateVoterRecord(categoryId, nomineeId, choice) {
        const user = getCurrentUser();
        const voters = load(KEYS.VOTERS, {});

        if (!voters[user.id]) {
            voters[user.id] = {
                name: user.name,
                title: user.title || '',
                votes: {},
                firstVote: new Date().toISOString(),
                lastVote: new Date().toISOString()
            };
        }

        if (!voters[user.id].votes[categoryId]) {
            voters[user.id].votes[categoryId] = {
                firstChoice: null,
                secondChoice: null
            };
        }

        if (choice === 'first') {
            voters[user.id].votes[categoryId].firstChoice = {
                nomineeId: nomineeId,
                timestamp: new Date().toISOString()
            };
        } else {
            voters[user.id].votes[categoryId].secondChoice = {
                nomineeId: nomineeId,
                timestamp: new Date().toISOString()
            };
        }
        
        voters[user.id].lastVote = new Date().toISOString();
        save(KEYS.VOTERS, voters);
    }

    /**
     * Verifica se usuário completou uma categoria (ambas escolhas)
     * @param {string} categoryId - ID da categoria
     * @returns {boolean}
     */
    function hasCompletedCategory(categoryId) {
        const vote = getVote(categoryId);
        return vote && vote.firstChoice && vote.secondChoice;
    }

    /**
     * Verifica se usuário já votou em uma categoria (pelo menos 1 escolha)
     * @param {string} categoryId - ID da categoria
     * @returns {boolean}
     */
    function hasVotedInCategory(categoryId) {
        const vote = getVote(categoryId);
        return vote && (vote.firstChoice || vote.secondChoice);
    }

    /**
     * Obtém voto do usuário em uma categoria
     * @param {string} categoryId - ID da categoria
     * @returns {Object|null} Dados do voto ou null
     */
    function getVote(categoryId) {
        const user = getCurrentUser();
        if (!user) return null;

        const voters = load(KEYS.VOTERS, {});
        return voters[user.id] ? voters[user.id].votes[categoryId] : null;
    }

    /**
     * Obtém todos os votos do usuário atual
     * @returns {Object} Votos do usuário
     */
    function getUserVotes() {
        const user = getCurrentUser();
        if (!user) return {};

        const voters = load(KEYS.VOTERS, {});
        return voters[user.id] ? voters[user.id].votes : {};
    }

    /**
     * Conta quantas categorias o usuário completou (ambas escolhas)
     * @returns {number} Número de categorias completas
     */
    function getVoteCount() {
        const votes = getUserVotes();
        let count = 0;
        Object.values(votes).forEach(v => {
            if (v && v.firstChoice && v.secondChoice) count++;
        });
        return count;
    }

    /**
     * Verifica se usuário completou todos os votos
     * @returns {boolean}
     */
    function hasCompletedVoting() {
        return getVoteCount() === CATEGORIES.length;
    }

    /**
     * Obtém todos os votos (apenas admin)
     * @returns {Object} Todos os votos
     */
    function getAllVotes() {
        if (!isAdmin()) {
            console.error('Acesso negado: apenas administradores');
            return null;
        }
        return load(KEYS.VOTES, {});
    }

    /**
     * Obtém todos os votantes (apenas admin)
     * @returns {Object} Todos os votantes
     */
    function getAllVoters() {
        if (!isAdmin()) {
            console.error('Acesso negado: apenas administradores');
            return null;
        }
        return load(KEYS.VOTERS, {});
    }

    /**
     * Calcula resultados por categoria (apenas admin)
     * Sistema de pontuação: 1º lugar = 2 pontos, 2º lugar = 1 ponto
     * @returns {Array} Resultados formatados
     */
    function getResults() {
        if (!isAdmin()) {
            console.error('Acesso negado: apenas administradores');
            return null;
        }

        const votes = load(KEYS.VOTES, {});
        const results = [];

        CATEGORIES.forEach(category => {
            const categoryVotes = votes[category.id] || { first: {}, second: {} };
            const firstVotes = categoryVotes.first || {};
            const secondVotes = categoryVotes.second || {};
            const nominees = NOMINEES[category.id] || [];
            
            const nomineeResults = nominees.map(nominee => {
                const firstList = firstVotes[nominee.id] || [];
                const secondList = secondVotes[nominee.id] || [];
                const firstCount = firstList.length;
                const secondCount = secondList.length;
                // Pontuação: 1º lugar = 2pts, 2º lugar = 1pt
                const score = (firstCount * 2) + (secondCount * 1);
                
                return {
                    ...nominee,
                    firstVotes: firstCount,
                    secondVotes: secondCount,
                    score: score,
                    votes: firstCount + secondCount, // Total de votos (para compatibilidade)
                    voters: [...firstList, ...secondList].map(v => v.userId)
                };
            });

            // Ordena por score (pontuação)
            nomineeResults.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                // Desempate: quem tem mais 1º lugares
                return b.firstVotes - a.firstVotes;
            });

            // Calcula totais
            const totalFirstVotes = nomineeResults.reduce((sum, n) => sum + n.firstVotes, 0);
            const totalSecondVotes = nomineeResults.reduce((sum, n) => sum + n.secondVotes, 0);
            const totalVotes = totalFirstVotes + totalSecondVotes;

            results.push({
                category: category,
                nominees: nomineeResults,
                totalVotes: totalVotes,
                totalFirstVotes: totalFirstVotes,
                totalSecondVotes: totalSecondVotes
            });
        });

        return results;
    }

    /**
     * Obtém estatísticas gerais (apenas admin)
     * @returns {Object} Estatísticas
     */
    function getStats() {
        if (!isAdmin()) {
            console.error('Acesso negado: apenas administradores');
            return null;
        }

        const voters = load(KEYS.VOTERS, {});
        const totalPlayers = PLAYERS.filter(p => p.role === 'player').length;
        const votedPlayers = Object.keys(voters).length;
        
        // Calcula taxa de conclusão (ambas escolhas em todas categorias)
        let completedVoters = 0;
        Object.values(voters).forEach(voter => {
            const completedCategories = Object.values(voter.votes).filter(
                v => v && v.firstChoice && v.secondChoice
            ).length;
            if (completedCategories === CATEGORIES.length) {
                completedVoters++;
            }
        });

        // Conta votos totais (cada escolha completa = 1 voto)
        let totalVotes = 0;
        Object.values(voters).forEach(voter => {
            Object.values(voter.votes).forEach(v => {
                if (v?.firstChoice) totalVotes++;
                if (v?.secondChoice) totalVotes++;
            });
        });

        return {
            totalPlayers: totalPlayers,
            votedPlayers: votedPlayers,
            pendingPlayers: totalPlayers - votedPlayers,
            completionRate: totalPlayers > 0 ? Math.round((completedVoters / totalPlayers) * 100) : 0,
            totalVotes: totalVotes
        };
    }

    /**
     * Exporta todos os dados para backup (apenas admin)
     * @returns {Object} Dados completos
     */
    function exportData() {
        if (!isAdmin()) {
            console.error('Acesso negado: apenas administradores');
            return null;
        }

        return {
            timestamp: new Date().toISOString(),
            votes: load(KEYS.VOTES, {}),
            voters: load(KEYS.VOTERS, {}),
            stats: getStats()
        };
    }

    /**
     * Limpa todos os votos (apenas admin)
     * @returns {boolean}
     */
    function clearVotes() {
        if (!isAdmin()) {
            console.error('Acesso negado: apenas administradores');
            return false;
        }

        remove(KEYS.VOTES);
        remove(KEYS.VOTERS);
        return true;
    }

    // API pública
    return {
        // Autenticação
        authenticate,
        getCurrentUser,
        isLoggedIn,
        isAdmin,
        logout,
        
        // Votos
        vote,
        removeVote,
        hasVotedInCategory,
        hasCompletedCategory,
        getVote,
        getUserVotes,
        getVoteCount,
        hasCompletedVoting,
        
        // Admin
        getAllVotes,
        getAllVoters,
        getResults,
        getStats,
        exportData,
        clearVotes,
        getAuthError,
        
        // Utilitários
        clearAll
    };
})();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.Storage = Storage;
}
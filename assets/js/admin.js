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

    // Estado
    let state = {
        currentView: 'results', // results, voters, settings
        autoRefresh: false,
        refreshTimer: null
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
        });
    }

    /**
     * Atualiza dados do painel
     */
    function refreshData() {
        UI.updateAdminPanel();
        UI.showToast('Dados atualizados', 'success');
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
            refreshData();
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
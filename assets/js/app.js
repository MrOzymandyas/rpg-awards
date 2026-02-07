/**
 * RPG Awards - Main Application
 * Ponto de entrada e inicialização
 */

(function() {
    'use strict';

    // Versão da aplicação
    const APP_VERSION = '1.0.0';
    const APP_NAME = 'RPG Awards';

    /**
     * Inicializa aplicação
     */
    async function init() {
        console.log(`${APP_NAME} v${APP_VERSION} - Inicializando...`);

        if (!checkLocalStorageSupport()) {
            showError('Seu navegador não suporta armazenamento local necessário para o sistema de votação.');
            return;
        }

        const loadStart = Date.now();

        // Carrega dados do Firestore
        await Storage.initFirestore();

        // Inicializa módulos
        initializeModules();

        // Configura eventos globais
        setupGlobalEvents();

        // Verifica sessão existente
        checkExistingSession();

        // Garante tempo mínimo de loading para UX
        const elapsed = Date.now() - loadStart;
        if (elapsed < 2500) {
            await new Promise(r => setTimeout(r, 2500 - elapsed));
        }

        UI.hideLoading();
        console.log(`${APP_NAME} inicializado com sucesso`);
    }

    /**
     * Verifica suporte a localStorage
     * @returns {boolean}
     */
    function checkLocalStorageSupport() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Inicializa todos os módulos
     */
    function initializeModules() {
        // UI deve ser inicializado primeiro
        if (typeof UI !== 'undefined') {
            UI.init();
            UI.setupEventListeners();
        }

        // Voting
        if (typeof Voting !== 'undefined') {
            Voting.init();
        }

        // Admin (só se necessário)
        if (typeof Admin !== 'undefined' && Storage.isAdmin()) {
            Admin.init();
        }
    }

    /**
     * Configura eventos globais
     */
    function setupGlobalEvents() {
        // Previne comportamentos indesejados
        preventUnwantedBehaviors();

        // Configura atalhos de teclado
        setupKeyboardShortcuts();

        // Configura visibilidade da página
        setupVisibilityHandling();

        // Configura tratamento de erros
        setupErrorHandling();
    }

    /**
     * Previne comportamentos indesejados
     */
    function preventUnwantedBehaviors() {
        // Previne zoom em dispositivos móveis
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });

        // Previne menu de contexto em elementos específicos
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest && e.target.closest('.nominee-image, .summary-card-image')) {
                e.preventDefault();
            }
        });
    }

    /**
     * Configura atalhos de teclado
     */
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC fecha modais
            if (e.key === 'Escape') {
                const modal = document.querySelector('.voting-modal.active');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            // Ctrl/Cmd + E exporta dados (admin)
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                if (Storage.isAdmin() && typeof Admin !== 'undefined') {
                    Admin.exportData();
                }
            }

            // Ctrl/Cmd + R atualiza dados (admin)
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                if (Storage.isAdmin() && typeof Admin !== 'undefined') {
                    e.preventDefault();
                    Admin.refreshData();
                }
            }
        });
    }

    /**
     * Configura tratamento de visibilidade da página
     */
    function setupVisibilityHandling() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Página ficou invisível
                console.log('Pausando atualizações...');
            } else {
                // Página voltou a ficar visível
                console.log('Retomando...');
                
                // Atualiza dados se necessário
                if (Storage.isLoggedIn() && !Storage.isAdmin()) {
                    UI.updateDashboard();
                }
            }
        });
    }

    /**
     * Configura tratamento de erros global
     */
    function setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Erro global:', e.error);
            
            // Não mostra erros em produção para o usuário
            // exceto erros críticos
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promessa rejeitada:', e.reason);
        });
    }

    /**
     * Verifica sessão existente
     */
    function checkExistingSession() {
        const user = Storage.getCurrentUser();
        
        if (user) {
            console.log(`Sessão existente encontrada: ${user.name}`);
            
            const loginTime = new Date(user.loginTime);
            const hoursSinceLogin = (new Date() - loginTime) / (1000 * 60 * 60);

            if (hoursSinceLogin > 24) {
                console.log('Sessão expirada');
                Storage.logout();
                return;
            }

            if (user.role === 'admin') {
                UI.showAdmin();
            } else {
                UI.showDashboard();
            }
        }
    }

    /**
     * Mostra erro crítico
     * @param {string} message - Mensagem de erro
     */
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #1a1a25;
            border: 1px solid #f87171;
            color: #f87171;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            z-index: 9999;
        `;
        errorDiv.innerHTML = `
            <h2 style="margin-bottom: 1rem; font-family: 'Cinzel', serif;">Erro</h2>
            <p style="margin-bottom: 1.5rem;">${message}</p>
            <button onclick="location.reload()" style="
                padding: 0.75rem 1.5rem;
                background: transparent;
                border: 1px solid #f87171;
                color: #f87171;
                cursor: pointer;
                font-family: 'Source Sans 3', sans-serif;
            ">Recarregar</button>
        `;
        document.body.appendChild(errorDiv);
    }

    /**
     * Registra Service Worker para PWA (opcional)
     */
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Service Worker registrado:', registration);
                })
                .catch(error => {
                    console.log('Falha ao registrar Service Worker:', error);
                });
        }
    }

    // Inicializa quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expõe API global para debug (remover em produção)
    window.RPGAwards = {
        version: APP_VERSION,
        Storage,
        UI,
        Voting,
        Admin,
        CATEGORIES,
        NOMINEES,
        PLAYERS
    };

})();
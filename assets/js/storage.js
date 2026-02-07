/**
 * RPG Awards - Storage Module
 * Firestore para persistência + cache local para performance
 */

const Storage = (function() {
    'use strict';

    // Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyAKYCq0TejCaATaTGj2GhwMBO-Zcz0Cm_0",
        authDomain: "rpg-awards.firebaseapp.com",
        projectId: "rpg-awards",
        storageBucket: "rpg-awards.firebasestorage.app",
        messagingSenderId: "560575373414",
        appId: "1:560575373414:web:48280ebf5171c807df0da7"
    });
    const db = firebase.firestore();
    const COL = 'voters';

    let currentUser = null;
    let votersCache = {};

    // ==================== FIRESTORE ====================

    async function initFirestore() {
        try {
            const snap = await db.collection(COL).get();
            snap.forEach(doc => { votersCache[doc.id] = doc.data(); });
        } catch (e) {
            console.error('Firestore init error:', e);
        }
        try {
            const saved = localStorage.getItem('rpg_awards_user');
            if (saved) currentUser = JSON.parse(saved);
        } catch (e) {}
    }

    async function refreshVoters() {
        try {
            const snap = await db.collection(COL).get();
            votersCache = {};
            snap.forEach(doc => { votersCache[doc.id] = doc.data(); });
        } catch (e) {
            console.error('Firestore refresh error:', e);
        }
    }

    function persistVoter(uid) {
        const data = votersCache[uid];
        if (data) {
            db.collection(COL).doc(uid).set(data)
                .catch(e => console.error('Firestore write error:', e));
        }
    }

    // ==================== AUTENTICAÇÃO ====================

    function authenticate(id, key) {
        const player = PLAYERS.find(p =>
            p.id.toUpperCase() === id.toUpperCase() && p.key === key
        );
        if (!player) return null;

        currentUser = {
            ...player,
            loginTime: new Date().toISOString(),
            sessionId: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            displayName: player.title || player.name,
            formalGreeting: player.greeting || 'Bem-vindo'
        };
        localStorage.setItem('rpg_awards_user', JSON.stringify(currentUser));
        return currentUser;
    }

    function getAuthError(id, key) {
        if (!id || !key) return { type: 'missing_fields', message: 'Vossa Senhoria, por favor forneça tanto o nome quanto a senha de acesso à cerimônia.' };
        const exists = PLAYERS.find(p => p.id.toUpperCase() === id.toUpperCase());
        if (!exists) return { type: 'user_not_found', message: 'Lamento, mas esse nome não consta na lista de nobres convidados para esta cerimônia.' };
        if (exists.key !== key) return { type: 'wrong_password', message: 'A senha fornecida está incorreta. Por favor, verifique suas credenciais de acesso.' };
        return { type: 'unknown', message: 'Ocorreu um erro desconhecido durante a autenticação.' };
    }

    function getCurrentUser() { return currentUser; }
    function isLoggedIn() { return !!currentUser; }
    function isAdmin() { return currentUser && currentUser.role === 'admin'; }

    function logout() {
        currentUser = null;
        localStorage.removeItem('rpg_awards_user');
    }

    // ==================== VOTOS ====================

    function vote(categoryId, nomineeId, choice) {
        if (!currentUser) return false;
        const uid = currentUser.id;

        if (!votersCache[uid]) {
            votersCache[uid] = {
                name: currentUser.name,
                title: currentUser.title || '',
                votes: {},
                firstVote: new Date().toISOString(),
                lastVote: new Date().toISOString()
            };
        }

        if (!votersCache[uid].votes[categoryId]) {
            votersCache[uid].votes[categoryId] = { firstChoice: null, secondChoice: null };
        }

        const choiceData = { nomineeId, timestamp: new Date().toISOString() };

        if (choice === 'first') {
            votersCache[uid].votes[categoryId].firstChoice = choiceData;
        } else {
            votersCache[uid].votes[categoryId].secondChoice = choiceData;
        }

        votersCache[uid].lastVote = new Date().toISOString();
        persistVoter(uid);
        return true;
    }

    function removeVote(categoryId, choice) {
        if (!currentUser) return false;
        const uid = currentUser.id;
        const voter = votersCache[uid];
        if (!voter || !voter.votes[categoryId]) return false;

        if (choice === 'first') {
            voter.votes[categoryId].firstChoice = null;
        } else {
            voter.votes[categoryId].secondChoice = null;
        }

        if (!voter.votes[categoryId].firstChoice && !voter.votes[categoryId].secondChoice) {
            delete voter.votes[categoryId];
        }

        persistVoter(uid);
        return true;
    }

    function hasCompletedCategory(categoryId) {
        const v = getVote(categoryId);
        return v && v.firstChoice && v.secondChoice;
    }

    function hasVotedInCategory(categoryId) {
        const v = getVote(categoryId);
        return v && (v.firstChoice || v.secondChoice);
    }

    function getVote(categoryId) {
        if (!currentUser) return null;
        const voter = votersCache[currentUser.id];
        return voter ? voter.votes[categoryId] || null : null;
    }

    function getUserVotes() {
        if (!currentUser) return {};
        const voter = votersCache[currentUser.id];
        return voter ? voter.votes || {} : {};
    }

    function getVoteCount() {
        return Object.values(getUserVotes()).filter(v => v && v.firstChoice && v.secondChoice).length;
    }

    function hasCompletedVoting() {
        return getVoteCount() === CATEGORIES.length;
    }

    // ==================== ADMIN ====================

    function getAllVotes() {
        if (!isAdmin()) return null;
        return votersCache;
    }

    function getAllVoters() {
        if (!isAdmin()) return null;
        return votersCache;
    }

    function getResults() {
        if (!isAdmin()) return null;
        const results = [];

        CATEGORIES.forEach(category => {
            const nominees = NOMINEES[category.id] || [];
            const nomineeResults = nominees.map(nominee => {
                let firstVotes = 0, secondVotes = 0;
                const voterIds = [];

                Object.entries(votersCache).forEach(([uid, voter]) => {
                    const v = voter.votes && voter.votes[category.id];
                    if (v && v.firstChoice && v.firstChoice.nomineeId === nominee.id) {
                        firstVotes++;
                        voterIds.push(uid);
                    }
                    if (v && v.secondChoice && v.secondChoice.nomineeId === nominee.id) {
                        secondVotes++;
                        if (!voterIds.includes(uid)) voterIds.push(uid);
                    }
                });

                return {
                    ...nominee,
                    firstVotes,
                    secondVotes,
                    score: (firstVotes * 2) + secondVotes,
                    votes: firstVotes + secondVotes,
                    voters: voterIds
                };
            });

            nomineeResults.sort((a, b) => b.score !== a.score ? b.score - a.score : b.firstVotes - a.firstVotes);

            const totalFirst = nomineeResults.reduce((s, n) => s + n.firstVotes, 0);
            const totalSecond = nomineeResults.reduce((s, n) => s + n.secondVotes, 0);

            results.push({
                category,
                nominees: nomineeResults,
                totalVotes: totalFirst + totalSecond,
                totalFirstVotes: totalFirst,
                totalSecondVotes: totalSecond
            });
        });

        return results;
    }

    function getStats() {
        if (!isAdmin()) return null;
        const totalPlayers = PLAYERS.filter(p => p.role === 'player').length;
        const votedPlayers = Object.keys(votersCache).length;

        let completedVoters = 0, totalVotes = 0;
        Object.values(votersCache).forEach(voter => {
            const votes = voter.votes || {};
            const done = Object.values(votes).filter(v => v && v.firstChoice && v.secondChoice).length;
            if (done === CATEGORIES.length) completedVoters++;
            Object.values(votes).forEach(v => {
                if (v && v.firstChoice) totalVotes++;
                if (v && v.secondChoice) totalVotes++;
            });
        });

        return {
            totalPlayers,
            votedPlayers,
            pendingPlayers: totalPlayers - votedPlayers,
            completionRate: totalPlayers > 0 ? Math.round((completedVoters / totalPlayers) * 100) : 0,
            totalVotes
        };
    }

    function exportData() {
        if (!isAdmin()) return null;
        return { timestamp: new Date().toISOString(), voters: votersCache, stats: getStats() };
    }

    function clearVotes() {
        if (!isAdmin()) return false;
        Object.keys(votersCache).forEach(uid => {
            db.collection(COL).doc(uid).delete().catch(console.error);
        });
        votersCache = {};
        return true;
    }

    function clearAll() { logout(); }

    return {
        initFirestore, refreshVoters,
        authenticate, getCurrentUser, isLoggedIn, isAdmin, logout,
        vote, removeVote, hasVotedInCategory, hasCompletedCategory,
        getVote, getUserVotes, getVoteCount, hasCompletedVoting,
        getAllVotes, getAllVoters, getResults, getStats,
        exportData, clearVotes, getAuthError, clearAll
    };
})();

if (typeof window !== 'undefined') window.Storage = Storage;

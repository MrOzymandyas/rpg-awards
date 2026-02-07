/**
 * RPG Awards - Data Module
 * Contém todos os dados estáticos do sistema
 */

// Jogadores pré-cadastrados (identificação única com títulos nobiliárquicos)
const PLAYERS = [
    { id: 'CYRIC', key: 'cyricheavymetal', name: 'Cyric', title: 'Baronesa Cyric da Casa Choronis', greeting: 'Bem-vinda, Vossa Excelência', role: 'player' },
    { id: 'RYUKW', key: 'ryukporcometal', name: 'Ryukw', title: 'Barão Dantas da Casa Abobris', greeting: 'Bem-vindo, Vossa Excelência', role: 'player' },
    { id: 'LIGAIA', key: 'ligaiagamerminecraft', name: 'Ligaia', title: 'Baronesa Ligaia da Casa Äuch\'Tismo', greeting: 'Bem-vinda, Vossa Excelência', role: 'player' },
    { id: 'DRAKX', key: 'epsteinjudaico', name: 'Drakx', title: 'Lorde Drakx da Casa Camadius', greeting: 'Bem-vindo, Vossa Senhoria', role: 'player' },
    { id: 'SHIKI', key: 'eutodeboacara', name: 'Shiki', title: 'Marquês Chico da Casa Dislecsicus', greeting: 'Bem-vindo, Vossa Excelência', role: 'player' },
    { id: 'MIDGARD', key: 'maridogostosonasuaarea', name: 'Midgard', title: 'Lorde Midnelson da Casa Maridus', greeting: 'Bem-vindo, Vossa Senhoria', role: 'player' },
    { id: 'PARTYROCK', key: 'flurryofblows', name: 'Partyrock', title: 'Rei Samuel da Casa Oportunis', greeting: 'Bem-vindo, Sua Majestade', role: 'player' },
    { id: 'JENA', key: 'jenaboy1408', name: 'Jena', title: 'Carecus Mestris', greeting: 'Bem-vindo, Mestre', role: 'player' },
    // Administrador
    { id: 'ADMIN', key: 'Ind0105bet@167847', name: 'Mestre do Jogo', title: 'Grão-Mestre da Cerimônia', greeting: 'Bem-vindo, Grão-Mestre', role: 'admin' }
];

// Categorias de votação - RPG Awards 2024
const CATEGORIES = [
    {
        id: 'melhor-npc',
        number: '1',
        title: 'Melhor NPC',
        description: 'Os amigos, aliados e inimigos que fizemos no caminho.',
        type: 'npc'
    },
    {
        id: 'melhor-aventura',
        number: '2',
        title: 'Melhor Aventura',
        description: 'As aventuras, histórias e caminhos que trilhamos juntos.',
        type: 'scene'
    },
    {
        id: 'melhor-personagem',
        number: '3',
        title: 'Melhor Personagem Jogável',
        description: 'As máscaras que vestimos para nos tornarmos mais de nós mesmos.',
        type: 'npc'
    },
    {
        id: 'melhor-sistema',
        number: '4',
        title: 'Melhor Sistema',
        description: 'Regras, regras, regras... para manter o jogo jogável.',
        type: 'quote'
    },
    {
        id: 'melhor-vilao',
        number: '5',
        title: 'Melhor Vilão',
        description: 'Os antagonistas que nos dão ódio mas também o que fazer.',
        type: 'npc'
    },
    {
        id: 'medalha-trump',
        number: '6',
        title: 'Medalha Trump de Mão Peluda',
        description: '"Como assim pedras caem e todos morrem?".',
        type: 'scene'
    },
    {
        id: 'centro-jena',
        number: '7',
        title: 'Centro Jena de Aprendizado.',
        description: 'A regra é clara...  não pode narrar antes de rolar.',
        type: 'scene'
    },
    {
        id: 'vamo-te-pegar',
        number: '8',
        title: 'Vamo Te Pegar na Curva',
        description: 'TA FUDIDO FILHO DA PUTA QUE EU VO LI PEGAR.',
        type: 'scene'
    },
    {
        id: 'dark-fantasy',
        number: '9',
        title: 'Muito Dark & Muito Fantasy',
        description: 'Ele fica no canto, observando, quieto e misterioso.',
        type: 'scene'
    },
    {
        id: 'premio-neils-bohr',
        number: '10',
        title: 'Minúsculidade Quântica',
        description: 'Quando a singularidade do balanceamento se fez presente.',
        type: 'scene'
    },
    {
        id: 'melhor-ship',
        number: '11',
        title: 'Melhor Ship',
        description: 'O melhor casal real ou fictício... Are we the gays?.',
        type: 'npc'
    },
    {
        id: 'morreu-feiao',
        number: '12',
        title: 'Morreu Feião',
        description: 'A morte mais fudida, seja feia, tosca ou brutal.',
        type: 'scene'
    },
    {
        id: 'premio-titanic',
        number: '13',
        title: 'Prêmio Titanic',
        description: 'Para o plano que parecia infalível... até afundar completamente.',
        type: 'scene'
    },
    {
        id: 'medalha-naruto',
        number: '14',
        title: 'Medalha Naruto',
        description: 'Desculpa amigo não assisto anime.',
        type: 'scene'
    },
    {
        id: 'npc-apepe',
        number: '15',
        title: 'NPC Apepé',
        description: 'O mais esquisito e claramente neurodivergente.',
        type: 'npc'
    },
    {
        id: 'npc-micao',
        number: '16',
        title: 'NPC Micão',
        description: 'Ele ta fora de posição.',
        type: 'npc'
    },
    {
        id: 'npc-estou-ajudando',
        number: '17',
        title: 'NPC Estou Ajudando',
        description: 'Aquele NPC que tentou ajudar... mas ficou na tentativa.',
        type: 'npc'
    },
    {
        id: 'colirio-capricho',
        number: '18',
        title: 'Colírio Capricho',
        description: 'Quando o personagem gosta de fica te atissano. O mais gatão.',
        type: 'scene'
    },
    {
        id: 'melhor-tilt',
        number: '19',
        title: 'Melhor Tilt',
        description: 'Aquele momento em que alguém perdeu completamente a compostura.',
        type: 'scene'
    },
    {
        id: 'pressao-baxo',
        number: '20',
        title: 'Pressão Baxo 🌶️',
        description: 'Tava altamente Spicy. CR Foda-se. Dificuldade Caveira.',
        type: 'scene'
    },
    {
        id: 'profissao-cutscene',
        number: '21',
        title: 'Profissão Cutscene',
        description: 'Só se garante sem dado. No dado não bota a cara.',
        type: 'scene'
    },
    {
        id: 'dento',
        number: '22',
        title: 'Dento',
        description: 'A npc que se cair algo no chão todo mundo fica esperando pra ver se ela pega.',
        type: 'scene'
    },
    {
        id: 'categoria-shiki',
        number: '23',
        title: 'Categoria Shiki',
        description: 'A categoria misteriosa. Apenas o Shiki sabe o que significa. Talvez nem ele.',
        type: 'scene'
    }
];

// Indicados/Nomeados por categoria (estrutura para 23 categorias)
const NOMINEES = {
    'melhor-npc': [
        { id: 'npc-1', name: 'Indicado 1', origin: 'Campanha', description: 'Descrição do indicado...', image: '' },
        { id: 'npc-2', name: 'Indicado 2', origin: 'Campanha', description: 'Descrição do indicado...', image: '' },
        { id: 'npc-3', name: 'Indicado 3', origin: 'Campanha', description: 'Descrição do indicado...', image: '' },
        { id: 'npc-4', name: 'Indicado 4', origin: 'Campanha', description: 'Descrição do indicado...', image: '' },
        { id: 'npc-5', name: 'Indicado 5', origin: 'Campanha', description: 'Descrição do indicado...', image: '' }
    ],
    'melhor-aventura': [
        { id: 'aventura-1', name: 'Aventura 1', origin: 'Arco I', description: 'Descrição da aventura...', image: '' },
        { id: 'aventura-2', name: 'Aventura 2', origin: 'Arco II', description: 'Descrição da aventura...', image: '' },
        { id: 'aventura-3', name: 'Aventura 3', origin: 'Arco III', description: 'Descrição da aventura...', image: '' },
        { id: 'aventura-4', name: 'Aventura 4', origin: 'Arco IV', description: 'Descrição da aventura...', image: '' },
        { id: 'aventura-5', name: 'Aventura 5', origin: 'Arco V', description: 'Descrição da aventura...', image: '' }
    ],
    'melhor-personagem': [
        { id: 'pc-1', name: 'Personagem 1', origin: 'Jogador 1', description: 'Descrição do personagem...', image: '' },
        { id: 'pc-2', name: 'Personagem 2', origin: 'Jogador 2', description: 'Descrição do personagem...', image: '' },
        { id: 'pc-3', name: 'Personagem 3', origin: 'Jogador 3', description: 'Descrição do personagem...', image: '' },
        { id: 'pc-4', name: 'Personagem 4', origin: 'Jogador 4', description: 'Descrição do personagem...', image: '' },
        { id: 'pc-5', name: 'Personagem 5', origin: 'Jogador 5', description: 'Descrição do personagem...', image: '' }
    ],
    'melhor-sistema': [
        { id: 'sistema-1', name: 'Sistema 1', origin: 'Homebrew', description: 'Descrição do sistema...', image: '' },
        { id: 'sistema-2', name: 'Sistema 2', origin: 'Homebrew', description: 'Descrição do sistema...', image: '' },
        { id: 'sistema-3', name: 'Sistema 3', origin: 'Homebrew', description: 'Descrição do sistema...', image: '' },
        { id: 'sistema-4', name: 'Sistema 4', origin: 'Homebrew', description: 'Descrição do sistema...', image: '' },
        { id: 'sistema-5', name: 'Sistema 5', origin: 'Homebrew', description: 'Descrição do sistema...', image: '' }
    ],
    'melhor-vilao': [
        { id: 'vilao-1', name: 'Vilão 1', origin: 'Campanha', description: 'Descrição do vilão...', image: '' },
        { id: 'vilao-2', name: 'Vilão 2', origin: 'Campanha', description: 'Descrição do vilão...', image: '' },
        { id: 'vilao-3', name: 'Vilão 3', origin: 'Campanha', description: 'Descrição do vilão...', image: '' },
        { id: 'vilao-4', name: 'Vilão 4', origin: 'Campanha', description: 'Descrição do vilão...', image: '' },
        { id: 'vilao-5', name: 'Vilão 5', origin: 'Campanha', description: 'Descrição do vilão...', image: '' }
    ],
    'medalha-trump': [
        { id: 'trump-1', name: 'Momento 1', origin: 'Sessão X', description: 'Descrição do momento...', image: '' },
        { id: 'trump-2', name: 'Momento 2', origin: 'Sessão Y', description: 'Descrição do momento...', image: '' },
        { id: 'trump-3', name: 'Momento 3', origin: 'Sessão Z', description: 'Descrição do momento...', image: '' },
        { id: 'trump-4', name: 'Momento 4', origin: 'Sessão W', description: 'Descrição do momento...', image: '' },
        { id: 'trump-5', name: 'Momento 5', origin: 'Sessão V', description: 'Descrição do momento...', image: '' }
    ],
    'centro-jena': [
        { id: 'jena-1', name: 'Lição 1', origin: 'Sessão', description: 'Descrição da lição aprendida...', image: '' },
        { id: 'jena-2', name: 'Lição 2', origin: 'Sessão', description: 'Descrição da lição aprendida...', image: '' },
        { id: 'jena-3', name: 'Lição 3', origin: 'Sessão', description: 'Descrição da lição aprendida...', image: '' },
        { id: 'jena-4', name: 'Lição 4', origin: 'Sessão', description: 'Descrição da lição aprendida...', image: '' },
        { id: 'jena-5', name: 'Lição 5', origin: 'Sessão', description: 'Descrição da lição aprendida...', image: '' }
    ],
    'vamo-te-pegar': [
        { id: 'curva-1', name: 'Plot Twist 1', origin: 'Arco', description: 'Descrição do plot twist...', image: '' },
        { id: 'curva-2', name: 'Plot Twist 2', origin: 'Arco', description: 'Descrição do plot twist...', image: '' },
        { id: 'curva-3', name: 'Plot Twist 3', origin: 'Arco', description: 'Descrição do plot twist...', image: '' },
        { id: 'curva-4', name: 'Plot Twist 4', origin: 'Arco', description: 'Descrição do plot twist...', image: '' },
        { id: 'curva-5', name: 'Plot Twist 5', origin: 'Arco', description: 'Descrição do plot twist...', image: '' }
    ],
    'dark-fantasy': [
        { id: 'dark-1', name: 'Momento 1', origin: 'Sessão', description: 'Descrição do momento dark...', image: '' },
        { id: 'dark-2', name: 'Momento 2', origin: 'Sessão', description: 'Descrição do momento dark...', image: '' },
        { id: 'dark-3', name: 'Momento 3', origin: 'Sessão', description: 'Descrição do momento dark...', image: '' },
        { id: 'dark-4', name: 'Momento 4', origin: 'Sessão', description: 'Descrição do momento dark...', image: '' },
        { id: 'dark-5', name: 'Momento 5', origin: 'Sessão', description: 'Descrição do momento dark...', image: '' }
    ],
    'premio-neils-bohr': [
        { id: 'bohr-1', name: 'Detalhe 1', origin: 'Campanha', description: 'Descrição do detalhe...', image: '' },
        { id: 'bohr-2', name: 'Detalhe 2', origin: 'Campanha', description: 'Descrição do detalhe...', image: '' },
        { id: 'bohr-3', name: 'Detalhe 3', origin: 'Campanha', description: 'Descrição do detalhe...', image: '' },
        { id: 'bohr-4', name: 'Detalhe 4', origin: 'Campanha', description: 'Descrição do detalhe...', image: '' },
        { id: 'bohr-5', name: 'Detalhe 5', origin: 'Campanha', description: 'Descrição do detalhe...', image: '' }
    ],
    'melhor-ship': [
        { id: 'ship-1', name: 'Ship 1', origin: 'Campanha', description: 'Descrição do ship...', image: '' },
        { id: 'ship-2', name: 'Ship 2', origin: 'Campanha', description: 'Descrição do ship...', image: '' },
        { id: 'ship-3', name: 'Ship 3', origin: 'Campanha', description: 'Descrição do ship...', image: '' },
        { id: 'ship-4', name: 'Ship 4', origin: 'Campanha', description: 'Descrição do ship...', image: '' },
        { id: 'ship-5', name: 'Ship 5', origin: 'Campanha', description: 'Descrição do ship...', image: '' }
    ],
    'morreu-feiao': [
        { id: 'morte-1', name: 'Morte 1', origin: 'Sessão', description: 'Descrição da morte...', image: '' },
        { id: 'morte-2', name: 'Morte 2', origin: 'Sessão', description: 'Descrição da morte...', image: '' },
        { id: 'morte-3', name: 'Morte 3', origin: 'Sessão', description: 'Descrição da morte...', image: '' },
        { id: 'morte-4', name: 'Morte 4', origin: 'Sessão', description: 'Descrição da morte...', image: '' },
        { id: 'morte-5', name: 'Morte 5', origin: 'Sessão', description: 'Descrição da morte...', image: '' }
    ],
    'premio-titanic': [
        { id: 'titanic-1', name: 'Plano 1', origin: 'Sessão', description: 'Descrição do plano...', image: '' },
        { id: 'titanic-2', name: 'Plano 2', origin: 'Sessão', description: 'Descrição do plano...', image: '' },
        { id: 'titanic-3', name: 'Plano 3', origin: 'Sessão', description: 'Descrição do plano...', image: '' },
        { id: 'titanic-4', name: 'Plano 4', origin: 'Sessão', description: 'Descrição do plano...', image: '' },
        { id: 'titanic-5', name: 'Plano 5', origin: 'Sessão', description: 'Descrição do plano...', image: '' }
    ],
    'medalha-naruto': [
        { id: 'naruto-1', name: 'Momento 1', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'naruto-2', name: 'Momento 2', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'naruto-3', name: 'Momento 3', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'naruto-4', name: 'Momento 4', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'naruto-5', name: 'Momento 5', origin: 'Sessão', description: 'Descrição do momento...', image: '' }
    ],
    'npc-apepe': [
        { id: 'apepe-1', name: 'NPC Fofo 1', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'apepe-2', name: 'NPC Fofo 2', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'apepe-3', name: 'NPC Fofo 3', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'apepe-4', name: 'NPC Fofo 4', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'apepe-5', name: 'NPC Fofo 5', origin: 'Campanha', description: 'Descrição do NPC...', image: '' }
    ],
    'npc-micao': [
        { id: 'micao-1', name: 'NPC Gato 1', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'micao-2', name: 'NPC Gato 2', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'micao-3', name: 'NPC Gato 3', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'micao-4', name: 'NPC Gato 4', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'micao-5', name: 'NPC Gato 5', origin: 'Campanha', description: 'Descrição do NPC...', image: '' }
    ],
    'npc-estou-ajudando': [
        { id: 'ajudando-1', name: 'NPC Ajuda 1', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'ajudando-2', name: 'NPC Ajuda 2', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'ajudando-3', name: 'NPC Ajuda 3', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'ajudando-4', name: 'NPC Ajuda 4', origin: 'Campanha', description: 'Descrição do NPC...', image: '' },
        { id: 'ajudando-5', name: 'NPC Ajuda 5', origin: 'Campanha', description: 'Descrição do NPC...', image: '' }
    ],
    'colirio-capricho': [
        { id: 'colirio-1', name: 'Momento 1', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'colirio-2', name: 'Momento 2', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'colirio-3', name: 'Momento 3', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'colirio-4', name: 'Momento 4', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'colirio-5', name: 'Momento 5', origin: 'Sessão', description: 'Descrição do momento...', image: '' }
    ],
    'melhor-tilt': [
        { id: 'tilt-1', name: 'Tilt 1', origin: 'Sessão', description: 'Descrição do tilt...', image: '' },
        { id: 'tilt-2', name: 'Tilt 2', origin: 'Sessão', description: 'Descrição do tilt...', image: '' },
        { id: 'tilt-3', name: 'Tilt 3', origin: 'Sessão', description: 'Descrição do tilt...', image: '' },
        { id: 'tilt-4', name: 'Tilt 4', origin: 'Sessão', description: 'Descrição do tilt...', image: '' },
        { id: 'tilt-5', name: 'Tilt 5', origin: 'Sessão', description: 'Descrição do tilt...', image: '' }
    ],
    'pressao-baxo': [
        { id: 'pressao-1', name: 'Cena 1', origin: 'Sessão', description: 'Descrição da cena...', image: '' },
        { id: 'pressao-2', name: 'Cena 2', origin: 'Sessão', description: 'Descrição da cena...', image: '' },
        { id: 'pressao-3', name: 'Cena 3', origin: 'Sessão', description: 'Descrição da cena...', image: '' },
        { id: 'pressao-4', name: 'Cena 4', origin: 'Sessão', description: 'Descrição da cena...', image: '' },
        { id: 'pressao-5', name: 'Cena 5', origin: 'Sessão', description: 'Descrição da cena...', image: '' }
    ],
    'profissao-cutscene': [
        { id: 'cutscene-1', name: 'Cutscene 1', origin: 'Sessão', description: 'Descrição da cutscene...', image: '' },
        { id: 'cutscene-2', name: 'Cutscene 2', origin: 'Sessão', description: 'Descrição da cutscene...', image: '' },
        { id: 'cutscene-3', name: 'Cutscene 3', origin: 'Sessão', description: 'Descrição da cutscene...', image: '' },
        { id: 'cutscene-4', name: 'Cutscene 4', origin: 'Sessão', description: 'Descrição da cutscene...', image: '' },
        { id: 'cutscene-5', name: 'Cutscene 5', origin: 'Sessão', description: 'Descrição da cutscene...', image: '' }
    ],
    'dento': [
        { id: 'dento-1', name: 'Momento 1', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'dento-2', name: 'Momento 2', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'dento-3', name: 'Momento 3', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'dento-4', name: 'Momento 4', origin: 'Sessão', description: 'Descrição do momento...', image: '' },
        { id: 'dento-5', name: 'Momento 5', origin: 'Sessão', description: 'Descrição do momento...', image: '' }
    ],
    'categoria-shiki': [
        { id: 'shiki-1', name: 'Mistério 1', origin: '???', description: 'Apenas Shiki sabe...', image: '' },
        { id: 'shiki-2', name: 'Mistério 2', origin: '???', description: 'Apenas Shiki sabe...', image: '' },
        { id: 'shiki-3', name: 'Mistério 3', origin: '???', description: 'Apenas Shiki sabe...', image: '' },
        { id: 'shiki-4', name: 'Mistério 4', origin: '???', description: 'Apenas Shiki sabe...', image: '' },
        { id: 'shiki-5', name: 'Mistério 5', origin: '???', description: 'Apenas Shiki sabe...', image: '' }
    ]
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PLAYERS = PLAYERS;
    window.CATEGORIES = CATEGORIES;
    window.NOMINEES = NOMINEES;
}
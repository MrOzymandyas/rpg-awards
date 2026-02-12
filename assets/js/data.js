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

// Categorias de votacao - RPG Awards 2025
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
        description: 'As aventuras, historias e caminhos que trilhamos juntos.',
        type: 'scene'
    },
    {
        id: 'melhor-personagem',
        number: '3',
        title: 'Melhor Personagem Jogavel',
        description: 'As mascaras que vestimos para nos tornarmos mais de nos mesmos.',
        type: 'npc'
    },
    {
        id: 'melhor-vilao',
        number: '4',
        title: 'Melhor Vilao',
        description: 'Os antagonistas que nos dao odio mas tambem o que fazer.',
        type: 'npc'
    },
    {
        id: 'medalha-trump',
        number: '5',
        title: 'Medalha Trump de Mao Peluda',
        description: '"Como assim pedras caem e todos morrem?".',
        type: 'scene'
    },
    {
        id: 'vamo-te-pegar',
        number: '6',
        title: 'Vamo Te Pegar na Curva',
        description: 'Ta fudido, filho da puta, que eu vo li pegar.',
        type: 'scene'
    },
    {
        id: 'dark-fantasy',
        number: '7',
        title: 'Muito Dark & Muito Fantasy',
        description: 'Ele fica no canto, observando, quieto e misterioso.',
        type: 'npc'
    },
    {
        id: 'premio-neils-bohr',
        number: '8',
        title: 'Premio Neils Bohr de Minusculidade Quantica',
        description: 'Quando a singularidade do balanceamento se fez presente.',
        type: 'scene'
    },
    {
        id: 'melhor-ship',
        number: '9',
        title: 'Melhor Ship',
        description: 'O melhor casal real ou ficticio.',
        type: 'npc'
    },
    {
        id: 'morreu-feiao',
        number: '10',
        title: 'Morreu Feiao',
        description: 'A morte mais feia, tosca ou brutal.',
        type: 'scene'
    },
    {
        id: 'premio-titanic',
        number: '11',
        title: 'Premio Titanic',
        description: 'Para o plano que parecia infalivel... ate afundar completamente.',
        type: 'scene'
    },
    {
        id: 'medalha-naruto',
        number: '12',
        title: 'Naruto',
        description: 'Naruto.',
        type: 'scene'
    },
    {
        id: 'npc-apepe',
        number: '13',
        title: 'NPC Apepe',
        description: 'O mais esquisito e claramente neurodivergente.',
        type: 'npc'
    },
    {
        id: 'npc-micao',
        number: '14',
        title: 'NPC Micao',
        description: 'Ele esta fora de posicao.',
        type: 'npc'
    },
    {
        id: 'npc-estou-ajudando',
        number: '15',
        title: 'NPC Estou Ajudando',
        description: 'Aquele NPC que tentou ajudar... mas ficou na tentativa.',
        type: 'npc'
    },
    {
        id: 'colirio-capricho',
        number: '16',
        title: 'Colirio Capricho',
        description: 'O mais tesudo, mas sem ser adolescente.',
        type: 'scene'
    },
    {
        id: 'melhor-tilt',
        number: '17',
        title: 'Melhor Tilt',
        description: 'Aquele momento em que alguem perdeu completamente a compostura.',
        type: 'scene'
    },
    {
        id: 'pressao-baxo',
        number: '18',
        title: 'Pressao Baxo',
        description: 'Tava muito spicy.',
        type: 'scene'
    },
    {
        id: 'dento',
        number: '19',
        title: 'Dento',
        description: 'A mais dento de todas.',
        type: 'scene'
    },
    {
        id: 'categoria-shiki',
        number: '20',
        title: 'Categoria Shiki',
        description: 'A categoria misteriosa. Apenas o Shiki sabe o que significa. Talvez nem ele.',
        type: 'scene'
    }
];

// Indicados/Nomeados por categoria (estrutura para 20 categorias)
const NOMINEES = {
    'melhor-npc': [
        { id: 'npc-essek', name: 'Essek', origin: 'Melhor NPC', description: 'O Mão Negra', image: 'assets/images/nominees/melhor-npc/essek.webp' },
        { id: 'npc-mako', name: 'Mako', origin: 'Melhor NPC', description: 'O Rei Eterno', image: 'assets/images/nominees/melhor-npc/mako.png' },
        { id: 'npc-fuligem', name: 'Fuligem', origin: 'Melhor NPC', description: 'Capitão do Sussuro', image: 'assets/images/nominees/melhor-npc/fuligem.png' },
        { id: 'npc-kadan', name: 'Kadan', origin: 'Melhor NPC', description: 'O Terror Noturno', image: 'assets/images/nominees/melhor-npc/kadan.png' },
        { id: 'npc-cesar', name: 'Cesar', origin: 'Melhor NPC', description: 'Irmão do Irmão do César', image: 'assets/images/nominees/melhor-npc/cesar.png' }
    ],
    'melhor-aventura': [
        { id: 'aventura-a-corrente-a-ferida-de-burok', name: 'A Corrente', origin: 'Melhor Aventura', description: 'A Ferida de Burok', image: 'assets/images/nominees/melhor-aventura/a-corrente-a-ferida-de-burok.jpg' },
        { id: 'aventura-taldorei-a-coroa-de-cinzas', name: 'Tal\'Dorei', origin: 'Melhor Aventura', description: 'A Coroa de Cinzas', image: 'assets/images/nominees/melhor-aventura/taldorei-a-coroa-de-cinzas.jpg' },
        { id: 'aventura-wildemount-hic-irrumabus', name: 'Wildemount', origin: 'Melhor Aventura', description: 'Hic Irrumabus', image: 'assets/images/nominees/melhor-aventura/wildemount-hic-irrumabus.jpg' },
        { id: 'aventura-theladil-o-trono-vazio', name: 'Theladil', origin: 'Melhor Aventura', description: 'O Trono Vazio', image: 'assets/images/nominees/melhor-aventura/theladil-o-trono-vazio.jpg' },
        { id: 'aventura-laegar-o-circulo-dourado', name: 'Laegar', origin: 'Melhor Aventura', description: 'O Circulo Dourado', image: 'assets/images/nominees/melhor-aventura/laegar-o-circulo-dourado.jpg' }
    ],
    'melhor-personagem': [
        { id: 'personagem-hukil', name: 'Hukil', origin: 'Melhor Personagem Jogavel', description: 'Olho de Sangue', image: 'assets/images/nominees/melhor-personagem/hukil.jpg' },
        { id: 'personagem-evesto', name: 'Evesto', origin: 'Melhor Personagem Jogavel', description: 'Vigário da Excelência', image: 'assets/images/nominees/melhor-personagem/evesto.jpg' },
        { id: 'personagem-urrax', name: 'Urrax', origin: 'Melhor Personagem Jogavel', description: 'O Antrácito', image: 'assets/images/nominees/melhor-personagem/urrax.jpg' },
        { id: 'personagem-amon', name: 'Amon', origin: 'Melhor Personagem Jogavel', description: 'O Dragão de Areia', image: 'assets/images/nominees/melhor-personagem/amon.jpg' },
        { id: 'personagem-marvin', name: 'Marvin', origin: 'Melhor Personagem Jogavel', description: 'Canário de Mil Olhos', image: 'assets/images/nominees/melhor-personagem/marvin.jpg' }
    ],
    'melhor-vilao': [
        { id: 'vilao-boris-tevinta', name: 'Boris Tevinta', origin: 'Melhor Vilao', description: 'O Lupino', image: 'assets/images/nominees/melhor-vilao/boris-tevinta.jpg' },
        { id: 'vilao-lazmyr-draveth', name: 'Lazmyr Draveth', origin: 'Melhor Vilao', description: 'O Injustiçado', image: 'assets/images/nominees/melhor-vilao/lazmyr-draveth.jpg' },
        { id: 'vilao-fenleriel', name: 'Fenleriel', origin: 'Melhor Vilao', description: 'O Arruinado', image: 'assets/images/nominees/melhor-vilao/fenleriel.jpg' },
        { id: 'vilao-axiom', name: 'Axiom', origin: 'Melhor Vilao', description: 'Palavra Irredutível', image: 'assets/images/nominees/melhor-vilao/axiom.jpg' },
        { id: 'vilao-irvidit', name: 'Irvidit', origin: 'Melhor Vilao', description: 'O Arauto do Amanhã', image: 'assets/images/nominees/melhor-vilao/irvidit.jpg' }
    ],
    'medalha-trump': [
        { id: 'trump-macaco-monster-hunter', name: 'Macaco Akuma', origin: 'Mao Peluda', description: 'Agora ele vai rolar iniciativa...', image: 'assets/images/nominees/medalha-trump/macaco-monster-hunter.jpg' },
        { id: 'trump-plot-o-cavalo', name: 'Plot', origin: 'Mao Peluda', description: 'O Cavalo Quantico Não-Newtoniano', image: 'assets/images/nominees/medalha-trump/plot-o-cavalo.jpg' },
        { id: 'trump-adaga-sniper', name: 'Adaga Sniper', origin: 'Mao Peluda', description: 'Perfeita para o Combate', image: 'assets/images/nominees/medalha-trump/adaga-sniper.jpg' },
        { id: 'trump-drakx-jackie-chan', name: 'Montaria', origin: 'Mao Peluda', description: 'Sim ela corre, ataca e cura', image: 'assets/images/nominees/medalha-trump/drakx-jackie-chan.jpg' },
        { id: 'trump-votacoes-do-grupo', name: 'Enquetes', origin: 'Mao Peluda', description: 'Todo voto é Nulo', image: 'assets/images/nominees/medalha-trump/votacoes-do-grupo.jpg' }
    ],
    'vamo-te-pegar': [
        { id: 'curva-ioanna-santorini', name: 'Ioanna Santorini', origin: 'Vamo Te Pegar na Curva', description: 'Pra variar é imortal', image: 'assets/images/nominees/vamo-te-pegar/ioanna-santorini.jpg' },
        { id: 'curva-alustini', name: 'Alustini', origin: 'Vamo Te Pegar na Curva', description: 'Esse deu prazer', image: 'assets/images/nominees/vamo-te-pegar/alustini.jpg' },
        { id: 'curva-matrona-dos-corvos', name: 'Matrona dos Corvos', origin: 'Vamo Te Pegar na Curva', description: 'Aqui é tropa do Emílio', image: 'assets/images/nominees/vamo-te-pegar/matrona-dos-corvos.jpg' },
        { id: 'curva-oliver', name: 'Oliver', origin: 'Vamo Te Pegar na Curva', description: 'RIP Palitinho', image: 'assets/images/nominees/vamo-te-pegar/oliver.jpg' },
        { id: 'curva-alanis-leophine', name: 'Alanis Leophine', origin: 'Vamo Te Pegar na Curva', description: 'Vai ter volta', image: 'assets/images/nominees/vamo-te-pegar/alanis-leophine.jpg' }
    ],
    'dark-fantasy': [
        { id: 'dark-lazmyr-draveth', name: 'Lazmyr Draveth', origin: 'Dark Fantasy', description: 'Pintou as unha já sabe', image: 'assets/images/nominees/dark-fantasy/lazmyr-draveth.jpg' },
        { id: 'dark-deckard', name: 'Deckard', origin: 'Dark Fantasy', description: 'Eu sou só um cozinheiro...', image: 'assets/images/nominees/dark-fantasy/deckard.jpg' },
        { id: 'dark-khaine', name: 'Khaine', origin: 'Dark Fantasy', description: 'Onde estão meus modos...', image: 'assets/images/nominees/dark-fantasy/khaine.jpg' },
        { id: 'dark-geryon', name: 'Geryon', origin: 'Dark Fantasy', description: 'Você está errado', image: 'assets/images/nominees/dark-fantasy/geryon.jpg' },
        { id: 'dark-irvidit', name: 'Irvidit', origin: 'Dark Fantasy', description: 'Card Game de defunto', image: 'assets/images/nominees/dark-fantasy/irvidit.jpg' }
    ],
    'premio-neils-bohr': [
        { id: 'bohr-kali', name: 'Kali', origin: 'Minusculidade Quantica', description: 'Jena eu quero', image: 'assets/images/nominees/premio-neils-bohr/kali.jpg' },
        { id: 'bohr-hukil', name: 'Hukil', origin: 'Minusculidade Quantica', description: 'Tenho até musica fih', image: 'assets/images/nominees/premio-neils-bohr/hukil.jpg' },
        { id: 'bohr-hanatashi', name: 'Hanatashi', origin: 'Minusculidade Quantica', description: 'Calma, ainda tenho 2 ações.', image: 'assets/images/nominees/premio-neils-bohr/hanatashi.jpg' },
        { id: 'bohr-evesto', name: 'Evesto', origin: 'Minusculidade Quantica', description: 'Criador do Combate Wi-Fi', image: 'assets/images/nominees/premio-neils-bohr/evesto.jpg' },
        { id: 'bohr-groon', name: 'Groon', origin: 'Minusculidade Quantica', description: 'De onde vem sua força?', image: 'assets/images/nominees/premio-neils-bohr/groon.jpg' }
    ],
    'melhor-ship': [
        { id: 'ship-amon-deimos', name: 'Amon & Deimos', origin: 'Melhor Ship', description: 'Obrigado pelo... Cajadão.', image: 'assets/images/nominees/melhor-ship/amon-deimos.jpg' },
        { id: 'ship-andrei-geryon', name: 'Andrei & Geryon', origin: 'Melhor Ship', description: 'Vai amassar quem com esse revolver?', image: 'assets/images/nominees/melhor-ship/andrei-geryon.jpg' },
        { id: 'ship-fenleriel-academia', name: 'Fenleriel & Dono da Academia', origin: 'Melhor Ship', description: 'Me ajuda com esse supino...', image: 'assets/images/nominees/melhor-ship/fenleriel-dono-da-academia.jpg' },
        { id: 'ship-bertrand-ludinus', name: 'Bertrand & Ludinus', origin: 'Melhor Ship', description: 'Ayaya... Meu rei.', image: 'assets/images/nominees/melhor-ship/bertrand-ludinus.jpg' },
        { id: 'ship-khaine-evesto', name: 'Khaine & Evesto', origin: 'Melhor Ship', description: 'Ja te mostrei... O Anel?', image: 'assets/images/nominees/melhor-ship/khaine-evesto.jpg' }
    ],
    'morreu-feiao': [
        { id: 'morte-fanatico', name: 'Fanatico', origin: 'Morreu Feiao', description: 'Morri.', image: 'assets/images/nominees/morreu-feiao/fanatico.jpg' },
        { id: 'morte-deimos', name: 'Deimos', origin: 'Morreu Feiao', description: 'Inacreditavel', image: 'assets/images/nominees/morreu-feiao/deimos.jpg' },
        { id: 'morte-kethos', name: 'Kethos', origin: 'Morreu Feiao', description: 'Nem jogou', image: 'assets/images/nominees/morreu-feiao/kethos.jpg' },
        { id: 'morte-alustini', name: 'Alustini', origin: 'Morreu Feiao', description: 'Mamou pra porta fechada', image: 'assets/images/nominees/morreu-feiao/alustini.jpg' },
        { id: 'morte-eodwulf', name: 'Eodwulf', origin: 'Morreu Feiao', description: 'Amon saiu do grupo', image: 'assets/images/nominees/morreu-feiao/eodwulf.jpg' }
    ],
    'premio-titanic': [
        { id: 'titanic-cemiterio-theladil', name: 'Cemiterio de Theladil', origin: 'Titanic', description: 'Maior clima de enterro', image: 'assets/images/nominees/premio-titanic/cemiterio-theladil.jpg' },
        { id: 'titanic-twig-blights-farol', name: 'Twig Blights no Farol', origin: 'Titanic', description: 'Todo mundo pegou no meu pau', image: 'assets/images/nominees/premio-titanic/twig-blights-no-farol.jpg' },
        { id: 'titanic-marvin-zadash', name: 'Marvin em Zadash', origin: 'Titanic', description: 'Toma aqui pra você lembrar de mim...', image: 'assets/images/nominees/premio-titanic/marvin-em-zadash.jpg' },
        { id: 'titanic-buraco-do-fedor', name: 'Buraco do Fedor', origin: 'Titanic', description: 'Tem que ser homem.', image: 'assets/images/nominees/premio-titanic/buraco-do-fedor.jpg' },
        { id: 'titanic-magni-anakin', name: 'Magni e o Anakin', origin: 'Titanic', description: 'Assim tipo o anakin sabe?.', image: 'assets/images/nominees/premio-titanic/magni-pedindo-o-anakin.jpg' }
    ],
    'medalha-naruto': [
        { id: 'naruto-ludinus', name: 'Ludinus', origin: 'Naruto', description: 'Destruir a Lua pra não virar alcóolatra', image: 'assets/images/nominees/medalha-naruto/ludinus.jpg' },
        { id: 'naruto-kali', name: 'Kali', origin: 'Naruto', description: 'Kaioken pra vencer purrinha', image: 'assets/images/nominees/medalha-naruto/kali.jpg' },
        { id: 'naruto-groon', name: 'Groon', origin: 'Naruto', description: 'Cala a boca todo mundo', image: 'assets/images/nominees/medalha-naruto/groon.jpg' },
        { id: 'naruto-axiom', name: 'Axiom', origin: 'Naruto', description: 'Quem é o mais forte?', image: 'assets/images/nominees/medalha-naruto/axiom.jpg' },
        { id: 'naruto-', name: 'Hukil', origin: 'Naruto', description: 'OUÇAM-ME TODOS', image: 'assets/images/nominees/medalha-naruto/magni.jpg' }
    ],
    'npc-apepe': [
        { id: 'apepe-bicho-pau', name: 'Bicho-Pau', origin: 'NPC Apepe', description: 'CARALHOOOOOW.', image: 'assets/images/nominees/npc-apepe/bicho-pau.jpg' },
        { id: 'apepe-carnica', name: 'Carnica', origin: 'NPC Apepe', description: 'Carroça de VIADOS', image: 'assets/images/nominees/npc-apepe/carnica.jpg' },
        { id: 'apepe-mustafa', name: 'Mustafa', origin: 'NPC Apepe', description: 'Eu volto depois', image: 'assets/images/nominees/npc-apepe/mustafa.jpg' },
        { id: 'apepe-coletor-impostos', name: 'Coletor de Impostos', origin: 'NPC Apepe', description: 'TEMKI PAGA OK', image: 'assets/images/nominees/npc-apepe/coletor-de-impostos.jpg' },
        { id: 'apepe-andrei', name: 'Andrei', origin: 'NPC Apepe', description: 'Este sujeito da o cu com altissima proficiencia', image: 'assets/images/nominees/npc-apepe/andrei.jpg' }
    ],
    'npc-micao': [
        { id: 'micao-galsariad', name: 'Galsariad', origin: 'NPC Micao', description: 'FAZ ALGUMA COISA INUTIL', image: 'assets/images/nominees/npc-micao/galsariad.jpg' },
        { id: 'micao-saleem', name: 'Saleem', origin: 'NPC Micao', description: 'Saleem Muleke', image: 'assets/images/nominees/npc-micao/saleem.jpg' },
        { id: 'micao-sabugson', name: 'Sabugson', origin: 'NPC Micao', description: 'Pra abandonar filha eu sou bom', image: 'assets/images/nominees/npc-micao/sabugson.jpg' },
        { id: 'micao-nanael', name: 'Nanael', origin: 'NPC Micao', description: '🥰🥰🥰🥰🥰', image: 'assets/images/nominees/npc-micao/nanael.jpg' },
        { id: 'micao-fjord', name: 'Fjord', origin: 'NPC Micao', description: 'Cara... Eu sou muito foda.', image: 'assets/images/nominees/npc-micao/fjord.jpg' }
    ],
    'npc-estou-ajudando': [
        { id: 'ajudando-galsariad', name: 'Galsariad', origin: 'NPC Estou Ajudando', description: 'Insira aqui comentário desnecessario', image: 'assets/images/nominees/npc-estou-ajudando/galsariad.jpg' },
        { id: 'ajudando-kadan', name: 'Kadan', origin: 'NPC Estou Ajudando', description: 'Mas quem disse que eu quero ajudar?', image: 'assets/images/nominees/npc-estou-ajudando/kadan.jpg' },
        { id: 'ajudando-andrei', name: 'Andrei', origin: 'NPC Estou Ajudando', description: 'Não tem jeito vamos ter que comer terra', image: 'assets/images/nominees/npc-estou-ajudando/andrei.jpg' },
        { id: 'ajudando-fjord', name: 'Fjord', origin: 'NPC Estou Ajudando', description: 'Tipo... Realmente muito foda.', image: 'assets/images/nominees/npc-estou-ajudando/fjord.jpg' },
        { id: 'ajudando-nanael', name: 'Nanael', origin: 'NPC Estou Ajudando', description: '🥰🥰🥰 Oiiiii 🥰🥰🥰', image: 'assets/images/nominees/npc-estou-ajudando/nanael.jpg' }
    ],
    'colirio-capricho': [
        { id: 'colirio-lindao', name: 'Lindao', origin: 'Colirio Capricho', description: 'Diclupa', image: 'assets/images/nominees/colirio-capricho/lindao.jpg' },
        { id: 'colirio-essek', name: 'Essek', origin: 'Colirio Capricho', description: 'Não é creme, é pouca exposição ao sol.', image: 'assets/images/nominees/colirio-capricho/essek.jpg' },
        { id: 'colirio-cesar-thrune', name: 'Cesar Thrune', origin: 'Colirio Capricho', description: 'Um macho de verdade', image: 'assets/images/nominees/colirio-capricho/cesar-thrune.jpg' },
        { id: 'colirio-ihmotep', name: 'Ihmotep', origin: 'Colirio Capricho', description: 'Meu estilista era um diabo', image: 'assets/images/nominees/colirio-capricho/ihmotep.jpg' },
        { id: 'colirio-amon', name: 'Amon', origin: 'Colirio Capricho', description: 'Bem... meu estilista é um diabo.', image: 'assets/images/nominees/colirio-capricho/amon.jpg' }
    ],
    'melhor-tilt': [
        { id: 'tilt-jena', name: 'Jena', origin: 'Estupefied 1', description: 'Stupefied 1', image: 'assets/images/nominees/melhor-tilt/jena.jpg' },
        { id: 'tilt-ryuk', name: 'Ryuk', origin: 'Erros Punidos', description: 'Todo erro é punido', image: 'assets/images/nominees/melhor-tilt/ryuk.jpg' },
        { id: 'tilt-midgard', name: 'Midgard', origin: 'Rubinho', description: 'Aventura que vem eu chego aí', image: 'assets/images/nominees/melhor-tilt/midgard.jpg' },
        { id: 'tilt-shiki', name: 'Shiki', origin: 'Matador de Petista', description: 'RELA NA CARROÇA PETISTAS', image: 'assets/images/nominees/melhor-tilt/shiki.jpg' },
        { id: 'tilt-drakx', name: 'Drakx', origin: 'Nao ta Medieval', description: 'Minha familia bebe chumbo', image: 'assets/images/nominees/melhor-tilt/drakx.jpg' }
    ],
    'pressao-baxo': [
        { id: 'pressao-dragao-de-otari', name: 'Dragao de Otari', origin: 'Pressao Baxo', description: 'Achadores de Caminho', image: 'assets/images/nominees/pressao-baxo/dragao-de-otari.jpg' },
        { id: 'pressao-cemiterio-theladil', name: 'Cemiterio de Shindu\'ryarin', origin: 'Pressao Baxo', description: 'Reflexo Arcano', image: 'assets/images/nominees/pressao-baxo/cemiterio-theladil.jpg' },
        { id: 'pressao-dragao-mumia', name: 'O Dragao Mumia', origin: 'Pressao Baxo', description: 'Leagar', image: 'assets/images/nominees/pressao-baxo/dragao-mumia.jpg' },
        { id: 'pressao-o-fanatico', name: 'O Fanatico', origin: 'Pressao Baxo', description: 'Maldição das Ilhas Swavain', image: 'assets/images/nominees/pressao-baxo/o-fanatico.jpg' },
        { id: 'pressao-axiom-dragao', name: 'Axiom Dragao', origin: 'Pressao Baxo', description: 'Hic Irrumabus', image: 'assets/images/nominees/pressao-baxo/axiom-dragao.jpg' }
    ],
    'dento': [
        { id: 'dento-suria-dwendal', name: 'Suria Dwendal', origin: 'Dento', description: 'Não podem ver uma casada', image: 'assets/images/nominees/dento/suria-dwendal.jpg' },
        { id: 'dento-lannathia', name: 'Lannathia', origin: 'Dento', description: 'Nem com guindaste pra me tirar de dentro', image: 'assets/images/nominees/dento/lannathia.jpg' },
        { id: 'dento-vess', name: 'Vess', origin: 'Dento', description: 'Ganhar Iphone nunca foi tão facil', image: 'assets/images/nominees/dento/vess.jpg' },
        { id: 'dento-rubi-marinho', name: 'Rubi Marinho', origin: 'Dento', description: 'Invadindo seu espaço pessoal', image: 'assets/images/nominees/dento/rubi-marinho.jpg' },
        { id: 'dento-vayshlin', name: 'Vayshlin', origin: 'Dento', description: 'Mulher é muito foda', image: 'assets/images/nominees/dento/vayshlin.jpg' }
    ],
    'categoria-shiki': [
        { id: 'shiki-salvar-kasimir', name: 'Salvar o Kasimir', origin: 'Categoria Shiki', description: 'Contribuindo pra conversa', image: 'assets/images/nominees/categoria-shiki/salvar-o-kasimir.jpg' },
        { id: 'shiki-buscar-quarto', name: 'Buscar um quarto', origin: 'Categoria Shiki', description: 'NAO SEI OQ FAZER, QUARTO.', image: 'assets/images/nominees/categoria-shiki/buscar-um-quarto.jpg' },
        { id: 'shiki-jena-confuso', name: 'Exidrian Godlike', origin: 'Categoria Shiki', description: 'Porra ja nao falei isso pra vocês umas 3 vezes?', image: 'assets/images/nominees/categoria-shiki/jena-confuso.jpg' },
        { id: 'shiki-e-o-colar', name: 'Ele estava de colar?', origin: 'Categoria Shiki', description: 'Bacana mas e o colar?', image: 'assets/images/nominees/categoria-shiki/e-o-colar.jpg' },
        { id: 'shiki-olha-meu-pombo', name: 'Olha meu pombo', origin: 'Categoria Shiki', description: 'Meu pombo galera 😃', image: 'assets/images/nominees/categoria-shiki/olha-meu-pombo.jpg' }
    ]
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PLAYERS = PLAYERS;
    window.CATEGORIES = CATEGORIES;
    window.NOMINEES = NOMINEES;
}
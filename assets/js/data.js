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
        { id: 'npc-essek', name: 'Essek', origin: 'O Mão Negra', description: '', image: 'assets/images/nominees/melhor-npc/essek.jpg' },
        { id: 'npc-mako', name: 'Mako', origin: 'O Rei Eterno', description: '', image: 'assets/images/nominees/melhor-npc/mako.jpg' },
        { id: 'npc-fuligem', name: 'Fuligem', origin: 'Capitão do Sussuro', description: '', image: 'assets/images/nominees/melhor-npc/fuligem.jpg' },
        { id: 'npc-kadan', name: 'Kadan', origin: 'O Terror Noturno', description: '', image: 'assets/images/nominees/melhor-npc/kadan.jpg' },
        { id: 'npc-cesar', name: 'Cesar', origin: 'Guardião do Ouro Real', description: '', image: 'assets/images/nominees/melhor-npc/cesar.jpg' }
    ],
    'melhor-aventura': [
        { id: 'aventura-a-corrente-a-ferida-de-burok', name: 'A Corrente', origin: 'A Ferida de Burok', description: '', image: 'assets/images/nominees/melhor-aventura/a-corrente-a-ferida-de-burok.jpg' },
        { id: 'aventura-wildemount-hic-irrumabus', name: 'Wildemount', origin: 'Hic Irrumabus', description: '', image: 'assets/images/nominees/melhor-aventura/wildemount-hic-irrumabus.jpg' },
        { id: 'aventura-theladil-o-trono-vazio', name: 'Thelladil', origin: 'O Trono Vazio', description: '', image: 'assets/images/nominees/melhor-aventura/theladil-o-trono-vazio.jpg' },
        { id: 'aventura-laegar-o-circulo-dourado', name: 'Leagar', origin: 'O Circulo Dourado', description: '', image: 'assets/images/nominees/melhor-aventura/laegar-o-circulo-dourado.jpg' },
        { id: 'aventura-a-corrente-maldicao-das-ilhas-swavain', name: 'A Corrente', origin: 'Maldição das Ilhas Swavain', description: '', image: 'assets/images/nominees/melhor-aventura/maldicao-das-ilhas-swavain.jpg' }
    ],
    'melhor-personagem': [
        { id: 'personagem-hukil', name: 'Hukil', origin: 'Olho de Sangue', description: '', image: 'assets/images/nominees/melhor-personagem/hukil.jpg' },
        { id: 'personagem-evesto', name: 'Evesto', origin: 'Vigário da Excelência', description: '', image: 'assets/images/nominees/melhor-personagem/evesto.jpg' },
        { id: 'personagem-urrax', name: 'Urrax', origin: 'O Antrácito', description: '', image: 'assets/images/nominees/melhor-personagem/urrax.jpg' },
        { id: 'personagem-amon', name: 'Amon', origin: 'O Dragão de Areia', description: '', image: 'assets/images/nominees/melhor-personagem/amon.jpg' },
        { id: 'personagem-marvin', name: 'Marvin', origin: 'Canário de Mil Olhos', description: '', image: 'assets/images/nominees/melhor-personagem/marvin.jpg' }
    ],
    'melhor-vilao': [
        { id: 'vilao-boris-tevinta', name: 'Boris Tevinta', origin: 'O Lupino', description: '', image: 'assets/images/nominees/melhor-vilao/boris-tevinta.jpg' },
        { id: 'vilao-lazmyr-draveth', name: 'Lazmyr Draveth', origin: 'O Injustiçado', description: '', image: 'assets/images/nominees/melhor-vilao/lazmyr-draveth.jpg' },
        { id: 'vilao-fenleriel', name: 'Fenleriel', origin: 'O Arruinado', description: '', image: 'assets/images/nominees/melhor-vilao/fenleriel.jpg' },
        { id: 'vilao-axiom', name: 'Axiom', origin: 'Palavra Irredutível', description: '', image: 'assets/images/nominees/melhor-vilao/axiom.jpg' },
        { id: 'vilao-irvidit', name: 'Irvidit', origin: 'O Arauto do Amanhã', description: '', image: 'assets/images/nominees/melhor-vilao/irvidit.jpg' }
    ],
    'medalha-trump': [
        { id: 'trump-macaco-monster-hunter', name: 'Macaco Akuma', origin: 'Agora ele vai rolar iniciativa...', description: '', image: 'assets/images/nominees/medalha-trump/macaco-monster-hunter.jpg' },
        { id: 'trump-plot-o-cavalo', name: 'Plot', origin: 'O Cavalo Quantico', description: '', image: 'assets/images/nominees/medalha-trump/plot-o-cavalo.jpg' },
        { id: 'trump-adaga-sniper', name: 'Adaga Sniper', origin: 'Perfeita para o Combate', description: '', image: 'assets/images/nominees/medalha-trump/adaga-sniper.jpg' },
        { id: 'trump-drakx-jackie-chan', name: 'Montaria do Drakx', origin: 'Sim ela corre, ataca e cura', description: '', image: 'assets/images/nominees/medalha-trump/drakx-jackie-chan.jpg' },
        { id: 'trump-votacoes-do-grupo', name: 'Enquetes', origin: 'Todo voto é Nulo', description: '', image: 'assets/images/nominees/medalha-trump/votacoes-do-grupo.jpg' }
    ],
    'vamo-te-pegar': [
        { id: 'curva-ioanna-santorini', name: 'Ioanna Santorini', origin: 'Pra variar é imortal', description: '', image: 'assets/images/nominees/vamo-te-pegar/ioanna-santorini.jpg' },
        { id: 'curva-alustini', name: 'Alustini', origin: 'Esse deu prazer', description: '', image: 'assets/images/nominees/vamo-te-pegar/alustini.jpg' },
        { id: 'curva-matrona-dos-corvos', name: 'Matrona dos Corvos', origin: 'Aqui é tropa do Emílio', description: '', image: 'assets/images/nominees/vamo-te-pegar/matrona-dos-corvos.jpg' },
        { id: 'curva-oliver', name: 'Oliver', origin: 'RIP Palitinho', description: '', image: 'assets/images/nominees/vamo-te-pegar/oliver.jpg' },
        { id: 'curva-alanis-leophine', name: 'Alanis Leophine', origin: 'Vai ter volta', description: '', image: 'assets/images/nominees/vamo-te-pegar/alanis-leophine.jpg' }
    ],
    'dark-fantasy': [
        { id: 'dark-lazmyr-draveth', name: 'Lazmyr Draveth', origin: 'Pintou as unha já sabe', description: '', image: 'assets/images/nominees/dark-fantasy/lazmyr-draveth.jpg' },
        { id: 'dark-deckard', name: 'Deckard', origin: 'Eu sou só um cozinheiro...', description: '', image: 'assets/images/nominees/dark-fantasy/deckard.jpg' },
        { id: 'dark-khaine', name: 'Khaine', origin: 'Onde estão meus modos...', description: '', image: 'assets/images/nominees/dark-fantasy/khaine.jpg' },
        { id: 'dark-geryon', name: 'Geryon', origin: 'Você está errado', description: '', image: 'assets/images/nominees/dark-fantasy/geryon.jpg' },
        { id: 'dark-irvidit', name: 'Irvidit', origin: 'Card Game de defunto', description: '', image: 'assets/images/nominees/dark-fantasy/irvidit.jpg' }
    ],
    'premio-neils-bohr': [
        { id: 'bohr-kali', name: 'Kali', origin: 'Jena eu quero', description: '', image: 'assets/images/nominees/premio-neils-bohr/kali.jpg' },
        { id: 'bohr-hukil', name: 'Hukil', origin: 'Tenho até musica fih', description: '', image: 'assets/images/nominees/premio-neils-bohr/hukil.jpg' },
        { id: 'bohr-hanatashi', name: 'Hanatashi', origin: 'Calma, ainda tenho 2 ações.', description: '', image: 'assets/images/nominees/premio-neils-bohr/hanatashi.jpg' },
        { id: 'bohr-evesto', name: 'Evesto', origin: 'Criador do Combate Wi-Fi', description: '', image: 'assets/images/nominees/premio-neils-bohr/evesto.jpg' },
        { id: 'bohr-groon', name: 'Groon', origin: 'De onde vem sua força?', description: '', image: 'assets/images/nominees/premio-neils-bohr/groon.jpg' }
    ],
    'melhor-ship': [
        { id: 'ship-amon-deimos', name: 'Amon & Deimos', origin: 'Obrigado pelo... Cajadão.', description: '', image: 'assets/images/nominees/melhor-ship/amon-deimos.jpg' },
        { id: 'ship-andrei-geryon', name: 'Andrei & Geryon', origin: 'Vai amassar quem com esse revolver?', description: '', image: 'assets/images/nominees/melhor-ship/andrei-geryon.jpg' },
        { id: 'ship-fenleriel-academia', name: 'Fenleriel & Zivan', origin: 'Me ajuda com esse supino...', description: '', image: 'assets/images/nominees/melhor-ship/fenleriel-dono-da-academia.jpg' },
        { id: 'ship-bertrand-ludinus', name: 'Bertrand & Ludinus', origin: 'Ayaya... Meu rei.', description: '', image: 'assets/images/nominees/melhor-ship/bertrand-ludinus.jpg' },
        { id: 'ship-khaine-evesto', name: 'Khaine & Evesto', origin: 'Ja te mostrei... O Anel?', description: '', image: 'assets/images/nominees/melhor-ship/khaine-evesto.jpg' }
    ],
    'morreu-feiao': [
        { id: 'morte-fanatico', name: 'Fanatico', origin: 'Morri.', description: '', image: 'assets/images/nominees/morreu-feiao/fanatico.jpg' },
        { id: 'morte-deimos', name: 'Deimos', origin: 'Inacreditavel', description: '', image: 'assets/images/nominees/morreu-feiao/deimos.jpg' },
        { id: 'morte-kethos', name: 'Kethos', origin: 'Nem jogou', description: '', image: 'assets/images/nominees/morreu-feiao/kethos.jpg' },
        { id: 'morte-alustini', name: 'Alustini', origin: 'Mamou pra porta fechada', description: '', image: 'assets/images/nominees/morreu-feiao/alustini.jpg' },
        { id: 'morte-eodwulf', name: 'Eodwulf', origin: 'Amon saiu do grupo', description: '', image: 'assets/images/nominees/morreu-feiao/eodwulf.jpg' }
    ],
    'premio-titanic': [
        { id: 'titanic-cemiterio-theladil', name: 'Cemiterio de Theladil', origin: 'Maior clima de enterro', description: '', image: 'assets/images/nominees/premio-titanic/cemiterio-theladil.jpg' },
        { id: 'titanic-twig-blights-farol', name: 'Twig Blights no Farol', origin: 'Todo mundo pegou no meu pau', description: '', image: 'assets/images/nominees/premio-titanic/twig-blights-no-farol.jpg' },
        { id: 'titanic-marvin-zadash', name: 'Marvin em Zadash', origin: 'Toma aqui pra você lembrar de mim...', description: '', image: 'assets/images/nominees/premio-titanic/marvin-em-zadash.jpg' },
        { id: 'titanic-buraco-do-fedor', name: 'Buraco do Fedor', origin: 'Tem que ser homem.', description: '', image: 'assets/images/nominees/premio-titanic/buraco-do-fedor.jpg' },
        { id: 'titanic-magni-anakin', name: 'Magni e o Anakin', origin: 'Assim tipo o anakin sabe?.', description: '', image: 'assets/images/nominees/premio-titanic/magni-pedindo-o-anakin.jpg' }
    ],
    'medalha-naruto': [
        { id: 'naruto-ludinus', name: 'Ludinus', origin: 'Destruir a Lua pra não virar alcóolatra', description: '', image: 'assets/images/nominees/medalha-naruto/ludinus.jpg' },
        { id: 'naruto-kali', name: 'Kali', origin: 'Kaioken pra vencer purrinha', description: '', image: 'assets/images/nominees/medalha-naruto/kali.jpg' },
        { id: 'naruto-groon', name: 'Groon', origin: 'Cala a boca todo mundo', description: '', image: 'assets/images/nominees/medalha-naruto/groon.jpg' },
        { id: 'naruto-axiom', name: 'Axiom', origin: 'Quem é o mais forte?', description: '', image: 'assets/images/nominees/medalha-naruto/axiom.jpg' },
        { id: 'naruto-', name: 'Hukil', origin: 'OUÇAM-ME TODOS', description: '', image: 'assets/images/nominees/medalha-naruto/magni.jpg' }
    ],
    'npc-apepe': [
        { id: 'apepe-bicho-pau', name: 'Bicho-Pau', origin: 'CARALHOOOOOW.', description: '', image: 'assets/images/nominees/npc-apepe/bicho-pau.jpg' },
        { id: 'apepe-carnica', name: 'Carnica', origin: 'Carroça de VIADOS', description: '', image: 'assets/images/nominees/npc-apepe/carnica.jpg' },
        { id: 'apepe-mustafa', name: 'Mustafa', origin: 'Eu volto depois', description: '', image: 'assets/images/nominees/npc-apepe/mustafa.jpg' },
        { id: 'apepe-coletor-impostos', name: 'Coletor de Impostos', origin: 'TEMKI PAGA OK', description: '', image: 'assets/images/nominees/npc-apepe/coletor-de-impostos.jpg' },
        { id: 'apepe-andrei', name: 'Andrei', origin: 'Este sujeito da o cu com altissima proficiencia', description: '', image: 'assets/images/nominees/npc-apepe/andrei.jpg' }
    ],
    'npc-micao': [
        { id: 'micao-galsariad', name: 'Galsariad', origin: 'FAZ ALGUMA COISA INUTIL', description: '', image: 'assets/images/nominees/npc-micao/galsariad.jpg' },
        { id: 'micao-saleem', name: 'Saleem', origin: 'Saleem Muleke', description: '', image: 'assets/images/nominees/npc-micao/saleem.jpg' },
        { id: 'micao-sabugson', name: 'Sabugson', origin: 'Pra abandonar filha eu sou bom', description: '', image: 'assets/images/nominees/npc-micao/sabugson.jpg' },
        { id: 'micao-nanael', name: 'Nanael', origin: '🥰🥰🥰🥰🥰', description: '', image: 'assets/images/nominees/npc-micao/nanael.jpg' },
        { id: 'micao-fjord', name: 'Fjord', origin: 'Cara... Eu sou muito foda.', description: '', image: 'assets/images/nominees/npc-micao/fjord.jpg' }
    ],
    'npc-estou-ajudando': [
        { id: 'ajudando-galsariad', name: 'Galsariad', origin: 'Insira aqui comentário desnecessario', description: '', image: 'assets/images/nominees/npc-estou-ajudando/galsariad.jpg' },
        { id: 'ajudando-kadan', name: 'Kadan', origin: 'Mas quem disse que eu quero ajudar?', description: '', image: 'assets/images/nominees/npc-estou-ajudando/kadan.jpg' },
        { id: 'ajudando-andrei', name: 'Andrei', origin: 'Não tem jeito vamos ter que comer terra', description: '', image: 'assets/images/nominees/npc-estou-ajudando/andrei.jpg' },
        { id: 'ajudando-fjord', name: 'Fjord', origin: 'Tipo... Realmente muito foda.', description: '', image: 'assets/images/nominees/npc-estou-ajudando/fjord.jpg' },
        { id: 'ajudando-nanael', name: 'Nanael', origin: '🥰🥰🥰 Oiiiii 🥰🥰🥰', description: '', image: 'assets/images/nominees/npc-estou-ajudando/nanael.jpg' }
    ],
    'colirio-capricho': [
        { id: 'colirio-lindao', name: 'Lindao', origin: 'Diclupa', description: '', image: 'assets/images/nominees/colirio-capricho/lindao.jpg' },
        { id: 'colirio-essek', name: 'Essek', origin: 'Não é creme, é pouca exposição ao sol.', description: '', image: 'assets/images/nominees/colirio-capricho/essek.jpg' },
        { id: 'colirio-cesar-thrune', name: 'Cesar Thrune', origin: 'Um macho de verdade', description: '', image: 'assets/images/nominees/colirio-capricho/cesar-thrune.jpg' },
        { id: 'colirio-ihmotep', name: 'Ihmotep', origin: 'Meu estilista era um diabo', description: '', image: 'assets/images/nominees/colirio-capricho/ihmotep.jpg' },
        { id: 'colirio-amon', name: 'Amon', origin: 'Bem... meu estilista é um diabo.', description: '', image: 'assets/images/nominees/colirio-capricho/amon.jpg' }
    ],
    'melhor-tilt': [
        { id: 'tilt-jena', name: 'Jena', origin: 'Stupefied 1', description: '', image: 'assets/images/nominees/melhor-tilt/jena.jpg' },
        { id: 'tilt-ryuk', name: 'Ryuk', origin: 'Todo erro é punido', description: '', image: 'assets/images/nominees/melhor-tilt/ryuk.jpg' },
        { id: 'tilt-midgard', name: 'Midgard', origin: 'Aventura que vem eu chego aí', description: '', image: 'assets/images/nominees/melhor-tilt/midgard.jpg' },
        { id: 'tilt-shiki', name: 'Shiki', origin: 'RELA NA CARROÇA PETISTAS', description: '', image: 'assets/images/nominees/melhor-tilt/shiki.jpg' },
        { id: 'tilt-drakx', name: 'Drakx', origin: 'Minha familia bebe chumbo', description: '', image: 'assets/images/nominees/melhor-tilt/drakx.jpg' }
    ],
    'pressao-baxo': [
        { id: 'pressao-dragao-de-otari', name: 'Dragao de Otari', origin: 'Achadores de Caminho', description: '', image: 'assets/images/nominees/pressao-baxo/dragao-de-otari.jpg' },
        { id: 'pressao-cemiterio-theladil', name: 'Cemiterio de Shindu\'ryarin', origin: 'Reflexo Arcano', description: '', image: 'assets/images/nominees/pressao-baxo/cemiterio-theladil.jpg' },
        { id: 'pressao-dragao-mumia', name: 'O Dragao Mumia', origin: 'Leagar', description: '', image: 'assets/images/nominees/pressao-baxo/dragao-mumia.jpg' },
        { id: 'pressao-o-fanatico', name: 'O Fanatico', origin: 'Maldição das Ilhas Swavain', description: '', image: 'assets/images/nominees/pressao-baxo/o-fanatico.jpg' },
        { id: 'pressao-axiom-dragao', name: 'Axiom Dragao', origin: 'Hic Irrumabus', description: '', image: 'assets/images/nominees/pressao-baxo/axiom-dragao.jpg' }
    ],
    'dento': [
        { id: 'dento-suria-dwendal', name: 'Suria Dwendal', origin: 'Não podem ver uma casada', description: '', image: 'assets/images/nominees/dento/suria-dwendal.jpg' },
        { id: 'dento-lannathia', name: 'Lannathia', origin: 'Nem com guindaste pra me tirar de dentro', description: '', image: 'assets/images/nominees/dento/lannathia.jpg' },
        { id: 'dento-vess', name: 'Vess', origin: 'Ganhar Iphone nunca foi tão facil', description: '', image: 'assets/images/nominees/dento/vess.jpg' },
        { id: 'dento-rubi-marinho', name: 'Rubi Marinho', origin: 'Invadindo seu espaço pessoal', description: '', image: 'assets/images/nominees/dento/rubi-marinho.jpg' },
        { id: 'dento-vayshlin', name: 'Vayshlin', origin: 'Mulher é muito foda', description: '', image: 'assets/images/nominees/dento/vayshlin.jpg' }
    ],
    'categoria-shiki': [
        { id: 'shiki-salvar-kasimir', name: 'Salvar o Kasimir', origin: 'Contribuindo pra conversa', description: '', image: 'assets/images/nominees/categoria-shiki/salvar-o-kasimir.jpg' },
        { id: 'shiki-buscar-quarto', name: 'Buscar um quarto', origin: 'NAO SEI OQ FAZER, QUARTO.', description: '', image: 'assets/images/nominees/categoria-shiki/buscar-um-quarto.jpg' },
        { id: 'shiki-jena-confuso', name: 'Exidrian Godlike', origin: 'Porra ja nao falei isso pra vocês umas 3 vezes?', description: '', image: 'assets/images/nominees/categoria-shiki/jena-confuso.jpg' },
        { id: 'shiki-e-o-colar', name: 'Ele estava de colar?', origin: 'Bacana mas e o colar?', description: '', image: 'assets/images/nominees/categoria-shiki/e-o-colar.jpg' },
        { id: 'shiki-olha-meu-pombo', name: 'Olha meu pombo', origin: 'Meu pombo galera 😃', description: '', image: 'assets/images/nominees/categoria-shiki/olha-meu-pombo.jpg' }
    ]
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.PLAYERS = PLAYERS;
    window.CATEGORIES = CATEGORIES;
    window.NOMINEES = NOMINEES;
}
# RPG Awards - Sistema de Votação

Um sistema elegante e imersivo para cerimônias de premiação de RPG, combinando minimalismo contemporâneo com estética de nobreza.

## ✨ Características

### Design & UX
- **Paleta sofisticada**: Tons escuros com acentos dourados
- **Tipografia elegante**: Cinzel (títulos), Playfair Display (subtítulos), Source Sans 3 (corpo)
- **Transições suaves**: Animações refinadas entre estados
- **Microinterações**: Feedback visual em todos os elementos interativos
- **Loading elegante**: Tela de carregamento com animação de emblema

### Funcionalidades
- **Autenticação segura**: Login com identificação única e chave de acesso
- **Votação por categoria**: 9 categorias distintas (NPCs, cenas, frases, etc.)
- **Um voto por categoria**: Sistema impede votos duplicados
- **Persistência de dados**: localStorage para persistência local
- **Painel administrativo**: Visualização de resultados e estatísticas
- **Resumo de votos**: Tela final com revisão de todas as escolhas

### Responsividade
- **Mobile**: Layout otimizado para telas pequenas
- **Tablet**: Grid adaptativo
- **Desktop**: Experiência completa
- **Ultrawide**: Suporte a telas largas (2560px+)
- **High DPI**: Otimizado para telas de alta densidade

## 🚀 Como Usar

### Para Jogadores

1. Acesse o sistema através do navegador
2. Faça login com sua identificação única:
   - **ID**: Seu código de jogador (ex: ELARA, THORIN)
   - **Chave**: `mestre2024`
3. Navegue pelas categorias e vote em seus favoritos
4. Após completar todos os votos, revise e confirme

### Para o Mestre/Administrador

1. Faça login com credenciais de admin:
   - **ID**: `MESTRE`
   - **Chave**: `admin2024`
2. Acesse o painel administrativo
3. Visualize estatísticas e resultados em tempo real
4. Exporte dados para backup (JSON)

## 📁 Estrutura do Projeto

```
rpg-awards/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── main.css       # Estilos completos
│   ├── js/
│   │   ├── data.js        # Dados (jogadores, categorias, indicados)
│   │   ├── storage.js     # Persistência (localStorage)
│   │   ├── ui.js          # Interface e interações
│   │   ├── voting.js      # Lógica de votação
│   │   ├── admin.js       # Funcionalidades admin
│   │   └── app.js         # Inicialização
│   └── images/            # Imagens dos indicados
└── README.md
```

## 🎨 Categorias de Votação

1. **NPC Masculino do Ano**
2. **NPC Feminino do Ano**
3. **Vilão do Ano**
4. **Aliado Inesperado**
5. **Cena de Combate Épica**
6. **Momento Mais Emocional**
7. **Momento Mais Engraçado**
8. **Frase Icônica do Ano**
9. **Plot Twist do Ano**

## 🔧 Personalização

### Adicionar Novos Jogadores

Edite `assets/js/data.js`:

```javascript
const PLAYERS = [
    // ... jogadores existentes
    { id: 'NOVO', key: 'mestre2024', name: 'Nome do Jogador', role: 'player' },
];
```

### Adicionar Novas Categorias

Edite `assets/js/data.js`:

```javascript
const CATEGORIES = [
    // ... categorias existentes
    {
        id: 'nova-categoria',
        number: 'X',
        title: 'Nome da Categoria',
        description: 'Descrição...',
        type: 'npc' // npc, scene, quote
    },
];
```

### Adicionar Indicados

Edite `assets/js/data.js`:

```javascript
const NOMINEES = {
    'categoria-id': [
        {
            id: 'indicado-id',
            name: 'Nome do Indicado',
            origin: 'Origem',
            description: 'Descrição...',
            image: 'assets/images/imagem.jpg'
        },
    ],
};
```

## 🌐 Compatibilidade

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 Requisitos

- Navegador moderno com suporte a:
  - localStorage
  - CSS Grid e Flexbox
  - ES6+ JavaScript

## 🔒 Segurança

- Dados armazenados localmente no navegador
- Sem transmissão de dados para servidores externos
- Sessão expira após 24 horas
- Proteção contra múltiplos votos por categoria

## 📝 Licença

Este projeto é de uso livre para campanhas de RPG.

---

*Desenvolvido para tornar as cerimônias de premiação de RPG mais imersivas e memoráveis.*
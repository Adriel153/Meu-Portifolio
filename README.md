# ADRiEL.DEV — Portfólio freelancer

Landing page estática de apresentação e conversão para Adriel Félix da Silva, feita com HTML5, CSS3 e JavaScript puro.

## Experiência de serviços

Os quatro CTAs da seção de serviços são funcionais:

- Landing Pages → briefing específico de Landing Page
- Sistemas Web → briefing específico de Sistema Web
- Automações & IA → briefing específico de automação/IA
- E-commerce → briefing específico de loja virtual

Ao clicar, a Home é substituída visualmente por uma tela dedicada de briefing (não é modal). O cliente responde uma pergunta por vez, vê o resumo e pode abrir o WhatsApp com uma mensagem já preenchida com todas as respostas.

## Links oficiais

```js
const CONFIG = {
  whatsapp: "https://wa.me/55799868872217",
  instagram: "https://instagram.com/adrielfelix.dev",
  agape: "https://agapemercearia.com"
};
```

## Estrutura

- `index.html`: estrutura, conteúdo, SEO e pontos de integração.
- `css/style.css`: identidade visual, componentes e responsividade da Home.
- `css/animations.css`: animações da Home.
- `css/briefing.css`: tela fullscreen do briefing e suas microinterações.
- `js/app.js`: ponto de entrada que inicializa o site.
- `js/config.js`: links oficiais e preferências globais.
- `js/data/service-briefs.js`: perguntas, serviços e textos-base do WhatsApp.
- `js/features/briefing.js`: fluxo completo do briefing, resumo, histórico e WhatsApp.
- `js/ui/navigation.js`: menu e header.
- `js/ui/links.js`: aplicação dos links configuráveis.
- `js/ui/interactions.js`: reveal, textos dinâmicos, timeline, tilt, cursor, parallax e loader.
- `assets/images/`: imagens do portfólio.

A divisão por arquivos mantém a lógica organizada e facilita futuras alterações sem transformar um único JavaScript em um arquivo gigante.

## Visualizar

Pode abrir `index.html` diretamente no navegador ou usar o Live Server do VS Code. Não há backend nem dependências de runtime.

As animações respeitam `prefers-reduced-motion`.

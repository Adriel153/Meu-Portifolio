# ADRiEL.DEV — Portfólio profissional

Portfólio profissional e site comercial de **Adriel Félix da Silva**, desenvolvido com **HTML, CSS e JavaScript puro**.

O projeto foi criado para apresentar serviços de desenvolvimento, projetos e processo de trabalho de forma visual e interativa, além de transformar o interesse do visitante em um contato estruturado pelo WhatsApp.

> **Tipo de projeto:** Frontend / site institucional comercial
> **Stack:** HTML5, CSS3 e JavaScript (ES Modules)
> **Backend:** não utilizado neste projeto
> **Dependências de runtime:** nenhuma

## ✨ Destaques

- Interface responsiva para desktop e dispositivos móveis.
- Identidade visual própria, com layout escuro e foco em tipografia e microinterações.
- Navegação por seções com header responsivo e menu mobile.
- Animações de entrada usando `IntersectionObserver`.
- Animações e efeitos visuais com suporte a `prefers-reduced-motion`.
- Efeitos de cursor, parallax, iluminação e tilt em elementos interativos quando suportados pelo dispositivo.
- Seção de processo de desenvolvimento com progressão visual baseada no scroll.
- Seção de apresentação profissional e projetos.
- Integração direta com WhatsApp e Instagram.
- Briefing interativo específico para cada serviço.
- Geração de mensagem de WhatsApp a partir das respostas do briefing.
- Navegação do briefing integrada ao histórico do navegador usando `history.pushState` e `popstate`.
- Estrutura modular de JavaScript, separando configuração, dados, funcionalidades e componentes de interface.
- Meta tags básicas para SEO e compartilhamento social.
- Recursos básicos de acessibilidade, incluindo `aria-*`, foco de teclado e suporte a redução de movimento.

## 🧩 Briefing interativo

A seção de serviços possui quatro fluxos:

- **Landing Page** — perguntas sobre objetivo, identidade visual, conteúdo, WhatsApp, domínio e hospedagem.
- **Sistema Web** — perguntas sobre usuários, autenticação, banco de dados e funcionalidades.
- **Automações & IA** — perguntas sobre processos, ferramentas e objetivos de automação.
- **E-commerce** — perguntas sobre produtos, catálogo, pagamentos, entrega, domínio e administração de pedidos.

O visitante responde às perguntas, revisa um resumo e pode abrir o WhatsApp com uma mensagem preenchida automaticamente. **Nenhuma resposta é enviada automaticamente:** o visitante precisa abrir o WhatsApp e decidir se deseja enviar a mensagem.

## 🛠️ Tecnologias

### Frontend

- HTML5 sem framework
- CSS3
- JavaScript moderno com ES Modules
- DOM API
- Intersection Observer API
- History API
- `matchMedia` / `prefers-reduced-motion`

### Boas práticas utilizadas

- Separação de responsabilidades entre módulos.
- Manipulação do DOM sem dependências externas.
- Uso de `textContent` para conteúdo dinâmico quando HTML não é necessário.
- Links externos com `rel="noopener noreferrer"` quando abertos em nova aba.
- Layout responsivo com CSS.
- Animações progressivas e fallback quando APIs do navegador não estão disponíveis.
- Respeito à preferência do usuário por redução de movimento.

## 📁 Estrutura do projeto

```text
Meu-Portifolio/
├── index.html
├── README.md
├── .gitignore
│
├── assets/
│   └── images/
│       ├── adriel-felix.jpeg
│       ├── favicon.png
│       └── mercearia-agape.png
│
├── css/
│   ├── style.css
│   ├── animations.css
│   └── briefing.css
│
└── js/
    ├── app.js
    ├── config.js
    │
    ├── data/
    │   └── service-briefs.js
    │
    ├── features/
    │   └── briefing.js
    │
    └── ui/
        ├── interactions.js
        ├── links.js
        └── navigation.js
```

### Organização dos módulos

- `index.html` — estrutura semântica, conteúdo, metadados e pontos de integração.
- `css/style.css` — estilos principais, componentes e responsividade.
- `css/animations.css` — animações e transições da interface principal.
- `css/briefing.css` — estilos específicos da experiência de briefing.
- `js/app.js` — ponto de entrada da aplicação frontend.
- `js/config.js` — links externos e configurações compartilhadas.
- `js/data/service-briefs.js` — dados dos serviços, perguntas e textos iniciais do WhatsApp.
- `js/features/briefing.js` — lógica completa do briefing, resumo, histórico e geração da mensagem.
- `js/ui/navigation.js` — menu mobile e comportamento do header.
- `js/ui/links.js` — configuração dos links externos a partir dos atributos `data-link`.
- `js/ui/interactions.js` — animações de entrada, textos dinâmicos, progressão, cursor, parallax, tilt e loader.
- `assets/images/` — imagens utilizadas pela interface.

## ▶️ Como executar

O projeto não possui backend nem processo de build obrigatório.

### Opção 1 — abrir diretamente

Abra o arquivo `index.html` no navegador.

### Opção 2 — Live Server

No VS Code, abra a pasta do projeto e execute com uma extensão como **Live Server**.

### Opção 3 — servidor local simples

Com Python instalado:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500`.

Usar um servidor local é recomendado para trabalhar com ES Modules de forma consistente durante o desenvolvimento.

## 🔗 Configuração de contatos

Os links principais ficam centralizados em `js/config.js`:

```js
export const CONFIG = {
  whatsapp: "...",
  instagram: "...",
  agape: "..."
};
```

Ao adaptar este projeto para outro contexto, altere os valores nesse arquivo em vez de espalhar URLs pela aplicação.

## ♿ Acessibilidade e experiência do usuário

O projeto possui alguns cuidados voltados à acessibilidade e experiência de uso:

- foco de teclado em elementos interativos;
- estados `aria-expanded` e `aria-pressed`;
- áreas com `aria-live` para conteúdo dinâmico;
- `aria-label` em controles e indicadores;
- suporte a navegação por teclado;
- tratamento da tecla `Escape` no menu e no briefing;
- `prefers-reduced-motion` para reduzir animações quando solicitado pelo sistema;
- fallback para navegadores sem `IntersectionObserver`.

## 📱 Responsividade

A interface foi desenvolvida para diferentes tamanhos de tela, com adaptações específicas para navegação, cards, hero, seções de conteúdo e experiência de briefing.

Os efeitos que dependem de mouse/hover são condicionados às capacidades do dispositivo para evitar comportamentos inadequados em telas touch.

## 🔒 Segurança e privacidade

Este repositório contém somente o código do portfólio e seus recursos públicos.

- Não são necessários tokens ou chaves de API para executar o projeto.
- Não há backend ou banco de dados neste repositório.
- Dados e códigos proprietários de projetos de clientes não fazem parte deste projeto.
- Informações de contato exibidas no site são intencionais, pois fazem parte da finalidade comercial do portfólio.

Antes de publicar alterações futuras, recomenda-se revisar arquivos adicionados ao repositório e evitar credenciais, arquivos `.env`, tokens ou informações confidenciais.

## 📸 Projeto

O portfólio apresenta visualmente:

- apresentação profissional;
- serviços oferecidos;
- projetos;
- processo de desenvolvimento;
- informações sobre o desenvolvedor;
- chamada para contato;
- briefing interativo.

As imagens do projeto podem ser utilizadas nesta documentação para facilitar a avaliação por recrutadores e visitantes do repositório.

## 🎯 Objetivo profissional

Este projeto demonstra principalmente competências de **Frontend**, incluindo:

- construção de interfaces responsivas;
- organização de CSS;
- JavaScript para interações reais;
- manipulação de DOM;
- arquitetura modular no frontend;
- acessibilidade básica;
- animações e microinterações;
- integração com serviços externos por links;
- preocupação com experiência do usuário.

Para demonstrar competências **Full Stack**, este projeto deve ser considerado complementar. Projetos com backend, APIs, autenticação e banco de dados devem ser apresentados separadamente, especialmente quando envolverem trabalhos profissionais cujo código não pode ser divulgado.

## 👨‍💻 Autor

**Adriel Félix da Silva**
Desenvolvedor Freelancer

- Portfólio: `ADRiEL.DEV`
- Instagram: `@adrielfelix.dev`
- WhatsApp: disponível na interface do projeto

---

Desenvolvido com **HTML, CSS e JavaScript**, com foco em interface, experiência do usuário e apresentação profissional.

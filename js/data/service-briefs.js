export const SERVICE_BRIEFS = {
  landing: {
    title: "Landing Page",
    intro: "desenvolver uma Landing Page",
    questions: [
      { title: "Que tipo de página você precisa?", options: ["Página para minha empresa", "Página profissional", "Página para vender um produto", "Página para divulgar um serviço", "Página para uma campanha", "Página para captar contatos", "Ainda não sei / Preciso de orientação"] },
      { title: "Qual é o principal objetivo da página?", options: ["Apresentar minha empresa", "Conseguir mais clientes", "Vender um produto", "Divulgar um serviço", "Captar contatos", "Divulgar uma campanha", "Ainda não sei"] },
      { title: "Você já possui identidade visual?", options: ["Já tenho logo, cores e identidade", "Tenho apenas o logo", "Tenho algumas referências", "Ainda não tenho identidade visual", "Ainda não sei / Preciso de orientação"] },
      { title: "Você quer integração com WhatsApp?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você já possui o conteúdo da página?", options: ["Sim, já tenho tudo", "Tenho parte do conteúdo", "Ainda preciso preparar", "Preciso de ajuda para estruturar", "Ainda não sei"] },
      { title: "Você já possui domínio e hospedagem?", options: ["Sim, já tenho", "Tenho apenas o domínio", "Tenho apenas hospedagem", "Ainda não tenho", "Não sei como funciona"] }
    ]
  },
  systems: {
    title: "Sistema Web",
    intro: "desenvolver um sistema web",
    questions: [
      { title: "Que tipo de sistema você precisa?", options: ["Sistema de gestão", "Sistema de vendas", "Sistema para clientes", "Sistema de pedidos", "Sistema financeiro", "Sistema de agendamento", "Painel administrativo", "Sistema personalizado", "Ainda não sei / Preciso de orientação"] },
      { title: "Quem utilizará o sistema?", options: ["Somente eu", "Minha equipe", "Meus clientes", "Equipe e clientes", "Ainda não sei"] },
      { title: "O sistema precisa de login?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Precisa armazenar informações em banco de dados?", options: ["Sim", "Não", "Não sei / Preciso de orientação"] },
      { title: "Quais funcionalidades você imagina?", options: ["Cadastro de usuários", "Controle de clientes", "Pedidos", "Produtos", "Financeiro", "Relatórios", "Dashboard", "Agendamentos", "Outra funcionalidade", "Ainda não sei"] },
      { title: "Você já possui algum sistema ou começaremos do zero?", options: ["Começar do zero", "Já tenho um sistema", "Tenho uma versão inicial", "Tenho apenas a ideia", "Ainda não sei"] }
    ]
  },
  automation: {
    title: "Automações & IA",
    intro: "automatizar processos do meu negócio",
    questions: [
      { title: "O que você gostaria de automatizar?", options: ["Atendimento", "WhatsApp", "Instagram", "Vendas", "Tarefas internas", "Criação de conteúdo", "Organização de dados", "Processos repetitivos", "Outro", "Ainda não sei / Preciso de orientação"] },
      { title: "Quais ferramentas você utiliza hoje?", options: ["WhatsApp", "Instagram", "Google Sheets", "CRM", "E-mail", "Sistema próprio", "Outra ferramenta", "Nenhuma", "Ainda não sei"] },
      { title: "Você gostaria de utilizar Inteligência Artificial?", options: ["Sim", "Talvez", "Não", "Não sei / Quero entender melhor"] },
      { title: "Qual resultado você espera conseguir?", options: ["Economizar tempo", "Reduzir tarefas manuais", "Melhorar atendimento", "Conseguir mais vendas", "Organizar processos", "Automatizar operações", "Outro", "Ainda não sei"] },
      { title: "Você já possui alguma automação?", options: ["Sim", "Não", "Tenho algo parcialmente pronto", "Ainda não sei"] }
    ]
  },
  ecommerce: {
    title: "E-commerce",
    intro: "desenvolver uma loja virtual",
    questions: [
      { title: "O que você pretende vender?", options: ["Produtos físicos", "Produtos digitais", "Serviços", "Ainda estou decidindo", "Ainda não sei"] },
      { title: "Você já possui catálogo de produtos?", options: ["Sim", "Parcialmente", "Ainda não", "Ainda não sei"] },
      { title: "Você precisa de pagamento online?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você precisa calcular entrega ou frete?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você já possui domínio?", options: ["Sim", "Não", "Ainda não sei"] },
      { title: "Você precisa de painel para administrar os pedidos?", options: ["Sim", "Não", "Ainda não sei"] }
    ]
  }
};

export const WHATSAPP_INTROS = {
  landing: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver uma Landing Page. Gostaria de te explicar minha ideia e saber mais sobre o projeto.",
  systems: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver um sistema web. Gostaria de te explicar minha ideia e entender como podemos transformar isso em uma solução.",
  automation: "Olá, Adriel! Vi seu portfólio e tenho interesse em automatizar alguns processos do meu negócio. Gostaria de te explicar o que preciso e entender quais soluções podemos desenvolver.",
  ecommerce: "Olá, Adriel! Vi seu portfólio e tenho interesse em desenvolver uma loja virtual. Gostaria de te explicar meu projeto e entender como podemos colocar minha operação online."
};

export interface Article {
  id: number
  title: string
  category: string
  date: string
  source: string
  type: string
  excerpt: string
  body: string
  tags: string[]
  image?: string
  imageCaption?: string
}

export const articles: Article[] = [
  {
    id: 1,
    title: "Presidente da República reúne com Conselho de Ministros para discussão do OGE 2027",
    category: "Política nacional",
    date: "14 Jul 2026",
    source: "AIM — Agência de Informação de Moçambique",
    type: "Notícia",
    excerpt: "O Presidente da República presidiu hoje à reunião ordinária do Conselho de Ministros, onde foram analisadas as projeções macroeconómicas para o Orçamento Geral do Estado de 2027.",
    image: "/arquivo_nacional/images/artigo-destaque.webp",
    imageCaption: "O Presidente da República na saída do Conselho de Ministros, em Maputo.",
    body: `O Presidente da República, Filipe Nyusi, presidiu esta terça-feira à reunião ordinária do Conselho de Ministros, centrada na análise das projeções macroeconómicas e nas prioridades setoriais para o Orçamento Geral do Estado (OGE) de 2027.

De acordo com nota do Gabinete da Presidência da República, a reunião contou com a participação de todos os membros do Governo e teve como foco principal os investimentos nas áreas de educação, saúde e infraestruturas.

O Ministro da Economia e Finanças, Ernesto Max Elias Tonela, apresentou as projeções de crescimento do PIB para os próximos dois anos, estimado em 5,2% para 2027, sustentado pelo aumento das receitas do gás natural e pela recuperação do sector do turismo.

O Governo reafirmou o compromisso com a redução da pobreza e a melhoria dos serviços públicos como eixos centrais da política económica nacional.`,
    tags: ["OGE 2027", "Conselho de Ministros", "Economia"],
  },
  {
    id: 2,
    title: "Moçambique e Portugal assinam acordo de cooperação em tecnologias de informação",
    category: "Política internacional",
    date: "13 Jul 2026",
    source: "Notícias — O País em Destaque",
    type: "Notícia",
    excerpt: "Os dois países formalizaram hoje um protocolo de cooperação técnica nas áreas de transformação digital e modernização da administração pública.",
    body: `Moçambique e Portugal assinaram hoje em Lisboa um protocolo de cooperação técnica nas áreas de transformação digital e modernização da administração pública, num momento em que Maputo avança com a sua estratégia de governo eletrónico.

O acordo foi rubricado pelo Ministro da Ciência e Tecnologia de Moçambique e pelo seu homólogo português, e prevê o intercâmbio de especialistas, formação de quadros nacionais e apoio ao desenvolvimento de plataformas digitais para a administração pública moçambicana.`,
    tags: ["Portugal", "Cooperação", "Tecnologia", "Transformação Digital"],
  },
  {
    id: 3,
    title: "Banco de Moçambique anuncia revisão da taxa de juro de referência",
    category: "Economia",
    date: "12 Jul 2026",
    source: "Banco de Moçambique",
    type: "Comunicado oficial",
    excerpt: "O Comité de Política Monetária do Banco de Moçambique decidiu manter a taxa de juro de referência (MIMO) em 13,5% ao ano.",
    body: `O Comité de Política Monetária (CPMO) do Banco de Moçambique reuniu-se na passada quarta-feira e decidiu manter a taxa de juro de referência, MIMO, em 13,5% ao ano, após análise da evolução da inflação e das perspetivas de crescimento económico.

A decisão visa assegurar a estabilidade de preços no médio prazo, num contexto em que a inflação homóloga se situou em 6,2% em junho de 2026. O CPMO sublinhou que continuará a monitorizar de perto os desenvolvimentos económicos internos e externos.`,
    tags: ["Banco de Moçambique", "Taxa de Juro", "MIMO", "Inflação"],
  },
  {
    id: 4,
    title: "Discurso do Presidente na abertura do Parlamento — Sessão de Julho 2026",
    category: "Discursos presidenciais",
    date: "10 Jul 2026",
    source: "Presidência da República de Moçambique",
    type: "Discurso",
    excerpt: "O Chefe de Estado abriu a sessão parlamentar com um discurso centrado na coesão nacional e no desenvolvimento sustentável.",
    image: "/arquivo_nacional/images/artigo-destaque.webp",
    imageCaption: "O Presidente da República durante a cerimónia de abertura da sessão parlamentar de Julho de 2026.",
    body: `Excelências, membros da Assembleia da República,

É com profunda honra que abro esta sessão parlamentar de julho de 2026, num momento crucial para o futuro de Moçambique. O nosso país atravessa um período de afirmação da sua soberania, da sua unidade e do seu papel no concerto das nações africanas.

Os desafios que enfrentamos — económicos, sociais e climáticos — exigem de nós, representantes do povo, uma resposta à altura da responsabilidade que nos foi confiada pelos moçambicanos.

A unidade nacional é o nosso maior bem. Foi ela que nos guiou ao longo de mais de quatro décadas de independência, e é ela que continuará a ser o alicerce do nosso progresso coletivo.

Reafirmo o compromisso do Governo com a paz, a justiça social e o desenvolvimento inclusivo de todas as províncias e distritos do nosso país.`,
    tags: ["Parlamento", "Discurso", "Sessão Plenária"],
  },
  {
    id: 5,
    title: "Indicadores económicos — Junho 2026",
    category: "Indicadores económicos",
    date: "08 Jul 2026",
    source: "Instituto Nacional de Estatística",
    type: "Relatório",
    excerpt: "O INE publica os principais indicadores macroeconómicos de junho de 2026, incluindo inflação, câmbio e balança comercial.",
    body: `O Instituto Nacional de Estatística (INE) divulgou os indicadores macroeconómicos referentes ao mês de junho de 2026.

**Inflação:** 6,2% (homóloga) | 0,4% (mensal)
**Câmbio MZN/USD:** 63,8 (média mensal)
**Balança Comercial:** défice de 312 M USD
**Exportações:** 487 M USD (+8,3% vs junho 2025)
**Importações:** 799 M USD (+4,1% vs junho 2025)

O sector da agricultura registou crescimento de 3,1%, enquanto a indústria extractiva cresceu 7,8%, impulsionada pela produção de gás natural.`,
    tags: ["INE", "Estatísticas", "Inflação", "Câmbio", "Balança Comercial"],
  },
  {
    id: 6,
    title: "Lei n.º 4/2026 — Reforma do Sistema de Saúde Primária",
    category: "Legislação",
    date: "05 Jul 2026",
    source: "Assembleia da República de Moçambique",
    type: "Legislação",
    excerpt: "A Assembleia da República aprovou a lei que estabelece o novo quadro jurídico para o sistema de saúde primária em Moçambique.",
    body: `A Assembleia da República de Moçambique aprovou, em sessão plenária, a Lei n.º 4/2026, de 5 de julho, que estabelece o novo quadro jurídico para o sistema de saúde primária no país.

A lei define as responsabilidades dos governos provinciais e distritais na prestação de cuidados de saúde básicos, e cria mecanismos de financiamento para a construção e reabilitação de unidades sanitárias nas zonas rurais.`,
    tags: ["Legislação", "Saúde", "Lei 4/2026"],
  },
];

export const govPosts = [
  {
    id: 1,
    author: "Min. Economia e Finanças",
    role: "Ministério da Economia e Finanças",
    time: "Há 2 horas",
    priority: "urgente",
    ministry: "Economia",
    content: "Coloco à discussão do Executivo a proposta de revisão do Regime de Tributação das Empresas Mineiras. O documento completo está em anexo. Solicito comentários até sexta-feira.",
    images: ["/arquivo_nacional/images/maputo-cidade.jpg", "/arquivo_nacional/images/comunidade-mocambique.jpeg"],
    likes: 8,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    author: "Sec. Estado da Educação",
    role: "Ministério da Educação e Desenvolvimento Humano",
    time: "Há 5 horas",
    priority: "normal",
    ministry: "Educação",
    content: "Informo que os resultados do Programa de Formação de Professores do Ensino Primário para 2026 estão disponíveis. Formámos 4.200 novos docentes. Apresentarei o relatório completo na próxima reunião de Conselho.",
    likes: 14,
    comments: 3,
    liked: true,
  },
  {
    id: 3,
    author: "Min. Saúde",
    role: "Ministério da Saúde",
    time: "Há 1 dia",
    priority: "prioritária",
    ministry: "Saúde",
    content: "Detetados 12 novos casos de cólera na Província de Sofala. Equipas de resposta rápida já mobilizadas. Coordenação com a Defesa Civil em curso. Partilho registo fotográfico da visita às equipas no terreno.",
    images: [
      "/arquivo_nacional/images/artigo-destaque.webp",
      "/arquivo_nacional/images/artigo-destaque.webp",
    ],
    likes: 22,
    comments: 11,
    liked: false,
  },
  {
    id: 4,
    author: "Min. Obras Públicas",
    role: "Ministério de Obras Públicas, Habitação e Recursos Hídricos",
    time: "Há 1 dia",
    priority: "normal",
    ministry: "Infraestruturas",
    content: "Partilho o relatório de progresso da construção da EN1 — troço Maputo/Xai-Xai. Obras a 67% de conclusão. Previsão de entrega: Outubro 2026.",
    likes: 9,
    comments: 2,
    liked: false,
  },
];

export const govGroups = [
  { id: 1, name: "Economia e Finanças", posts: 42, members: 8, active: true },
  { id: 2, name: "Saúde Pública", posts: 31, members: 6, active: true },
  { id: 3, name: "Educação", posts: 28, members: 5, active: false },
  { id: 4, name: "Infraestruturas", posts: 19, members: 7, active: false },
  { id: 5, name: "Diplomacia e Relações Exteriores", posts: 15, members: 4, active: false },
  { id: 6, name: "Segurança e Defesa", posts: 11, members: 5, active: false },
  { id: 7, name: "Agricultura", posts: 9, members: 6, active: false },
  { id: 8, name: "Ambiente e Clima", posts: 7, members: 4, active: false },
];

export const executiveSummary = {
  date: "Segunda-feira, 14 de Julho de 2026",
  highlights: [
    {
      priority: "urgente",
      topic: "Surto de cólera em Sofala",
      ministry: "Saúde",
      summary: "12 novos casos confirmados. Resposta rápida ativada. Coordenação com Defesa Civil em curso.",
      posts: 3,
    },
    {
      priority: "alta",
      topic: "Revisão tributação mineira",
      ministry: "Economia e Finanças",
      summary: "Proposta de novo regime em discussão. Comentários solicitados até sexta-feira.",
      posts: 8,
    },
    {
      priority: "normal",
      topic: "EN1 Maputo–Xai-Xai a 67%",
      ministry: "Obras Públicas",
      summary: "Progresso dentro do prazo. Entrega prevista para outubro de 2026.",
      posts: 2,
    },
    {
      priority: "normal",
      topic: "4.200 professores formados",
      ministry: "Educação",
      summary: "Meta anual do programa de formação de docentes atingida. Relatório em preparação.",
      posts: 3,
    },
  ],
  stats: { totalPosts: 28, totalComments: 74, activeMinistries: 7, urgentTopics: 2 },
};

export const chatMessages = [
  {
    id: 1,
    from: "Min. Economia",
    me: false,
    text: "Excelência, confirma presença na reunião das 14h sobre o OGE?",
    time: "09:14",
  },
  { id: 2, from: "Eu", me: true, text: "Confirmo. Estarei presente.", time: "09:17" },
  {
    id: 3,
    from: "Min. Economia",
    me: false,
    text: "Perfeito. Partilharei os documentos preparatórios ainda esta manhã.",
    time: "09:19",
  },
  { id: 4, from: "Eu", me: true, text: "Obrigado. Aguardo.", time: "09:20" },
  {
    id: 5,
    from: "Min. Saúde",
    me: false,
    text: "Excelência, necessito de uma audiência urgente sobre a situação em Sofala.",
    time: "10:35",
  },
  {
    id: 6,
    from: "Eu",
    me: true,
    text: "Marque com o meu gabinete para hoje às 16h.",
    time: "10:38",
  },
];

export const chatContacts = [
  { id: 1, name: "Min. Economia e Finanças", unread: 0, lastMsg: "Partilharei os documentos..." },
  { id: 2, name: "Min. Saúde", unread: 1, lastMsg: "Necessito de uma audiência urgente" },
  { id: 3, name: "Conselho de Ministros", unread: 3, lastMsg: "Reunião confirmada para..." },
  { id: 4, name: "Min. Obras Públicas", unread: 0, lastMsg: "Relatório da EN1 disponível" },
  { id: 5, name: "Sec. Estado Educação", unread: 0, lastMsg: "Formação concluída com sucesso" },
];

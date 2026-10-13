export const person = {
  name: 'Alexandra Mena Sansano',
  shortName: 'Álex Mena',
  role: 'Lead Product Designer',
  email: 'a.menasansano@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alexandramena/',
  cv: '/alexandra-mena-cv.pdf',
};

export type Project = {
  slug: string;
  client: string;
  year: string;
  title: string;
  description: string;
  discipline: string;
  status: string;
  art: 'bbva' | 'coca-cola' | 'caixabank' | 'movelia' | 'zip-water';
  lenses: string[];
  proof: string;
  proofLabel: string;
  opening: string;
  context: string;
  ownership: string;
  decisions: { title: string; body: string }[];
  delivery: string[];
  outcome: string;
  limits: string;
  timeline?: { year: string; title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'bbva-business-banking', client: 'BBVA', year: '2022–2025',
    title: 'One model. Six markets. Room for the differences.',
    description: 'A global business banking platform, followed by responsive standardisation and a programme of product evolution.',
    discipline: 'Global platforms · Product leadership', status: 'Implemented', art: 'bbva',
    lenses: ['leadership', 'principal'], proof: '6', proofLabel: 'markets aligned',
    opening: 'I led a shared transactional experience for businesses across six markets, then continued through GEMA Responsive and the Financial Health programme in Spain.',
    context: 'Architecture, content and interaction had evolved differently across Spain, Portugal, Mexico, Colombia, Argentina and Uruguay. A shared experience had to respect local regulation, technical dependencies and the way each market operated.',
    ownership: 'I led the global platform from definition to implementation, with three to four designers and two UI developers. Aligning more than 72 stakeholders was part of the design work. I later led GEMA and the operational delivery of Financial Health, with up to five projects running in parallel.',
    decisions: [
      { title: 'Find the common model.', body: 'Define the information architecture, content hierarchy and navigation that could give the platform a coherent structure across markets.' },
      { title: 'Make local differences explicit.', body: 'Account for legal and technical requirements without allowing every exception to become a separate product. Work within BBVA’s established design system and implementation frameworks.' },
      { title: 'Carry the model into mobile.', body: 'For GEMA, prioritise the financial tasks relevant to sole traders and small businesses while accommodating different technology stacks and legacy systems.' },
      { title: 'Maintain a direction across teams.', body: 'In Financial Health, review key functionality, defend decisions with business, product and technology, and guide the current design system through a continuing delivery roadmap.' },
    ],
    delivery: ['Navigable models with market-specific scenarios', 'Screen-level documentation and technical handoff', 'Responsive interaction patterns', 'Programme governance and design-system application'],
    outcome: 'The global platform, GEMA and Financial Health functionality were implemented and remain operational, as documented in September 2026. Across the wider BBVA relationship, I shared account-development responsibility with the account director; the account grew by almost 30% during that period.',
    limits: 'The growth figure is a shared account result. Usage, conversion and efficiency metrics are not available. The six-market scope belongs to the global platform; GEMA’s exact geographic scope is not confirmed.',
    timeline: [
      { year: '2022', title: 'A shared global platform', body: 'Six markets, 72+ stakeholders and a common transactional model.' },
      { year: '2023', title: 'GEMA Responsive', body: 'Mobile standardisation within different stacks and legacy constraints.' },
      { year: '2023–25', title: 'Financial Health', body: 'A continuous programme of functionality, quality and design-system evolution in Spain.' },
    ],
  },
  {
    slug: 'coca-cola-ai-workspace', client: 'Coca-Cola', year: '2024–2025',
    title: 'Give fragmented knowledge a common entry point.',
    description: 'An LLM-based internal MVP bringing four marketing programmes into one experience.',
    discipline: 'AI product · Knowledge orchestration', status: 'Internal MVP', art: 'coca-cola',
    lenses: ['ai', 'principal'], proof: '4', proofLabel: 'programmes orchestrated',
    opening: 'I led the design of an internal AI workspace for marketing teams, working in English and in close partnership with technology.',
    context: 'Teams moved between emails, documents and multiple tools to develop campaigns, find earlier work and reconnect with people or agencies. The product opportunity was to make that knowledge easier to reach through a common experience.',
    ownership: 'I led design direction and day-to-day product decisions, collaborating daily with at least five technology specialists. Up to seven designers contributed at different stages. My manager and I shared stakeholder conversations; decisions of wider scope were reviewed by project leadership.',
    decisions: [
      { title: 'Start with the marketing task.', body: 'Frame the experience around finding precedents, developing ideas and reaching relevant collaborators. Make the purpose of the AI clear in the product model.' },
      { title: 'Define a credible MVP.', body: 'Shape one interaction model for four programmes, balancing the future experience with what design and technology could demonstrate together.' },
      { title: 'Keep design and technology close.', body: 'Use daily collaboration to resolve feasibility questions and bring executive product decisions to the right level of review.' },
    ],
    delivery: ['An internal LLM-based MVP', 'A unified interaction model for four programmes', 'A proposed future-state experience', 'Design and technology alignment throughout'],
    outcome: 'An internal MVP and future-state experience were completed. The work demonstrated a common entry point to four programmes and a product direction for knowledge access.',
    limits: 'The project was documented as work in progress in September 2026. Production deployment, adoption and efficiency gains are not confirmed. The degree of functional integration is not independently established here.',
  },
  {
    slug: 'caixabank-manager-tool', client: 'CaixaBank', year: '2025',
    title: 'A bank manager’s working day. A two-week brief.',
    description: 'Research, product concept, ten screens and a navigable prototype for an AI-assisted manager tool.',
    discipline: 'AI product · Research · Decision support', status: 'Concept delivered', art: 'caixabank',
    lenses: ['ai', 'leadership', 'principal'], proof: '2', proofLabel: 'weeks to delivery',
    opening: 'I owned and executed the product concept for an AI-assisted bank manager tool, turning a demanding brief into a complete ten-screen journey in two weeks.',
    context: 'The tool needed to help branch managers prepare conversations, understand a client’s financial context and compare possible scenarios. The concept was also a proof point for a proposed 60-FTE engagement.',
    ownership: 'I carried out focused qualitative research, worked with the Insights team and banking specialists, and used Bank of Spain sector data to ground the concept. I owned the product decisions and interaction model; a specialist visual team supported the final visual expression.',
    decisions: [
      { title: 'Work from the manager’s needs.', body: 'Translate research and banking knowledge into a journey for preparation, context and next actions, with a scope that could be delivered within the sprint.' },
      { title: 'Give AI a useful role.', body: 'Bring AI into preparation and scenario comparison, keeping factual information distinct from hypothetical generated scenarios.' },
      { title: 'Make the concept coherent end to end.', body: 'Define the navigation and interaction across ten screens, supported by a reusable visual system, accessibility guidance and a navigable prototype.' },
    ],
    delivery: ['Ten connected screens and a navigable prototype', 'Navigation and interaction model', 'UI kit and design system', 'Accessibility guide and documentation'],
    outcome: 'The package was delivered in less than two weeks. The project contributed to securing 40 of the 60 planned FTE for VML The Cocktail and opened the possibility of a design account with CaixaBank.',
    limits: 'The FTE figure is a commercial team outcome, not a personal team size. Production deployment, user validation, adoption and operational gains are not confirmed.',
  },
  {
    slug: 'movelia-brand-and-booking', client: 'Movelia', year: '2025',
    title: 'The brand promise has to reach the booking.',
    description: 'An integrated direction for narrative, identity and the digital reservation experience.',
    discipline: 'Brand & product · Design direction', status: 'In implementation', art: 'movelia',
    lenses: ['leadership', 'principal'], proof: '1', proofLabel: 'connected brand-to-product direction',
    opening: 'I led Movelia’s transformation from the strategic narrative and identity direction through to the architecture and digital booking experience.',
    context: 'The brand and website had become dated. Movelia needed a more contemporary, human expression that could carry across its digital assets and the journey that mattered most: finding and booking travel.',
    ownership: 'I led the project end to end and the direct client relationship, with three product designers, one visual lead and two narrative and UX writing specialists. I shaped the narrative behind the identity and guided the decisions connecting it to the digital product.',
    decisions: [
      { title: 'Define the narrative first.', body: 'Establish the principles that would give the new logo, colour system and digital experience a shared direction.' },
      { title: 'Connect expression and behaviour.', body: 'Carry the identity into information architecture, navigation and the reservation journey, making the product part of the brand transformation.' },
      { title: 'Keep disciplines moving together.', body: 'Align narrative, visual design, product design and the client around the final decisions and the work needed for implementation.' },
    ],
    delivery: ['Strategic narrative and identity direction', 'Logo and brand guidelines', 'Website architecture and reservation experience', 'Propagated screens, documentation and technical handoff'],
    outcome: 'The identity and digital product package were delivered for implementation. The project was still in implementation when documented in September 2026.',
    limits: 'Launch, conversion, usability and adoption results are not confirmed. Unreleased identity assets and interfaces are not included in this public narrative.',
  },
  {
    slug: 'zip-water-interface', client: 'Zip Water', year: '2026',
    title: 'The interface is part of the object.',
    description: 'Five interaction concepts for a smart tap, shaped by hardware, wet hands and moments of limited attention.',
    discipline: 'Physical–digital · AI-assisted prototyping', status: 'Concepts in validation', art: 'zip-water',
    lenses: ['ai', 'principal'], proof: '5', proofLabel: 'interactive concepts',
    opening: 'I led the digital interaction concepts for a new smart tap line planned for 2027, working from the constraints of the kitchen and the physical product.',
    context: 'The screen had to work with physical controls, different product formats and short interactions. Wet hands and limited attention changed the assumptions that would normally shape an app. Levels of digital confidence were a design hypothesis to test.',
    ownership: 'I worked with industrial design and two key stakeholders to understand functions and restrictions, then developed five digital concepts independently. The work was conducted in English. My responsibility was the digital interaction, not the leadership of the industrial design team.',
    decisions: [
      { title: 'Begin with the physical context.', body: 'Consider what the person is doing in the kitchen, how the tap behaves and the attention available for a screen interaction.' },
      { title: 'Connect controls and feedback.', body: 'Define a coherent relationship between physical input, screen states and the product’s response within the hardware constraints.' },
      { title: 'Make alternatives testable.', body: 'Build five distinct concepts and animated interactive prototypes, using AI throughout conceptualisation and prototyping to make the proposals tangible for comparison.' },
    ],
    delivery: ['Five digital interaction concepts', 'Five interface designs', 'Five animated interactive prototypes', 'Simulations of the tap’s physical controls'],
    outcome: 'The concepts and prototypes were delivered for selection and validation. The product line was planned for 2027 when the work was documented in September 2026.',
    limits: 'The final concept, workshop findings and launch are not confirmed. AI supported the design process; an AI capability in the final tap is not claimed.',
  },
];

export const collections = [
  {
    slug: 'product-leadership', label: 'Product leadership', tag: 'leadership',
    title: 'A direction teams can carry together.',
    intro: 'Selected work on global platforms, programme leadership and the connection between design decisions and delivery.',
    fit: 'For Lead Product Designer and design leadership conversations.',
    ids: ['bbva-business-banking', 'movelia-brand-and-booking', 'caixabank-manager-tool'],
  },
  {
    slug: 'product-and-ai', label: 'Product & AI', tag: 'ai',
    title: 'AI, shaped around the decision it changes.',
    intro: 'Selected work on knowledge access, decision support and AI-assisted prototyping. Each case distinguishes the product capability from the way it was designed.',
    fit: 'For senior product and applied AI conversations.',
    ids: ['coca-cola-ai-workspace', 'caixabank-manager-tool', 'zip-water-interface'],
  },
  {
    slug: 'staff-and-principal', label: 'Staff / Principal', tag: 'principal',
    title: 'Close to the work. Broad enough to shape it.',
    intro: 'Selected work on product definition, cross-disciplinary influence and hands-on decisions across digital and physical contexts.',
    fit: 'For Staff and Principal Product Designer conversations.',
    ids: ['bbva-business-banking', 'caixabank-manager-tool', 'zip-water-interface'],
  },
];

import {
  Dependency,
  Epic,
  Sprint,
  Principle,
  Risk,
  Section,
  TechItem,
} from '../data-access/types/content.types';

export const sections: Section[] = [
  { id: 'epics', label: 'Features & Epics' },
  { id: 'tech', label: 'Technical Design' },
  { id: 'delivery', label: 'Delivery Plan' },
  { id: 'risks', label: 'Risks' },
];

export const epics: Epic[] = [
  {
    id: 'E1',
    title: 'Platform Foundation',
    stories: [
      'Auth via SSO / OIDC with role-based access (read-only, operator, admin)',
      'Global navigation, deep-linking, and browser history integration',
      'Design system: component library, tokens, dark mode, accessible by default',
      'Observability: client-side error tracking and performance monitoring',
    ],
    assumption:
      'Angular Material is the deliberate choice for launch velocity, not a permanent commitment. NgRx Signal Store slices are the standard pattern for all feature state; no feature reaches production holding state in component-local signals alone.',
  },
  {
    id: 'E2',
    title: 'Image Management',
    stories: [
      'Browse image catalogue with version history, changelogs, and metadata',
      'Define image composition: base OS, package sets, config layers, secrets refs',
      'Publish a new image version with validation and signing status',
      'Compare two image versions diff-style before promoting',
      'Tag and promote images across environments (dev → staging → prod)',
    ],
    assumption:
      'Image builds happen in CI; UI is for configuration and promotion, not build execution',
  },
  {
    id: 'E3',
    title: 'Target Inventory',
    stories: [
      'Inventory view: filterable/sortable table of all targets (devices, VMs, groups)',
      'Per-target detail: current image, version, health metrics, last deployment',
      'Status indicators: online/offline/degraded/unknown with staleness cues',
      'Hardware groups: create, edit, nest; assign targets to groups',
      'Search and multi-select across device types and groups',
    ],
    assumption: 'Agent heartbeat data and health metrics are streamed via a backend events API',
  },
  {
    id: 'E4',
    title: 'Deployment Operations',
    stories: [
      'Select one or many targets (individual devices, groups, or ad-hoc selections)',
      'Choose operation: fresh install, re-image, rollback to a named version',
      'Pre-flight compatibility check: hardware/OS requirements, storage, connectivity',
      'Review and confirm: show a diff of what will change before committing',
      'Schedule deployment for a future maintenance window',
    ],
    assumption:
      'Compatibility rules are served by the backend; UI renders results, does not compute them',
  },
  {
    id: 'E5',
    title: 'Real-time Progress',
    stories: [
      'Live per-target progress: stage names, percentages, elapsed/estimated time',
      'Fleet-level rollout view: how many targets are pending/in-progress/done/failed',
      'Stage-by-stage logs: expandable streaming log output per target',
      'Pause, resume, and abort individual targets or the whole rollout',
      'Persistent state: progress survives page reload and long sessions (hours)',
    ],
    assumption: 'Backend pushes events via WebSocket; page is treated as a long-lived observer',
  },
  {
    id: 'E6',
    title: 'Audit & Compliance',
    stories: [
      'Deployment history: who deployed what, to which targets, when, and with what outcome',
      'Filterable audit log with per-record detail (pre/post image, operator, duration)',
      'Export to CSV/JSON for external compliance tooling',
      'Immutable log: UI cannot edit or delete audit records',
    ],
    assumption:
      'Audit records are append-only at the backend; export is a server-generated download',
  },
];

export const techSections: TechItem[] = [
  {
    title: 'Framework & language',
    decision: 'Angular 18+ (standalone) + TypeScript + Angular CLI (esbuild)',
    rationale:
      'Angular is a strong fit for this problem: a safety-critical, long-session ops tool operated by professional engineers. Its opinionated structure means new team members know exactly where to find things, and its first-class TypeScript integration — decorators, strict templates, generated types — makes the whole codebase a type-safe surface.',
    alt: 'React (excellent component model, but no built-in DI, router, or forms), Vue 3',
  },
  {
    title: 'Application architecture',
    decision: 'Standalone feature pages with lazy-loaded routes, core library for critical infrastructure and shared libraries for reusable UI components and utilities',
    rationale:
      "Organise by feature (images/, inventory/, deployments/, audit/) not by type. Each feature contains its own routing, feature-specific components, services, and types. Features are lazy-loaded, potentially with services provided at route level where separate instancing is required instead of singletons.",
    alt: 'NgModule-per-feature, monorepo Nx workspace',
  },
  {
    title: 'State & data handling',
    decision: 'Reactive state via Angular Signals + NgRx Signal Store for server state. Allow limited zone-based change detection initially, removed in final sprint',
    rationale:
      'Angular Signals replace Zone.js for granular, synchronous reactivity in component state. Server state belongs in NgRx Signal Store',
    alt: 'Traditional zone-based change detection throughout, NgRx Redux-like store, plain BehaviorSubject services',
  },
  {
    title: 'Real-time strategy',
    decision: 'Native WebSocket RxJs Observable + operators, bridged to Signals via toSignal()',
    rationale:
      "RxJS's webSocket() factory wraps a native WebSocket in an Observable. Feature services pipe from those streams and expose signals via toSignal().",
    alt: "React's TanStack Query, raw Observable BehaviorSubjects without toSignal",
  },
  {
    title: 'Design system & components',
    decision:
      'Short term: Angular Material, Long term: Angular CDK primitives + custom CSS design system',
    rationale:
      'Angular Material provides a suite of ready-made components with all accessibility and interaction behaviours built in, along with the familiar Google design system. Quickly transition to a component library built on top of the Angular CDK, styled entirely with CSS custom properties for theming.',
    alt: 'PrimeNG',
  },
  {
    title: 'Testing approach',
    decision: 'Jest + Angular Testing Library · Playwright (E2E) · Mock Service Worker (API mocking)',
    rationale:
      'Angular Testing Library tests user behaviour not implementation. MSW intercepts HTTP at the network level and works identically across dev, test, and Storybook.',
    alt: 'Karma + Jasmine, Cypress',
  },
  {
    title: 'Build & deployment',
    decision: 'Angular CLI (esbuild application builder) → Docker (nginx) → GitHub Actions',
    rationale:
      "The Angular CLI's application builder produces a tree-shaken, code-split static artefact that nginx serves from a Docker container. Trivially portable to on-premise environments.",
    alt: 'Vercel/Netlify, webpack builder',
  },
];

export const dependencies: Dependency[] = [
  { label: 'Angular 18+', role: 'UI framework' },
  { label: 'TypeScript', role: 'Safety net' },
  { label: 'Angular CLI', role: 'Build tooling (esbuild)' },
  { label: 'NgRx Signal Store', role: 'State Management' },
  { label: 'Angular Signals', role: 'Reactive UI state' },
  { label: 'RxJS', role: 'Async & real-time' },
  { label: 'Angular Material', role: 'Accessible primitives' },
  { label: 'MSW', role: 'API mocking' },
  { label: 'Playwright', role: 'E2E tests' },
];

export const sprints: Sprint[] = [
  {
    sprint: 'Sprint 0',
    title: 'Foundation',
    weeks: 'Weeks 1–2',
    why: 'Unblock everything — no demo is possible without this',
    items: [
      'Angular CLI scaffold: standalone components, TypeScript configuration, strict mode',
      'Angular Material installed: configure default theme as a structural baseline',
      'Angular Router: shell route, lazy feature routes, auth guard',
      'Mock Service Worker set up with mock backend response data; HTTP auth interceptor',
      'GitHub Actions: ng lint → ng test → ng build → Playwright smoke',
      'APP_INITIALIZER fetches runtime feature-flag config',
    ],
  },
  {
    sprint: 'Sprint 1',
    title: 'Demo of core functionality',
    weeks: 'Weeks 3–5',
    why: 'Something real to show stakeholders',
    items: [
      'Design review and global Material density configuration: override component paddings and layouts to force a high-density, utility-first style matching operator expectations',
      'Target inventory: MatTable + virtual scroll with sort, filter, search',
      'Target detail side panel (MatSidenav)',
      'Image catalogue list with version history',
      'Deployment wizard (MatStepper): target selection → confirm',
      'Playwright E2E test for core journey',
    ],
  },
  {
    sprint: 'Sprint 2',
    title: 'Real-time Core',
    weeks: 'Weeks 6–8',
    why: "This is the product's hardest capability - ship it on top of Material so UI risk and real-time risk don't land at the same time",
    items: [
      'WebSocketService in core/ using RxJS webSocket()',
      'toSignal() bridges real-time data streams directly into the reactive template layer',
      'Missed-event reconciliation on reconnect',
      'Progress view: per-target stage bar, logs',
    ],
  },
  {
    sprint: 'Sprint 3',
    title: 'Safety & Compliance',
    weeks: 'Weeks 9–11',
    why: 'Trust-building features',
    items: [
      'Pre-flight compatibility check panel',
      'Rollback operation: version picker',
      'Audit log: filterable high-density data table',
      'RBAC: CanActivate guards',
    ],
  },
  {
    sprint: 'Sprint 4',
    title: 'Scale & Polish',
    weeks: 'Weeks 12–14',
    why: 'Optimise performance and eliminate framework runtime overhead',
    items: [
      'Drop Zone.js dependency entirely and transition application configuration to native Zoneless change detection, leveraging the Signal codebase built from Sprint 0',
      'Performance: profile and benchmark UI responsiveness with simulated 10k-target active streaming datasets',
      'Keyboard shortcuts and command palette for rapid, mouse-free operator workflows',
      'Accessibility audit and full keyboard navigation compliance fixes',
    ],
  },
];

export const principles: Principle[] = [
  { title: 'MSW first', desc: 'Write mock handlers before any component.' },
  { title: 'Demo early', desc: 'Sprint 1 produces something a real user can click.' },
  { title: 'Hard problems first', desc: 'Real-time is in sprint 2, not sprint 4.' },
  {
    title: 'Polish is a sprint',
    desc: 'Accessibility and performance are explicitly scoped in sprint 4.',
  },
];

export const risks: Risk[] = [
  {
    severity: 'High',
    color: '#ef4444',
    category: 'Technical',
    risk: 'WebSocket resilience in long-running operator sessions',
    detail:
      'A dropped connection mid-deployment creates operator anxiety and risk of missed critical events.',
    mitigation:
      'Build reconnect and /sync paths in sprint 2. Write chaos tests that kill the socket mid-deployment.',
  },
  {
    severity: 'High',
    color: '#ef4444',
    category: 'Product',
    risk: 'Backend API not ready when frontend needs it',
    detail: 'Without an agreed contract, frontend development blocks on real endpoints.',
    mitigation:
      'Agree OpenAPI specs early. MSW handlers are written against the spec from day one.',
  },
  {
    severity: 'Low',
    color: '#10b981',
    category: 'Team',
    risk: 'Signals adoption curve',
    detail: 'Inconsistent adoption within the team produces a hybrid codebase.',
    mitigation:
      'Establish a coding standard: all new components use signals; no new async pipe usage.',
  },
];

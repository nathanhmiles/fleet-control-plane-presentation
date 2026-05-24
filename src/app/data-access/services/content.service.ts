import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dependency, Epic, Phase, Principle, Risk, Section, TechItem } from '../types/content.types';

@Injectable({ providedIn: 'root' })
export class ContentService {
  getSections(): Observable<Section[]> {
    return of([
      { id: 'epics', label: 'Features & Epics' },
      { id: 'tech', label: 'Technical Design' },
      { id: 'delivery', label: 'Delivery Plan' },
      { id: 'risks', label: 'Risks' },
    ]);
  }

  getEpics(): Observable<Epic[]> {
    return of([
      {
        id: 'E1',
        title: 'Platform Foundation',
        color: '#6b7280',
        accent: '#9ca3af',
        stories: [
          'Auth via SSO / OIDC with role-based access (read-only, operator, admin)',
          'Global navigation, deep-linking, and browser history integration',
          'Design system: component library, tokens, dark mode, accessible by default',
          'Observability: client-side error tracking and performance monitoring',
        ],
        assumption: 'RBAC enforced at API layer; UI reflects permissions, not enforces them',
      },
      {
        id: 'E2',
        title: 'Image Management',
        color: '#3b82f6',
        accent: '#93c5fd',
        stories: [
          'Browse image catalogue with version history, changelogs, and metadata',
          'Define image composition: base OS, package sets, config layers, secrets refs',
          'Publish a new image version with validation and signing status',
          'Compare two image versions diff-style before promoting',
          'Tag and promote images across environments (dev → staging → prod)',
        ],
        assumption: 'Image builds happen in CI; UI is for configuration and promotion, not build execution',
      },
      {
        id: 'E3',
        title: 'Target Inventory',
        color: '#8b5cf6',
        accent: '#c4b5fd',
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
        color: '#f59e0b',
        accent: '#fcd34d',
        stories: [
          'Select one or many targets (individual devices, groups, or ad-hoc selections)',
          'Choose operation: fresh install, re-image, rollback to a named version',
          'Pre-flight compatibility check: hardware/OS requirements, storage, connectivity',
          'Review and confirm: show a diff of what will change before committing',
          'Schedule deployment for a future maintenance window',
        ],
        assumption: 'Compatibility rules are served by the backend; UI renders results, does not compute them',
      },
      {
        id: 'E5',
        title: 'Real-time Progress',
        color: '#10b981',
        accent: '#6ee7b7',
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
        color: '#ef4444',
        accent: '#fca5a5',
        stories: [
          'Deployment history: who deployed what, to which targets, when, and with what outcome',
          'Filterable audit log with per-record detail (pre/post image, operator, duration)',
          'Export to CSV/JSON for external compliance tooling',
          'Immutable log: UI cannot edit or delete audit records',
        ],
        assumption: 'Audit records are append-only at the backend; export is a server-generated download',
      },
    ]);
  }

  getTechSections(): Observable<TechItem[]> {
    return of([
      {
        title: 'Framework & language',
        icon: '⬡',
        decision: 'Angular 18+ (standalone) + TypeScript + Angular CLI (esbuild)',
        rationale: "Angular is a strong fit for this problem: a safety-critical, long-session ops tool operated by professional engineers. Its opinionated structure means new team members know exactly where to find things, and its first-class TypeScript integration — decorators, strict templates, generated types — makes the whole codebase a type-safe surface.",
        alt: 'Considered: React (excellent component model, but no built-in DI, router, or forms), Vue 3',
      },
      {
        title: 'Application architecture',
        icon: '◈',
        decision: 'Feature-first with lazy-loaded standalone routes + shared core',
        rationale: "Organise by feature (images/, inventory/, deployments/, audit/) not by type. Each feature folder owns its routed components, feature-scoped services, and types. Features are lazy-loaded via Angular Router's loadComponent and loadChildren.",
        alt: 'NgModule-per-feature, monorepo Nx workspace',
      },
      {
        title: 'State & data handling',
        icon: '◎',
        decision: 'Angular Signals for reactive state + NgRx Signal Store for server state',
        rationale: "Angular Signals replace Zone.js for granular, synchronous reactivity in component state. Server state belongs in NgRx Signal Store",
        alt: 'NgRx Redux-like store, plain BehaviorSubject services',
      },
      {
        title: 'Real-time strategy',
        icon: '⟳',
        decision: 'RxJS WebSocketSubject + operators, bridged to Signals via toSignal()',
        rationale: "RxJS's webSocket() factory wraps a native WebSocket in an Observable. Feature services pipe from those streams and expose signals via toSignal().",
        alt: 'socket.io, raw Observable BehaviorSubjects without toSignal',
      },
      {
        title: 'Design system & components',
        icon: '◻',
        decision: 'Custom library on Angular CDK primitives + CSS custom properties',
        rationale: "Build the product's component library on top of CDK, styled entirely with CSS custom properties for theming. The CDK gives the hard accessibility and interaction behaviours for free.",
        alt: 'Angular Material, PrimeNG',
      },
      {
        title: 'Testing approach',
        icon: '✓',
        decision: 'Jest + Angular Testing Library · Playwright (E2E) · MSW (API mocking)',
        rationale: "Angular Testing Library tests user behaviour not implementation. MSW intercepts HTTP at the network level and works identically across dev, test, and Storybook.",
        alt: 'Karma + Jasmine, Cypress',
      },
      {
        title: 'Build & deployment',
        icon: '▲',
        decision: 'Angular CLI (esbuild application builder) → Docker (nginx) → GitHub Actions',
        rationale: "The Angular CLI's application builder produces a tree-shaken, code-split static artefact that nginx serves from a Docker container. Trivially portable to on-premise environments.",
        alt: 'Vercel/Netlify, webpack builder',
      },
    ]);
  }

  getDependencies(): Observable<Dependency[]> {
    return of([
      { label: 'Angular 18+', role: 'UI framework' },
      { label: 'TypeScript', role: 'Safety net' },
      { label: 'Angular CLI', role: 'Build tooling (esbuild)' },
      { label: 'NgRx Signal Store', role: 'State Management' },
      { label: 'Angular Signals', role: 'Reactive UI state' },
      { label: 'RxJS', role: 'Async & real-time' },
      { label: 'Angular CDK', role: 'Accessible primitives' },
      { label: 'MSW', role: 'API mocking' },
      { label: 'Playwright', role: 'E2E tests' },
    ]);
  }

  getPhases(): Observable<Phase[]> {
    return of([
      {
        phase: 'Phase 0',
        title: 'Foundation',
        weeks: 'Weeks 1–2',
        color: '#6b7280',
        why: 'Unblock everything — no demo is possible without this',
        items: [
          'Angular CLI scaffold: standalone components, strict mode',
          'Angular CDK installed; CSS custom properties',
          'Angular Router: shell route, lazy feature routes',
          'MSW installed with first handler; HTTP interceptor',
        ],
      },
      {
        phase: 'Phase 1',
        title: 'Credible Demo',
        weeks: 'Weeks 3–5',
        color: '#3b82f6',
        why: 'Something real to show stakeholders',
        items: [
          'Target inventory: CdkVirtualScrollViewport table',
          'Target detail side panel',
          'Image catalogue list with version history',
          'Deployment wizard: target selection → confirm',
        ],
      },
      {
        phase: 'Phase 2',
        title: 'Real-time Core',
        weeks: 'Weeks 6–8',
        color: '#10b981',
        why: "This is the product's hardest capability",
        items: [
          'WebSocketService in core/ using RxJS webSocket()',
          'toSignal() bridges topic streams',
          'Missed-event reconciliation on reconnect',
          'Progress view: per-target stage bar, logs',
        ],
      },
      {
        phase: 'Phase 3',
        title: 'Safety & Compliance',
        weeks: 'Weeks 9–11',
        color: '#f59e0b',
        why: "Trust-building features",
        items: [
          'Pre-flight compatibility check panel',
          'Rollback operation: version picker',
          'Audit log: filterable CDK table',
          'RBAC: CanActivate guards',
        ],
      },
      {
        phase: 'Phase 4',
        title: 'Scale & Polish',
        weeks: 'Weeks 12–14',
        color: '#8b5cf6',
        why: 'Make it fast for real fleets',
        items: [
          'Zoneless change detection opt-in',
          'Performance: profile with 10k-target datasets',
          'Keyboard shortcuts and command palette',
          'Accessibility audit and fixes',
        ],
      },
    ]);
  }

  getPrinciples(): Observable<Principle[]> {
    return of([
      { title: 'MSW first', desc: 'Write mock handlers before any component.' },
      { title: 'Demo early', desc: 'Phase 1 produces something a real user can click.' },
      { title: 'Hard problems first', desc: "Real-time is in phase 2, not phase 4." },
      { title: 'Polish is a phase', desc: "Accessibility and performance are explicitly scoped in phase 4." },
    ]);
  }

  getRisks(): Observable<Risk[]> {
    return of([
      {
        severity: 'High',
        color: '#ef4444',
        category: 'Technical',
        risk: 'WebSocket resilience in long-running operator sessions',
        detail: 'A dropped connection mid-deployment creates operator anxiety and risk of missed critical events.',
        mitigation: "Build reconnect and /sync paths in phase 2. Write chaos tests that kill the socket mid-deployment.",
      },
      {
        severity: 'High',
        color: '#ef4444',
        category: 'Product',
        risk: 'Backend API not ready when frontend needs it',
        detail: 'Without an agreed contract, frontend development blocks on real endpoints.',
        mitigation: 'Agree OpenAPI specs early. MSW handlers are written against the spec from day one.',
      },
      {
        severity: 'Low',
        color: '#10b981',
        category: 'Team',
        risk: 'Signals adoption curve',
        detail: 'Inconsistent adoption within the team produces a hybrid codebase.',
        mitigation: "Establish a coding standard: all new components use signals; no new async pipe usage.",
      }
    ]);
  }
}

export type Epic = {
  id: string;
  title: string;
  stories: string[];
};

export interface Risk {
  risk: string;
  detail: string;
  severity: string;
  category: string;
  color: string;
  mitigation: string;
}

export interface TechItem {
  title: string;
  decision: string;
  rationale: string;
  alt: string;
}

export interface Phase {
  phase: string;
  title: string;
  weeks: string;
  why: string;
  items: string[];
}

export interface Section {
  id: string;
  label: string;
}

export interface Dependency {
  label: string;
  role: string;
}

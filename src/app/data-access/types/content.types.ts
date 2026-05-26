export type Epic = {
  id: string;
  title: string;
  features: string[];
};

export interface Risk {
  risk: string;
  detail: string;
  impact: 'high' | 'medium' | 'low';
  likelihood: 'high' | 'medium' | 'low';
  category: 'Technical' | 'Product' | 'Team';
  mitigation: string;
}

export interface TechItem {
  title: string;
  decision: string;
  rationale: string;
  alt: string;
}

export interface Phase {
  phase: number;
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
  url?: string;
}

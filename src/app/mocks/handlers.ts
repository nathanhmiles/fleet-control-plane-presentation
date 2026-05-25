import { http, HttpResponse } from 'msw';
import { Section } from '../data-access/types/content.types';

const sections: Section[] = [
  { id: 'epics', label: 'Features & Epics' },
  { id: 'tech', label: 'Technical Design' },
  { id: 'delivery', label: 'Delivery Plan' },
  { id: 'risks', label: 'Risks' },
];

export const handlers = [
  http.get('/api/sections', () => {
    return HttpResponse.json(sections);
  }),
];

import { http, HttpResponse } from 'msw';
import {sections, epics, techSections, dependencies, phases, risks } from './response-data';

export const handlers = [
  http.get('/api/sections', () => {
    return HttpResponse.json(sections);
  }),
  http.get('/api/epics', () => {
    return HttpResponse.json(epics);
  }),
  http.get('/api/tech-sections', () => {
    return HttpResponse.json(techSections);
  }),
  http.get('/api/dependencies', () => {
    return HttpResponse.json(dependencies);
  }),
  http.get('/api/phases', () => {
    return HttpResponse.json(phases);
  }),
  http.get('/api/risks', () => {
    return HttpResponse.json(risks);
  }),
];

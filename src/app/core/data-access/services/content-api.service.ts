import { inject, Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dependency, Epic, Phase, Risk, Section, TechItem } from '../types/content.types';
import { Observable, of } from 'rxjs';
import {
  dependencies,
  epics,
  phases,
  risks,
  sections,
  techSections,
} from '../../../mocks/response-data';

@Injectable({ providedIn: 'root' })
export class ContentApiService {
  private readonly _http = inject(HttpClient);

  getSections(): Observable<Section[]> {
    return isDevMode() ? this._http.get<Section[]>('/api/sections') : of(sections);
  }

  getEpics(): Observable<Epic[]> {
    return isDevMode() ? this._http.get<Epic[]>('/api/epics') : of(epics);
  }

  getTechSections(): Observable<TechItem[]> {
    return isDevMode() ? this._http.get<TechItem[]>('/api/tech-sections') : of(techSections);
  }

  getDependencies(): Observable<Dependency[]> {
    return isDevMode() ? this._http.get<Dependency[]>('/api/dependencies') : of(dependencies);
  }

  getPhases(): Observable<Phase[]> {
    return isDevMode() ? this._http.get<Phase[]>('/api/phases') : of(phases);
  }

  getRisks(): Observable<Risk[]> {
    return isDevMode() ? this._http.get<Risk[]>('/api/risks') : of(risks);
  }
}

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dependency, Epic, Phase, Principle, Risk, Section, TechItem } from '../types/content.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentApiService {
  private readonly _http = inject(HttpClient);

  getSections(): Observable<Section[]> {
    return this._http.get<Section[]>('/api/sections');
  }

  getEpics(): Observable<Epic[]> {
    return this._http.get<Epic[]>('/api/epics');
  }

  getTechSections(): Observable<TechItem[]> {
    return this._http.get<TechItem[]>('/api/tech-sections');
  }

  getDependencies(): Observable<Dependency[]> {
    return this._http.get<Dependency[]>('/api/dependencies');
  }

  getPhases(): Observable<Phase[]> {
    return this._http.get<Phase[]>('/api/phases');
  }

  getPrinciples(): Observable<Principle[]> {
    return this._http.get<Principle[]>('/api/principles');
  }

  getRisks(): Observable<Risk[]> {
    return this._http.get<Risk[]>('/api/risks');
  }
}

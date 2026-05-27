import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dependency, Epic, Phase, Risk, Section, TechItem } from '../types/content.types';
import { ContentApiService } from './content-api.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly _contentApiService = inject(ContentApiService);

  getSections(): Observable<Section[]> {
    return this._contentApiService.getSections();
  }

  getEpics(): Observable<Epic[]> {
    return this._contentApiService.getEpics();
  }

  getTechSections(): Observable<TechItem[]> {
    return this._contentApiService.getTechSections();
  }

  getDependencies(): Observable<Dependency[]> {
    return this._contentApiService.getDependencies();
  }

  getPhases(): Observable<Phase[]> {
    return this._contentApiService.getPhases();
  }

  getRisks(): Observable<Risk[]> {
    return this._contentApiService.getRisks();
  }
}

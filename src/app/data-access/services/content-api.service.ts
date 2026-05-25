import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContentApiService {
  private readonly _httpClient = inject(HttpClient);

}

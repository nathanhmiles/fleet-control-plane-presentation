import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../../../core/data-access/services/content.service';
import { RiskCardComponent } from '../../components/risk-card/risk-card.component';

@Component({
  selector: 'app-risks-page',
  imports: [RiskCardComponent],
  template: `
    <div>
      <p class="text-muted mb-4">{{ RISKS().length }} risks across technical, product, and team dimensions. All high-severity risks have mitigations that start in week one.</p>

      <div class="flex-col gap-2">
        @for (r of RISKS(); track r.risk) {
          <app-risk-card [risk]="r"></app-risk-card>
        }
      </div>
    </div>
  `
})
export class RisksPageComponent {
  private readonly _contentService = inject(ContentService);

  readonly RISKS = toSignal(this._contentService.getRisks(), { initialValue: []});
}

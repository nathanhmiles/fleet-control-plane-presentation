import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Risk } from '../../../../core/data-access/types/content.types';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-risk-card',
  templateUrl: './risk-card.component.html',
  imports: [TitleCasePipe],
  styles: [`
    .severity-high {
      background: #ef44441a;
      color: #ef4444;
      border-color: #ef4444;
    }

    .severity-medium {
      background: #f59e0b1a;
      color: #f59e0b;
      border-color: #f59e0b;
    }
    .severity-low {
      background: #10b9811a;
      color: #10b981;
      border-color: #10b981;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RiskCardComponent {
  risk = input.required<Risk>();
}

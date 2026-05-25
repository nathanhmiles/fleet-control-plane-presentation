import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Risk } from '../../data-access/types/content.types';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-risk-card',
  templateUrl: './risk-card.component.html',
  imports: [TitleCasePipe],
  styles: [`
    .severity-high {
      background: #ef44441A;
      color: #ef4444;
      border-color: #ef4444;
    }
    .severity-low {
      background: #10b9811A;
      color: #10b981;
      border-color: #10b981;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskCardComponent {
  risk = input.required<Risk>();
}

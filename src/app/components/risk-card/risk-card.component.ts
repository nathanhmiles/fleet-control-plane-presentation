import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Risk } from '../../data-access/types/content.types';

@Component({
  selector: 'app-risk-card',
  templateUrl: './risk-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskCardComponent {
  risk = input.required<Risk>();
}

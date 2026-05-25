import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Phase } from '../../data-access/types/content.types';

@Component({
  selector: 'app-delivery-phase',
  templateUrl: './delivery-phase.component.html',
  styles: [`
    .phase-accent {
      border-left: 4px solid #3b82f6;
    }
    .phase-accent-text {
      color: #3b82f6;
    }
    .phase-accent-box {
      background: #3b82f61A;
      color: #3b82f6;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryPhaseComponent {
  phase = input.required<Phase>();
}

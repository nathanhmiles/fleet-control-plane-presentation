import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Phase } from '../../../../core/data-access/types/content.types';

@Component({
  selector: 'app-delivery-phase',
  templateUrl: './delivery-phase.component.html',
  styles: [
    `
      .phase-0 {
        --accent-color: #6b7280;
        --background-color: #6b72801a;
        --text-color: #6b7280;
      }
      .phase-1 {
        --accent-color: #3b82f6;
        --background-color: #3b82f61a;
        --text-color: #3b82f6;
      }
      .phase-2 {
        --accent-color: #10b981;
        --background-color: #10b9811a;
        --text-color: #10b981;
      }
      .phase-3 {
        --accent-color: #f59e0b;
        --background-color: #f59e0b1a;
        --text-color: #f59e0b;
      }
      .phase-4 {
        --accent-color: #8b5cf6;
        --background-color: #8b5cf61a;
        --text-color: #8b5cf6;
      }
      .phase-accent {
        border-left: 4px solid var(--accent-color);
      }
      .phase-accent-text {
        color: var(--accent-color);
      }
      .phase-accent-box {
        background: var(--background-color);
        color: var(--text-color);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryPhaseComponent {
  phase = input.required<Phase>();
}

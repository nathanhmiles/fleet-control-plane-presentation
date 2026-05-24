import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Phase } from '../../data-access/types/content.types';

@Component({
  selector: 'app-delivery-phase',
  templateUrl: './delivery-phase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryPhaseComponent {
  phase = input.required<Phase>();
}

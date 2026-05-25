import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Sprint } from '../../data-access/types/content.types';

@Component({
  selector: 'app-delivery-sprint',
  templateUrl: './delivery-sprint.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliverySprintComponent {
  sprint = input.required<Sprint>();
}

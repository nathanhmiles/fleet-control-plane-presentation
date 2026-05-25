import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Sprint } from '../../data-access/types/content.types';

@Component({
  selector: 'app-delivery-sprint',
  templateUrl: './delivery-sprint.component.html',
  styles: [`
    .sprint-accent {
      border-left: 4px solid #3b82f6;
    }
    .sprint-accent-text {
      color: #3b82f6;
    }
    .sprint-accent-box {
      background: #3b82f61A;
      color: #3b82f6;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliverySprintComponent {
  sprint = input.required<Sprint>();
}

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Principle } from '../../data-access/types/content.types';

@Component({
  selector: 'app-principle-item',
  template: `
    <li class="flex gap-2">
      <span class="text-muted">→</span>
      <span><strong>{{ principle().title }}:</strong> {{ principle().desc }}</span>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrincipleItemComponent {
  principle = input.required<Principle>();
}

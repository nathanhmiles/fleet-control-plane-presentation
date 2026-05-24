import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { Section } from '../../data-access/types/content.types';

@Component({
  selector: 'app-section-button',
  template: `
    <button
      class="tab-btn"
      [class.active]="isActive()"
      (click)="onSelect()">
      {{ section().label }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionButtonComponent {
  section = input.required<Section>();
  isActive = input(false);
  selected = output<string>();

  onSelect() {
    this.selected.emit(this.section().id);
  }
}

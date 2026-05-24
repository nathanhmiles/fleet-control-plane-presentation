import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { TechItem } from '../../data-access/types/content.types';

@Component({
  selector: 'app-tech-section',
  templateUrl: './tech-section-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechSectionCardComponent {
  item = input.required<TechItem>();
  isOpen = input(false);
  toggled = output<void>();

  onToggle() {
    this.toggled.emit();
  }
}

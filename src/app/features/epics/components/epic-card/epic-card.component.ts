import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Epic } from '../../../../core/data-access/types/content.types';

@Component({
  selector: 'app-epic-card',
  standalone: true,
  templateUrl: './epic-card.component.html',
  styleUrl: 'epic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpicCardComponent {
  epic = input.required<Epic>();
  index = input.required<number>();
  isOpen = input(false);
  toggled = output<string>();

  onToggle() {
    this.toggled.emit(this.epic().id);
  }
}

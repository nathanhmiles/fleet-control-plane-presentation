import { Component, inject } from '@angular/core';
import { EpicCardComponent } from '../../components/epic-card/epic-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../data-access/services/content.service';


@Component({
  selector: 'app-features-epics',
  imports: [EpicCardComponent],
  template: `
    <div>
      <p class="text-muted mb-4">
        Six epics cover the full problem space. Each maps directly to a user-facing capability.
        Foundation is explicitly scoped — it has no user-visible feature, but it's the prerequisite
        for everything else.
      </p>

      <div class="flex-col gap-2">
        @for (epic of EPICS(); track epic.id) {
          <app-epic-card
            [epic]="epic"
            [isOpen]="openEpic === epic.id"
            (toggled)="toggleEpic($event)"
          >
          </app-epic-card>
        }
      </div>
    </div>
  `,
})
export class FeaturesEpicsPageComponent {
  openEpic: string | null = null;

  private readonly _contentService = inject(ContentService);

  readonly EPICS = toSignal(this._contentService.getEpics());

  toggleEpic(id: string) {
    this.openEpic = this.openEpic === id ? null : id;
  }
}

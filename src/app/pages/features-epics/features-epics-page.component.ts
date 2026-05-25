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
        {{ EPICS().length }} epics covering the full project scope, mapping directly to user-facing capability.
        Foundation is explicitly scoped - while it has no user-visible feature it is the prerequisite
        for delivering the first vertical slice to the user.
      </p>

      <div class="flex-col gap-2">
        @for (epic of EPICS(); track epic.id; let i = $index) {
          <app-epic-card
            [epic]="epic"
            [index]="i"
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

  readonly EPICS = toSignal(this._contentService.getEpics(), { initialValue: []});

  toggleEpic(id: string) {
    this.openEpic = this.openEpic === id ? null : id;
  }
}

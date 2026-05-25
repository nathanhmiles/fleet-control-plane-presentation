import { Component, inject } from '@angular/core';
import { DeliverySprintComponent } from '../../components/delivery-sprint/delivery-sprint.component';
import { PrincipleItemComponent } from '../../components/principle-item/principle-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../data-access/services/content.service';


@Component({
  selector: 'app-delivery-plan',
  imports: [DeliverySprintComponent, PrincipleItemComponent],
  template: `
    <div>
      <p class="text-muted mb-4">
        Five sprints over fourteen weeks. Sprint 1 ends with something you can demo to a real
        operator.
      </p>

      <div class="box border-box mb-4">
        <h3 class="text-sm text-muted uppercase mt-0 mb-2">Sequencing principles</h3>
        <ul class="no-bullets pl-0 text-sm flex-col gap-2">
          @for (principle of PRINCIPLES(); track principle.title) {
            <app-principle-item [principle]="principle"></app-principle-item>
          }
        </ul>
      </div>

      <div class="flex gap-2 wrap mb-4">
        @for (p of SPRINTS(); track p.sprint; let i = $index) {
          <button
            class="btn border-box font-bold"
            (click)="setDelivery(i)"
            [style.border-color]="openDelivery === i ? p.color : '#ccc'"
            [style.background]="openDelivery === i ? p.color + '1A' : 'transparent'"
            [style.color]="openDelivery === i ? p.color : 'inherit'"
          >
            {{ p.sprint }}
          </button>
        }
      </div>

      @for (p of SPRINTS(); track p.sprint; let i = $index) {
        @if (openDelivery === i) {
          <app-delivery-sprint [sprint]="p"></app-delivery-sprint>
        }
      }
    </div>
  `,
})
export class DeliveryPlanPageComponent {
  openDelivery: number = 0;

  private readonly _contentService = inject(ContentService);

  readonly SPRINTS = toSignal(this._contentService.getSprints());

  readonly PRINCIPLES = toSignal(this._contentService.getPrinciples());

  setDelivery(index: number) {
    this.openDelivery = index;
  }
}

import { Component, inject } from '@angular/core';
import { DeliveryPhaseComponent } from '../../components/delivery-phase/delivery-phase.component';
import { PrincipleItemComponent } from '../../components/principle-item/principle-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../data-access/services/content.service';


@Component({
  selector: 'app-delivery-plan',
  imports: [DeliveryPhaseComponent, PrincipleItemComponent],
  template: `
    <div>
      <p class="text-muted mb-4">
        Four phases over fourteen weeks. Phase 1 ends with something you can demo to a real
        operator.
      </p>

      <div class="flex gap-2 wrap mb-4">
        @for (p of PHASES(); track p.phase; let i = $index) {
          <button
            class="btn border-box font-bold"
            (click)="setDelivery(i)"
            [style.border-color]="openDelivery === i ? p.color : '#ccc'"
            [style.background]="openDelivery === i ? p.color + '1A' : 'transparent'"
            [style.color]="openDelivery === i ? p.color : 'inherit'"
          >
            {{ p.phase }}
          </button>
        }
      </div>

      @for (p of PHASES(); track p.phase; let i = $index) {
        @if (openDelivery === i) {
          <app-delivery-phase [phase]="p"></app-delivery-phase>
        }
      }

      <div class="box border-box mt-4">
        <h3 class="text-sm text-muted uppercase mt-0 mb-2">Sequencing principles</h3>
        <ul class="no-bullets pl-0 text-sm flex-col gap-2">
          @for (principle of PRINCIPLES(); track principle.title) {
            <app-principle-item [principle]="principle"></app-principle-item>
          }
        </ul>
      </div>
    </div>
  `,
})
export class DeliveryPlanPageComponent {
  openDelivery: number = 0;

  private readonly _contentService = inject(ContentService);

  readonly PHASES = toSignal(this._contentService.getPhases());

  readonly PRINCIPLES = toSignal(this._contentService.getPrinciples());

  setDelivery(index: number) {
    this.openDelivery = index;
  }

}

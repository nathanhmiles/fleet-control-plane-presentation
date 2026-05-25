import { Component, inject } from '@angular/core';
import { DeliveryPhaseComponent } from '../../components/delivery-phase/delivery-phase.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../data-access/services/content.service';


@Component({
  selector: 'app-delivery-plan',
  imports: [DeliveryPhaseComponent],
  template: `
    <div>
      <p class="text-muted mb-4">
        {{ PHASES().length }} phases over fourteen weeks. Phase 1 ends with something you can demo to a real
        operator.
      </p>

      <div class="flex gap-2 wrap mb-4">
        @for (p of PHASES(); track p.phase; let i = $index) {
          <button
            class="btn border-box font-bold phase-{{ i }}"
            (click)="setDelivery(i)"
            [class.active]="openDelivery === i"
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
    </div>
  `,
  styles: [`
    .phase-0.active {
      border-color: #6b7280;
      background: #6b72801A;
      color: #6b7280;
    }
    .phase-1.active {
      border-color: #3b82f6;
      background: #3b82f61A;
      color: #3b82f6;
    }
    .phase-2.active {
      border-color: #10b981;
      background: #10b9811A;
      color: #10b981;
    }
    .phase-3.active {
      border-color: #f59e0b;
      background: #f59e0b1A;
      color: #f59e0b;
    }
    .phase-4.active {
      border-color: #8b5cf6;
      background: #8b5cf61A;
      color: #8b5cf6;
    }
  `]
})
export class DeliveryPlanPageComponent {
  openDelivery: number = 0;

  private readonly _contentService = inject(ContentService);

  readonly PHASES = toSignal(this._contentService.getPhases(), { initialValue: []});

  setDelivery(index: number) {
    this.openDelivery = index;
  }
}

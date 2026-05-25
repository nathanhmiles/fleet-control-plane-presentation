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
            class="btn border-box font-bold sprint-{{ i }}"
            (click)="setDelivery(i)"
            [class.active]="openDelivery === i"
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
  styles: [`
    .sprint-0.active {
      border-color: #6b7280;
      background: #6b72801A;
      color: #6b7280;
    }
    .sprint-1.active {
      border-color: #3b82f6;
      background: #3b82f61A;
      color: #3b82f6;
    }
    .sprint-2.active {
      border-color: #10b981;
      background: #10b9811A;
      color: #10b981;
    }
    .sprint-3.active {
      border-color: #f59e0b;
      background: #f59e0b1A;
      color: #f59e0b;
    }
    .sprint-4.active {
      border-color: #8b5cf6;
      background: #8b5cf61A;
      color: #8b5cf6;
    }
  `]
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

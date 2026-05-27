import { Component, inject } from '@angular/core';
import { TechSectionCardComponent } from '../../components/tech-section/tech-section-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../../../../core/data-access/services/content.service';


@Component({
  selector: 'app-technical-design',
  imports: [TechSectionCardComponent],
  template: `
    <div>
      <p class="text-muted mb-4">
        Every decision below has a rationale and an explicit account of alternatives considered and
        rejected. The goal is a clear, concise, performant and accessible frontend application that earns operator trust.
      </p>

      <div class="box border-box mb-4">
        <h3 class="text-sm text-muted uppercase mt-0 mb-2">Key dependency map</h3>
        <div class="grid">
          @for (d of DEPENDENCIES(); track d.label) {
            <div class="box border-box small-pad text-sm">
              @if (d.url) {
                <a [href]="d.url" target="_blank" class="font-bold font-mono no-underline hover-underline">{{ d.label }}</a>
              } @else {
                <div class="font-bold font-mono">{{ d.label }}</div>
              }
              <div class="text-muted">{{ d.role }}</div>
            </div>
          }
        </div>
      </div>

      <div class="flex-col gap-2">
        @for (item of TECH_SECTIONS(); track item.title; let i = $index) {
          <app-tech-section [item]="item" [isOpen]="openTech === i" (toggled)="toggleTech(i)">
          </app-tech-section>
        }
      </div>
    </div>
  `,
})
export class TechnicalDesignPageComponent {
  public openTech: number | null = null;

  private readonly _contentService = inject(ContentService);

  readonly TECH_SECTIONS = toSignal(this._contentService.getTechSections());

  readonly DEPENDENCIES = toSignal(this._contentService.getDependencies());

  public toggleTech(index: number) {
    this.openTech = this.openTech === index ? null : index;
  }
}

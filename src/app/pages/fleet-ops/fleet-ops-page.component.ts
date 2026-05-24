import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../data-access/services/content.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionButtonComponent } from '../../components/section-button/section-button.component';
import { EpicCardComponent } from '../../components/epic-card/epic-card.component';
import { TechSectionCardComponent } from '../../components/tech-section/tech-section-card.component';
import { DeliveryPhaseComponent } from '../../components/delivery-phase/delivery-phase.component';
import { PrincipleItemComponent } from '../../components/principle-item/principle-item.component';
import { RiskCardComponent } from '../../components/risk-card/risk-card.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-fleet-ops',
  imports: [
    SectionButtonComponent,
    RiskCardComponent,
    RouterOutlet
  ],
  templateUrl: 'fleet-ops-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetOpsPageComponent {
  active = 'epics';

  private readonly _contentService = inject(ContentService);
  private readonly _router = inject(Router);



  handleSelectSection(sectionId: string) {
    this._router.navigate(['/', sectionId])
  }

  readonly SECTIONS = toSignal(this._contentService.getSections());

  readonly RISKS = toSignal(this._contentService.getRisks());
}

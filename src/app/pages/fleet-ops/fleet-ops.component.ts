import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../data-access/services/content.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionButtonComponent } from '../../components/section-button/section-button.component';
import { EpicCardComponent } from '../../components/epic-card/epic-card.component';
import { TechSectionCardComponent } from '../../components/tech-section/tech-section-card.component';
import { DeliveryPhaseComponent } from '../../components/delivery-phase/delivery-phase.component';
import { PrincipleItemComponent } from '../../components/principle-item/principle-item.component';
import { RiskCardComponent } from '../../components/risk-card/risk-card.component';

@Component({
  selector: 'app-fleet-ops',
  imports: [
    SectionButtonComponent,
    EpicCardComponent,
    TechSectionCardComponent,
    DeliveryPhaseComponent,
    PrincipleItemComponent,
    RiskCardComponent
  ],
  templateUrl: 'fleet-ops.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetOpsComponent {
  active = 'epics';
  openEpic: string | null = null;
  openTech: number | null = null;
  openDelivery: number = 0;

  private readonly _contentService = inject(ContentService);

  toggleEpic(id: string) {
    this.openEpic = this.openEpic === id ? null : id;
  }
  toggleTech(index: number) {
    this.openTech = this.openTech === index ? null : index;
  }
  setDelivery(index: number) {
    this.openDelivery = index;
  }

  readonly SECTIONS = toSignal(this._contentService.getSections());

  readonly EPICS = toSignal(this._contentService.getEpics());

  readonly TECH_SECTIONS = toSignal(this._contentService.getTechSections());

  readonly DEPENDENCIES = toSignal(this._contentService.getDependencies());

  readonly PHASES = toSignal(this._contentService.getPhases());

  readonly PRINCIPLES = toSignal(this._contentService.getPrinciples());

  readonly RISKS = toSignal(this._contentService.getRisks());
}

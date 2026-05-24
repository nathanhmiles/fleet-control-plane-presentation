import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../data-access/services/content.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionButtonComponent } from '../../components/section-button/section-button.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-sections-container',
  imports: [SectionButtonComponent, RouterOutlet],
  templateUrl: 'sections-container-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsContainerPageComponent {
  private readonly _contentService = inject(ContentService);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  public activeRoute = toSignal(
    this._router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() =>
        this._activatedRoute.firstChild?.snapshot.url
          .map((s) => s.path)
          .join('/') ?? ''
      ),
      tap(console.log)
    ),
    { initialValue: '' }
  );

  handleSelectSection(sectionId: string) {
    this._router.navigate(['/', sectionId]);
  }

  readonly SECTIONS = toSignal(this._contentService.getSections());
}

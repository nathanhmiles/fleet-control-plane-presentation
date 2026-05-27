import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/pages/sections-container/sections-container-page.component').then(
        (m) => m.SectionsContainerPageComponent
      ),
    children: [
      {
        path: 'epics',
        loadComponent: () =>
          import('./features/epics/pages/features-epics/features-epics-page.component').then(
            (m) => m.FeaturesEpicsPageComponent
          )
      },
      {
        path: 'tech',
        loadComponent: () =>
          import('./features/technical-design/pages/technical-design/technical-design-page.component').then(
            (m) => m.TechnicalDesignPageComponent
          )
      },
      {
        path: 'delivery',
        loadComponent: () =>
          import('./features/delivery-plan/pages/delivery-plan/delivery-plan-page.component').then(
            (m) => m.DeliveryPlanPageComponent
          )
      },
      {
        path: 'risks',
        loadComponent: () =>
          import('./features/risks/pages/risks-page/risks-page.component').then(
            (m) => m.RisksPageComponent
          )
      },
      {
        path: '**',
        redirectTo: 'epics'
      }
    ]
  }
];

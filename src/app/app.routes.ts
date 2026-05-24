import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/fleet-ops/fleet-ops-page.component').then(
        (m) => m.FleetOpsPageComponent
      ),
    children: [
      {
        path: 'epics',
        loadComponent: () =>
          import('./pages/features-epics/features-epics-page.component').then(
            (m) => m.FeaturesEpicsPageComponent
          )
      },
      {
        path: 'tech',
        loadComponent: () =>
          import('./pages/technical-design/technical-design-page.component').then(
            (m) => m.TechnicalDesignPageComponent
          )
      },
      // {
      //   path: 'delivery-plan'
      // },
      // {
      //   path: 'risks'
      // }
      {
        path: '**',
        redirectTo: 'epics'
      }
    ]
  }
];

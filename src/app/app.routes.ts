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
      // {
      //   path: 'technical-design'
      // },
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

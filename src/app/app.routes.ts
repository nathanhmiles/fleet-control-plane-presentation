import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/fleet-ops/fleet-ops.component').then(
        (m) => m.FleetOpsComponent
      )
  }
];

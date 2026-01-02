import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/user-profile/user-profile').then((m) => m.UserProfile),
  },
  {
    path: '',
    redirectTo: '/profile',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/profile',
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'distance',
    loadComponent: () => import('./distance/distance.page').then( m => m.DistancePage)
  },
  {
    path: 'merci',
    loadComponent: () => import('./merci/merci.page').then( m => m.MerciPage)
  },
];

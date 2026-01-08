import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'artistas',
    loadComponent: () =>
      import('./artistas/artistas.page').then(m => m.ArtistasPage),
  },
  {
    path: '',
    redirectTo: 'artistas',
    pathMatch: 'full',
  },
];

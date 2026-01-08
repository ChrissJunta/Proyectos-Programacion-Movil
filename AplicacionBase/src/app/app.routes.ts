import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
  },

  {
    path: 'firebase-users',
    loadComponent: () =>
      import('./firebase-users/firebase-users.page')
        .then(m => m.FirebaseUsersPage),
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

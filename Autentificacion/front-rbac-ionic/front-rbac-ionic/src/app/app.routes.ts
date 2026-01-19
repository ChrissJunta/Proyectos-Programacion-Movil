import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ownerGuard } from './guards/owner.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'artista',
    loadComponent: () => import('./artista/artista.page').then((m) => m.ArtistaPage),
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./usuarios/usuarios.page').then((m) => m.UsuariosPage),
    canActivate: [authGuard, ownerGuard], // 👈 solo db_owner (sa)
  },
];

import { canActivate } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authDeactivateGuard } from './guards/auth-deactivate.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () =>
      import('./pages/splash/splash.page').then((m) => m.SplashPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
    canActivate: [authGuard],
    canDeactivate: [authDeactivateGuard],
  },  {
    path: 'cosas-lindas',
    loadComponent: () => import('./pages/cosas-lindas/cosas-lindas.page').then( m => m.CosasLindasPage)
  },
  {
    path: 'cosas-feas',
    loadComponent: () => import('./pages/cosas-feas/cosas-feas.page').then( m => m.CosasFeasPage)
  },

];

// TEngo que hacer que valide el ingreso en login
// y tambien tengo que permitir para cerrar sesion

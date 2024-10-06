import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { UsersService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonButton, IonIcon, IonApp, IonRouterOutlet],
})
export class AppComponent {
  public router: Router = inject(Router);
  private auth: UsersService = inject(UsersService);
  constructor() {
    this.router.navigateByUrl('splash');
  }
  ionViewDitEnter() {
    SplashScreen.hide();
  }
  cerrarSesion() {
    console.log('entro');
    this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}

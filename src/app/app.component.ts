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
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonApp, IonRouterOutlet],
})
export class AppComponent {
  public router: Router = inject(Router);
  public auth: UsersService = inject(UsersService);
  constructor() {
    this.router.navigateByUrl('splash');
  }
  ionViewDitEnter() {
    SplashScreen.hide();
  }
  async cerrarSesion() {
    await this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}

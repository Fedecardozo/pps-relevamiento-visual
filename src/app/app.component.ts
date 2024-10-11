import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonIcon,
  IonButton,
  IonHeader,
  IonContent,
} from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { UsersService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonButton, IonIcon, IonApp, IonRouterOutlet],
})
export class AppComponent {
  public router: Router = inject(Router);

  constructor() {
    this.router.navigateByUrl('splash');
  }
  ionViewDitEnter() {
    SplashScreen.hide();
  }
}

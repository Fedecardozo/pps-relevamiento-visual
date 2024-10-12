import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonIcon,
  IonButton,
  IonHeader,
  IonContent,
  IonSpinner,
} from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { UsersService } from './services/user.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonContent,
    IonHeader,
    IonButton,
    IonIcon,
    IonApp,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public router: Router = inject(Router);
  public util: UtilsService = inject(UtilsService);

  constructor() {}
  ngOnInit(): void {
    this.router.navigateByUrl('splash');
  }
  ionViewDitEnter() {
    SplashScreen.hide();
  }
}

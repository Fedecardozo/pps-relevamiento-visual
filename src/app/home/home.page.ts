import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabButton,
  IonButton,
} from '@ionic/angular/standalone';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonTabButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
  ],
})
export class HomePage {
  constructor() {}
  auth: UsersService = inject(UsersService);
  router: Router = inject(Router);

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}

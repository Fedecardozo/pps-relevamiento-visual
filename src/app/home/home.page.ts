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
import { UtilsService } from '../services/utils.service';

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
  router: Router = inject(Router);
  utils: UtilsService = inject(UtilsService);
  img: string | undefined = '';

  subirCosasLindas() {
    this.takeImage('Subir una foto para cosas lindas');
  }

  subirCosasFeas() {
    this.takeImage('Subir una foto para cosas Feas');
  }
  //Tomar o seleccionar una imagen
  async takeImage(title: string) {
    this.img = (await this.utils.takePicture(title)).dataUrl;
  }
}

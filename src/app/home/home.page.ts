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
import { FirebaseService } from '../services/firebase.service';

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
  userService: UsersService = inject(UsersService);
  utils: UtilsService = inject(UtilsService);
  fire: FirebaseService = inject(FirebaseService);
  imgUrl: string | undefined = '';

  subirCosasLindas() {
    this.takeImage('Subir una foto para cosas lindas').then(() => {
      let path = `/CosasLindas/${this.userService.correo}/${Date.now()}`;
      if (this.imgUrl) {
        this.fire.uploadImage(path, this.imgUrl);
      }
    });
  }

  subirCosasFeas() {
    this.takeImage('Subir una foto para cosas Feas').then(() => {
      let path = `/CosasFeas/${this.userService.correo}/${Date.now()}`;
      if (this.imgUrl) {
        this.fire.uploadImage(path, this.imgUrl);
      }
    });
  }
  //Tomar o seleccionar una imagen
  async takeImage(title: string) {
    this.imgUrl = (await this.utils.takePicture(title)).dataUrl;
  }
}

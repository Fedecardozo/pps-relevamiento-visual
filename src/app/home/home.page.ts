import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { Imagen } from '../modals/imagen';

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
  public auth: UsersService = inject(UsersService);
  public router: Router = inject(Router);
  imgUrl: string | undefined = '';
  utils: UtilsService = inject(UtilsService);
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);

  ngOnInit(): void {
    console.log(this.auth.correo);
  }

  //Tomar o seleccionar una imagen
  async takeImage(title: string) {
    this.imgUrl = (await this.utils.takePicture(title)).dataUrl;
  }

  subirCosasLindas() {
    this.takeImage('Subir una foto para cosas lindas').then(() => {
      const idUrl: number = Date.now();
      const path: string = `/CosasLindas/${idUrl}`;

      this.subirDatabaseStorage(path, idUrl, 'imagenes_lindas');
    });
  }

  subirCosasFeas() {
    this.takeImage('Subir una foto para cosas feas').then(() => {
      const idUrl: number = Date.now();
      const path: string = `/CosasFeas/${idUrl}`;

      this.subirDatabaseStorage(path, idUrl, 'imagenes_feas');
    });
  }

  subirDatabaseStorage(path: string, idUrl: number, collectioName: string) {
    if (this.imgUrl) {
      this.fire.uploadImage(path, this.imgUrl).then((res) => {
        if (res && this.userService.correo && this.imgUrl) {
          const imagen: Imagen = new Imagen(
            this.userService.correo,
            idUrl,
            this.imgUrl
          );
          this.fire.agregarImagenDb(imagen, collectioName);
          console.log(imagen);
        }
      });
    }
  }

  async cerrarSesion() {
    await this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}

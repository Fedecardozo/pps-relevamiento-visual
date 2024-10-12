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
import { Alert } from '../modals/alert';

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
    // console.log(this.auth.correo);
  }

  //Tomar o seleccionar una imagen
  async takeImage(title: string) {
    this.imgUrl = (await this.utils.takePicture(title)).dataUrl;
  }

  subirCosasLindas() {
    this.takeImage('Subir una foto para cosas lindas').then(async () => {
      const idUrl: number = Date.now();
      const path: string = `/CosasLindas/${idUrl}`;

      if (await this.subirDatabaseStorage(path, idUrl, 'imagenes_lindas')) {
        Alert.error('Se subio correctamente', '');
        this.router.navigateByUrl('/cosas-lindas');
      } else {
        Alert.error('Error', 'hubo un error al cargar la imagen');
      }
    });
  }

  subirCosasFeas() {
    this.takeImage('Subir una foto para cosas feas').then(async () => {
      const idUrl: number = Date.now();
      const path: string = `/CosasFeas/${idUrl}`;

      if (await this.subirDatabaseStorage(path, idUrl, 'imagenes_feas')) {
        Alert.error('Se subio correctamente', '');
        this.router.navigateByUrl('/cosas-feas');
      } else {
        Alert.error('Error', 'hubo un error al cargar la imagen');
      }
    });
  }

  async subirDatabaseStorage(
    path: string,
    idUrl: number,
    collectioName: string
  ): Promise<boolean> {
    let retorno: boolean = false;
    if (this.imgUrl) {
      await this.fire.uploadImage(path, this.imgUrl).then(async (res) => {
        if (res && this.userService.correo && this.imgUrl) {
          const imagen: Imagen = new Imagen(
            this.userService.correo,
            idUrl,
            this.imgUrl
          );
          await this.fire.agregarImagenDb(imagen, collectioName);
          retorno = imagen ? true : false;
        }
      });
    }
    return retorno;
  }

  async cerrarSesion() {
    await this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}

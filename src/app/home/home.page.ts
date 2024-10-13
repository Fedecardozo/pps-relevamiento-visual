import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabButton,
  IonButton,
  IonSpinner,
  IonFab,
  IonFabButton,
  IonIcon,
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
    IonIcon,
    IonFabButton,
    IonFab,
    IonSpinner,
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
  ocultarHome: boolean = false;

  //Cuando termine borrar esta linea onit
  // ngOnInit(): void {
  //   this.router.navigateByUrl('/cosas-lindas');
  // }

  //Tomar o seleccionar una imagen
  async takeImage() {
    this.imgUrl = (await this.utils.takePicture()).dataUrl;
  }

  subirCosasLindas() {
    this.takeImage().then(async () => {
      const idUrl: number = Date.now();
      const path: string = `/CosasLindas/${idUrl}`;

      if (await this.subirDatabaseStorage(path, idUrl, 'imagenes_lindas')) {
        Alert.bien('Se subio correctamente', '').then((res) => {
          if (res.isConfirmed) {
            this.router.navigateByUrl('/cosas-lindas');
            this.ocultarHome = false;
          }
        });
      } else {
        Alert.error(
          'Intentelo nuevamente',
          'hubo un error al cargar la imagen'
        ).then((res) => {
          if (res.isConfirmed) this.ocultarHome = false;
        });
      }
    });
  }

  subirCosasFeas() {
    this.takeImage().then(async () => {
      const idUrl: number = Date.now();
      const path: string = `/CosasFeas/${idUrl}`;

      if (await this.subirDatabaseStorage(path, idUrl, 'imagenes_feas')) {
        Alert.bien('Se subio correctamente', '').then((res) => {
          if (res.isConfirmed) {
            this.router.navigateByUrl('/cosas-feas');
            this.ocultarHome = false;
          }
        });
      } else {
        Alert.error(
          'Intentelo nuevamente',
          'hubo un error al cargar la imagen'
        ).then((res) => {
          if (res.isConfirmed) this.ocultarHome = false;
        });
      }
    });
  }

  async subirDatabaseStorage(
    path: string,
    idUrl: number,
    collectioName: string
  ): Promise<boolean> {
    let retorno: boolean = false;
    this.utils.mostrarSpinner('Subiendo imagen...');
    this.ocultarHome = true;

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
          this.utils.ocultarSpinner();
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

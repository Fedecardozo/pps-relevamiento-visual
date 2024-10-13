import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFabButton,
  IonFab,
} from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Alert } from 'src/app/modals/alert';
import { Imagen } from 'src/app/modals/imagen';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  standalone: true,
  imports: [
    IonFab,
    IonFabButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CamaraPage {
  public auth: UsersService = inject(UsersService);
  imgUrl: string | undefined = '';
  utils: UtilsService = inject(UtilsService);
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);
  @Input() cosas: string = 'lindas';
  @Input() cosasCapitalize: string = 'Lindas';

  //Tomar o seleccionar una imagen
  async takeImage() {
    this.imgUrl = (await this.utils.takePicture()).dataUrl;
    // console.log(this.imgUrl);
  }

  subirCosas() {
    this.takeImage().then(async () => {
      const idUrl: number = Date.now();
      const path: string = `/Cosas${this.cosasCapitalize}/${idUrl}`;

      if (
        await this.subirDatabaseStorage(path, idUrl, `imagenes_${this.cosas}`)
      ) {
        Alert.bien('Se subio correctamente', '');
      } else {
        Alert.error(
          'Intentelo nuevamente',
          'hubo un error al cargar la imagen'
        );
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

    if (this.imgUrl) {
      await this.fire.uploadImage(path, this.imgUrl).then(async (res) => {
        if (res && this.userService.correo && this.imgUrl) {
          const imagen: Imagen = new Imagen(
            this.userService.correo,
            idUrl,
            res
          );
          await this.fire.agregarImagenDb(imagen, collectioName);
          retorno = imagen ? true : false;
          this.utils.ocultarSpinner();
        }
      });
    }
    return retorno;
  }
}

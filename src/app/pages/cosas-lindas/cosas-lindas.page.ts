import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonTabButton,
  IonCol,
  IonRow,
} from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Imagen } from 'src/app/modals/imagen';
@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCol,
    IonTabButton,
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CosasLindasPage implements OnInit {
  userService: UsersService = inject(UsersService);
  utils: UtilsService = inject(UtilsService);
  fire: FirebaseService = inject(FirebaseService);
  imgUrl: string | undefined = '';
  listImg: Imagen[] = [];

  constructor() {}

  ngOnInit() {
    this.fire.getImages(this.listImg, '/CosasLindas');
  }

  subirCosasLindas() {
    this.takeImage('Subir una foto para cosas lindas').then(() => {
      let path = `/CosasLindas/${this.userService.correo}/${Date.now()}`;
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

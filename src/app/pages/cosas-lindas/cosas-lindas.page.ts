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
  IonSpinner,
} from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Imagen } from 'src/app/modals/imagen';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CamaraPage } from '../../components/camara/camara.page';
@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
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
    RouterLink,
    CamaraPage,
  ],
})
export class CosasLindasPage implements OnInit {
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  imagenes: Imagen[] = [];
  sub?: Subscription;

  constructor() {}

  ngOnInit() {
    //imagenes a mostrar
    this.util.mostrarSpinner('Cargando cosas lindas...');
    this.obtenerImagenes();
    console.log(this.imagenes);
  }

  obtenerImagenes() {
    this.sub = this.fire
      .getImagenes()
      .valueChanges()
      .subscribe((next) => {
        const aux: Imagen[] = next as Imagen[];
        aux.forEach((item) => {
          //solo cargo las que no son del usuario
          if (item.usuario !== this.userService.correo) {
            const img: Imagen = new Imagen(item.usuario, item.fecha, item.path);
            this.imagenes.push(img);
            if (item.likes && item.likes.length) {
              img.setLike(item.likes);
            }
          }
        });
        this.imagenes.sort((a, b) => b.fecha - a.fecha);
        if (this.imagenes.length) {
          this.util.ocultarSpinner();
          this.sub?.unsubscribe();
        } else this.util.ocultarSpinner();
      });
  }

  agregarLike(imagen: Imagen) {
    imagen.addLike(this.userService.correo || '');
    this.fire.updateImg(imagen);
  }

  quitarLike(imagen: Imagen) {
    imagen.removeLike(this.userService.correo || '');
    this.fire.updateImg(imagen);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

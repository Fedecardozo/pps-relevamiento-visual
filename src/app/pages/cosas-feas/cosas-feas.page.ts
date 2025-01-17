import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
  IonRow,
} from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';
import { UsersService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Imagen } from 'src/app/modals/imagen';
import { Subscription } from 'rxjs';
import { CamaraPage } from '../../components/camara/camara.page';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonButton,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CamaraPage,
    RouterLink,
  ],
})
export class CosasFeasPage implements OnInit {
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  imagenes: Imagen[] = [];
  sub?: Subscription;
  lower: string = 'feas';
  capitalize: string = 'Feas';

  constructor() {}

  ngOnInit() {
    //imagenes a mostrar
    this.util.mostrarSpinner('Cargando cosas feas...');
    this.obtenerImagenes();
    console.log(this.imagenes);
  }

  obtenerImagenes() {
    this.sub = this.fire
      .getImagenes(this.lower)
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
    this.fire.updateImg(imagen, this.lower);
  }

  quitarLike(imagen: Imagen) {
    imagen.removeLike(this.userService.correo || '');
    this.fire.updateImg(imagen, this.lower);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

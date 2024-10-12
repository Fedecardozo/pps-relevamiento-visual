import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
} from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Imagen } from 'src/app/modals/imagen';
import { UsersService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-imagenes',
  templateUrl: './mis-imagenes.page.html',
  styleUrls: ['./mis-imagenes.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardContent,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class MisImagenesPage implements OnInit {
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  imagenes: Imagen[] = [];
  sub?: Subscription;
  constructor() {}

  ngOnInit() {
    //imagenes a mostrar
    this.util.mostrarSpinner('Cargando imagenes...');
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
          //Solo cargo las que son del usuario
          if (item.usuario === this.userService.correo)
            this.imagenes.push(new Imagen(item.usuario, item.fecha, item.path));
        });
        this.imagenes.sort((a, b) => b.fecha - a.fecha);
        if (this.imagenes.length) {
          this.util.ocultarSpinner();
        }
      });
  }

  ngOnDestroy(): void {
    console.log('ejecuto destroy');
    this.sub?.unsubscribe();
  }
}

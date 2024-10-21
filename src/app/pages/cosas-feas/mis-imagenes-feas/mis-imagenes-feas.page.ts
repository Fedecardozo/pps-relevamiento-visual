import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonRow,
} from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Imagen } from 'src/app/modals/imagen';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-imagenes-feas',
  templateUrl: './mis-imagenes-feas.page.html',
  styleUrls: ['./mis-imagenes-feas.page.scss'],
  standalone: true,
  imports: [
    IonRow,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class MisImagenesFeasPage {
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  imagenes: Imagen[] = [];
  sub?: Subscription;
  constructor() {}

  ngOnInit() {
    //imagenes a mostrar
    this.util.mostrarSpinner('Cargando imágenes...');
    this.obtenerImagenes();
  }

  obtenerImagenes() {
    this.sub = this.fire
      .getImagenes('feas')
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
        } else this.util.ocultarSpinner();
      });
  }

  ngOnDestroy(): void {
    console.log('ejecuto destroy');
    this.sub?.unsubscribe();
  }
}

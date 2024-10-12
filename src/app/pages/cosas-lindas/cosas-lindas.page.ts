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
import { RouterLink } from '@angular/router';
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
    RouterLink,
  ],
})
export class CosasLindasPage implements OnInit {
  userService: UsersService = inject(UsersService);
  fire: FirebaseService = inject(FirebaseService);

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.fire.sub?.unsubscribe();
  }
}

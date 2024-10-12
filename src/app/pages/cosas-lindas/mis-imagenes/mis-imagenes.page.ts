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
  ],
})
export class MisImagenesPage implements OnInit {
  fire: FirebaseService = inject(FirebaseService);

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {}
}

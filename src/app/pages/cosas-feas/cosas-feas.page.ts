import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { UtilsService } from 'src/app/services/utils.service';
import { UsersService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CosasFeasPage implements OnInit {
  userService: UsersService = inject(UsersService);
  utils: UtilsService = inject(UtilsService);
  fire: FirebaseService = inject(FirebaseService);
  imgUrl: string | undefined = '';
  constructor() {}

  ngOnInit() {}
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonInput,
  IonAlert,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonInput,
    IonButton,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class LoginPage implements OnInit {
  private userService: UsersService = inject(UsersService);

  constructor() {}

  usuarios: Object[] = [
    { correo: 'fede@gmail.com', password: '123456' },
    { correo: 'luna@gmail.com', password: '123456' },
    { correo: 'clari@gmail.com', password: '123456' },
  ];
  correo: string = '';
  password: string = '';
  text: string = '';
  private router = inject(Router);

  ngOnInit(): void {
    if (this.userService.correo !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  acceder() {
    this.userService
      .login(this.correo, this.password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch(() => {
        //Muestro un alert de que no esta registrado
        console.log(
          'No se encuentra registrado',
          'Verifique correo y contraseña ingresadas'
        );
      });
  }

  cargaUsuario(user: any) {
    this.correo = user.correo;
    this.password = user.password;
  }
}

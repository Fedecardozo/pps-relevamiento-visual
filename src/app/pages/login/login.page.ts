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
import { UserService } from 'src/app/services/user.service';
import { Router, RouterLink } from '@angular/router';

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
  constructor(private userService: UserService) {}

  ngOnInit() {}
  usuarios: Object[] = [
    { correo: 'fede@gmail.com', password: '123456' },
    { correo: 'luna@gmail.com', password: '123456' },
    { correo: 'clari@gmail.com', password: '123456' },
  ];
  correo: string = '';
  password: string = '';
  text: string = '';
  private router = inject(Router);
  validarSesion() {
    this.userService
      .login(this.correo, this.password)
      .then((response) => {
        console.log(response);
        this.router.navigateByUrl('/main');
      })
      .catch((error) => console.log(error));
  }

  cargaUsuario(user: any) {
    this.correo = user.correo;
    this.password = user.password;
  }
}

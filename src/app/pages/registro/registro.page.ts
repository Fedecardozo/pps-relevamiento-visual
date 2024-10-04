import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class RegistroPage {
  constructor(private userService: UserService) {}

  ngOnInit() {}
  private router = inject(Router);

  email: string = '';
  clave: string = '';
  clave2: string = '';
  clase: string = '';
  msj: string = 'Complete el siguiente formulario con sus datos personales.';
  exito: string = '';

  validarCampos() {
    if (this.email == '' || this.clave == '' || this.clave2 == '') {
      this.clase = 'text-red';
      this.msj = 'Error! Hay campos vacios!';
    } else if (this.clave.length < 6 || this.clave2.length < 6) {
      this.clase = 'text-red';
      this.msj = 'Error! La contraseña debe contener minimo 6 caracteres';
    } else if (this.clave != this.clave2) {
      this.clase = 'text-red';
      this.msj = 'Error! Las contraseñas no coinciden!';
    } else if (!this.isValidEmail(this.email)) {
      this.clase = 'text-red';
      this.msj = 'Error! No es un correo valido!';
    } else {
      this.userService
        .registro(this.email, this.clave)
        .then(() => {
          this.msj = 'Se registro exitosamente!';
          this.exito = ' Redirigiendo al login...';
          this.clase = 'text-green';
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        })
        .catch(() => {
          this.clase = 'text-red';
          this.msj = 'Ya se encuentra registrado el email';
        });
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}

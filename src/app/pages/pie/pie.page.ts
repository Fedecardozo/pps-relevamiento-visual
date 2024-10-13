import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
} from '@ionic/angular/standalone';
import { Chart, ChartType } from 'chart.js/auto';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Imagen } from 'src/app/modals/imagen';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.page.html',
  styleUrls: ['./pie.page.scss'],
  standalone: true,
  imports: [
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
export class PiePage {
  chart?: Chart;
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  imagenes: Imagen[] = [];
  sub?: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.util.mostrarSpinner('Obteniendo datos...');
    this.getDatos();
  }

  crearChart() {
    // Datos
    const data = {
      datasets: [
        {
          label: 'Cantidad de votos: ',
          data: Imagen.gerArrayLikes(this.imagenes).slice(0, 7),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 207, 0.8)',
          ],
          borderColor: [
            'rgba(255, 255, 255, 1)', // Bordes blancos para mejor visibilidad
          ],
          borderWidth: 2, // Grosor de los bordes
          hoverOffset: 4, // Efecto de desplazamiento al hacer hover
        },
      ],
    };

    // Opciones para estilizar el gráfico
    const options = {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#fff', // Color blanco para las etiquetas de la leyenda
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para los tooltips
          titleColor: '#fff', // Color de texto en los tooltips
          bodyColor: '#fff',
        },
      },
      layout: {
        padding: 20, // Padding alrededor del gráfico
      },
      backgroundColor: 'transparent', // Fondo transparente
    };

    // Creamos la gráfica
    this.chart = new Chart('chart', {
      type: 'pie' as ChartType, // Tipo de gráfica de torta
      data, // Datos
      options, // Opciones para el diseño
    });
  }

  getDatos() {
    this.sub = this.fire
      .getImagenes()
      .valueChanges()
      .subscribe((next) => {
        const aux: Imagen[] = next as Imagen[];
        aux.forEach((item) => {
          const img: Imagen = new Imagen(item.usuario, item.fecha, item.path);
          this.imagenes.push(img);
          img.setLike(item.likes);
        });
        if (this.imagenes.length) {
          Imagen.ordenarPorLikes(this.imagenes);
          this.crearChart();
          this.util.ocultarSpinner();
        } else this.util.ocultarSpinner();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

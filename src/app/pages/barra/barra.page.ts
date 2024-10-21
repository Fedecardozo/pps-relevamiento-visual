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
  selector: 'app-barra',
  templateUrl: './barra.page.html',
  styleUrls: ['./barra.page.scss'],
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
export class BarraPage implements OnInit {
  chart?: Chart;
  fire: FirebaseService = inject(FirebaseService);
  util: UtilsService = inject(UtilsService);
  imagenes: Imagen[] = [];
  sub?: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.util.mostrarSpinner('Cargando grafico...');
    this.getDatos();
  }

  crearChart() {
    const labels = this.createSequentialArray(this.imagenes).slice(0, 7);

    // datos
    const data = {
      labels: labels,
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
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 2,
        },
      ],
    };

    // Opciones para estilizar el gráfico
    const options = {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: '#fff', // Cambia el color de las etiquetas en el eje X
          },
          grid: {
            display: false, // Quita las líneas del grid en el eje X
          },
        },
        y: {
          ticks: {
            color: '#fff', // Cambia el color de las etiquetas en el eje Y
          },
          grid: {
            color: '#444', // Líneas del grid en un gris oscuro
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff', // Color de las etiquetas de la leyenda
          },
        },
      },
      layout: {
        padding: 20, // Añadir algo de padding alrededor
      },
      backgroundColor: 'transparent', // Fondo transparente
    };

    // Creamos la gráfica
    this.chart = new Chart('chart', {
      type: 'bar' as ChartType, // Tipo de gráfica
      data, // Datos
      options, // Opciones para estilizar
    });
  }

  getDatos() {
    this.sub = this.fire
      .getImagenes('feas')
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

  createSequentialArray(baseArray: any[]): string[] {
    // Creamos un array con la misma longitud que baseArray y lo llenamos con números secuenciales
    return Array.from({ length: baseArray.length }, (_, i) =>
      (i + 1).toString()
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

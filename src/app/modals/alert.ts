import Swal from 'sweetalert2';

export class Alert {
  static error(titulo: string, texto: string) {
    Swal.fire({
      heightAuto: false,
      icon: 'error',
      title: titulo,
      text: texto,
    });
  }
}

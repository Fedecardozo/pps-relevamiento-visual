import Swal, { SweetAlertOptions } from 'sweetalert2';

export class Alert {
  private static base: SweetAlertOptions = {
    heightAuto: false,
    backdrop: true, // Esta opción asegura que el fondo sea oscuro
    allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    confirmButtonText: 'Aceptar',
    showConfirmButton: false,
    background: '#310a6b',
    color: '#f5f2ff',
    timer: 2100,
    customClass: {
      confirmButton: 'btn-ok',
      title: 'alert-title',
    },
  };

  static error(titulo: string, texto: string) {
    const alert = Swal.fire(Alert.base);
    Swal.update({
      icon: 'error',
      title: titulo,
      text: texto,
    });

    return alert;
  }

  static bien(titulo: string, texto: string) {
    const alert = Swal.fire(Alert.base);
    Swal.update({
      icon: 'success',
      title: titulo,
      text: texto,
    });

    return alert;
  }
}

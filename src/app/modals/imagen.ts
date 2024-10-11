export class Imagen {
  usuario: string;
  fecha: string;
  path: string;
  fechaNumber: number;

  constructor(usuario: string, fecha: string, path: string) {
    this.usuario = usuario;
    this.fecha = this.convertirFecha(new Date(Number.parseInt(fecha)));
    this.path = path;
    this.fechaNumber = Number.parseInt(fecha);
  }

  convertirFecha(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

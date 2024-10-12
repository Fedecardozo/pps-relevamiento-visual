export class Imagen {
  usuario: string;
  fecha: number;
  path: string;

  constructor(usuario: string, fecha: number, path: string) {
    this.usuario = usuario;
    this.fecha = fecha;
    this.path = path;
  }

  convertirFecha() {
    const date: Date = new Date(this.fecha);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

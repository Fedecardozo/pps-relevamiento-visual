export class Imagen {
  usuario: string;
  fecha: number;
  path: string;
  likes: string[];

  constructor(usuario: string, fecha: number, path: string) {
    this.usuario = usuario;
    this.fecha = fecha;
    this.path = path;
    this.likes = [];
  }

  getLike(correo: string) {
    const index: number = this.likes.indexOf(correo);
    if (index >= 0) return this.likes[index];
    else return null;
  }

  addLike(correo: string) {
    this.likes.push(correo);
    return this.likes;
  }

  removeLike(correo: string) {
    const index: number = this.likes.indexOf(correo);
    if (index >= 0) this.likes.splice(index, 1);
    return this.likes;
  }

  setLike(likes: string[]) {
    this.likes = likes;
  }

  convertirFecha() {
    const date: Date = new Date(this.fecha);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses van de 0 a 11
    const day = date.getDate();
    const hours = date.getHours();
    const auxMinutes = date.getMinutes();
    const minutes = auxMinutes < 10 ? '0' + auxMinutes : auxMinutes;
    const seconds = date.getSeconds();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  toStringFecha() {
    const date: Date = new Date(this.fecha);
    return date.toDateString();
  }
}

import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  listAll,
} from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { Imagen } from '../modals/imagen';
import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  private app: string = '/RelevamientoVisual';
  storage: AngularFireStorage = inject(AngularFireStorage);
  termino: boolean = false;
  user: UsersService = inject(UsersService);
  misImgs: Imagen[] = [];
  array: Imagen[] = [];
  sub?: Subscription;

  async uploadImage(path: string, data_url: string) {
    const newPath = this.app + path;
    return uploadString(ref(getStorage(), newPath), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), newPath));
      }
    );
  }

  //Agregar una imagen a la base de datos
  agregarImagenDb(img: Imagen, nameCollection: string) {
    const colImagenes = this.firestore.collection(nameCollection);
    const documento = colImagenes.doc(img.fecha.toString());
    // user.setId(documento.ref.id);
    documento.set({ ...img });
  }

  //Agregar los que le dan me gusta
  agregarMegusta(imgId: Number) {
    const colImagenes = this.firestore.collection('likes');
    const documento = colImagenes.doc();
    const obj = {
      id: documento.ref.id,
      correo: this.user.correo,
      idImg: imgId,
    };
    documento.set({ ...obj });
  }

  //Quitar me gusta

  getImageUrl(filePath: string): Observable<string> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL(); // Devuelve un Observable con la URL
  }
}

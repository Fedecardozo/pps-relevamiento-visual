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
  storage: AngularFireStorage = inject(AngularFireStorage);
  user: UsersService = inject(UsersService);

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }

  //Agregar una imagen a la base de datos
  async agregarImagenDb(img: Imagen, nameCollection: string) {
    const colImagenes = this.firestore.collection(nameCollection);
    const documento = colImagenes.doc(img.fecha.toString());
    // user.setId(documento.ref.id);
    await documento.set({ ...img });
  }

  //Obtener las imagenes
  getImagenes(lindasFeas: string = 'lindas') {
    const col = this.firestore.collection('imagenes_' + lindasFeas);
    return col;
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

  // getImageUrl(filePath: string): Observable<string> {
  //   const fileRef = this.storage.ref(filePath);
  //   return fileRef.getDownloadURL(); // Devuelve un Observable con la URL
  // }
}

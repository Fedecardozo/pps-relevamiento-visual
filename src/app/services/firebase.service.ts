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
import { Observable } from 'rxjs';
import { Imagen } from '../modals/imagen';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  private app: string = '/RelevamientoVisual';
  storage: AngularFireStorage = inject(AngularFireStorage);
  termino: boolean = false;

  async uploadImage(path: string, data_url: string) {
    const newPath = this.app + path;
    return uploadString(ref(getStorage(), newPath), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), newPath));
      }
    );
  }

  getImages(array: Imagen[], path: string): void {
    // Create a reference under which you want to list
    const newPath = this.app + path;
    const listRef = ref(getStorage(), newPath);

    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          const algo = this.storage.ref(newPath + '/' + folderRef.name);
          //Obtener usuario
          algo.listAll().forEach((item) => {
            item.items.forEach((url) => {
              this.getImageUrl(url.fullPath).subscribe((next) => {
                array.push(new Imagen(folderRef.name, url.name, next));
                array.sort((a, b) => b.fechaNumber - a.fechaNumber);
              });
            });
          });
        });
        this.termino = true;
      })
      .catch((error) => {
        console.log('Hubo un error', error);
      });
  }

  getImageUrl(filePath: string): Observable<string> {
    const fileRef = this.storage.ref(filePath);
    return fileRef.getDownloadURL(); // Devuelve un Observable con la URL
  }
}

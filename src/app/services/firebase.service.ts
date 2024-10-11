import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
  private app: string = '/RelevamientoVisual';
  storage: AngularFireStorage = inject(AngularFireStorage);

  async uploadImage(path: string, data_url: string) {
    const newPath = this.app + path;
    return uploadString(ref(getStorage(), newPath), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), newPath));
      }
    );
  }
}

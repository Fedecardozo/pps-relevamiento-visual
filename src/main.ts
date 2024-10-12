import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideStorage(() => getStorage()),
  ],
});

defineCustomElements(window);

// getImages(path: string): void {
//     // Create a reference under which you want to list
//     const newPath = this.app + path;
//     const listRef = ref(getStorage(), newPath);

//     listAll(listRef)
//       .then((res) => {
//         res.prefixes.forEach((folderRef) => {
//           const algo = this.storage.ref(newPath + '/' + folderRef.name);
//           //Obtener usuario
//           algo.listAll().forEach((item) => {
//             item.items.forEach((url) => {
//               this.sub = this.getImageUrl(url.fullPath).subscribe((next) => {
//                 if (folderRef.name === this.user.correo) {
//                   this.misImgs.push(new Imagen(folderRef.name, url.name, next));
//                   this.misImgs.sort((a, b) => b.fechaNumber - a.fechaNumber);
//                 } else {
//                   this.array.push(new Imagen(folderRef.name, url.name, next));
//                   this.array.sort((a, b) => b.fechaNumber - a.fechaNumber);
//                 }
//               });
//             });
//           });
//         });
//         this.termino = true;
//       })
//       .catch((error) => {
//         console.log('Hubo un error', error);
//       });
//   }

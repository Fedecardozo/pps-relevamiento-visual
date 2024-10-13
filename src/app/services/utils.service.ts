import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  spinner: boolean = false;
  tituloSpinner: string = '';

  async takePicture() {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }

  mostrarSpinner(tituloSpinner: string = '') {
    this.spinner = true;
    this.tituloSpinner = tituloSpinner;
  }

  ocultarSpinner() {
    this.spinner = false;
  }
}

import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}
  spinner: boolean = false;
  tituloSpinner: string = '';

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto',
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

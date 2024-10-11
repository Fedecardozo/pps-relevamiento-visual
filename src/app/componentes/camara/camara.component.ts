import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera, // Puedes usar también CameraSource.Photos para elegir desde la galería
    });

    // Obtienes la URL de la imagen
    const imageUrl = image.webPath;

    // Si quieres mostrarla en la vista, puedes hacer algo como esto:
    const imageElement = document.querySelector('#image') as HTMLImageElement;
    if (imageElement) {
      imageElement.src = imageUrl!;
    }
  }
}

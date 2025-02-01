import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';
import { h } from 'ionicons/dist/types/stencil-public-runtime';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    email: '',
    image: '',
    followees_users: [],
    followers_users: []
  };
  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user, "user");
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(
      (error) => { 
        console.log(error);
      });

  }
  async takePhoto(source: CameraSource) {
    console.log("take photo");
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data: any) => {
        console.log(data);
      }
    ).catch(
      (error) => {
        console.log(error);
      });
  }
async presentphotoOptions() {
const alert = await this.alertController.create({
header: 'Selecciona una opción',
message: '¿De dónde quieres obtener la imagen?',
buttons:[
  {
    text: "camara",
    handler: () => {
      this.takePhoto(CameraSource.Camera);
    }
  },
  {
    text: "Galeria",
    handler: () => {
      this.takePhoto(CameraSource.Photos);
    }
  },
  {
    text: "Cancelar",
    role: "cancel",
    handler: () => {
      console.log("cancelar");
    }
  }
]
});
await alert.present();
}
}
 
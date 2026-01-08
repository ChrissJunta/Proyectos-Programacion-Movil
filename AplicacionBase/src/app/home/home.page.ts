import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: any = null;

  apiUrl =
    'https://script.google.com/macros/s/AKfycbyh59i2WWlJpLarq3qJ06kI2s67IcLXY71FeLp-LMgJS9TpriNruplVKUTd2QZ1wyG-ZA/exec';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const userData = sessionStorage.getItem('usuarioLogeado');
    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }
    this.usuario = JSON.parse(userData);
  }

  async editarUsuario() {
    const alert = await this.alertCtrl.create({
      header: 'Editar Datos',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: this.usuario.nombre,
        },
        {
          name: 'rol',
          type: 'text',
          value: this.usuario.rol,
        },
        {
          name: 'foto',
          type: 'url',
          value: this.usuario.foto,
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.usuario = { ...this.usuario, ...data };

            sessionStorage.setItem(
              'usuarioLogeado',
              JSON.stringify(this.usuario)
            );

            this.http.post(this.apiUrl, this.usuario).subscribe({
              next: () => {
                this.alertCtrl
                  .create({
                    header: 'Actualización exitosa',
                    message: 'Datos actualizados en la nube correctamente ✅',
                    buttons: ['OK'],
                  })
                  .then((a) => a.present());
              },
              error: () => {
                this.alertCtrl
                  .create({
                    header: 'Error',
                    message: 'Error al actualizar los datos ❌',
                    buttons: ['OK'],
                  })
                  .then((a) => a.present());
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}

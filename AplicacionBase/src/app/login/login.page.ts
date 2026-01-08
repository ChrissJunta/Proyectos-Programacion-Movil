import { Component, ViewChild } from '@angular/core';
import { IonInput, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('usernameInput', { static: false }) usernameInput!: IonInput;
  @ViewChild('passwordInput', { static: false }) passwordInput!: IonInput;

  apiUrl =
    'https://script.google.com/macros/s/AKfycbwu_V5mebTgs2mRQ1hBWqIDnvHgwqY9CnRIGX8bRvC_kGn3kXh2B6Kq9SI4eipIDpDIxA/exec';

  usuarios: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  cargarUsuarios() {
    return this.http.get<any[]>(this.apiUrl);
  }

  async onLogin() {
    const username = (await this.usernameInput.getInputElement()).value;
    const password = (await this.passwordInput.getInputElement()).value;

    this.cargarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;

        const encontrado = this.usuarios.find(
          (u) => u.user === username && u.pass === password
        );

        if (encontrado) {
          sessionStorage.setItem('usuarioLogeado', JSON.stringify(encontrado));
          this.router.navigate(['/home']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: () => alert('Error cargando usuarios'),
    });
  }
}

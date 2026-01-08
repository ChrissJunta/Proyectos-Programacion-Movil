import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import {
  FirebaseUsersService,
  UsuarioFirebase,
} from '../services/firebase-users.service';

@Component({
  selector: 'app-firebase-users',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './firebase-users.page.html',
  styleUrls: ['./firebase-users.page.scss'],
})
export class FirebaseUsersPage {

  usuarios$!: Observable<UsuarioFirebase[]>;

  constructor(
    private firebaseUsers: FirebaseUsersService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  // 👇 REEMPLAZA ESTO, ESTE ES EL MÉTODO CORRECTO
  ionViewWillEnter() {
    console.log("Entrando a FirebaseUsersPage...");

    const logged = sessionStorage.getItem('usuarioLogeado');
    if (!logged) {
      console.warn("Sesión no encontrada. Redirigiendo a login...");
      this.router.navigate(['/login']);
      return;
    }

    console.log("Sesión válida:", logged);

    // 🔥 Cargar usuarios Firebase
    this.usuarios$ = this.firebaseUsers.getUsuarios();

    this.firebaseUsers.getUsuarios().subscribe(data => {
      console.log("Usuarios desde Firebase:", data);
    });
  }

  // Opcional: botón agregar o editar
  agregarEditarUsuario() {
    console.log("Botón funciona");
  }

}

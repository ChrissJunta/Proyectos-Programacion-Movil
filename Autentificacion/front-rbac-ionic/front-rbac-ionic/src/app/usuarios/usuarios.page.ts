import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService, DbRole } from '../services/usuarios.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UsuariosPage {
  username = '';
  password = '';
  dbRole: DbRole = 'db_datareader';

  loading = false;
  resultMsg = '';

  constructor(private usuariosService: UsuariosService, private auth: AuthService) {}

  get isSa() {
    return this.auth.isSa();
  }

  crear() {
    this.resultMsg = '';

    if (!this.username.trim()) {
      this.resultMsg = 'Username es obligatorio';
      return;
    }

    if (!this.password.trim()) {
      this.resultMsg = 'Password es obligatorio';
      return;
    }

    this.loading = true;

    this.usuariosService.crearLogin(this.username.trim(), this.password, this.dbRole).subscribe({
      next: (res) => {
        this.loading = false;
        this.resultMsg = res?.message ?? 'Creado';

        // limpiar
        this.username = '';
        this.password = '';
        this.dbRole = 'db_datareader';
      },
      error: (err) => {
        this.loading = false;
        this.resultMsg = err?.error?.message ?? 'Error creando usuario';
      },
    });
  }
}

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistaService, Artista } from '../services/artista.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-artista',
  templateUrl: './artista.page.html',
  styleUrls: ['./artista.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ArtistaPage {
  artistas: Artista[] = [];
  loading = false;

  // form
  form: Partial<Artista> = this.emptyForm();
  editId: string | null = null;

  constructor(
    private artistaService: ArtistaService,
    private auth: AuthService
  ) {}

  get canWrite() {
    return this.auth.canWrite(); // writer u owner
  }

  get isOwner() {
    return this.auth.isOwner(); // solo owner
  }

  ionViewWillEnter() {
    this.load();
  }

  emptyForm(): Partial<Artista> {
    return {
      Identificador_Artista: '',
      Cedula_Artista: '',
      Nombre_Artista: '',
      Apellido_Artista: '',
      Tipo_Artista: '',
      Pais_Origen_Artista: '',
    };
  }

  load() {
    this.loading = true;
    this.artistaService.getAll().subscribe({
      next: (res) => {
        this.artistas = res.data ?? [];
        this.loading = false;
      },
      error: (err) => {
        alert(err?.error?.message ?? 'Error cargando artistas');
        this.loading = false;
      },
    });
  }

  save() {
    if (!this.form.Identificador_Artista?.trim()) {
      alert('Identificador_Artista es obligatorio (máx 6 caracteres)');
      return;
    }

    // normalizamos longitud del ID (nvarchar(6))
    this.form.Identificador_Artista = this.form.Identificador_Artista.trim().slice(0, 6);

    if (this.editId) {
      // UPDATE: NO cambiamos Identificador_Artista
      const payload = { ...this.form };
      delete (payload as any).Identificador_Artista;

      this.artistaService.update(this.editId, payload).subscribe({
        next: () => {
          this.resetForm();
          this.load();
        },
        error: (err) => alert(err?.error?.message ?? 'Error actualizando'),
      });
    } else {
      this.artistaService.create(this.form).subscribe({
        next: () => {
          this.resetForm();
          this.load();
        },
        error: (err) => alert(err?.error?.message ?? 'Error creando'),
      });
    }
  }

  edit(a: Artista) {
    this.editId = a.Identificador_Artista;
    this.form = { ...a }; // copia
  }

  resetForm() {
    this.editId = null;
    this.form = this.emptyForm();
  }

  remove(a: Artista) {
    const id = a.Identificador_Artista;
    if (!id) return;

    if (!confirm(`¿Eliminar artista ${id}?`)) return;

    this.artistaService.remove(id).subscribe({
      next: () => this.load(),
      error: (err) => alert(err?.error?.message ?? 'Error eliminando'),
    });
  }
}

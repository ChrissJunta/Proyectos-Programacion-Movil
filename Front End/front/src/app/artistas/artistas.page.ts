import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ArtistasService } from '../services/artistas.service';
import { Artista } from '../models/artista.model';

@Component({
  selector: 'app-artistas',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './artistas.page.html',
  styleUrls: ['./artistas.page.scss']
})
export class ArtistasPage implements OnInit {

  artistas: Artista[] = [];
  cargando = true;

  nuevoArtista: Artista = {
    Identificador_Artista: '',
    Cedula_Artista: '',
    Nombre_Artista: '',
    Apellido_Artista: '',
    Tipo_Artista: '',
    Pais_Origen_Artista: ''
  };

  constructor(private artistasService: ArtistasService) {}

  ngOnInit() {
    this.artistasService.getArtistas().subscribe({
      next: (data) => {
        this.artistas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

crearArtista() {
  this.artistasService.crearArtista(this.nuevoArtista).subscribe({
    next: () => {
      alert('Artista creado correctamente');

      // Limpiar formulario
      this.nuevoArtista = {
        Identificador_Artista: '',
        Cedula_Artista: '',
        Nombre_Artista: '',
        Apellido_Artista: '',
        Tipo_Artista: '',
        Pais_Origen_Artista: ''
      };

      // Recargar lista
      this.ngOnInit();
    },
    error: (err) => {
      console.error(err);
      alert('Error al crear artista');
    }
  });
}

}

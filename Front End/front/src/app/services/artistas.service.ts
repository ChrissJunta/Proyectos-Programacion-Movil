import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Artista } from '../models/artista.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistasService {

  private apiUrl = 'http://localhost:3000/api/artistas';

  constructor(private http: HttpClient) {}

  getArtistas(): Observable<Artista[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.artistas)
    );
  }

  crearArtista(artista: Artista): Observable<any> {
    return this.http.post(this.apiUrl, artista);
  }
}

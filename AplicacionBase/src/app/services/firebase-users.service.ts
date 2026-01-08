import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface UsuarioFirebase {
  id?: string;
  user: string;
  pass: string;
  nombre: string;
  rol: string;
  foto: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseUsersService {

  constructor(private firestore: Firestore) {}

  getUsuarios(): Observable<UsuarioFirebase[]> {

    // ✔ La colección correcta
    const usuariosRef = collection(this.firestore, 'usuarios');

    // ✔ NO USAR query(), collectionRef YA funciona como Query
    return collectionData(usuariosRef, {
      idField: 'id'
    }) as Observable<UsuarioFirebase[]>;
  }
}

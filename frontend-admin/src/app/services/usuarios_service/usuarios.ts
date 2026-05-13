import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Usuarios {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/usuarios'; // Ajusta a tu endpoint real

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}

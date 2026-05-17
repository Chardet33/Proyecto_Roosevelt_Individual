import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/usuarios'; // Ajusta a tu endpoint real

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(nuevoUsuario: Partial<Usuario>) {
    return this.http.post<Usuario>(this.apiUrl, nuevoUsuario, { withCredentials: true });
  }

  editarUsuario(id: number, usuarioActualizado: Partial<Usuario>) {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuarioActualizado, { withCredentials: true });
  }

  eliminarUsuario(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}

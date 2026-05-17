import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objeto } from '../../models/objeto.model';

@Injectable({ providedIn: 'root' })
export class ObjetosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/objetos'; // Ajusta a tu endpoint real

  getObjetos(): Observable<Objeto[]> {
    return this.http.get<Objeto[]>(this.apiUrl, { withCredentials: true });
  }

  crearObjeto(nuevoObjeto: Partial<Objeto>) {
    return this.http.post<Objeto>(this.apiUrl, nuevoObjeto, { withCredentials: true });
  }

  editarObjeto(id: number, objetoActualizado: Partial<Objeto>) {
    return this.http.put<Objeto>(`${this.apiUrl}/${id}`, objetoActualizado, { withCredentials: true });
  }

  eliminarObjeto(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
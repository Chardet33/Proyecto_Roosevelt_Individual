import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from '../../models/ruta.model';

@Injectable({ providedIn: 'root' })
export class RutasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/rutas'; // Ajusta a tu endpoint real

  getRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.apiUrl, { withCredentials: true });
  }

  crearRuta(nuevaRuta: Partial<Ruta>) {
    return this.http.post<Ruta>(this.apiUrl, nuevaRuta, { withCredentials: true });
  }

  editarRuta(id: number, rutaActualizada: Partial<Ruta>) {
    return this.http.put<Ruta>(`${this.apiUrl}/${id}`, rutaActualizada, { withCredentials: true });
  }

  eliminarRuta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
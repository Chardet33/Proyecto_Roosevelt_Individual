import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zona } from '../../models/zona.model';

@Injectable({
  providedIn: 'root',
})
export class ZonasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/zonas'; // Ajusta a tu endpoint real

  getZonas(): Observable<Zona[]> {
    return this.http.get<Zona[]>(this.apiUrl);
  }

  crearZona(nuevaZona: Partial<Zona>) {
    return this.http.post<Zona>(this.apiUrl, nuevaZona, { withCredentials: true });
  }

  editarZona(id: number, zonaActualizada: Partial<Zona>) {
    return this.http.put<Zona>(`${this.apiUrl}/${id}`, zonaActualizada, { withCredentials: true });
  }

  eliminarZona(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}

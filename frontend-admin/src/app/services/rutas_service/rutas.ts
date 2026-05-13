import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from '../../models/ruta.model';

@Injectable({ providedIn: 'root' })
export class RutasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/rutas'; // Ajusta a tu endpoint real

  getRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.apiUrl);
  }
}
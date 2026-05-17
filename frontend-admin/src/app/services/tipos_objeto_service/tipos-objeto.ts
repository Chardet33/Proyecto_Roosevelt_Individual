import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoObjeto } from '../../models/tipoobjeto.model';

@Injectable({
  providedIn: 'root',
})
export class TiposObjetoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/roosevelt/api/tipos-objeto'; // Ajusta a tu endpoint de Spring Boot

  getTiposObjeto(): Observable<TipoObjeto[]> {
    return this.http.get<TipoObjeto[]>(this.apiUrl);
  }
}
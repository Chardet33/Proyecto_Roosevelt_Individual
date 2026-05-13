import { Component, inject, OnInit, signal } from '@angular/core';
import { RutasService } from '../../services/rutas_service/rutas';
import { Ruta } from '../../models/ruta.model';

@Component({
  selector: 'app-rutas-section',
  imports: [],
  templateUrl: './rutas-section.html',
  styleUrl: './rutas-section.scss',
})
export class RutasSection {
  private rutasService = inject(RutasService);

  // Usamos un signal para almacenar las rutas que vienen del backend
  public rutas = signal<Ruta[]>([]);

  ngOnInit():void {
    // Cargamos las rutas al inicializar el componente
    this.cargarRutas();
  }
  
  // Método para cargar las rutas desde el backend
  cargarRutas() {
    this.rutasService.getRutas().subscribe({
      next: (data) => {
        this.rutas.set(data); // Actualizamos el signal con los datos de Java
      },
      error: (err) => {
        console.error('Error al cargar rutas desde el backend:', err);
      }
    });
  }
}

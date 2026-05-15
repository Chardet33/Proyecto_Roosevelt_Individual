import { Component, inject, OnInit, signal } from '@angular/core';
import { RutasService } from '../../services/rutas_service/rutas';
import { AuthService } from '../../services/auth_service/auth';
import { Ruta } from '../../models/ruta.model';

@Component({
  selector: 'app-rutas-section',
  imports: [],
  templateUrl: './rutas-section.html',
  styleUrl: './rutas-section.scss',
})
export class RutasSection {
  



  private rutasService = inject(RutasService);
  private authService = inject(AuthService);

  nuevaRuta = signal<Partial<Ruta>>({
    nombreRuta: '',
    mapboxJSON: '',
    descripcion: '',
    fecha_pub: new Date().toISOString(),
    likesCount: 0,
    usuario_autor: undefined,
  });
  // Usamos un signal para almacenar las rutas que vienen del backend
  public rutas = signal<Ruta[]>([]);
  
  // Signal para el nombre de usuario actual
  public currentUsername = this.authService.currentUser;

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

  crearRuta(){
    const username = this.authService.getCurrentUser();
    if (!username) {
      console.error('Error al crear ruta: no hay usuario autenticado.');
      return;
    }
    const rutaNuevaEnviar: Partial<Ruta> = {
      ...this.nuevaRuta(), // Extraemos los valores actuales del Signal
      usuario_autor: { username } as any // Relación ManyToOne (solo enviamos username al backend)
    };
    this.rutasService.crearRuta(rutaNuevaEnviar).subscribe({
      next: (rutaCreada) => {
        // Actualizamos la lista de rutas con la nueva ruta
        this.rutas.update((rutas) => [...rutas, rutaCreada]);
        // Limpiamos el formulario

        this.nuevaRuta.set({
          nombreRuta: '',
          mapboxJSON: '',
          descripcion: '',
          fecha_pub: new Date().toISOString(),
          likesCount: 0,
          usuario_autor: undefined,
        });
      },
      error: (err) => {
        console.error('Error al crear ruta:', err);
      }
    });
  }

}

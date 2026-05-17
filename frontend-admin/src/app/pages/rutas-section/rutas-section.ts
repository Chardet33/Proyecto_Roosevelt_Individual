import { Component, inject, OnInit, signal } from '@angular/core';
import { RutasService } from '../../services/rutas_service/rutas';
import { ZonasService } from '../../services/zonas_service/zonas';
import { AuthService } from '../../services/auth_service/auth';
import { Ruta } from '../../models/ruta.model';
import { Zona } from '../../models/zona.model';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios_service/usuarios';

@Component({
  selector: 'app-rutas-section',
  imports: [FormsModule],
  templateUrl: './rutas-section.html',
  styleUrl: './rutas-section.scss',
})
export class RutasSection {

  public isModalCreationOpen = signal(false);
  public isModalEditOpen = signal(false);
  public isModalDeleteOpen = signal(false);

  public zonaAsignateLater = signal<boolean>(false);
  public errorMessage = signal<string>('');
  public successMessage = signal<string>('');

  private rutasService = inject(RutasService);
  private zonasService = inject(ZonasService);
  private usuariosService = inject(UsuariosService);
  private authService = inject(AuthService);

  rutaSeleccionada = signal<Partial<Ruta>>({
    nombreRuta: '',
    mapboxJSON: '',
    descripcion: '',
    fecha_pub: new Date().toISOString().split('T')[0],
    likesCount: 0,
    usuario_autor: undefined,
    zona: undefined
  });
  private rutaAEliminar = signal(0);


  // Usamos un signal para almacenar las rutas que vienen del backend

  public rutas = signal<Ruta[]>([]);
  public zonas = signal<Zona[]>([]);
  public usuarios = signal<Usuario[]>([]);

  // Signal para el nombre de usuario actual
  public currentUsername = this.authService.currentUser;

  ngOnInit(): void {
    // Cargamos las rutas al inicializar el componente
    this.cargarRutas();
    this.cargarZonas();
    this.cargarUsuarios();
    this.zonaAsignateLater.set(false);
  }

  nuevaRuta = signal<Partial<Ruta>>({
    nombreRuta: '',
    mapboxJSON: '',
    descripcion: '',
    fecha_pub: new Date().toISOString().split('T')[0],
    likesCount: 0,
    usuario_autor: undefined,
    zona: undefined
  });

  // Método para cargar las rutas desde el backend
  cargarRutas() {
    this.rutasService.getRutas().subscribe({
      next: (data) => {
        this.rutas.set(data);
      },
      error: (err) => {
        console.error('Error al cargar rutas desde el backend:', err);
      }
    });
  }

  cargarZonas() {
    this.zonasService.getZonas().subscribe({
      next: (data) => {
        this.zonas.set(data);
      },
      error: (err) => {
        console.error('Error al cargar zonas desde el backend:', err);
      }
    });
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios.set(data);
      },
      error: (err) => {
        console.error('Error al cargar usuarios desde el backend:', err);
      }
    });
  }

  crearRuta() {
    if (!this.ComprobarCampos()) {
      return;
    }

    const username = this.authService.getCurrentUser();
    if (!username) {
      return;
    }

    const usuarioCompleto = this.usuarios().find(u => u.username === username);
    const zonaSeleccionada = this.nuevaRuta().zona;

    let coordenadasFinales = this.nuevaRuta().mapboxJSON;
    if (this.zonaAsignateLater()) {
      coordenadasFinales = '[["0.0","0.0"]]';
    }

    const rutaNuevaEnviar = {
      nombreRuta: this.nuevaRuta().nombreRuta?.trim(),
      mapboxJSON: coordenadasFinales,
      descripcion: this.nuevaRuta().descripcion?.trim(),
      fecha_pub: this.nuevaRuta().fecha_pub,
      likesCount: 0,
      usuario_autor: usuarioCompleto ? {
        id: Number(usuarioCompleto.id)
      } : null,

      zona: zonaSeleccionada ? {
        id: Number(zonaSeleccionada.id)
      } : null
    };

    console.log('Enviando JSON verificado:', JSON.stringify(rutaNuevaEnviar, null, 2));

    this.rutasService.crearRuta(rutaNuevaEnviar as any).subscribe({
      next: (rutaCreada) => {
        this.cargarRutas();
        this.closeModalCreation();

        this.nuevaRuta.set({
          nombreRuta: '',
          mapboxJSON: '',
          descripcion: '',
          fecha_pub: new Date().toISOString().split('T')[0],
          likesCount: 0,
          usuario_autor: undefined,
          zona: undefined
        });
        this.zonaAsignateLater.set(false);
        this.errorMessage.set('');
      },
      error: (err) => {
        console.error('Error al guardar la ruta:', err);
        this.errorMessage.set('Error 400: Error de procesamiento en el servidor.');
      }
    });
  }

  editarRuta() {
    const rutaActual = this.rutaSeleccionada();
    const idRuta = rutaActual.id;

    if (!idRuta) {
      this.errorMessage.set("No se ha seleccionado ninguna ruta válida para editar.");
      return;
    }

    if (!rutaActual.nombreRuta?.trim() || !rutaActual.descripcion?.trim()) {
      this.errorMessage.set("El nombre y la descripción no pueden estar vacíos.");
      return;
    }

    const rutaEditarEnviar = {
      id: idRuta,
      nombreRuta: rutaActual.nombreRuta.trim(),
      descripcion: rutaActual.descripcion.trim(),
      mapboxJSON: rutaActual.mapboxJSON || '',
      fecha_pub: rutaActual.fecha_pub,
      likesCount: rutaActual.likesCount || 0,
      zona: rutaActual.zona?.id ? { id: Number(rutaActual.zona.id) } : null,
      usuario_autor: rutaActual.usuario_autor?.id ? { id: Number(rutaActual.usuario_autor.id) } : null
    };

    console.log('PayLoad actualizado:', JSON.stringify(rutaEditarEnviar, null, 2));

    this.rutasService.editarRuta(idRuta, rutaEditarEnviar as any).subscribe({
      next: (res) => {
        console.log('¡Ruta actualizada con éxito!', res);
        this.successMessage.set("La ruta se ha actualizado correctamente.");

        this.cargarRutas();
      },
      error: (err) => {
        console.error('Error al actualizar la ruta:', err);
        this.errorMessage.set("Hubo un error al intentar guardar los cambios.");
      }
    });
  }

  borrarRuta() {
    const id = this.rutaAEliminar();
    if (!id) {
      this.errorMessage.set("ID de ruta no válido.");
      return;
    }

    this.rutasService.eliminarRuta(id).subscribe({
      next: (res) => {
        console.log('¡Ruta eliminada con éxito!', res);

        this.cargarRutas();
        this.closeModalDelete();
      },
      error: (err) => {
        console.error('Error al eliminar la ruta:', err);
        this.errorMessage.set("Hubo un error al intentar eliminar la ruta.");
      }
    });
  }

  AgregarCoordenadaDespues() {
    if (this.nuevaRuta().mapboxJSON != '') {
      this.nuevaRuta.update(rutaActual => ({
        ...rutaActual,
        mapboxJSON: ''
      }));
    }
    this.zonaAsignateLater.set(true);
  }

  ComprobarCampos(): boolean {
    const mapboxCoordsRegex = /^\[\s*(\[\s*"(-?\d+(\.\d+)?)"\s*,\s*"(-?\d+(\.\d+)?)"\s*\]\s*(,\s*\[\s*"(-?\d+(\.\d+)?)"\s*,\s*"(-?\d+(\.\d+)?)"\s*\]\s*)*)?\]$/;
    let mensajefinaL = ''

    if (this.nuevaRuta().nombreRuta?.trim() === '') {
      mensajefinaL += "El campo nombre no puede esta vacio \n"
    }
    if (!this.zonaAsignateLater()) {
      if (!mapboxCoordsRegex.test(this.nuevaRuta().mapboxJSON?.trim() || '')) {
        mensajefinaL += "• El campo coordenadas no tiene el formato correcto [[\"lat\", \"long\"], ...]. \n";
      }
    }
    if (this.nuevaRuta().descripcion?.trim() === '') {
      mensajefinaL += "El campo descripcion no puede esta vacio \n"
    }
    if (!this.nuevaRuta().zona) {
      mensajefinaL += "El campo zona no puede esta vacio \n"
    }
    this.errorMessage.set(mensajefinaL);
    return mensajefinaL == '';
  }

  //Metodos para abrir modales (crear, editar, eliminar)  
  openModalCreation() {
    this.isModalCreationOpen.set(true);
  }

  openModalEdit(ruta: Ruta) {
    this.rutaSeleccionada.set({
      ...ruta,
      zona: ruta.zona ? { ...ruta.zona } : undefined,
      usuario_autor: ruta.usuario_autor ? { ...ruta.usuario_autor } : undefined
    });
    this.isModalEditOpen.set(true);
  }

  openModalDelete(id: number) {
    this.rutaAEliminar.set(id);

    this.isModalDeleteOpen.set(true);
  }

  //Metodos para cerrar modales(crear, editar, eliminar)
  closeModalCreation() {
    this.isModalCreationOpen.set(false);
    this.zonaAsignateLater.set(false);
    this.nuevaRuta.set({
      nombreRuta: '',
      mapboxJSON: '',
      descripcion: '',
      fecha_pub: new Date().toISOString(),
      likesCount: 0,
      usuario_autor: undefined,
      zona: undefined
    });
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  closeModalEdit() {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.rutaSeleccionada.set({
      nombreRuta: '',
      mapboxJSON: '',
      descripcion: '',
      fecha_pub: new Date().toISOString().split('T')[0],
      likesCount: 0,
      usuario_autor: undefined,
      zona: undefined
    });
    this.isModalEditOpen.set(false);
  }

  closeModalDelete() {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.rutaAEliminar.set(0);
    this.isModalDeleteOpen.set(false);
  }



}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ZonasService } from '../../services/zonas_service/zonas';
import { Zona } from '../../models/zona.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zonas-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './zonas-section.html',
  styleUrl: './zonas-section.scss',
})
export class ZonasSection implements OnInit {
  private zonasService = inject(ZonasService);

  public zonas = signal<Zona[]>([]);

  public isModalCreationOpen = signal(false);
  public isModalEditOpen = signal(false);
  public isModalDeleteOpen = signal(false);

  public mapboxAsignateLater = signal<boolean>(false);

  public errorMessage = signal<string>('');
  public successMessage = signal<string>('');

  public nuevaZona = signal<Partial<Zona>>({
    nombre_zona: '',
    mapbox_json: '',
    peligrosidad: ''
  });

  public zonaSeleccionada = signal<Partial<Zona>>({});
  public zonaAEliminarId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.cargarZonas();
  }

  cargarZonas() {
    this.zonasService.getZonas().subscribe({
      next: (data) => this.zonas.set(data),
      error: (err) => console.error('Error al cargar zonas:', err)
    });
  }


  crearZona() {
    if (!this.validarCampos(this.nuevaZona())) return;

    const formulario = this.nuevaZona();

    let peligrosidadFormateada = formulario.peligrosidad || '';
    

    const mapboxValor = this.mapboxAsignateLater() 
  ? '[["0.0","0.0"]]' 
  : (formulario.mapbox_json?.trim() || "");

    const zonaAEnviar: any = {
      nombre_zona: formulario.nombre_zona?.trim() || null,
      mapbox_json: mapboxValor, 
      peligrosidad: peligrosidadFormateada || null
    };

    this.zonasService.crearZona(zonaAEnviar).subscribe({
      next: (zonaCreada) => {
        this.zonas.update(list => [...list, zonaCreada]);
        this.successMessage.set('¡Zona creada con éxito!');
        setTimeout(() => this.closeModalCreation(), 1500);
      },
      error: (err) => {
        console.log(zonaAEnviar);
        console.error(err);
        let mensajeError = 'Error en el servidor al crear la zona.';
        if (err.error) {
          if (typeof err.error === 'string') {
            mensajeError = err.error;
          } else if (err.error.message) {
            mensajeError = err.error.message;
          } else if (err.error.errors && Array.isArray(err.error.errors)) {
            mensajeError = err.error.errors.map((e: any) => e.defaultMessage || e.message).join(', ');
          }
        }
        this.errorMessage.set(mensajeError);
      }
    });
  }

  editarZona() {
    const formulario = this.zonaSeleccionada();
    if (!formulario.id) {
      this.errorMessage.set('Error: No se ha seleccionado ninguna zona para editar.');
      return;
    }

    const zonaAEnviar: any = {
      id: formulario.id,
      nombre_zona: formulario.nombre_zona?.trim() || null,
      mapbox_json: formulario.mapbox_json?.trim() || null,
      peligrosidad: formulario.peligrosidad || null
    };

    this.zonasService.editarZona(formulario.id, zonaAEnviar).subscribe({
      next: (zonaEditada) => {
        this.zonas.update(list =>
          list.map(z => z.id === zonaEditada.id ? zonaEditada : z)
        );
        this.successMessage.set('¡Zona actualizada con éxito!');
        setTimeout(() => this.closeModalEdit(), 1500);
      },
      error: (err) => {
        console.error(err);
        let mensajeError = 'Error en el servidor al actualizar la zona.';
        if (err.error) {
          if (typeof err.error === 'string') {
            mensajeError = err.error;
          } else if (err.error.message) {
            mensajeError = err.error.message;
          } else if (err.error.error) {
            mensajeError = err.error.error;
          } else if (err.error.errors && Array.isArray(err.error.errors)) {
            mensajeError = err.error.errors.map((e: any) => e.defaultMessage || e.message).join(', ');
          }
        }
        this.errorMessage.set(mensajeError);
      }
    });
  }


  borrarZona() {
    const id = this.zonaAEliminarId();
    if (!id) return;

    this.zonasService.eliminarZona(id).subscribe({
      next: () => {
        this.successMessage.set("Zona eliminada del panel.");
        this.cargarZonas();
        setTimeout(() => this.closeModalDelete(), 1200);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set("Imposible borrar: Hay rutas activas vinculadas a esta zona en la base de datos.");
      }
    });
  }


  private validarCampos(zona: Partial<Zona>): boolean {
    this.errorMessage.set('');
    let errores = '';
    if (!zona.nombre_zona?.trim()) errores += "El nombre de la zona es obligatorio.\n";
    if (!zona.peligrosidad?.trim()) errores += "El nivel de peligrosidad es obligatorio.\n";

    this.errorMessage.set(errores);
    return errores === '';
  }

  openModalCreation() { this.isModalCreationOpen.set(true); }
  closeModalCreation() {
    this.isModalCreationOpen.set(false);
    this.mapboxAsignateLater.set(false);
    this.nuevaZona.set({ nombre_zona: '', mapbox_json: '', peligrosidad: '' });
    this.errorMessage.set(''); 
    this.successMessage.set('');
  }

  openModalEdit(zona: Zona) {
    this.zonaSeleccionada.set({ ...zona });
    this.isModalEditOpen.set(true);
  }
  closeModalEdit() {
    this.isModalEditOpen.set(false);
    this.errorMessage.set(''); this.successMessage.set('');
  }

  openModalDelete(id: number) {
    const zona = this.zonas().find(z => z.id === id);
    if (zona) this.zonaSeleccionada.set(zona);
    this.zonaAEliminarId.set(id);
    this.isModalDeleteOpen.set(true);
  }
  closeModalDelete() {
    this.isModalDeleteOpen.set(false);
    this.zonaAEliminarId.set(undefined);
    this.errorMessage.set(''); this.successMessage.set('');
  }
}
import { Component, inject, OnInit, signal } from '@angular/core';
import { ObjetosService } from '../../services/objetos_service/objetos';
import { ZonasService } from '../../services/zonas_service/zonas';
import { TiposObjetoService } from '../../services/tipos_objeto_service/tipos-objeto'; // <-- Nuevo Servicio
import { Objeto } from '../../models/objeto.model';
import { TipoObjeto } from '../../models/tipoobjeto.model';
import { Zona } from '../../models/zona.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-objetos-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './objetos-section.html',
  styleUrl: './objetos-section.scss',
})
export class ObjetosSection implements OnInit {
  private objetosService = inject(ObjetosService);
  private zonasService = inject(ZonasService);
  private tiposObjetoService = inject(TiposObjetoService); // <-- Inyectamos

  // Señales de datos dinámicas
  public objetos = signal<Objeto[]>([]);
  public zonas = signal<Zona[]>([]);
  public tiposObjeto = signal<TipoObjeto[]>([]); // <-- Ahora empieza vacío

  // Gestión de Modales
  public isModalCreationOpen = signal(false);
  public isModalEditOpen = signal(false);
  public isModalDeleteOpen = signal(false);

  // Mensajes de Feedback
  public errorMessage = signal<string>('');
  public successMessage = signal<string>('');

  // Estados temporales
  public nuevoObjeto = signal<Partial<Objeto>>({
    nombre_objeto: '',
    descripcion: '',
    mapBoxJSON: '',
    imagen: '',
    peligrosidad: '',
    zona: undefined,
    tipoObjeto: undefined
  });

  public objetoSeleccionado = signal<Partial<Objeto>>({});
  public objetoAEliminarId = signal<number | undefined>(undefined);

  public zonaSeleccionadaId = signal<string>('');
  public tipoObjetoSeleccionadoId = signal<string>('');

  ngOnInit(): void {
    this.cargarObjetos();
    this.cargarZonasOpciones();
    this.cargarTiposObjetoOpciones(); // <-- Cargamos desde la API
  }

  cargarObjetos() {
    this.objetosService.getObjetos().subscribe({
      next: (data) => this.objetos.set(data),
      error: (err) => console.error('Error al cargar objetos:', err)
    });
  }

  cargarZonasOpciones() {
    this.zonasService.getZonas().subscribe({
      next: (data) => this.zonas.set(data),
      error: (err) => console.error('Error al cargar zonas:', err)
    });
  }


  cargarTiposObjetoOpciones() {
    this.tiposObjetoService.getTiposObjeto().subscribe({
      next: (data) => this.tiposObjeto.set(data),
      error: (err) => console.error('Error al cargar tipos de objeto:', err)
    });
  }


  crearObjeto() {
    if (!this.validarCampos(this.nuevoObjeto())) return;

    const payload = {
      nombre_objeto: this.nuevoObjeto().nombre_objeto?.trim(),
      descripcion: this.nuevoObjeto().descripcion?.trim(),
      mapBoxJSON: this.nuevoObjeto().mapBoxJSON?.trim() || '[]',
      imagen: this.nuevoObjeto().imagen?.trim(),
      peligrosidad: this.nuevoObjeto().peligrosidad,
      zona: this.zonaSeleccionadaId() ? { id: Number(this.zonaSeleccionadaId()) } : null,
      tipoObjeto: this.tipoObjetoSeleccionadoId() ? { id: Number(this.tipoObjetoSeleccionadoId()) } : null
    };

    this.objetosService.crearObjeto(payload as any).subscribe({
      next: () => {
        this.successMessage.set("¡Objeto creado correctamente!");
        this.cargarObjetos();
        setTimeout(() => this.closeModalCreation(), 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set("Fallo en el backend al procesar el objeto.");
      }
    });
  }

  
  editarObjeto() {
    const objActual = this.objetoSeleccionado();
    const idObj = objActual.id;

    if (!idObj) return;
    if (!this.validarCampos(objActual)) return;

    const payload = {
      id: idObj,
      nombre_objeto: objActual.nombre_objeto?.trim(),
      descripcion: objActual.descripcion?.trim(),
      mapBoxJSON: objActual.mapBoxJSON?.trim() || '[]',
      imagen: objActual.imagen?.trim(),
      peligrosidad: objActual.peligrosidad,
      zona: this.zonaSeleccionadaId() ? { id: Number(this.zonaSeleccionadaId()) } : null,
      tipoObjeto: this.tipoObjetoSeleccionadoId() ? { id: Number(this.tipoObjetoSeleccionadoId()) } : null
    };

    this.objetosService.editarObjeto(idObj, payload as any).subscribe({
      next: () => {
        this.successMessage.set("Objeto modificado con éxito.");
        this.cargarObjetos();
        setTimeout(() => this.closeModalEdit(), 1500);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set("Error al actualizar el objeto.");
      }
    });
  }


  borrarObjeto() {
    const id = this.objetoAEliminarId();
    if (!id) return;

    this.objetosService.eliminarObjeto(id).subscribe({
      next: () => {
        this.successMessage.set("El objeto ha sido retirado.");
        this.cargarObjetos();
        setTimeout(() => this.closeModalDelete(), 1200);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set("Error al intentar eliminar el objeto.");
      }
    });
  }

  private validarCampos(obj: Partial<Objeto>): boolean {
    this.errorMessage.set('');
    let errores = '';
    if (!obj.nombre_objeto?.trim()) errores += "El nombre del objeto es obligatorio.\n";
    if (!obj.peligrosidad) errores += "El nivel de peligrosidad es obligatorio.\n";
    
    this.errorMessage.set(errores);
    return errores === '';
  }


  openModalCreation() {
    this.zonaSeleccionadaId.set('');
    this.tipoObjetoSeleccionadoId.set('');
    this.isModalCreationOpen.set(true);
  }
  closeModalCreation() {
    this.isModalCreationOpen.set(false);
    this.nuevoObjeto.set({ nombre_objeto: '', descripcion: '', mapBoxJSON: '', imagen: '', peligrosidad: '' });
    this.errorMessage.set(''); this.successMessage.set('');
  }

  openModalEdit(objeto: Objeto) {
    this.objetoSeleccionado.set({ ...objeto });
    this.zonaSeleccionadaId.set(objeto.zona?.id ? String(objeto.zona.id) : '');
    this.tipoObjetoSeleccionadoId.set(objeto.tipoObjeto?.id ? String(objeto.tipoObjeto.id) : '');
    this.isModalEditOpen.set(true);
  }
  closeModalEdit() {
    this.isModalEditOpen.set(false);
    this.errorMessage.set(''); this.successMessage.set('');
  }

  openModalDelete(id: number) {
    const obj = this.objetos().find(o => o.id === id);
    if (obj) this.objetoSeleccionado.set(obj);
    this.objetoAEliminarId.set(id);
    this.isModalDeleteOpen.set(true);
  }
  closeModalDelete() {
    this.isModalDeleteOpen.set(false);
    this.objetoAEliminarId.set(undefined);
    this.errorMessage.set(''); this.successMessage.set('');
  }
}
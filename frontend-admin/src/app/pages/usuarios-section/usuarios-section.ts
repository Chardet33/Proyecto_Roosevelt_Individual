import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuariosService } from '../../services/usuarios_service/usuarios';
import { Usuario } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarios-section.html',
  styleUrl: './usuarios-section.scss',
})
export class UsuariosSection implements OnInit {
  private usuariosService = inject(UsuariosService);

  // Señales de datos
  public usuarios = signal<Usuario[]>([]);

  // Gestión de Modales
  public isModalCreationOpen = signal(false);
  public isModalEditOpen = signal(false);
  public isModalDeleteOpen = signal(false);

  // Mensajes de Feedback
  public errorMessage = signal<string>('');
  public successMessage = signal<string>('');

  // Estados temporales para Formularios
  public nuevoUsuario = signal<Partial<Usuario>>({
    username: '',
    email: '',
    password: '',
    email_sec: '',  // <-- Lo inicializas como un texto vacío
    administrador: false,
    tel: '',
    fechaNac: '',   // <-- Lo inicializas como un texto vacío
    foto: ''
  });

  public usuarioSeleccionado = signal<Partial<Usuario>>({});
  public usuarioAEliminarId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => this.usuarios.set(data),
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  crearUsuario() {
    if (!this.validarCampos(this.nuevoUsuario())) {
      return;
    }

    const formulario = this.nuevoUsuario();

    const usuarioAEnviar: any = {
      username: formulario.username?.trim() || null,
      email: formulario.email?.trim() || null,
      password: formulario.password || null,
      administrador: formulario.administrador === true,
      foto: formulario.foto?.trim() || 'user.jpg',
      email_sec: formulario.email_sec?.trim() || null,
      tel: formulario.tel?.trim() || null,
      fechaNac: formulario.fechaNac || null
    };

    this.usuariosService.crearUsuario(usuarioAEnviar).subscribe({
      next: (usuarioCreado) => {
        this.usuarios.update(list => [...list, usuarioCreado]);
        this.successMessage.set('¡Usuario creado con éxito!');
        this.cargarUsuarios();
        setTimeout(() => this.closeModalCreation(), 1500);
      },
      error: (err) => {
        console.log(usuarioAEnviar);
        console.error(err);
        let mensajeError = 'Error en el servidor al crear el usuario.';
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

  editarUsuario() {
    const usuario = this.usuarioSeleccionado();
    if (!usuario.id) {
      this.errorMessage.set('Error: No se ha seleccionado ningún usuario para editar.');
      return;
    }

    const usuarioAEnviar: any = {
      id: usuario.id,
      username: usuario.username?.trim() || null,
      email: usuario.email?.trim() || null,
      password: usuario.password || null,
      administrador: usuario.administrador === true,
      foto: usuario.foto?.trim() || 'user.jpg',
      email_sec: usuario.email_sec?.trim() || null,
      tel: usuario.tel?.trim() || null,
      fechaNac: usuario.fechaNac || null
    };

    this.usuariosService.editarUsuario(usuario.id, usuarioAEnviar).subscribe({
      next: (usuarioEditado) => {
        this.usuarios.update(list =>
          list.map(u => u.id === usuarioEditado.id ? usuarioEditado : u)
        );
        this.cargarUsuarios();
        this.successMessage.set('¡Usuario actualizado con éxito!');
        setTimeout(() => this.closeModalEdit(), 1500);
      },
      error: (err) => {
        console.error(err);
        let mensajeError = 'Error en el servidor al actualizar el usuario.';
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


  borrarUsuario() {
    const id = this.usuarioAEliminarId();
    if (!id) return;

    this.usuariosService.eliminarUsuario(id).subscribe({
      next: () => {
        this.successMessage.set("Usuario eliminado del sistema.");
        this.cargarUsuarios();
        setTimeout(() => this.closeModalDelete(), 1200);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set("No se puede borrar: El usuario tiene rutas asociadas en data.sql.");
      }
    });
  }


  private validarCampos(user: Partial<Usuario>): boolean {
    this.errorMessage.set('');
    let errores = '';
    if (!user.username?.trim()) errores += "El nombre de usuario es obligatorio.\n";
    if (!user.email?.trim()) errores += "El email principal es obligatorio.\n";

    this.errorMessage.set(errores);
    return errores === '';
  }

  openModalCreation() { this.isModalCreationOpen.set(true); }
  closeModalCreation() {
    this.isModalCreationOpen.set(false);
    this.nuevoUsuario.set({ username: '', email: '', password: '', email_sec: '', administrador: false, tel: '', fechaNac: '', foto: '' });
    this.errorMessage.set(''); this.successMessage.set('');
  }

  openModalEdit(usuario: Usuario) {
    this.usuarioSeleccionado.set({ ...usuario });
    this.isModalEditOpen.set(true);
  }
  closeModalEdit() {
    this.isModalEditOpen.set(false);
    this.errorMessage.set(''); this.successMessage.set('');
  }

  openModalDelete(id: number) {
    const user = this.usuarios().find(u => u.id === id);
    if (user) this.usuarioSeleccionado.set(user);
    this.usuarioAEliminarId.set(id);
    this.isModalDeleteOpen.set(true);
  }
  closeModalDelete() {
    this.isModalDeleteOpen.set(false);
    this.usuarioAEliminarId.set(undefined);
    this.errorMessage.set(''); this.successMessage.set('');
  }
}
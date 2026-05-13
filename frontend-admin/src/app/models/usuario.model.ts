import { Ruta } from './ruta.model';

export interface Usuario {
  id: number;
  nombreUsuario: string;   
  email: string;
  password: string;
  email_secundario: string;    
  administrador: boolean;
  telefono: string; 
  fecha_nacimiento: string;
  foto:string;
  rutasPublicadas: Ruta[]; // Usando la interface Ruta
}
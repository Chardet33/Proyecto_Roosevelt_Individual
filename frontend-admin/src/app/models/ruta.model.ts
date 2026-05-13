import { Usuario } from "./usuario.model";

export interface Ruta {
  id: number;
  nombreRuta: string;   
  mapboxJSON: string;
  descripcion: string;
  fecha_pub: string;    
  likesCount: number;
  zona?: any;           
  usuario_autor: Usuario; 
}
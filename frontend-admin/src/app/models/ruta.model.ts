import { Usuario } from "./usuario.model";
import { Zona } from "./zona.model";

export interface Ruta {
  id: number;
  nombreRuta: string;   
  mapboxJSON: string;
  descripcion: string;
  fecha_pub: string;    
  likesCount: number;
  zona: Zona;           
  usuario_autor: Usuario; 
}
import { Ruta } from "./ruta.model";
export interface Usuario {
  id: number;
  username: string;        // Cambiado de nombreUsuario a username
  email: string;
  password: string;
  email_sec: string;       // En Java pusiste email_sec
  administrador: boolean;
  tel: string;             // En Java pusiste tel
  fechaNac: string;        // En Java pusiste fechaNac
  foto: string;
  misRutas: Ruta[];        // En Java pusiste misRutas
}
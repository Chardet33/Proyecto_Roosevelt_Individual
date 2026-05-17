import { Zona } from "./zona.model";
import { TipoObjeto } from "./tipoobjeto.model";



export interface Objeto {
  id: number;
  mapBoxJSON: string;
  nombre_objeto: string;
  descripcion: string;
  imagen: string;
  peligrosidad: string;
  zona?: Zona;
  tipoObjeto?: TipoObjeto;
}

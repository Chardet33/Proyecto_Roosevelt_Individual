import { Zona } from "./zona.model";

export interface TipoObjeto {
  id: number;
  nombre_tipo: string;
  icono: string;
}

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

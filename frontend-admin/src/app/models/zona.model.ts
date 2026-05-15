import { Ruta } from "./ruta.model";

export interface Zona {
  id: number;
  nombre_zona: string;
  mapbox_json: string;
  peligrosidad: string;
  rutas?: Ruta[];
}

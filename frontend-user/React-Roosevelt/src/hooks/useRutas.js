
import { useState, useEffect } from "react";
import { getRutas } from "../services/ruteService";

export function useRutas() {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getRutas()
      .then(data => {
        setRutas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error en la API:", err);
        setLoading(false);
      });
  }, []);

  return { rutas, loading };
}
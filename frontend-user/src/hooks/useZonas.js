
import { useState, useEffect } from "react";
import { getZonas } from "../services/zoneService";

export function useZonas() {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getZonas()
      .then(data => {
        setZonas(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error en la API:", err);
        setLoading(false);
      });
  }, []);

  return { zonas, loading };
}
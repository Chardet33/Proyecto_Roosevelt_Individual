
import { useState, useEffect } from "react";
import { getObjetos } from "../services/objectService";

export function useObjetos() {
  const [objetos, setObjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getObjetos()
      .then(data => {
        setObjetos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error en la API:", err);
        setLoading(false);
      });
  }, []);

  return { objetos, loading };
}
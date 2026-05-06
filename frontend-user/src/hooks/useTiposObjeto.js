
import { useState, useEffect } from "react";
import { getTiposObjetos } from "../services/typeObjectService";

export function useTiposObjetos() {
  const [tiposObjetos, setTiposObjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTiposObjetos()
      .then(data => {
        setTiposObjetos(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return { tiposObjetos, loading };
}
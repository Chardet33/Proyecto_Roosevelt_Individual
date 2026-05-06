
import { useState, useEffect } from "react";
import { getLineasObjetos } from "../services/linesObjectsService";

export function useLineasObjetos() {
  const [lineasObjetos, setLineasObjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLineasObjetos()
      .then(data => {
        setLineasObjetos(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return { lineasObjetos, loading };
}
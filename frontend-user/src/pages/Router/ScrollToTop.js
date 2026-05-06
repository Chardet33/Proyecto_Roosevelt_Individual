import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Если в ссылке НЕТ решетки (якоря), тогда скроллим в самый верх
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Срабатывает при каждом изменении пути или якоря

  return null; // Этот компонент ничего не рисует на экране
}
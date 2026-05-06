import ContactoForm from "../../components/ContactoForm/ContactoForm";
import HeroSection from "../../components/HeroSection/HeroSection";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import ContactoForm from "../../components/ContactoForm/ContactoForm";
// import HeroSection from "../../components/HeroSection/HeroSection";

export default function Home(){
    const location = useLocation();

  // 3. Этот код сработает каждый раз, когда мы переходим на страницу Home
  useEffect(() => {
    // Проверяем, есть ли в ссылке "хвостик" с решеткой (например, #contacto)
    if (location.hash) {
      // Отрезаем решетку, чтобы получить чистое имя ID ("contacto")
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      // Если элемент найден на странице, плавно к нему прокручиваем
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Если якоря нет (просто нажали на логотип или Inicio), скроллим в самый верх
      window.scrollTo(0, 0);
    }
  }, [location]); // Запускаем заново, если ссылка поменялась
    return(
        <div>
           <HeroSection />
            <ContactoForm />
        </div>

    )
}

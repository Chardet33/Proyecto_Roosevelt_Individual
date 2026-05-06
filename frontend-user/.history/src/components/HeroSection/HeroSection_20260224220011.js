import "./HeroSection.scss";

export default function HeroSection() {
  const videoBG = "/assets/fondo.mp4";

  return (
    <section className="hero-section">
      <video className="hero-video" src={videoBG} autoPlay loop muted />

      <div className="hero-overlay animate-fade">
        <h3 className="hero-title">
          Tu compañero indispensable
        </h3>

        <p className="hero-text">
          Roosevelt es una aplicación de mapas creada para ayudar a las
          personas mayores o con discapacidades a desplazarse por zonas de
          difícil acceso en una ciudad o pueblo. ¡Os ayudaremos a orientaros
          rápidamente, evitar zonas peligrosas y encontrar lugares
          interesantes! Puedes navegarte y guardar tus rutas favoritas!
        </p>

        <button className="btn btn-custom hero-btn">
          Ir al mapa
        </button>
      </div>
    </section>
  );
}
import "./HeroSection.scss";

export default function HeroSection() {
  const videoBG = "/assets/fondo.mp4";

  return (
    <section className="hero-section">
      <video
        className="hero-video"
        src={videoBG}
        autoPlay
        loop
        muted
      />

      <div className="hero-overlay">
        <h3 className="text-light display-6 mb-3 text-center fw-bold">
          Tu compañero indispensable
        </h3>

        <p className="lead text-light text-center fs-4">
          Roosevelt es una aplicación de mapas creada para ayudar a las
          personas mayores o con discapacidades a desplazarse por zonas de
          difícil acceso en una ciudad o pueblo. ¡Os ayudaremos a orientaros
          rápidamente, evitar zonas peligrosas y encontrar lugares
          interesantes! Puedes navegarte y guardar tus rutas favoritas!
        </p>

        <button className="btn btn-custom rounded-pill px-4 py-2 fs-5">
          Ir al mapa
        </button>
      </div>
    </section>
  );
}
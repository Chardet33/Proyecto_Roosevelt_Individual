import "./HeroSection.scss";

export default function HeroSection() {
  const videoBG = "/assets/fondo.mp4";
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mx-5 my-3 bg-dark rounded rounded-5">
        <video className="opacity-50 border border-4 rounded rounded-5 w-100 object-fit-contain" src={videoBG} autoPlay loop muted />
        <div className="d-flex flex-column position-absolute justify-content-center w-75 px-5">
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
          <button className="align-self-center btn btn-primary rounded rounded-5 px-4 py-2 fs-5">
            Ir al mapa
          </button>
        </div>
      </div>
    </>
  );
}

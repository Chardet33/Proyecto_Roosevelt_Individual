import "./HeroSection.scss";

export default function HeroSection() {
    const videoBG = "/assets/fondo.mp4";

    return (
        <section className="hero-section bg-dark d-flex align-items-center justify-content-center">

            <video
                className="hero-video"
                src={videoBG}
                autoPlay
                loop
                muted
            />

            <div className="hero-overlay container text-center text-light px-4 px-md-5 py-4 py-md-5 rounded animate-fade bg-dark bg-opacity-25">

                <h1 className="herodisplay-4 display-md-3 fw-bolder text-uppercase mb-4 mb-md-5">
                    Tu compañero indispensable
                </h1>

                <p className="lead fs-6 fs-md-5 fw-light lh-lg mb-4 mb-md-5 mx-auto col-12 col-md-10 col-lg-8">
                    Roosevelt es una aplicación de mapas creada para ayudar a las
                    personas mayores o con discapacidades a desplazarse por zonas de
                    difícil acceso en una ciudad o pueblo. ¡Os ayudaremos a orientaros
                    rápidamente, evitar zonas peligrosas y encontrar lugares interesantes!
                    Puedes navegarte y guardar tus rutas favoritas!
                </p>

                <button className=" btn btn-primary px-4 px-md-5 py-2 py-md-3  fs-6 fs-md-5 fw-bold  text-uppercase border border-secondary border-2 rounded-pill">
                    Ir al mapa
                </button>

            </div>
        </section>
    );
}
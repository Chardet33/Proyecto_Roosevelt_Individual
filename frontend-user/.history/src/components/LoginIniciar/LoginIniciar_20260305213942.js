import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginIniciar({onSwitch}) {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   

    if (credentials.username && credentials.password) {
      console.log("datos:", credentials);
      alert("¡Sesión iniciada!");
      navigate("/");
    } else {
      alert("Por favor, rellena todos los campos");
    }
  };

  return (
    <div className="animate-fade">
      <div className="row justify-content-center">

        {/* Tamaño responsive del formulario */}
        <div className="col-12 col-sm-11 col-md-10 col-lg-11">

          <form onSubmit={handleSubmit} className="row g-4">

            {/* EMAIL */}
            <div className="col-12">
              <div className="row align-items-center">

                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-md-0 text-primary">
                    Username
                  </label>
                </div>

                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    name="username"
                    className="form-control rounded-3 p-3"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="kris"
                    required
                  />
                </div>

              </div>
            </div>

            {/* PASSWORD */}
            <div className="col-12">
              <div className="row align-items-center">

                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-md-0 text-primary">
                    Contraseña
                  </label>
                </div>

                <div className="col-12 col-md-8">
                  <input
                    type="password"
                    name="password"
                    className="form-control rounded-3 p-3"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Tu contraseña"
                    required
                  />
                </div>

              </div>
            </div>

            {/* BOTÓN */}
            <div className="col-12 text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
              >
                Iniciar Sesión
              </button>
            </div>

          </form>

          {/* REGISTRO */}
          <div className="text-center mt-4">
            <p className="small mb-0">
              ¿No tienes cuenta?{" "}  </p>
              <button
                onClick={() => onSwitch("registro")}
                type="button"
                className="btn btn-link fw-semibold link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Regístrate aquí
              </button>

         
        </div>

      </div>
    </div>
    </div >
  );
}
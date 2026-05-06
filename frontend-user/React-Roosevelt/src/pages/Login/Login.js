import React, { useState, useEffect } from "react";
import LoginIniciar from "../../components/LoginIniciar/LoginIniciar";
import LoginForm from "../../components/LoginForm/LoginForm";
import RecuperarContrasena from "../../components/Recuperacion/RecuperarContrasena";
import "./Login.scss";

export default function Login({ view }) {
  const [activeTab, setActiveTab] = useState(view || "iniciar");

  useEffect(() => {
    if (view) setActiveTab(view);
  }, [view]);

  return (
    <section className="py-4 py-md-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          
          {/* Responsive ancho automático */}
         
            {/*<div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">*/}

            <div className="bg-form p-4 p-md-5 rounded-4 shadow border col-xl-8">

              {/* Header */}
              <div className="text-center mb-4 mb-md-5">
                <p className="text-uppercase fw-bold text-primary fs-4 fs-md-3 ">
                  Bienvenido!
                </p>
                <h2 className="title-login fw-bold text-primary fs-4 fs-md-3">
                  Accede a tu cuenta
                </h2>
              </div>

              {/* Botones navegación */}
              <div className="row g-2 mb-4">

                <div className="col-12 col-md-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("iniciar")}
                    className={`navigacion-btn w-100 btn rounded-pill fw-bold text-uppercase border border-secondary border-2 ${
                      activeTab === "iniciar"
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                  >
                    Entrar
                  </button>
                </div>

                <div className="col-12 col-md-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("registro")}
                    className={`w-100 navigacion-btn btn rounded-pill fw-bold text-uppercase border border-secondary border-2 ${
                      activeTab === "registro"
                        ? "btn-primary"
                        : "btn-outline-secondary "
                    }`}
                  >
                    Registro
                  </button>
                </div>

                <div className="col-12 col-md-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("recuperar")}
                    className={`w-100 navigacion-btn btn rounded-pill fw-bold text-uppercase border 
                      border-secondary border-2 ${
                      activeTab === "recuperar"
                        ? "btn-primary"
                        : "btn-outline-secondary "
                    }`}
                  >
                    Ayuda
                  </button>
                </div>

              </div>

              {/* Contenido dinámico */}
              <div>
                {activeTab === "iniciar" && (
                  <LoginIniciar onSwitch={setActiveTab} />
                )}

                {activeTab === "registro" && (
                  <LoginForm onSwitch={setActiveTab} />
                )}

                {activeTab === "recuperar" && (
                  <RecuperarContrasena onSwitch={setActiveTab} />
                )}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
import React, { useState, useEffect } from "react";
import LoginIniciar from "../../components/LoginIniciar/LoginIniciar";
import LoginForm from "../../components/LoginForm/LoginForm";
import RecuperarContrasena from "../../components/Recuperacion/RecuperarContrasena";

export default function Login({ view }) {
  // Estado para controlar qué pestaña está activa
  const [activeTab, setActiveTab] = useState(view || "iniciar");

  // Si vienes desde el menú del рeader, actualizamos la pestaña
  useEffect(() => {
    if (view) setActiveTab(view);
  }, [view]);

  return (
    <div className="container-fluid mt-5 animate-fade">
      <div className="row justify-content-center">
        {/*  col-md-10 para  */}
        <div className="col-12 col-md-10">
          <div className="card shadow-lg border-0">
            
            {/* BOTONES DE NAVEGACIÓN INTERNA */}
            <div className="d-flex btn-group bg-light">
              <button 
                className={`flex-fill btn p-3 border-0 rounded-0 ${activeTab === 'iniciar' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab('iniciar')}
              >
                Entrar
              </button>
              <button 
                className={`flex-fill btn p-3 border-0 rounded-0 ${activeTab === 'registro' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab('registro')}
              >
                Registro
              </button>
              <button 
                className={`flex-fill btn p-3 border-0 rounded-0 ${activeTab === 'recuperar' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setActiveTab('recuperar')}
              >
                Ayuda
              </button>
            </div>

            <div className="card-body p-5">
              {/* RENDERIZADO CONDICIONAL */}

              {/* Si pulsas Entrar -> Tu componente de Login rápido */}
              {activeTab === "iniciar" && (
                <LoginIniciar />
              )}

              {/* Si pulsas Registro -> TU COMPONENTE LoginForm (el que acabas de pasar) */}
              {activeTab === "registro" && (
                <LoginForm />
              )}

              {/* Si pulsas Ayuda -> Tu componente de Recuperar */}
              {activeTab === "recuperar" && (
                <RecuperarContrasena />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
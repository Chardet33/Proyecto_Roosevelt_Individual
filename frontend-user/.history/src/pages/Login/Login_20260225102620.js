import React, { useState, useEffect } from "react";
import LoginIniciar from "../../components/LoginIniciar/LoginIniciar";


export default function Login({ view }) {
  // 
  const [activeTab, setActiveTab] = useState(view || "iniciar");

  // Si el usuario llega desde el Header, actualizamos 
  useEffect(() => {
    setActiveTab(view);
  }, [view]);

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: '450px' }}>
        
        {/* */}
        <div className="d-flex border-bottom">
          <button 
            className={`flex-fill btn p-3 ${activeTab === 'iniciar' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setActiveTab('iniciar')}
          >
            Entrar
          </button>
          <button 
            className={`flex-fill btn p-3 ${activeTab === 'registro' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setActiveTab('registro')}
          >
            Registro
          </button>
          <button 
            className={`flex-fill btn p-3 ${activeTab === 'recuperar' ? 'btn-primary' : 'btn-light'}`}
            onClick={() => setActiveTab('recuperar')}
          >
            Ayuda
          </button>
        </div>

        <div className="card-body p-4">
          {/* RENDERIZADO SEGÚN EL BOTÓN PULSADO */}
          {activeTab === "iniciar" && (
            <Logininiciar isRegister={false} />
          )}

          {activeTab === "registro" && (
            <Logininiciar isRegister={true} />
          )}

          {activeTab === "recuperar" && (
            <div className="text-center">
              <h5>¿Problemas con tu cuenta?</h5>
              <p>Introduce tu email para recuperar el acceso.</p>
              <input type="email" className="form-control mb-3" placeholder="email@correo.com" />
              <button className="btn btn-warning w-100">Enviar enlace</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
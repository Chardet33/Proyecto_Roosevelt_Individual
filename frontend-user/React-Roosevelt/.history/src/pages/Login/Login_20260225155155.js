import React, { useState } from "react";
import LoginIniciar from "../../components/LoginIniciar/LoginIniciar";
import RecuperarContrasena from "../../components/Recuperacion/RecuperarContrasena";

export default function Login() {
  // Состояние: 'entrar', 'registro' или 'ayuda'
  const [activeTab, setActiveTab] = useState("entrar");

  return (
    <div className="container mt-5 animate-fade">
      <div className="row justify-content-center">
        {/* Делаем форму широкой (col-md-10) */}
        <div className="col-12 col-md-10">
          <div className="card shadow-lg border-0">
            
            {/* ТРИ КНОПКИ УПРАВЛЕНИЯ */}
            <div className="d-flex btn-group">
              <button 
                className={`flex-fill btn p-3 ${activeTab === 'entrar' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setActiveTab('entrar')}
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
                className={`flex-fill btn p-3 ${activeTab === 'ayuda' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setActiveTab('ayuda')}
              >
                Ayuda
              </button>
            </div>

            <div className="card-body p-5">
              {/* ЛОГИКА ОТОБРАЖЕНИЯ ФОРМ */}

              {activeTab === "entrar" && (
                <div className="form-section">
                  <LoginIniciar isRegister={false} />
                </div>
              )}

              {activeTab === "registro" && (
                <div className="form-section">
                  <LoginIniciar isRegister={true} />
                </div>
              )}

              {activeTab === "ayuda" && (
                <div className="form-section">
                  <RecuperarContrasena />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
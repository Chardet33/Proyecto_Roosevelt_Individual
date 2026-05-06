import React from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login({ view }) {
  // Esta función nos ayuda a poner el título correcto según la prop 'view'
  const obtenerTitulo = () => {
    if (view === "registro") return "Crea tu cuenta en Roosevelt";
    if (view === "recuperar") return "Recuperar tu contraseña";
    return "Identifícate";
  };

  return (
    <section className="login-container mt-5 animate-fade">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg p-4">
              <h2 className="text-center mb-4">{obtenerTitulo()}</h2>

              {/* LÓGICA DE INTERRUPTOR (Conditional Rendering) */}
              
              {/* CASO 1: LOGIN */}
              {view === "login" && (
                <LoginForm isRegister={false} />
              )}

              {/* CASO 2: REGISTRO */}
              {view === "registro" && (
                <LoginForm isRegister={true} />
              )}

              {/* CASO 3: RECUPERAR */}
              {view === "recuperar" && (
                <div className="text-center">
                  <p>Introduce tu correo y te enviaremos un enlace.</p>
                  <input type="email" className="form-control mb-3" placeholder="email@ejemplo.com" />
                  <button className="btn btn-primary w-100">Enviar enlace</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
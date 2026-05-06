import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm'; // Твой компонент входа

export default function LoginPage() {
  // Состояние, которое определяет, что сейчас показывать
  // По умолчанию — 'login'
  const [view, setView] = useState('login');

  return (
    <div className="container mt-5 animate-fade">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '500px' }}>
        
        {/*  */}
        <div className="btn-group w-100 mb-4" role="group">
          <button 
            className={`btn ${view === 'login' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('login')}
          >
            Entrar
          </button>
          <button 
            className={`btn ${view === 'register' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('register')}
          >
            Registro
          </button>
          <button 
            className={`btn ${view === 'recuperar' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('recuperar')}
          >
            Recuperar
          </button>
        </div>

        {/*  */}
        <div className="form-container">
          
          {view === 'login' && (
            <div>
              <h3 className="text-center">Iniciar Sesión</h3>
              <LoginForm isRegister={false} />
            </div>
          )}

          {view === 'register' && (
            <div>
              <h3 className="text-center">Crear Cuenta</h3>
              <LoginForm isRegister={true} />
            </div>
          )}

          {view === 'recuperar' && (
            <div className="text-center">
              <h3>¿Olvidaste tu contraseña?</h3>
              <p className="text-muted">Introduce tu email para ayudarte.</p>
              <input type="email" className="form-control mb-3" placeholder="email@ejemplo.com" />
              <button className="btn btn-warning w-100">Enviar enlace</button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
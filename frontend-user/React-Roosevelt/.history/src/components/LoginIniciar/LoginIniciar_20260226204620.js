import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // redirect despues de la entrada
import "./LoginIniciar.scss"

export default function LoginIniciar() {

  const [credentials, setCredentials] = useState({
    email: "",
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

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (credentials.email && credentials.password) {
      console.log("datos:", credentials);
      
      alert("¡Sesión iniciada!");
      navigate("/"); // 
    } else {
      alert("Por favor, rellena todos los campos");
    }
  };

  return (
    <div className="animate-fade d-flex justify-content-center">
       <div className="col-12 col-sm-8 col-md-6 col-lg-7">
      <h2 className="text-center mb-4">Bienvenido de nuevo</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            value={credentials.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label small">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control form-control-lg"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
        <button type="submit" className="btn btn-custom px-5 py-2">
          Iniciar Sesión
        </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <p className="small">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </div>
      </div>
    </div>
  );
}

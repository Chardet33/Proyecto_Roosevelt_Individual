import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // redirect despues de la entrada

export default function Login() {

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
      
      // На экзамене важно показать переход на другую страницу после успеха
      alert("¡Sesión iniciada!");
      navigate("/"); // Отправляем пользователя на главную (Home)
    } else {
      alert("Por favor, rellena todos los campos");
    }
  };

  return (
    <div className="login-card p-4 shadow animate-fade">
      <h2 className="text-center mb-4">Bienvenido de nuevo</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={credentials.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2">
          Iniciar Sesión
        </button>
      </form>

      <div className="text-center mt-3">
        <p className="small">
          ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}
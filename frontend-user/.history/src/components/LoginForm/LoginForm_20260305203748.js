import React, { useState } from "react";
import axios from 'axios';

export default function LoginForm({ onSwitch }) { // Registrar
  const [formData, setFormData] = useState({
    username: "", // el campo para BD
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [errors, setErrors] = useState({});
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) newErrors.username = true;
    if (!formData.nombre) newErrors.nombre = true;
    if (!formData.apellido) newErrors.apellido = true;
    if (!formData.email) newErrors.email = "required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "invalid";
    if (!formData.contrasena) newErrors.contrasena = true;
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "no_match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // datos para Spring boot
        const userLoad = {
          username: formData.username,
          password: formData.contrasena, 
          email: formData.email,
          email_sec: formData.email, 
          nombre: formData.nombre,
          apellido: formData.apellido,
          administrador: false 
        };

        const response = await axios.post(
          "http://localhost:8081/backend-rooselvelt/api/users", 
          userLoad
        );

        console.log("Успех:", response.data);
        alert("Пользователь зарегистрирован!");
        onSwitch("iniciar"); // Переключаем на форму логина

      } catch (error) {
        console.error("Ошибка при регистрации:", error.response?.data || error.message);
        alert("Ошибка: " + (error.response?.data?.message || "Не удалось создать пользователя"));
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center animate-fade">
      <div className="col-12 col-sm-8 col-md-9 col-lg-10">
        <h2 className="text-center mb-4 text-primary">Formulario de registro</h2>

        <form onSubmit={handleSubmitForm}>
          {/* НОВОЕ ПОЛЕ: Username */}
          <div className="mb-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario (Login)"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <small className="text-danger">Username es obligatorio</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="form-control"
            />
            {errors.nombre && <small className="text-danger">Nombre es obligatorio</small>}
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              className="form-control"
            />
            {errors.apellido && <small className="text-danger">Apellido es obligatorio</small>}
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
            />
            {errors.email === "required" && <small className="text-danger">Email es obligatorio</small>}
            {errors.email === "invalid" && <small className="text-danger">Email no es válido</small>}
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              className="form-control"
            />
            {errors.contrasena && <small className="text-danger">Contraseña es obligatoria</small>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              className="form-control"
            />
            {errors.confirmarContrasena === "no_match" && <small className="text-danger">Las contraseñas no coinciden</small>}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary rounded-pill px-5 py-3 fw-bold text-uppercase">
              Registrarme
            </button>
          </div>

          <div className="text-center mt-3">
            <button onClick={() => onSwitch("iniciar")} type="button" className="btn btn-link">
              ¿Ya tienes cuenta? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
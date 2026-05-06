import React, { useState } from "react";
import axios from 'axios';

export default function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    
    tel: "",
    fechaNac: "",
    foto: ""
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
    if (!formData.email) newErrors.email = "required";
    if (!formData.contrasena) newErrors.contrasena = true;
    if (!formData.tel) newErrors.tel = true;
    if (!formData.fechaNac) newErrors.fechaNac = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userLoad = {
          username: formData.username,
          password: formData.contrasena, 
          email: formData.email,
          email_sec: formData.email, 
          nombre: formData.nombre,
          apellido: formData.apellido,
          administrador: false,
          tel: formData.tel,
          fechaNac: formData.fechaNac,
          foto: formData.foto || "default.png" 
        };

        const response = await axios.post(
          "http://localhost:8081/backend-rooselvelt/api/users", 
          userLoad
        );

        console.log("Success:", response.data);
        alert("Usuario registrado con éxito!");
        onSwitch("iniciar"); 

      } catch (error) {
        console.error("Error details:", error.response?.data || error.message);
        alert("Error: " + (error.response?.data?.error || "revisa los campos"));
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center animate-fade">
      <div className="col-12 col-sm-8 col-md-9 col-lg-10">
        <h2 className="text-center mb-4 text-primary">Formulario de registro</h2>

        <form onSubmit={handleSubmitForm}>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="form-control" />
              {errors.username && <small className="text-danger">Requerido</small>}
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="form-control" />
            </div>
          </div>

          <div className="mb-3">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-control" />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" className="form-control" />
            </div>
            <div className="col-md-6 mb-3">
              <input type="password" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} placeholder="Confirmar" className="form-control" />
            </div>
          </div>

          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label small">Teléfono</label>
              <input type="text" name="tel" value={formData.tel} onChange={handleChange} placeholder="Ej: +34..." className="form-control" />
              {errors.tel && <small className="text-danger">Teléfono es obligatorio</small>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label small">Fecha de Nacimiento</label>
              <input type="date" name="fechaNac" value={formData.fechaNac} onChange={handleChange} className="form-control" />
              {errors.fechaNac && <small className="text-danger">Fecha es obligatoria</small>}
            </div>
          </div>

          <div className="mb-3">
            <input type="text" name="foto" value={formData.foto} onChange={handleChange} placeholder="URL de tu foto (opcional)" className="form-control" />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary rounded-pill px-5 py-3 fw-bold text-uppercase">
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
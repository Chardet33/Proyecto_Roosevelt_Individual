
import React, { useState } from "react";
import "../../index.css";

export default function RecuperarContrasena() {
  const [formData, setFormData] = useState({

    email: "",

  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { email, value } = e.target;
    setFormData((prev) => ({ ...prev, [email]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = true;


    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const onSubmit = (data) => {

    console.log("Las contraseña fue enviado al email registrado");
    return;
  };

  return (
    <>
      <h2>Formulario de recuperacion de contrasena
        <div data-bs-theme="dark">
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
      </h2>

      <form className="App" onSubmit={handleSubmitForm}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span style={{ color: "red" }}>*Email* es obligatorio</span>}
        <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
        <button type="button">Recuperarme</button>
        <button type="button">Login</button>
      </form>
    </>
  );
}

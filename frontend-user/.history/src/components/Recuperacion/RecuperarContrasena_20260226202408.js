import React, { useState } from "react";
import "../../index.css";
import "../LoginForm/LoginForm.scss";

export default function RecuperarContrasena() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // borro error
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "invalid";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("La contraseña fue enviada al email registrado");
      setFormData({ email: "" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-11 col-sm-8 col-md-6 col-lg-5">

        <h2 className="text-center mb-4">
          Recuperar contraseña
        </h2>

        <form onSubmit={handleSubmitForm}>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
            />
            {errors.email === "required" && (
              <small className="text-danger">
                Email es obligatorio
              </small>
            )}
            {errors.email === "invalid" && (
              <small className="text-danger">
                Email no es válido
              </small>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4 mb-3">
            <button type="submit" className="btn btn-custom">
              Enviar enlace
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link btn_link link-underline-opacity-0"
            >
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
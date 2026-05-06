import React, { useState } from "react";
import "./ContactForm.scss";

export default function ContactoForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const nombreRegex =
    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79}( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79})*$/;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
  const phoneRegex = /^[0-9+\-\s]{6,20}$/;
  const messageRegex = /^.{10,500}$/;

  // Валидация одного поля
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "El nombre es obligatorio";
        else if (!nombreRegex.test(value)) error = "El nombre no es válido";
        break;

      case "surname":
        if (!value) error = "El apellido es obligatorio";
        else if (!nombreRegex.test(value)) error = "El apellido no es válido";
        break;

      case "email":
        if (!value) error = "El email es obligatorio";
        else if (!emailRegex.test(value)) error = "El email no es válido";
        break;

      case "phone":
        if (!value) error = "El teléfono es obligatorio";
        else if (!phoneRegex.test(value)) error = "El teléfono no es válido";
        break;

      case "message":
        if (!value) error = "El mensaje es obligatorio";
        else if (!messageRegex.test(value))
          error = "El mensaje debe tener al menos 10 caracteres";
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // При изменении поля → валидация
  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, value);
  };

  // submit
  const onSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(form).forEach((field) => {
      let value = form[field];
      let error = "";

      if (field === "name") {
        if (!value) error = "El nombre es obligatorio";
        else if (!nombreRegex.test(value)) error = "El nombre no es válido";
      }

      if (field === "surname") {
        if (!value) error = "El apellido es obligatorio";
        else if (!nombreRegex.test(value)) error = "El apellido no es válido";
      }

      if (field === "email") {
        if (!value) error = "El email es obligatorio";
        else if (!emailRegex.test(value)) error = "El email no es válido";
      }

      if (field === "phone") {
        if (!value) error = "El teléfono es obligatorio";
        else if (!phoneRegex.test(value)) error = "El teléfono no es válido";
      }

      if (field === "message") {
        if (!value) error = "El mensaje es obligatorio";
        else if (!messageRegex.test(value))
          error = "El mensaje debe tener al menos 10 caracteres";
      }

      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Formulario enviado correctamente");

      setForm({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <p className="text-uppercase">Contact Us</p>
          <h2 className="fw-bold">We are here for you</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form
              className="row g-4 contact-form p-4 rounded needs-validation"
              noValidate
              onSubmit={onSubmit}
            >
              {/* NAME */}
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Name"
                  value={form.name}
                  onChange={onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* SURNAME */}
              <div className="col-md-6">
                <input
                  type="text"
                  name="surname"
                  className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                  placeholder="Surname"
                  value={form.surname}
                  onChange={onChange}
                />
                {errors.surname && (
                  <div className="invalid-feedback">{errors.surname}</div>
                )}
              </div>

              {/* EMAIL */}
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  value={form.email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* PHONE */}
              <div className="col-md-6">
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Phone"
                  value={form.phone}
                  onChange={onChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              {/* MESSAGE */}
              <div className="col-12">
                <textarea
                  name="message"
                  className={`form-control ${errors.message ? "is-invalid" : ""}`}
                  rows="4"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={onChange}
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback d-block">
                    {errors.message}
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-custom px-5">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
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

  const [error, setError] = useState("");

  const nombreRegex =
    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79}( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79})*$/;
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
  const phoneRegex = /^[0-9+\-\s]{6,20}$/;
  const messageRegex = /^.{10,500}$/; // от 10 до 500 символов

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, surname, email, phone, message } = form;

    if (!name) {
      setError("El nombre es obligatorio");
    } else if (!nombreRegex.test(name)) {
      setError("El nombre no es válido");
    } else if (!surname) {
      setError("El apellido es obligatorio");
    } else if (!nombreRegex.test(surname)) {
      setError("El apellido no es válido");
    } else if (!email) {
      setError("El email es obligatorio");
    } else if (!emailRegex.test(email)) {
      setError("El email no es válido");
    } else if (!phone) {
      setError("El teléfono es obligatorio");
    } else if (!phoneRegex.test(phone)) {
      setError("El teléfono no es válido");
    } else if (!message) {
      setError("El mensaje es obligatorio");
    } else if (!messageRegex.test(message)) {
      setError("El mensaje debe tener al menos 10 caracteres");
    } else {
      setError("");
      alert("Formulario enviado correctamente");

      // Очистка формы
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
                  className="form-control"
                  placeholder="Name"
                  value={form.name}
                  onChange={onChange}
                />
              </div>

              {/* SURNAME */}
              <div className="col-md-6">
                <input
                  type="text"
                  name="surname"
                  className="form-control"
                  placeholder="Surname"
                  value={form.surname}
                  onChange={onChange}
                />
              </div>

              {/* EMAIL */}
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={onChange}
                />
              </div>

              {/* PHONE */}
              <div className="col-md-6">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={onChange}
                />
              </div>

              {/* MESSAGE */}
              <div className="col-12">
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={onChange}
                ></textarea>
              </div>

              {/* ERROR */}
              {error && (
                <div className="col-12">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}

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
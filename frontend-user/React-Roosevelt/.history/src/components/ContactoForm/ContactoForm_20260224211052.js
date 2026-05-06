import React, { useState } from "react";
import "./ContactForm.scss";

export default function ContactoForm() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const nombreRegex =
    /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79}( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79})*$/;
  const emailRegex =
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError("El nombre es obligatorio");
    } else if (!nombreRegex.test(name)) {
      setError("El nombre no es válido");
    } else if (!surname) {
      setError("El apellido es obligatorio");
    } else if (!email) {
      setError("El email es obligatorio");
    } else if (!emailRegex.test(email)) {
      setError("El email no es válido");
    } else {
      setError("");
      alert("Formulario enviado correctamente");
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
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* SURNAME */}
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PHONE */}
              <div className="col-md-6">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>

              {/* MESSAGE */}
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Your Message"
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
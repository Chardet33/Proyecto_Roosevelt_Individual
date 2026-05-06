import React, { useState } from "react";
import Cont
export default function ContactoForm() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const nombreRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79}( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,79})*$/;
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;

    const onSubmit = (e) => {
        e.preventDefault()
        const nombreValido = nombreRegex.test(name);
        const emailValido = emailRegex.test(email);


        if (!name) {
            setError("El nombre es obligatorio")
        } else if (!nombreValido) {
            setError("El nombre no es válido")
        } else if (!email) {
            setError("El email es obligatorio")
        } else if (!emailValido) {
            setError("El email no es válido")
        } else if (!surname) {
            setError("El apellido es obligatorio")
        } else {
            setError("")
        }
    }
    const manejarCambio = (e) => {
        setName(e.target.value);
        setEmail(e.target.value);
        setSurname(e.target.value);
    };
    return (
        <section class="contact-section py-5">
            <div class="container">

                <div class="text-center mb-5">
                    <p class="text-uppercase">Contact Us</p>
                    <h2 class="fw-bold">We are here for you</h2>

                </div>

                <div class="row justify-content-center">
                    <div class="col-lg-8">

                        <form class="row g-4 contact-form p-4 rounded needs-validation" novalidate onSubmit={onSubmit}>

                            <div class="col-md-6">
                                <input type="text" class="form-control" placeholder="Name"
                                    onChange={manejarCambio}
                                    required />
                                <div class="invalid-feedback">Please enter your name.</div>
                                {error && (
                                    <small className="text-danger">{error}</small>
                                )}
                            </div>

                            <div class="col-md-6">
                                <input type="text"  onChange={manejarCambio} class="form-control" placeholder="Surname" required />
                                <div class="invalid-feedback">Please enter your surname.</div>
                            </div>

                            <div class="col-md-6">
                                <input type="email" class="form-control" 
                                 onChange={manejarCambio}
                                 placeholder="Email" required />
                                <div class="invalid-feedback">Please enter a valid email.</div>
                            </div>

                            <div class="col-md-6">
                                <input type="tel" class="form-control" placeholder="Phone" required />
                            </div>

                            <div class="col-12">
                                <textarea class="form-control" rows="4" placeholder="Your Message" required></textarea>
                                <div class="invalid-feedback">Please enter your message.</div>
                            </div>

                            <div class="col-12 text-center">
                                <button type="submit" class="btn btn-custom px-5">
                                    Send Message
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
import React, { useState } from "react";

export default function RecuperarContrasena({ onSwitch }) {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const validateField = (name, value) => {
    let error = "";
    const cleanValue = value ? value.trim() : "";

    if (name === "email") {
      if (!cleanValue) {
        error = "required";
      } else if (!emailRegex.test(cleanValue)) {
        error = "invalid";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);

    if (validated) setValidated(false);
    if (statusMessage) setStatusMessage("");
  };

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const form = e.currentTarget;

    const emailError = validateField("email", formData.email);

    if (emailError || form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // Lógica de éxito
    console.log("La contraseña fue enviada al email:", formData.email.trim());
    setStatusMessage("La contraseña fue enviada al email registrado.");
    
 
    setFormData({ email: "" });
    setValidated(false);
    setErrors({});


    // const newErrors = {};
    // if (!formData.email) newErrors.email = "required";
    // else if (!emailRegex.test(formData.email)) newErrors.email = "invalid";

    // setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   console.log("La contraseña fue enviada al email registrado");
    //   setFormData({ email: "" });

    //   setValidated(false);
    // }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="col-12 col-sm-10 col-md-9 col-lg-8">
        <h2 className="text-center mb-4 text-primary fw-bold">Recuperar contraseña</h2>

        <form onSubmit={handleSubmitForm} className={`row g-4 ${validated ? "was-validated" : ""}`} noValidate>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electronico"
              className="form-control rounded-3 p-3"
            />
            {errors.email === "required" && (
              <small className="text-danger">Email es obligatorio</small>
            )}
            {errors.email === "invalid" && (
              <small className="text-danger">Email no es válido</small>
            )}
          </div>

          <div className="col-12 text-center mt-3">
            <button
              type="submit"
              className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
            >
              Enviar
            </button>
          </div>

          <div className="text-center mt-3 ">
            <button
              onClick={() => onSwitch("iniciar")}
              type="button"
              className="btn link-hover fw-semibold btn link-hover"
            >
              Login
            </button>
          </div>
          {statusMessage && (
            <div className="col-12 text-center mt-3">
              <div className="alert alert-success border-0 shadow-sm py-2">
                {statusMessage}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
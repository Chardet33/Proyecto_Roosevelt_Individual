import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.scss";

export default function RegisterForm({ onSwitch }) {

  const initialForm = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    tel: "",
    fecha_nac: "",
    foto: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (statusMessage) setStatusMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false || formData.password !== formData.confirmPassword) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    try {

      const userload = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        email_sec: formData.email,
        tel: formData.tel,
        fechaNac: formData.fecha_nac,
        foto: formData.foto || "default.png",
        administrador: false
      };
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/api/usuarios`, userload);

      //await axios.post("http://localhost:8080/roosevelt/api/usuarios", userload);

      setStatusMessage("Usuario se ha registrado correctamente");

      setTimeout(() => {
        onSwitch("iniciar");
      }, 2000);

    } catch (error) {

      const errorMsg =
        error.response?.data?.message || "Error al registrar usuario";

      setStatusMessage(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pb-2 pt-1">
      <div className="row justify-content-center">

        <div className="col-12 col-sm-10 col-md-9 col-lg-10 col-xl-11">

          <div className="pt-1 pb-1">
            <h2 className="mb-4 text-center text-primary fw-bold">
              Registración
            </h2>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit}
            className={`row g-4 p-5 rounded-4 shadow-sm bg-white border border-primary-subtle ${validated ? "was-validated" : ""}`}
          >

            {/* username */}
            <div className="col-md-12 col-lg-6">
              <input
                type="text"
                name="username"
                required
                minLength="3"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                className="form-control rounded-3 p-4"
              />

              <div className="invalid-feedback">
                El nombre debe tener mínimo 3 caracteres
              </div>
            </div>

            {/* email */}
            <div className="col-md-12 col-lg-6">
              <input
                type="email"
                name="email"
                required
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="form-control rounded-3 p-4"
              />

              <div className="invalid-feedback">
                Ingresa un correo válido
              </div>
            </div>

            {/* password */}
            <div className="col-md-12 col-lg-6">
              <input
                type="password"
                name="password"
                required
                minLength="4"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className="form-control rounded-3 p-4"
              />

              <div className="invalid-feedback">
                La contraseña debe tener mínimo 4 caracteres
              </div>
            </div>

            {/* confirm password */}
            <div className="col-md-12 col-lg-6">
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-control rounded-3 p-4 ${
                  validated && formData.password !== formData.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
              />

              <div className="invalid-feedback">
                Las contraseñas no coinciden
              </div>
            </div>

            {/* teléfono */}
            <div className="col-12">
              <input
                type="tel"
                name="tel"
                required
                pattern="[0-9]{7,15}"
                placeholder="Teléfono"
                value={formData.tel}
                onChange={handleChange}
                className="form-control rounded-3 p-4"
              />

              <div className="invalid-feedback">
                Ingresa un teléfono válido
              </div>
            </div>

            {/* fecha nacimiento */}
            <div className="col-12">
              <input
                type="date"
                name="fecha_nac"
                required
                value={formData.fecha_nac}
                onChange={handleChange}
                className="form-control rounded-3 p-4"
              />

              <div className="invalid-feedback">
                La fecha de nacimiento es obligatoria
              </div>
            </div>

            {/* foto */}
            <div className="col-md-12">
              <input
                type="url"
                name="foto"
                placeholder="URL de tu foto"
                value={formData.foto}
                onChange={handleChange}
                className="form-control rounded-3 p-4"
              />
            </div>

            {/* mensaje */}
            {statusMessage && (
              <div className="col-12">
                <div
                  className={`alert ${
                    statusMessage.includes("correctamente")
                      ? "alert-success"
                      : "alert-danger"
                  } text-center`}
                >
                  {statusMessage}
                </div>
              </div>
            )}

            {/* botón */}
            <div className="col-12 text-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
              >
                {loading ? "Enviando..." : "Registrarme"}
              </button>
            </div>

            {/* login */}
            <div className="col-12 text-center mt-2">

              <p className="text-muted small">
                ¿Ya tienes cuenta?
              </p>

              <button
                type="button"
                onClick={() => onSwitch("iniciar")}
                className="btn link-hover fw-semibold"
              >
                Login
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import axios from "axios";
// import "./LoginForm.scss";

// export default function RegisterForm({ onSwitch }) {
//   const initialForm = {
//     username: "",
//     password: "",
//     confirmPassword: "",
//     email: "",
//     email_sec: "",
//     tel: "",
//     fecha_nac: "",
//     foto: ""
//   };

//   const [formData, setFormData] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [statusMessage, setStatusMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [validated, setValidated] = useState(false);

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const validate = () => {
//     let newErrors = {};
//     if (!formData.username) newErrors.username = "El nombre de usuario es obligatorio";
//     if (!formData.email) {
//       newErrors.email = "El correo es obligatorio";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Correo no es válido";
//     }
//     if (!formData.password) {
//       newErrors.password = "La contraseña es obligatoria";
//     } else if (formData.password.length < 4) {
//       newErrors.password = "La contraseña debe tener mínimo 4 caracteres";
//     }
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Las contraseñas no coinciden";
//     }
//     if (!formData.tel) newErrors.tel = "El teléfono es obligatorio";
//     if (!formData.fecha_nac) newErrors.fecha_nac = "La fecha de nacimiento es obligatoria";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Limpiar error del campo actual al escribir
//     if (errors[name]) setErrors({ ...errors, [name]: "" });
//     if (statusMessage) setStatusMessage("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setValidated(true);
//     if (!validate()) return;

//     setLoading(true);
//     try {

//       const userload = {
//         username: formData.username,
//         password: formData.password,
//         email: formData.email,
//         email_sec: formData.email_sec || formData.email,
//         tel: formData.tel,
//         fechaNac: formData.fecha_nac,
//         foto: formData.foto || "default.png",
//         administrador: false
//       };

//       await axios.post("http://localhost:8080/roosevelt/api/users", userload);

//       setStatusMessage("Usuario se ha registrado correctamente");
//       setTimeout(() => {
//         onSwitch("iniciar")
//       }, 2000)
//       // setFormData(initialForm);
//       // setErrors({});
//     } catch (error) {
//       console.error("Detalles del error:", error.response?.data);
//       //  el mensaje de error que viene del backend 
//       const errorMsg = error.response?.data?.message || "Error al registrar usuario";
//       setStatusMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container pb-2 pt-1">
//       <div className="row justify-content-center">
//             {/* <div className="col-12 col-lg-11"> */}
//              <div className="col-12 col-sm-10 col-md-9 col-lg-10 col-xl-11">
//           <div className="pt-1 pb-1">
//             <h2 className="mb-4 text-center text-primary fw-bold">Registracion</h2>
//           </div>
//         <form 
//           className={`row g-4 p-5 rounded-4 shadow-sm bg-white border border-primary-subtle ${validated ? "was-validated" : "needs-validation"}`}
//           noValidate
//           onSubmit={handleSubmit}
//         >
//           {/* username */}
//           <div className="col-md-12 col-lg-6">
//             <input
//               type="text"
//               name="username"
//                minLength="3"

//               placeholder="Nombre de usuario"
//               required
//               value={formData.username}
//               onChange={handleChange}
//               className={`form-control rounded-3 p-3 ${errors.username ? "is-invalid" : ""}`}
//             />
//             <div className="invalid-feedback">{errors.username}</div>
//           </div>
//           {/* EMAIL */}
//           <div className="col-md-12 col-lg-6">
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="Correo electrónico"
//               value={formData.email}
//               onChange={handleChange}
//               className={`form-control rounded-3 p-3 ${errors.email ? "is-invalid" : ""}`}
//             />
//             <div className="invalid-feedback">{errors.email}</div>
//           </div>
//           {/* PASSWORD */}

//           <div className="col-md-12 col-lg-6">
//             <input
//               type="password"
//               name="password"
//               placeholder="Contraseña"
//               value={formData.password}
//               onChange={handleChange}
//               className={`form-control rounded-3 p-3 ${errors.password ? "is-invalid" : ""}`}
//             />
//             <div className="invalid-feedback">{errors.password}</div>
//           </div>
//           {/* CONFIRM PASSWORD */}

//           <div className="col-md-12 col-lg-6">
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirmar contraseña"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`form-control rounded-3 p-3 ${errors.confirmPassword ? "is-invalid" : ""}`}
//             />
//             <div className="invalid-feedback">{errors.confirmPassword}</div>
//           </div>

//           {/* tel */}

//           <div className="col-12 ">
//             <input
//               type="text"
//               name="tel"
//               required
//               placeholder="Teléfono"
//               value={formData.tel}
//               onChange={handleChange}
//               className={`form-control rounded-3 p-3 ${errors.tel ? "is-invalid" : ""}`}
//             />
//             <div className="invalid-feedback">{errors.tel}</div>
//           </div>
//           <div className="col-12 ">
//             <input
//               type="date"
//               name="fecha_nac"
//               required
//               value={formData.fecha_nac}
//               onChange={handleChange}
//               className={`form-control rounded-3 p-3 ${errors.fecha_nac ? "is-invalid" : ""}`}
//             />
//             <div className="invalid-feedback">{errors.fecha_nac}</div>
//           </div>
//           {/* FOTO */}

//           <div className="col-md-12">
//             <input
//               type="text"
//               name="foto"
//               placeholder="URL de tu foto (opcional)"
//               value={formData.foto}
//               onChange={handleChange}
//               className="form-control rounded-3 p-3"
//             />
//           </div>
//           {/* MENSAJE DE ESTADO */}
//           {statusMessage && (
//             <div className="col-12">
//             <div className={`alert ${statusMessage.includes("correctamente") ? "alert-success" : "alert-danger"} text-center`}>
//               {statusMessage}
//             </div>
//             </div>
//           )}
//           {/* btn*/}

//           <div className="col-12 text-center mt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
//             >
//               {loading ? "Enviando..." : "Registrarme"}
//             </button>
//           </div>
//           {/* LOGIN LINK */}
//           <div className="col-12 text-center mt-2">

//             <p className="text-muted small">¿Ya tienes cuenta?</p>
//             <button
//               onClick={() => onSwitch("iniciar")}
//               type="button"
//               className="btn link-hover fw-semibold"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// }

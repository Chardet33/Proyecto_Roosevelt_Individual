import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function LoginIniciar({ onSwitch }) {
  const { credentials, setCredentials, setUser } = useContext(AuthContext);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    const cleanValue = value ? value.trim() : "";
    if (name === "username") {
      if (!cleanValue) {
        error = "El usuario es obligatorio";
      } else if (cleanValue.length < 3) {
        error = "El usuario debe tener al menos 3 caracteres";
      }
    }
    if (name === "password") {
      if (!cleanValue) {
        error = "La contraseña es obligatoria";
      } else if (cleanValue.length < 4) {
        error = "La contraseña debe tener al menos 4 caracteres";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    if (message.text) setMessage({ text: "", type: "" });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    //  campo por campo
    const userError = validateField("username", credentials.username);
    const passError = validateField("password", credentials.password);

    // Si hay errores en lógica o en el form
    if (userError || passError || form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    // let newErrors = {};
    // if (!credentials.username) newErrors.username = "El usuario es obligatorio";
    // if (!credentials.password) newErrors.password = "La contraseña es obligatoria";
    // setErrors(newErrors);
    // if (Object.keys(newErrors).length > 0) return;

    try {
        
      // mando datos
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(        
        `${apiUrl}/api/auth/login`,
        //"http://localhost:8080/roosevelt/api/auth/login",
        {
          username: credentials.username.trim(),
          password: credentials.password.trim(),
        },
      );

      if (response.status === 200) {
        const loggedUser = response.data;
               
        const mappedUser = {
          ...loggedUser,
          username: loggedUser.user, // asignar user a username
        };     

        console.log("Usuario recibido del backend:", loggedUser);

        // Guardar usuario global
        setUser(mappedUser);

        // Guardar en localStorage
        localStorage.setItem("user", JSON.stringify(mappedUser));
        window.dispatchEvent(new Event("storage"));

        // Mostrar mensaje usando el username del formulario
        setMessage({
          text: `Hola, ${mappedUser.username}! Sesión iniciada con éxito.`,
          type: "success",
        });

        // Limpiar formulario
        setCredentials({ username: "", password: "" });
        setValidated(false);

        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setValidated(false);
      if (error.response?.status === 401 || error.response?.status === 404) {
        setMessage({
          text: "Usuario o contraseña incorrectos o no esta registrado.",
          type: "danger",
        });
      } else {
        setMessage({ text: "Error en el servidor", type: "danger" });
      }
    }
  };

  return (
    <div className="animate-fade">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-8">
          <form
            onSubmit={handleSubmit}
            className={`row g-4 rounded-4 shadow-sm bg-white border border-primary-subtle p-3 m-1 ${validated ? "was-validated" : ""}`}
            noValidate
          >
            {/* USERNAME */}
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-md-0 text-primary">
                    Nombre de usuario
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    name="username"
                    required
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="nombre de usuario"
                    // className={`form-control rounded-3 p-3 ${errors.username ? "is-invalid" : ""}`}
                    className={`form-control rounded-3 p-3 
    ${errors.username ? "is-invalid" : credentials.username ? "is-valid" : ""}`}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-12 col-md-4">
                  <label className="form-label fw-semibold mb-md-0 text-primary">
                    Contraseña
                  </label>
                </div>
                <div className="col-12 col-md-8">
                  <input
                    type="password"
                    name="password"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Tu contraseña"
                    className={`form-control rounded-3 p-3 
    ${errors.password ? "is-invalid" : credentials.password ? "is-valid" : ""}`}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              </div>
            </div>

            {/* BOTÓN */}
            <div className="col-12 text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          {/* REGISTRO */}
          <div className="text-center mt-4">
            <p className="small mb-0">¿No tienes cuenta?</p>
            <button
              onClick={() => onSwitch("registro")}
              type="button"
              className=" btn link-hover fw-bold"
            >
              Regístrate aquí
            </button>
          </div>

          {/* MENSAJE */}
          {message.text && (
            <div className={`alert alert-${message.type} text-center py-2`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { AuthContext } from "../context/AuthContext";
// import { useContext } from "react";
// export default function LoginIniciar({ onSwitch}) {

//   // const [credentials, setCredentials] = useState({
//   //   username: "",
//   //   password: ""
//   // });
//   const { credentials, setCredentials, user, setUser } = useContext(AuthContext);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {

//       case "username":
//         if (!value) error = "El usuario es obligatorio";
//         break;

//       case "password":
//         if (!value) error = "La contraseña es obligatoria";
//         break;

//       default:
//         break;
//     }

//     setErrors((prev) => ({
//       ...prev,
//       [name]: error
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({
//       ...credentials,
//       [name]: value
//     });

//     validateField(name, value);
//     //limpiar mensaje backend cuando escribe
//     if (message.text) {
//       setMessage({ text: "", type: "" });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = {};
//     if (!credentials.username)
//       newErrors.username = "El usuario es obligatorio";

//     if (!credentials.password)
//       newErrors.password = "La contraseña es obligatoria";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) return;
//     try {
//       // mando datos
//       const response = await axios.post("http://localhost:8080/roosevelt/api/auth/login", {
//         username: credentials.username,
//         password: credentials.password
//       });

//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//         window.dispatchEvent(new Event("storage"));
//         setMessage({text: `¡Hola, ${credentials.username}! Sesión iniciada con éxito.`, type: "success" });
//         setTimeout(() => navigate("/"), 1500);
//       }
//     } catch (error) {
//       if (error.response?.status === 401 || error.response?.status === 404) {
//         setMessage({
//           text: "Usuario no encontrado. Por favor, regístrate.",
//           type: "danger"
//         });
//         //onSwitch("registro");
//       } else {
//         setMessage({ text: "Error en el servidor", type: "danger" });
//       }
//     }
//   };

//   //   if (credentials.username && credentials.password) {
//   //     console.log("datos:", credentials);
//   //     alert("¡Sesión iniciada!");
//   //     navigate("/");
//   //   } else {
//   //     alert("Por favor, rellena todos los campos");
//   //   }
//   // };
// console.log("credenciales en iniciar:", credentials);
//   return (
//     <div className="animate-fade">
//       <div className="row justify-content-center">

//         {/* Tamaño responsive del formulario */}
//         <div className="col-12 col-sm-11 col-md-10 col-lg-11">

//           <form onSubmit={handleSubmit} className="row g-4">

//             {/* username */}
//             <div className="col-12">
//               <div className="row align-items-center">

//                 <div className="col-12 col-md-4">
//                   <label className="form-label fw-semibold mb-md-0 text-primary">
//                     Nombre de usuario
//                   </label>
//                 </div>

//                 <div className="col-12 col-md-8">
//                   <input
//                     type="text"
//                     name="username"

//                     value={credentials.username}
//                     onChange={handleChange}
//                     placeholder="nombre de usuario"
//                    className={`form-control rounded-3 p-3 ${errors.username ? "is-invalid" : ""}`}
//                   />

//                   {errors.username && (
//                     <div className="invalid-feedback">
//                       {errors.username}
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>

//             {/* PASSWORD */}
//             <div className="col-12">
//               <div className="row align-items-center">

//                 <div className="col-12 col-md-4">
//                   <label className="form-label fw-semibold mb-md-0 text-primary">
//                     Contraseña
//                   </label>
//                 </div>

//                 <div className="col-12 col-md-8">
//                   <input
//                     type="password"
//                     name="password"

//                     value={credentials.password}
//                     onChange={handleChange}
//                     placeholder="Tu contraseña"
//                     className={`form-control rounded-3 p-3 ${errors.password ? "is-invalid" : ""}`}
//                   />

//                   {errors.password && (
//                     <div className="invalid-feedback">
//                       {errors.password}
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>

//             {/* btn */}
//             <div className="col-12 text-center mt-3">
//               <button
//                 type="submit"
//                 className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
//               >
//                 Iniciar Sesión
//               </button>
//             </div>

//           </form>

//           {/* REGISTRO */}
//           <div className="text-center mt-4">
//             <p className="small mb-0">
//               ¿No tienes cuenta?{" "}  </p>
//             <button
//               onClick={() => onSwitch("registro")}
//               type="button"
//               className="btn btn-link fw-semibold link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
//             >
//               Regístrate aquí
//             </button>
//           </div>
//           {message.text && (
//             <div className={`alert alert-${message.type} text-center py-2`}>
//               {message.text}
//             </div>
//           )}
//         </div>
//       </div>
//     </div >
//   );
// }

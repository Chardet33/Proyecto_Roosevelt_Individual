import React from "react";
import "./Settings.scss";
export default function Settings() {
  const [persona, setPersona] = React.useState({
    img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    name: "Roberto Gomez",
    email: "roberto.gomez@example.com",
    birth: "1980-05-15",
    phone: "+34 612345678",
    secondaryEmail: "roberto.gomez.recover@example.com"
  });
  const [avatarEdit, setAvatarEdit] = React.useState("");
  const [nameEdit, setNameEdit] = React.useState(persona.name);
  const [emailEdit, setEmailEdit] = React.useState(persona.email);
  const [birthEdit, setBirthEdit] = React.useState(persona.birth);
  const [phoneEdit, setPhoneEdit] = React.useState("");
  const [showConfig, setShowConfig] = React.useState(false);

  const [recoverEmail, setRecoverEmail] = React.useState("");
  const [emailSecondary, setEmailSecondary] = React.useState("");

  const [notifyEmailActive, setNotifyEmailActive] = React.useState(false);
  const [notifySmsActive, setNotifySmsActive] = React.useState(false);

  const OnClickConfigUser = () => {
    setShowConfig(!showConfig);
  };

  const onNotifyEmail = () => {
    setNotifyEmailActive(!notifyEmailActive);
  }

  const onNotifySms = () => {
    setNotifySmsActive(!notifySmsActive);
  }

  const handleCancelEdit = () => {
    setNameEdit(persona.name);
    setEmailEdit(persona.email);
    setBirthEdit(persona.birth);
    setShowConfig(false);
  }

  const BirthToAge = (years) => {
    const birthDate = new Date(years);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const HideEmail=(email)=>{    
    const emailHidden=email.replace(/(.{2}).+(.{2}@.+)/, '$1****$2');
    return emailHidden;
  }
  

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (nameEdit != null && emailEdit != null && birthEdit != null) {
      setPersona({
        img: avatarEdit ? URL.createObjectURL(avatarEdit) : persona.img,
        name: nameEdit,
        email: emailEdit,
        birth: birthEdit,
      });
      OnClickConfigUser();
    } else {
      alert(
        "Por favor, complete todos los campos antes de guardar los cambios.",
      );
    }
  };

  const handleSubmitRecoverEmail = (e) => {
    e.preventDefault();
    if (recoverEmail != null) {
      setRecoverEmail(recoverEmail);
      alert("Correo de recuperación enviado");
    } else {
      alert(
        "Por favor, complete todos los campos antes de guardar los cambios.",
      );
    }
  };

  const handleSubmitSecundaryEmail = (e) => {
    e.preventDefault();
    if (emailSecondary != null) {
      setEmailSecondary(emailSecondary);
      alert("Correo secundario guardado");
    } else {
      alert(
        "Por favor, complete todos los campos antes de guardar los cambios.",
      );
    }
  };

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 20,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];

  return (
    <div className="container-fluid bg-secondary p-4">
      <div className="row shadow-lg bg-light rounded-2 p-4 mb-2">
        <div className=" col-6 container-private-info p-2">
          <h2>Datos personales</h2>
          <div className="d-flex flex-row mt-2 p-2">
            <div className="foto-container">
              <img
                src={persona.img}
                alt="Foto de perfil"
                className="foto"
              />
            </div>
            <div className="d-flex flex-column justify-content-center ms-4">
              <h2>{persona.name}</h2>
              <p>De {BirthToAge(persona.birth)} años</p>
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary m-3"
              onClick={OnClickConfigUser}
            >
              Editar perfil
            </button>
          </div>
        </div>
        
        <div className="user-goals col-6 rounded-2 p-2 d-flex flex-column justify-content-center align-items-center">
          <h2 className=" status-title text-black">Datos Interesantes</h2>
          <table className=" table-striped table-bordered mt-3 w-100">
            <tr>
              <td className="fw-bold goal">
                Metros Recorridos
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"                  
                  fill="currentColor"
                  class="bi bi-person-walking m-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" />
                  <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" />
                </svg>
              </td>
              <td className=" p-2">5km</td>
            </tr>
            <tr>
              <td className="fw-bold goal">
                Ruta recurrente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-compass m-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                  <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                </svg>
              </td>
              <td className=" p-2">Parque Central</td>
            </tr>
            <tr>
              <td className="fw-bold goal">
                Medio de movilidad recurrente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  class="bi bi-universal-access-circle m-1"
                  viewBox="0 0 16 16"
                  id="Universal-Access-Circle--Streamline-Bootstrap"
                  height="30"
                  width="30"
                >
                  <desc>
                    Universal Access Circle Streamline Icon:
                    https://streamlinehq.com
                  </desc>
                  <path
                    d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143m-4.668 1.47 3.24 0.316v2.5l-0.323 4.585A0.383 0.383 0 0 0 7 13.14l0.826 -4.017c0.045 -0.18 0.301 -0.18 0.346 0L9 13.139a0.383 0.383 0 0 0 0.752 -0.125L9.43 8.43v-2.5l3.239 -0.316a0.38 0.38 0 0 0 -0.047 -0.756H3.379a0.38 0.38 0 0 0 -0.047 0.756Z"
                    stroke-width="1"
                  ></path>
                  <path
                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8"
                    stroke-width="1"
                  ></path>
                </svg>
              </td>
              <td className=" p-2">Ascensor</td>
            </tr>
          </table>
        </div>
      </div>
      <div
        className={` config-data-user ${showConfig ? "show" : ""} text-light rounded-3 w-50`}
      >        
        <form
          onSubmit={handleSubmitEdit}
          className="form d-flex flex-column gap-2 p-3"
        >
          <div>
            <label>
              Avatar de usuario:
              <input
              type="file"
                className=" form-control"
                onChange={(e) => setAvatarEdit(e.target.files[0])}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Nombre de usuario:
              <input
                className=" form-control"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
                required
              ></input>
            </label>
          </div>
          <div>
            <label>
              Correo de usuario:
              <input
                className=" form-control"
                value={emailEdit}
                onChange={(e) => setEmailEdit(e.target.value)}
                required
              ></input>
            </label>
          </div>
          <div>
            <label>
              Edad del usuario:
              <input
                className="form-control form-control"
                type="date"
                min={minDate}
                max={maxDate}
                value={birthEdit}
                onChange={(e) => setBirthEdit(e.target.value)}
                required
              ></input>
            </label>
          </div>
          <div>
            <button className="btn btn-success mt-3 m-2" type="submit">
              Guardar cambios
            </button>
            <button className="btn btn-danger mt-3 m-2" type="button" onClick={handleCancelEdit}>
              Cancelar cambios
            </button>
          </div>
        </form>
      </div>
      <div className="row rounded-1 bg-light">
        <div className="  p-3 rounded-3 m-1">
          <h2 className=" border border-1 rounded-1 bg-dark text-light p-2">Ajustes de Seguridad</h2>
          <p className=" w-75">
            Para poder cambiar tu contraseña, porfavor contacta con nosostros o
            si tienes acceso a tu correo electronico, ingresalo aqui para
            mandarte una notificacion
          </p>
          <form onSubmit={handleSubmitRecoverEmail}>
            <label>Correo Electronico</label>
            <input
              className="form-control w-50"
              value={HideEmail(persona.email)}              
              required
            disabled></input>
            <button className="btn btn-outline-primary mt-2">
              Enviar correo
            </button>
          </form>
        </div>
        <div>
          <hr className="border-0 bg-black my-4" style={{ height: "2px" }}></hr>
        </div>
        <div className="  p-3 rounded-3 m-1">
          <p className=" w-75">
            Si deseas tener otro forma para recuperar tu acceso a los datos en
            caso de emergencia, puedes agregar otro correo{" "}
          </p>
          <form onSubmit={handleSubmitSecundaryEmail}>
            <label>Correo Electronico Secundario</label>
            <input
              className="form-control w-50"
              value={emailSecondary}
              onChange={(e) => setEmailSecondary(e.target.value)}
              required
            ></input>
            <button className="btn btn-outline-primary mt-2">
              Agregar correo secundario
            </button>
          </form>
        </div>
        <div>
          <hr className="border-0 bg-black my-4" style={{ height: "2px" }}></hr>
        </div>
        <div className="  p-3 m-1">
          <p>Agregar un numero de Telefono</p>
          <input
              type="tel"
              name="phone"
              pattern="\+?\d{9,15}" 
              placeholder="+34 612345678"
              className="form-control w-25"
              value={phoneEdit}
              onChange={(e) => setPhoneEdit(e.target.value)}
              required
            ></input>
            <button className="btn btn-outline-primary mt-2">
              Agregar telefono
            </button>
        </div> 
        <div>
          <hr className=" border-0 bg-black my-4" style={{ height: "2px" }}></hr>
        </div> 
        <div className="p-3 m-1 mb-3">
          <h2 className=" bg-dark text-light rounded-1 p-2">Ajustes de Notificaciones</h2>
          <p>Configura tus preferencias de notificaciones para mantenerte informado sobre tus actividades y actualizaciones importantes.</p> 
          <div className=" d-flex flex-column gap-1">            
              <label><input type="checkbox" value={notifyEmailActive} onChange={onNotifyEmail} className=" form-check-input m-1"></input>Notificaciones por correo electrónico</label>
              <label><input type="checkbox" value={notifySmsActive} onChange={onNotifySms} className=" form-check-input m-1"></input>Notificaciones por SMS</label>                        
          </div>
        </div>      
      </div>
    </div>
  );
}

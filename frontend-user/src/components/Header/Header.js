import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const logo = "/assets/logo.png";
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="d-none d-md-flex bg-primary py-3">
      <div className="col-12 col-lg-6  align-content-center">
        <div className="d-flex h-lg-100 w-lg-50 justify-content-center justify-content-lg-start px-3">
          <img className="image-thumbnail" src={logo} alt="logo"></img>
        </div>
      </div>
      <div className="col-lg-6 align-self-stretch">
        <div className="d-none d-lg-flex h-100 justify-content-end align-items-center text-light px-3">
          {/* Saludo si el usuario está logueado */}
          {user ? (
            <div className="d-flex flex-column text-center h-100 justify-content-center">
              <span className="fw-bold px-2">Hola, {user.username}!</span>
              <span role="button" className="px-2" onClick={handleLogout}> 
                <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
              </span>
            </div>
          ) : (
            <span className="fw-bold px-2">Bienvenido, invitado</span>
          )}
          <NavLink to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              fill="white"
              className="bi bi-person-circle dropdown-toggle"
              viewBox="0 0 16 16"
              id="btnProfile"
              rol="button"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;

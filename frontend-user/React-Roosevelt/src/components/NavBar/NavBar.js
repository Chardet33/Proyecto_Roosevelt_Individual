import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.scss";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) setUser(JSON.parse(loggedUser));
    else setUser(null);

    const handleStorage = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
   
  localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleClick = () => setClick(!click);

  // Función para rutas protegidas
  const protectedRoute = (path) => {
    if (!user) navigate("/login");
    else navigate(path);
    setClick(false);
  };

  // Función para clases activas en desktop
  const link = (path) =>
    "nav-link text-light fs-5" + (location.pathname === path ? " active fw-bold" : "");

  return (
    <>
      {/* Desktop */}
      <div className="d-none d-md-flex w-100 justify-content-center">
        <ul className="container-fluid nav nav-pills nav-fill justify-content-between p-1 mi-nav">
          <li className="nav-item col">
            <NavLink to="/" className={link("/")}>
              <i className="bi bi-house-door pe-1"></i>
              <span className="d-none d-lg-inline">Inicio</span>
            </NavLink>
          </li>
          <li className="nav-item col">
            <NavLink to="/map" className={link("/map")}>
              <i className="bi bi-globe-americas pe-1"></i>
              <span className="d-none d-lg-inline">Mapa</span>
            </NavLink>
          </li>
          <li className="nav-item col">
            <span
              to="/my-routes"
              className={link("/my-routes")}
              onClick={() => protectedRoute("/my-routes")}
            >
              <i className="bi bi-geo-alt pe-1"></i>
              <span className="d-none d-lg-inline">Mis Rutas</span>
            </span>
          </li>
          <li className="nav-item col">
            <span to="/fav-routes"
              className={link("/fav-routes")}
              onClick={() => protectedRoute("/fav-routes")}
            >
              <i className="bi bi-heart pe-1"></i>
              <span className=" d-none d-lg-inline">Rutas Favoritas</span>
            </span>
          </li>
          <li className="nav-item col">
            <NavLink to="/settings"
              className={link("/settings")}
              onClick={() => protectedRoute("/settings")}
            >
              <i className="bi bi-gear pe-1"></i>
              <span className="d-none d-lg-inline">Configuración</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile */}
      <nav className="d-md-none navbar bg-primary">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <span>El Roosevelt</span>
          </NavLink>

          <ul className={click ? "nav-menu active bg-primary" : "nav-menu"}>
            <li className="nav-item">
              {user ? (
                <span className="nav-links text-warning" onClick={() => { handleLogout(); handleClick(); }}>
                  <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
                </span>
              ) : (
                <NavLink
                  to="/login"
                  className={location.pathname === "/login" ? "nav-links active" : "nav-links"}
                  onClick={handleClick}
                >
                  <i className="bi bi-person-circle me-2"></i>Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              <NavLink
                to="/map"
                className={location.pathname === "/map" ? "nav-links active" : "nav-links"}
                onClick={handleClick}
              >
                <i className="bi bi-globe-americas pe-1"></i>Mapa
              </NavLink>
            </li>
            <li className="nav-item">
              <span
                className={location.pathname === "/my-routes" ? "nav-links active" : "nav-links"}
                onClick={() => protectedRoute("/my-routes")}
              >
                <i className="bi bi-geo-alt pe-1"></i>Mis Rutas
              </span>
            </li>
            <li className="nav-item">
              <span
                className={location.pathname === "/fav-routes" ? "nav-links active" : "nav-links"}
                onClick={() => protectedRoute("/fav-routes")}
              >
                <i className="bi bi-heart pe-1"></i>Rutas Favoritas
              </span>
            </li>

            {/* {user && (
              <li className="nav-item">
                <NavLink
                  to="/settings"
                  className={location.pathname === "/settings" ? "nav-links active" : "nav-links"}
                  onClick={handleClick}
                >
                  <i className="bi bi-gear pe-1"></i>Configuración
                </NavLink>
              </li>
            )} */}
             <li className="nav-item col">
            <span
              className={link("/settings")}
              onClick={() => protectedRoute("/settings")}
            >
              <i className="bi bi-gear pe-1"></i>
              Configuración
            </span>
          </li>
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon"><i className="bi bi-x-lg fs-1 fw-bold"></i></span>
            ) : (
              <span className="icon"><i className="bi bi-list fs-1 fw-bold"></i></span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
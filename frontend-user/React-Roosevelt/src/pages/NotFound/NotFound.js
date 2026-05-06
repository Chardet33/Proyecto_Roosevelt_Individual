import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";  

export default function NotFound() {
  return (
     <div className="not-found-section d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-white px-3">
      
      <img
        src="/assets/robot.png" 
        alt="Error 404 - Page not found"
        className="robot-img img-fluid mb-4"
      />

      <h2 className="text-primary fw-bold mb-3">¡Ups! Te has perdido...</h2>
      
      <p className="text-secondary mb-4">
        La página que buscas no existe o ha sido movida.
      </p>
      
      <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill fw-bold">
        Volver al Inicio
      </Link>
      
    </div>
  );
}
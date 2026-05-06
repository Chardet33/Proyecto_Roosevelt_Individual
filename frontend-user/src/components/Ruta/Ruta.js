import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Ruta({ id, titulo, imagen, fecha, eliminarRuta }) {
  const [showDetalle, setShowDetalle] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenDetalle = () => setShowDetalle(true);
  const handleCloseDetalle = (e) => {
    if (e) e.stopPropagation();
    setShowDetalle(false);
  };

  const handleOpenDeleteModal = (e) => {
    if (e) e.stopPropagation();
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = (e) => {
    if (e) e.stopPropagation();
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = (e) => {
    if (e) e.stopPropagation();
    eliminarRuta(id);
    setShowDeleteModal(false);
    setShowDetalle(false);
  };

  return (
    <>
      <div 
        className="card ruta-card shadow border-0 rounded-4 overflow-hidden h-100"
        onClick={handleOpenDetalle}
        style={{ cursor: "pointer" }}
      >
        <img
          src={imagen}
          className="card-img-top object-fit-cover"
          alt={titulo}
          style={{ height: "180px" }}
        />
        <div className="card-body d-flex flex-column p-3">
          <h5 className="card-title fw-bold text-primary">{titulo}</h5>
          <p className="card-text text-secondary mb-0">{fecha}</p>
        </div>
      </div>

      {showDetalle && (
        <div 
          className="bg-modal position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
          style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.6)" }} 
          onClick={handleCloseDetalle}
        >
          <div 
            className="modal-content bg-white p-4 rounded text-center position-relative" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: "400px" }}
          >
            <h2>{titulo}</h2>
            <img src={imagen} alt={titulo} className="img-fluid my-3 rounded" />
            <p><strong>Fecha:</strong> {fecha}</p>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-secondary" onClick={handleCloseDetalle}>Cerrar</button>
              <NavLink to={`/map/${id}`} className="btn btn-success">Abrir mapa</NavLink>
              <button className="btn btn-danger" onClick={handleOpenDeleteModal} title="Eliminar ruta">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
{showDeleteModal && (
        <div 
          className="bg-modal position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
          style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.7)" }} 
          onClick={handleCloseDeleteModal}
        >
          <div 
            className="modal-content bg-white d-flex flex-column align-items-center justify-content-center p-4 rounded" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center fs-5 mb-4">
              ¿Estás seguro de que quieres eliminar esta ruta de tus favoritas?
            </h3>
            <div>
              <button className="btn btn-danger me-2" onClick={handleConfirmDelete}>Sí, eliminar</button>
              <button className="btn btn-secondary" onClick={handleCloseDeleteModal}>No, cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
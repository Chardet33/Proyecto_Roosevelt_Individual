import React, { use, useState } from "react";
import "./contextMenuLocation.scss";

export default function ContextMenuLocation({
  positionContextMenu,
  onClose,
  onCreateInterestPoint,
  onCreateMark,
  types,
  init,
  goal,
  amountPointZone,
  onOpenZone,
  onCreateEdge,
  onCloseZone,
  onCancelZone,
  typeZones,
  dataNewZone,
  onChangeDataZone,
  onSaveRute
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [nameZone, setNameZone] = useState("");
  const [typeZone, setTypeZone] = useState("");

  const [nameRute, setNameRute] = useState("");
  const [descriptionRute, setDescriptionRute] = useState("");

  const [writtenData, setWrittenData] = useState(false);

  const [positionChange, setPositionChange] = useState(200);

  const [showInteresPointControl, setShowInteresPointControl] = useState(false);

  const [showZoneControl, setShowZoneControl] = useState(false);

  const [showRuteControl, setShowRuteControl] = useState(false);

  const [showToggleControl, setShowToggleControl] = useState(false);

  const danger = Object.freeze({
    rojo: "Alta",
    amarillo: "Media",
    verde: "Baja",
  });

  const options = types.map((type) => ({ name: type.name, color: type.color }));

  const createInterestPoint = () => {
    onCreateInterestPoint({
      name: name,
      cuisine: type,
    });
    setName("");
    setType("");
    onClose();
  };

  function createZone(e) {
    e.preventDefault();

    const newZone = {
      name: nameZone,
      color: typeZone,
    };
    setPositionChange(286);

    onChangeDataZone(newZone);
    onOpenZone(newZone);
    setNameZone("");
    setTypeZone("");
    setWrittenData(true);    
  }
  const createFirtMark = () => {
    setShowToggleControl(true);
    onCreateMark();
  }

  const createLastMark = () => {
    onCreateMark();
    if (goal) {
      setPositionChange(500);
      setShowRuteControl(true); 

    }
  };

  function saveRute(e){
    e.preventDefault();
    onSaveRute({
      name: nameRute,
      description: descriptionRute
    });
    setNameRute("");
    setDescriptionRute("");
    onClose();
  }


  const toggleZoneControl = () => {
    setPositionChange(293);
    setShowZoneControl(!showZoneControl);
  };

  const closeZone = () => {
    setPositionChange(200);
    if(!showToggleControl){
      onCloseZone();
    }
    
  };

  return (
    <div
      style={{
        position: "absolute",
        visibility: positionContextMenu.visible ? "visible" : "hidden",
        top: positionContextMenu.y-20,
        left: positionContextMenu.x + 4,
        transform: "translateY(-100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        background: "white",
        zIndex: 1001,
        padding: "2px",
        borderRadius: "25px 25px 10px 0px",
        minHeight: writtenData ? "280px" : "200px",
      }}
    >
      <div className="  d-flex flex-column gap-2 p-2">
        {showInteresPointControl ? (
          <div className=" d-flex flex-column gap-1 ">
            <form
              onSubmit={createInterestPoint}
              className=" d-flex flex-column gap-1"
            >
              <div className=" d-flex flex-row align-content-around m-2">
                <button className=" btn-back" onClick={()=>setShowInteresPointControl(false)}>
                  <i
                  className="bi bi-chevron-left"
                  style={{ fontSize: "1rem", cursor: "pointer" }}
                ></i>
                </button>                
              </div>
              <h5>Creando un punto de interes</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre del punto de interés"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Selecciona un tipo</option>
                {options.map((type) => (
                  <option value={type.name}>{type.name}</option>
                ))}
              </select>
              <input
                className=" btn btn-sm btn-success"
                type="submit"
                value="Crear"
              />
            </form>
          </div>
        ) : !showZoneControl ? (
          !showRuteControl ? (
            !showToggleControl ? (
              <div className=" d-flex flex-column gap-2 p-2 ">
                <div className="d-flex flex-row justify-content-end">
                  <input
                    className=" btn btn-sm btn-danger"
                    type="button"
                    onClick={onClose}
                    value="X"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => createFirtMark()}
                >
                  Crear ruta desde aquí
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-compass m-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleZoneControl}
                >
                  Crear Zona
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-heptagon m-1"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.779.052a.5.5 0 0 1 .442 0l6.015 2.97a.5.5 0 0 1 .267.34l1.485 6.676a.5.5 0 0 1-.093.415l-4.162 5.354a.5.5 0 0 1-.395.193H4.662a.5.5 0 0 1-.395-.193L.105 10.453a.5.5 0 0 1-.093-.415l1.485-6.676a.5.5 0 0 1 .267-.34zM2.422 3.813l-1.383 6.212L4.907 15h6.186l3.868-4.975-1.383-6.212L8 1.058z" />
                  </svg>
                </button>
              </div>) :
              (
                <div className=" d-flex flex-column gap-2 p-2">
                  <div className="d-flex flex-row justify-content-end">
                    <input
                      className=" btn btn-sm btn-danger"
                      type="button"
                      onClick={onClose}
                      value="X"
                    />
                  </div>
                  <button
                    className=" btn btn-outline-info align-content-center"
                    onClick={() => setShowInteresPointControl(true)}
                  >
                    Crear punto de interes
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-pin-map m-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={createLastMark}
                  >
                    Crear ruta hasta aquí
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-compass m-1"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                      <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                    </svg>
                  </button>
                </div>)
          ) : (
            <div className=" d-flex flex-column gap-2 p-2 z-3">
              <div className="d-flex flex-row justify-content-end">
                <input
                  className=" btn btn-sm btn-danger"
                  type="button"
                  onClick={onClose}
                  value="X"
                />
              </div>
              <form onSubmit={saveRute}>
                <h5 className=" text-info">Creando nueva ruta</h5>
                <div>
                  <label>Nombre de la ruta</label>
                  <input
                    className=" form-control"
                    value={nameRute}
                    onChange={(e) => setNameRute(e.target.value)}
                  ></input>
                </div>
                <div>
                  <label>Descripcion de la ruta</label>
                  <textarea
                    className=" text-description form-control"
                    value={descriptionRute}
                    onChange={(e) => setDescriptionRute(e.target.value)}
                  ></textarea>
                </div>
                <div className=" d-flex flex-column align-items-center p-2">
                  <input type="submit" className=" btn btn-success" value={"Guardar"} />
                </div>
              </form>
            </div>
          )
        ) : (
          <div className="d-flex flex-column gap-2 p-2">
            <div className="d-flex flex-row justify-content-end">
              <input
                className=" btn btn-sm btn-danger"
                type="button"
                onClick={onClose}
                value="X"
              />
            </div>
            <p className=" m-1 text-info">Para crearlo minimo 3 puntos</p>
            {amountPointZone > 0 && (
              <span className=" d-flex flex-column border border-3 shadow-lg rounded-2 p-1 mb-4 align-items-center">
                Creados {amountPointZone} punto{amountPointZone > 1 ? "s" : ""}
              </span>
            )}

            {writtenData ? (
              <div>
                <p>Zona: {dataNewZone.name}</p>
                <p>Peligrosidad: {danger[dataNewZone.color]}</p>
              </div>
            ) : (
              <form onSubmit={createZone} className=" d-flex flex-column gap-2">
                <div>
                  <label>Nombre de la zona</label>
                  <input
                    className=" form-control"
                    type="text"
                    value={nameZone}
                    onChange={(e) => setNameZone(e.target.value)}
                    required
                  ></input>
                </div>
                <div>
                  <label>Peligrosidad</label>
                  <select
                    className={" form-control "}
                    value={typeZone}
                    onChange={(e) => setTypeZone(e.target.value)}
                    required
                  >
                    <option value="" selected>
                      Elegir un tipo de zona
                    </option>
                    {Object.entries(typeZones).map(([key, value]) => (
                      <option value={key}>{danger[key]}</option>
                    ))}
                  </select>
                </div>
                {amountPointZone == 0 && (
                  <input
                    type="submit"
                    className=" btn btn-success w-100"
                    value={"Comenzar Zona"}
                  />
                )}
              </form>
            )}
            {amountPointZone >= 1 && (
              <input
                type="button"
                className=" btn btn-outline-primary "
                value={"Expandir Zona"}
                onClick={onCreateEdge}
              />
            )}
            {amountPointZone > 2 && (
              <input
                type="button"
                className=" btn btn-danger "
                value={"Terminar Zona"}
                onClick={() => closeZone()}
              />
            )}
            {amountPointZone > 0 && (
              <input
                type="button"
                className=" btn btn-success "
                value={"Cancelar"}
                onClick={onCancelZone}
              />
            )}
          </div>
        )}
        <div className="locationPointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="purple"
            class="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

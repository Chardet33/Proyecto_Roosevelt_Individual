import React, { useRef, useEffect, useState, use, useEffectEvent } from "react";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.scss";
import customMarkerPng from "../../assets/custom-marker.png";
import interestPointData from "../../assets/providence-interestPoint.json";
import ContextMenuLocation from "../contextMenuLocation/contextMenuLocation";
import LayerCheckboxes from "../LayerCheckboxes/LayerCheckboxes";
import Popup from "../Popup/Popup";
import SelectorRutes from "../SelectorRutes/SelectorRutes";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import { AuthContext } from "../../context/AuthContext";
import { useZonas } from "../../hooks/useZonas";
import { useRutas } from "../../hooks/useRutas";
import { useLineasObjetos } from "../../hooks/useLineasObjetos";
import { useObjetos } from "../../hooks/useObjetos";
import useGeolocation from "../../hooks/useGeolocation";


const INITIAL_CENTER = [-0.4794138193936135, 38.35239601734659];
const INITIAL_ZOOM = 16.5;

export default function Map() {

 // #region REFERENCIAS Y CONTEXTOS

  // Función para deshabilitar el menu contextual del navegador al hacer click derecho en el mapa
  const disableContextMenuPag = (e) => {
    e.preventDefault();
  };
  // Referencia al mapa y al contenedor del mapa para poder interactuar con el mapa y mostrarlo en la pantalla
  const mapRef = useRef();
  const mapContainerRef = useRef();

  // Contexto de autenticacion para obtener el usuario logueado y mostrar opciones de admin si el usuario es admin
  const { user } = useContext(AuthContext);

  // Obtener la posición actual del usuario
  const userPosition = useGeolocation();

 // #endregion

// ------------VARIABLES DE MAPA-------------------
  // #region Variables de mapa
  // Estado para controlar los datos del popup, se actualiza al hacer click en un punto de interes y se utiliza para mostrar la informacion del punto de interes en el popup
  const [popupData, setPopupData] = useState(null);

  // Estado para controlar el centro del mapa
  const [center, setCenter] = useState(INITIAL_CENTER);

  // Estado para controlar el nivel de zoom del mapa
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // Estado para posicionar la vista del mouse dentro del mapa
  const [centerMouse, setCenterMouse] = useState(INITIAL_CENTER);

  // Estado para inicializar los datos de las zonas
  const [dataZones, setDataZones] = useState({
    type: "FeatureCollection",
    features: []
  });

  // marcadores punto a punto
  const markersRef = useRef([]);

  // Estado inicializado de la nueva zona en creacion
  const [dataNewZone, setDataNewZone] = useState({
    id: null,
    name: "",
    color: "",
    coordpol: [[]]
  });

  // Zona a mostrar al ser seleccionada por el usuario 
  const [dataZoneSelected, setDataZoneSelected] = useState({
    id: null,
    name: "",
    color: "",
    coordpol: [[]]
  })

  // Estado para controlar los datos de la ruta seleccionada, se actualiza al seleccionar una ruta en el panel de rutas y se utiliza para mostrar la ruta seleccionada en el mapa
  const [dataRuteSelected, setDataRuteSelected] = useState({
    id: null,
    name: "",
    coordpol: [[]]
  })

// #endregion

  // #region Mapas de traduccion
  // Mapas de traduccion para convertir los datos de la api a los datos que necesita el mapa para mostrar las zonas y los puntos de interes con el color y el icono correspondiente
  const dangerTranslate = Object.freeze({
    rojo: "red",
    amarillo: "yellow",
    verde: "green",
  });

  // Mapa de traduccion para convertir los tipos de punto de interes de la api a los colores que necesita el mapa para mostrar el icono correspondiente
  const dangerColor = Object.freeze({
    rojo: " bg-danger",
    amarillo: " bg-warning",
    verde: " bg-success",
  });

  // Mapa de traduccion para convertir los tipos de punto de interes de la api a los nombres que necesita el mapa para mostrar el icono correspondiente
  const translateToMap = {
    "Escalera": "stairs",
    "Ascensor": "elevator",
    "Rampa": "ramp",
    "Construcción": "rebuild"
  };
  // #endregion

  // #region Convertidores de datos

  // Función para convertir un string a un array de coordenadas, se utiliza para convertir los datos de la api a los datos que necesita el mapa para mostrar las zonas y los puntos de interes en la posicion correcta
  const stringToJsonArray = (s) => {
    if (!s || s === "") return [];

    try {
      // 2. Si ya es un objeto/array (porque la API lo pre-procesó), lo devolvemos
      if (typeof s !== 'string') return s;

      // 3. Intentamos parsear
      const resultado = JSON.parse(s);

      // 4. Verificación de estructura: ¿Es realmente un array?
      if (!Array.isArray(resultado)) return [];

      return resultado;
    } catch (e) {
      // 5. Si el JSON está mal formado, capturamos el error aquí
      console.warn("Dato corrupto saltado:", s);
      return [];
    }
  }
  // #endregion


// -------------DATOS DE API-----------------  
// #region Datos de la API
  // #region Variables para almacenar los datos de la API(OCURRE SOLO 1 VEZ) 

  // #region Zonas
  const { zonas: zones, loading: loadingZones } = useZonas();
  const [zonesRef, setZonesRef] = useState([]);

  //Cargar datos zonas
  useEffect(() => {
    if (zones.length > 0) {
      const zonasCargadas = zones.map(z => ({
        id: z.id,
        name: z.nombre_zona,
        color: dangerTranslate[(z.peligrosidad || "").toLowerCase()] || "gray",
        coordpol: stringToJsonArray(z.mapbox_json)
      }))
      setZonesRef(zonasCargadas);
    }
  }, [zones])
  // #endregion

  // #region Rutas
  const { rutas: rutes, loading: loadingRutes } = useRutas();
  const [rutesRef, setRutesRef] = useState([]);
  //Cargar datos rutas
  useEffect(() => {
    if (rutes.length > 0) {

      const rutasCargadas = rutes.map(r => ({
        id: r.id,
        name: r.nombreRuta,
        coordpol: stringToJsonArray(r.mapboxJSON),
        description: r.descripcion,
        date_update: r.fecha_pub,
        likes_count: r.likesCount,
        id_zone: { id: r.zona.id, nameZone: r.zona.nombre_zona },
        id_user_author: { id: r.usuario_autor.id, nameUser: r.usuario_autor.username }
      }))
      setRutesRef(rutasCargadas);
    }
  }, [rutes])

  // #endregion

  // #region Lineas objetos
  //Relaciones punto interes y ruta
  const [linesObjectsRef, setLinesObjectsRef] = useState([]);
  const { lineasObjetos: linesObjects, loading: loadingLinesObjects } = useLineasObjetos();

  useEffect(() => {
    if (linesObjects && linesObjects.length > 0) {
      const lineasObjetosCargados = linesObjects.map(l => ({
        idRuta: l.lineaObjetosId.ruta.id,
        objeto: {
          id: l.lineaObjetosId.objeto.id,
          coordpol: stringToJsonArray(l.lineaObjetosId.objeto.mapBoxJSON),
          name: l.lineaObjetosId.objeto.nombre_objeto,
          descripcion: l.lineaObjetosId.objeto.descripcion,
          img: l.lineaObjetosId.objeto.imagen,
          danger: l.lineaObjetosId.objeto.peligrosidad,
          idZona: l.lineaObjetosId.objeto.zona.id,
          typeObject: l.lineaObjetosId.objeto.tipoObjeto.nombre_tipo
        }
      }))
      setLinesObjectsRef(lineasObjetosCargados)
    }

  }, [linesObjects])
  // #endregion

  // #region Objetos
  //Tipos Objeto (tipos de punto interes)

  const [objectsRef, setObjectsRef] = useState();
  const { objetos: objects, loading: loadingObjects } = useObjetos()
  useEffect(() => {
    if (objects && objects.length > 0) {
      const objetosCargados = objects.map(o => {
        // Usamos el traductor o el nombre original si no existe en el mapa
        const tipoOriginal = o.tipoObjeto?.nombre_tipo;
        const tipoFiltrado = translateToMap[tipoOriginal] || tipoOriginal;

        return {
          id: o.id,
          type: "Feature",
          properties: {
            name: o.nombre_objeto,
            cuisine: tipoFiltrado // Ahora esto coincidirá con "stairs"
          },
          geometry: {
            coordinates: stringToJsonArray(o.mapBoxJSON),
            type: "Point"
          }
        };
      });

      setObjectsRef({
        type: "FeatureCollection",
        features: objetosCargados
      });
    }
  }, [objects]);
  // #endregion

  // #endregion

  // #region Al agregar un nuevo punto de interes, se actualiza el source de los puntos de interes y se muestra el nuevo punto de interes en el mapa
  useEffect(() => {
    // 1. Verifica que la referencia al mapa exista
    // 2. Verifica que el objeto interno de Mapbox esté creado
    // 3. Verifica que el estilo esté cargado (importantísimo para getSource)
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    const source = mapRef.current.getSource("interestPoint");

    // 4. Verifica que el source realmente exista en el mapa
    if (source && objectsRef) {
      source.setData(objectsRef);
    }
  }, [objectsRef]);

  // #endregion
// #endregion

//----Estados para controlar la creacion de rutas, zonas y puntos de interes-----------------

  // #region Estados para controlar la creacion de rutas, zonas y puntos de interes

  // Estado para indicar punto de partida de una ruta
  const [init, setInit] = useState(false);

  // Estado para indicar punto de llegada de una ruta
  const [goal, setGoal] = useState(false);

  // Estado para controlar la creacion de zonas, se actualiza al iniciar la creacion de una zona y se utiliza para mostrar el menu contextual con las opciones de crear zona o añadir vertices a la zona en creacion
  const [amountPointZone, setAmountPointZone] = useState(0);

  // Estado para la creacion de nuevos elementos, se actualiza al hacer click derecho en el mapa y se utiliza para colocar el nuevo elemento en la posicion correcta
  const [positionCreateElement, setPositionCreateElement] = useState({
    lng: 0,
    lat: 0,
  });

  // Estado para los puntos de la ruta, se añaden las coordenadas de cada punto creado y al tener dos puntos, se llama a la api de direcciones para crear la ruta entre ambos puntos
  const [routePoints, setRoutePoints] = useState([]);

  // #endregion

  // #region Tipos de punto de interes
  const [layerState, setLayerState] = useState([
    {
      name: "elevator",
      color: "#33a02c",
      isChecked: true,
    },
    {
      name: "ramp",
      color: "#ffff99",
      isChecked: true,
    },
    {
      name: "stairs",
      color: "#ffff99",
      isChecked: true,
    },
    {
      name: "rebuild",
      color: "#f80404",
      isChecked: true,
    },
  ]);
  // #endregion

  // #region Posicion del menu contextual
  // State para controlar la visibilidad y posicion del menu contextual
  const [menu, setMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  // #endregion

// -------------FUNCIONES-----------------
  // #region FUNCIONES

  // #region BOTONES DE MAPA

  // #region [Funcion] para resetear el mapa a su posicion inicial y eliminar los marcadores
  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
    clearMarkers();
  };
  // #endregion

  //  |
  //  |      Lo utiliza
  //  V

  // #region [Funcion] para eliminar los marcadores y la ruta del mapa, se llama al resetear el mapa o al cerrar el menu contextual
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    setRoutePoints([]);
    if (mapRef.current.getLayer("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
  };
  // #endregion

  // #region [Funcion] para centrar el mapa en la posicion actual del usuario, se llama al hacer click en el boton de localizacion
  const handleCenterUserLocation = () => {
    if (userPosition.latitude === 0 && userPosition.longitude === 0) {
      alert("No se ha podido obtener tu ubicación. Por favor, asegúrate de haber dado permiso para acceder a tu ubicación y de que tu dispositivo tenga habilitada la geolocalización.");
      return;
    }
    mapRef.current.flyTo({
      center: [userPosition.longitude, userPosition.latitude],
      zoom: 16,
    });
  };
  // #endregion

  // #endregion


  // #region CRUD ZONAS

  // #region [Funcion] para eliminar una zona ya creada, se elimina de la lista de zonas y se actualiza el mapa eliminando el poligono correspondiente
  function handleRemoveZone(id) {
    setZonesRef((prev) => prev.filter((e) => e.id != id));
  }
  // #endregion

  // #region [Funcion] para editar una zona ya creada, se actualiza la zona en la lista de zonas y se actualiza el mapa con los nuevos datos de la zona


  function handleEditZone(zone) {
    setZonesRef((prev) =>
      prev.map((z) =>
        z.id == zone.id
          ? {
            id: zone.id,
            name: zone.name,
            color: zone.color,
            coordpol: zone.coordpol,
          }
          : z,
      ),
    );
  }
  // #endregion


  // #endregion


  // #region CRUD DE RUTAS

  // #region [Funcion] para guardar la ruta creada, se muestra un alert de confirmacion pero se deberia guardar en la base de datos y mostrarla en el mapa como una ruta mas
  const handleCreateRute = () => {
    alert("guardada ruta")
  }
  // #endregion

  // #endregion


  // #region CONTROL DE MENU CONTEXTUAL
  // #region [Funcion] para abrir el menu contextual, se llama al hacer click derecho en el mapa
  const handleContentMenu = (e) => {
    setMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    setPositionCreateElement({ lng: centerMouse[0], lat: centerMouse[1] });
  };
  // #endregion

  // #region [Funcion] para cerrar el menu contextual, se llama al hacer click izquierdo en el mapa o al finalizar la creacion de una zona
  const handleCloseContextMenuMap = () => {
    setMenu({ ...menu, visible: false });
    clearMarkers();
    setInit(false)
    setGoal(false)
  };
  // #endregion

  // #endregion


  // #region CRECION DE ZONAS

  // #region [Funcion] para iniciar la creacion de la zona con un punto inicial
  const handleOpenZone = (dataZone) => {
    setAmountPointZone(1);
    const newZone = {
      id: Date.now(),
      name: dataZone.name,
      color: dangerTranslate[dataZone.color],
      coordpol: [[positionCreateElement.lng, positionCreateElement.lat]],
    };
    setZonesRef((prev) => [...prev, newZone]);
  };
  // #endregion

  // #region [Funcion] para crear la arista de la zona en creacion
  const handleCreatEdgeZone = () => {
    setAmountPointZone(amountPointZone + 1);
    const coords = [positionCreateElement.lng, positionCreateElement.lat];

    if (!mapRef.current) return;

    setZonesRef((prev) => {
      const newZones = [...prev];
      newZones[newZones.length - 1].coordpol.push(coords);
      return newZones;
    });
  };
  // #endregion

  // #region [Funcion] para crear el ultimo vertice de la zona, se cierra la zona y se muestra en el mapa como un nuevo poligono, ademas de cerrar el menu contextual
  // Terminar de cerrar la zona en creacion y cierra el contextmenu
  const handleCloseZone = () => {
    setAmountPointZone(0);
    handleCloseContextMenuMap();
    setZonesRef((prev) => {
      const newZones = [...prev];
      newZones[newZones.length - 1].coordpol.push(
        newZones[newZones.length - 1].coordpol[0],
      );
      return newZones;
    });
    setDataNewZone({
      id: zonesRef.length,
      name: "",
      color: "",
    });
  };
  // Cancelar la creacion de la zona
  const handleRemoveZoneInCreation = () => {
    setAmountPointZone(0);
    handleCloseContextMenuMap();
    setZonesRef((prev) => prev.slice(0, -1));

    setDataNewZone({
      id: zonesRef.length,
      name: "",
      color: "",
    });
  };
  // #endregion

  // #endregion

  // #region INTERACION EN EL MAPA

  // #region [Funcion] para mostrar el popup al hacer click en un punto de interes, se muestra el nombre del punto de interes y su tipo, ademas de un boton para eliminarlo si el usuario es admin
  const handleMarkerClick = (e) => {
    setPopupData({
      lngLat: e.feature.geometry.coordinates,
      properties: e.feature.properties,
    });
  };
  // #endregion



  // #region [Funcion] para actualizar el estado del centro del mouse, se llama al mover el mouse por el mapa y se utiliza para colocar los nuevos puntos de interes, zonas o rutas en la posicion correcta
  const handleMouseMoveMap = (e) => {
    setCenterMouse([e.lngLat.lng, e.lngLat.lat]);
  };
  // #endregion



  // #region [Funcion] para crear un nuevo marcador en el mapa, se añaden las coordenadas a la lista de puntos de la ruta y se dibuja la ruta si hay suficientes puntos, ademas de cerrar el menu contextual
  const handleCreateMark = () => {
    const coords = [positionCreateElement.lng, positionCreateElement.lat];

    if (!mapRef.current) return;

    // Limpia todos los marcadores si ve que son mas de dos
    if (routePoints.length === 1) setInit(true)
    if (routePoints.length === 2) {
      clearMarkers();
      setGoal(false);
    } else setGoal(true);

    //Crea el marcador
    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(mapRef.current);

    markersRef.current.push(marker);
    //mete coordenadas para luego formar la ruta, al tener dos pares de coordenadas, se dibuja la ruta
    setRoutePoints((prev) => {
      if (prev.length === 2) {
      }
      if (prev.length === 2) return [coords];
      return [...prev, coords];
    });
  };
  // #endregion



  // #region [Funcion] para crear un nuevo punto de interes, se añade a la lista de puntos de interes y se muestra en el mapa
  const handleCreateInteresPoint = (e) => {
    const newPoint = {
      id: 999,
      type: "Feature",
      properties: {
        name: e.name,
        cuisine: e.cuisine,
      },
      geometry: {
        coordinates: [positionCreateElement.lng, positionCreateElement.lat],
        type: "Point",
      },
    };
    setObjectsRef((prev) => ({
      ...prev,
      features: [...prev.features, newPoint],
    }));
  };
  // #endregion

  // #endregion 

  // #endregion

  // -------------USEFFECTS-----------------
  // #region USEFFECTS
  // #region useEffects para cargar el mapa, los puntos de interes, las zonas y las rutas
  //Para crear o inicializar el mapa
  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MY_KEY}`;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
    });




    // Al cargar, se comenzaran a crear los puntos de interes
    mapRef.current.on("load", () => {
      // load image to use as a custom marker
      mapRef.current.loadImage(customMarkerPng, (error, image) => {
        if (error) throw error;
        mapRef.current.addImage("custom-marker", image, { sdf: true });
      });

      // add a single source for all interestPoint
      mapRef.current.addSource("interestPoint", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      // add a layer for each cuisine type
      for (const layer of layerState) {
        const { name, color } = layer;

        const layerId = `interestPoint-${name}-symbol`;

        // Comprueba que no exita un punto de interes ya existente
        if (!mapRef.current.getLayer(layerId)) {
          //Creando el cuerpo del layer (punto de interes)
          mapRef.current.addLayer({
            id: layerId,
            type: "symbol",
            source: "interestPoint",
            // Coger la imagen de assets y el color de la propiedad del Layer para darsela al nuevo punto de interes
            layout: {
              "icon-image": "custom-marker",
              "icon-size": 1,
              "icon-allow-overlap": true,
            },
            paint: {
              "icon-color": color,
              "icon-opacity": 0.8,
              "icon-halo-color": "#ffffff",
              "icon-halo-width": 2.5,
              "icon-halo-blur": 1,
            },
            filter: ["in", ["get", "cuisine"], ["literal", [name]]],
          });
        }
        // add a click interaction for each of the layers to be used to render the popup
        mapRef.current.addInteraction(`${layerId}-click`, {
          type: "click",
          target: { layerId },
          handler: handleMarkerClick,
        });
        // change the cursor to a pointer when hovering over a marker
        mapRef.current.addInteraction(`${layerId}-mouse-enter`, {
          type: "mouseenter",
          target: { layerId },
          handler: () => {
            mapRef.current.getCanvas().style.cursor = "pointer";
          },
        });
        // reset the cursor to default image when cursor leaves a marker
        mapRef.current.addInteraction(`${layerId}-mouse-leave`, {
          type: "mouseleave",
          target: { layerId },
          handler: () => {
            mapRef.current.getCanvas().style.cursor = "";
          },
        });
      }
      // Dentro del on("load")
      mapRef.current.addSource("selected-route-source", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] }
      });

      mapRef.current.addLayer({
        id: "selected-route-layer",
        type: "line",
        source: "selected-route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "black", // Un color que resalte
          "line-width": 6,          // Más gruesa que las demás
          "line-opacity": 0.9
        }
      });

      mapRef.current.addSource("all-routes", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] }
      });

      mapRef.current.addLayer({
        id: "all-routes-layer",
        type: "line",
        source: "all-routes",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#d9251e", // Un azul bonito para las rutas guardadas
          "line-width": 4,
          "line-opacity": 0.6
        }
      });



      mapRef.current.addSource("zones", {
        type: "geojson",
        data: dataZones,
      });

      mapRef.current.addLayer({
        id: "zones",
        type: "fill",
        source: "zones",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.3,
        },
      });

      mapRef.current.addLayer({
        id: "outline",
        type: "line",
        source: "zones",
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    });

    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    mapRef.current.on("mousemove", handleMouseMoveMap);

    return () => {
      mapRef.current.remove();
    };
  }, []);
  // #endregion

  // #region useEffect para mostrar la posición del usuario en tiempo real
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    // Validar que tenemos posición válida
    if (userPosition.latitude === 0 && userPosition.longitude === 0) return;

    // Crear o actualizar la fuente de geolocalización
    const source = mapRef.current.getSource("user-location");
    
    if (!source) {
      // Crear la fuente por primera vez
      mapRef.current.addSource("user-location", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [userPosition.longitude, userPosition.latitude]
          },
          properties: {}
        }
      });

      // Agregar la capa del círculo de precisión
      mapRef.current.addLayer({
        id: "user-location-circle",
        type: "circle",
        source: "user-location",
        paint: {
          "circle-radius": 12,
          "circle-color": "#3b98ff",
          "circle-opacity": 0.2,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#3b98ff"
        }
      });

      // Agregar la capa del marcador del usuario
      mapRef.current.addLayer({
        id: "user-location-marker",
        type: "circle",
        source: "user-location",
        paint: {
          "circle-radius": 5,
          "circle-color": "#3b98ff",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff"
        }
      });
    } else {
      // Actualizar los datos de la fuente existente
      source.setData({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [userPosition.longitude, userPosition.latitude]
        },
        properties: {}
      });
    }
  }, [userPosition]);
  // #endregion

  // #region useEffect para añadir punto interes a la lista de puntos de interes y mostrarlo en el mapa
  useEffect(() => {
    if (mapRef.current?.getSource("interestPoint")) {
      mapRef.current.getSource("interestPoint").setData(objectsRef);
    }
  }, [objectsRef]);
  // #endregion


  // #region useEffect para mostrar u ocultar los puntos de interes dependiendo del checkbox seleccionado
  // Cuando le de a un checkbox de la caja de checkboxs
  useEffect(() => {
    if (!mapRef.current) return;

    layerState.forEach((layer) => {
      const layerId = `interestPoint-${layer.name}-symbol`;

      if (mapRef.current.getLayer(layerId)) {
        mapRef.current.setLayoutProperty(
          layerId,
          "visibility",
          layer.isChecked ? "visible" : "none",
        );
      }
    });
  }, [layerState]);

  // #endregion

  // #region useEffect para crear la ruta entre dos punto o mas seleccionados por el usuario
  // Cuando hayan suficientes puntos para crear una ruta
  useEffect(() => {
    const fetchRoute = async () => {
      if (routePoints.length < 2) return;

      const coords = routePoints.map((p) => p.join(",")).join(";");
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      const res = await fetch(url);
      const data = await res.json();
      const route = data.routes[0].geometry;

      if (mapRef.current.getSource("route")) {
        mapRef.current.getSource("route").setData(route);
      } else {
        mapRef.current.addSource("route", { type: "geojson", data: route });
        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#ff0000", "line-width": 4 },
        });
      }
    };
    fetchRoute();
  }, [routePoints]);
  // #endregion

  // #region useEffect para crear zonas nuevas, cada vez que se añada un nuevo punto a la zona en creacion, se actualizara el source de las zonas y se dibujara el nuevo poligono o se actualizara el existente
  // creador de zonas nuevas
  useEffect(() => {
    const updateMapSources = () => {
      if (!mapRef.current) return;

      if (!mapRef.current.isStyleLoaded()) {
        setTimeout(updateMapSources, 200);
        return;
      }

      const source = mapRef.current.getSource("zones");
      if (source) {
        const newData = {
          type: "FeatureCollection",
          features: zonesRef.map((zone) => ({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: Array.isArray(zone.coordpol[0]) ? [zone.coordpol] : [zone.coordpol],
            },
            properties: {
              id: zone.id,
              name: zone.name,
              color: zone.color, // Ya viene traducido como 'red', 'green', etc.
            },
          })),
        };
        source.setData(newData);
      }
    };

    if (zonesRef.length > 0) {
      updateMapSources();
    }
  }, [zonesRef]);
  // #endregion

  // #region useEffect para mostrar la ruta seleccionada en el mapa, se dispara cada vez que eliges una ruta en el panel de rutas
  useEffect(() => {
    // 1. Validaciones de seguridad (Mapa listo y datos presentes)
    if (!mapRef.current || !mapRef.current.isStyleLoaded() || !dataRuteSelected.coordpol) return;

    const updateSelectedRoute = async () => {
      // 2. Extraer puntos (A y B)
      // Asumimos que coordpol es un array de coordenadas [[lng, lat], [lng, lat]]
      const coords = dataRuteSelected.coordpol.map(p => p.join(",")).join(";");

      // 3. Pedir la geometría exacta a la API de Directions (Caminando)
      const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.code !== "Ok") return;

        const routeGeometry = data.routes[0].geometry;
        const source = mapRef.current.getSource("selected-route-source");

        if (source) {
          // Si la fuente ya existe, solo actualizamos los datos
          source.setData({
            type: "Feature",
            properties: {
              id: dataRuteSelected.id,
              name: dataRuteSelected.name
            },
            geometry: routeGeometry
          });

          // Opcional: Hacer que el mapa vuele hasta la ruta
          const coordinates = routeGeometry.coordinates;
          const bounds = coordinates.reduce((acc, coord) => {
            return acc.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          mapRef.current.fitBounds(bounds, { padding: 50 });
        }
      } catch (error) {
        console.error("Error al obtener la ruta seleccionada:", error);
      }
    };

    updateSelectedRoute();
  }, [dataRuteSelected]); // Se dispara cada vez que eliges una ruta en el panel
  // #endregion

  // #region Cada vez que se añade una nueva zona, se actualizara el source de las zonas y se dibujara el nuevo poligono o se actualizara el existente
  useEffect(() => {
    // 1. Si no hay mapa o el estilo no ha cargado, no hacemos nada
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    // 2. Transformamos zonesRef al formato GeoJSON
    const newData = {
      type: "FeatureCollection",
      features: zonesRef.map((zone) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [zone.coordpol],
        },
        properties: {
          id: zone.id,
          name: zone.name,
          color: zone.color, // zone.color ya viene traducido del useEffect anterior
        },
      })),
    };

    // 3. Si la fuente ya existe, actualizamos los datos
    const source = mapRef.current.getSource("zones");
    if (source) {
      source.setData(newData);
    }
    console.log("Cargados")
  }, [zonesRef]); // Se activa cada vez que zonesRef cambia  
  // #endregion

  // #endregion


  return (
    <div
      className=" container-map "
      onContextMenu={disableContextMenuPag}
    >
      {user?.username === "admin" && (menu.visible && (
        <ContextMenuLocation
          positionState={positionCreateElement}
          positionContextMenu={menu}
          onClose={handleCloseContextMenuMap}
          onCreateInterestPoint={handleCreateInteresPoint}
          onCreateMark={handleCreateMark}
          types={layerState}
          init={init}
          goal={goal}
          amountPointZone={amountPointZone}
          onOpenZone={handleOpenZone}
          onCreateEdge={handleCreatEdgeZone}
          onCloseZone={handleCloseZone}
          onCancelZone={handleRemoveZoneInCreation}
          typeZones={dangerTranslate}
          dataNewZone={dataNewZone}
          onChangeDataZone={setDataNewZone}
          onSaveRute={handleCreateRute}
        />
      ))}
      
      <div
        id="map-container"
        ref={mapContainerRef}
        onContextMenu={handleContentMenu}
        onClick={handleCloseContextMenuMap}
      >        
        {user?.username === "admin" &&
          <Popup popupData={popupData} mapRef={mapRef} />
        }
        <div className="sidebar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
          Zoom: {zoom.toFixed(2)}
        </div>
        <button className="reset-button" onClick={handleButtonClick}>
          Reset
        </button>
        <button className="location-button" onClick={handleCenterUserLocation}>
          <i className="bi bi-geo-alt-fill icono"></i>
        </button>
        {user?.username === "admin" &&
          <LayerCheckboxes
            layerState={layerState}
            setLayerState={setLayerState}
          />
        }
        {user?.username === "admin" &&
          <div className="infoSide d-flex flex-row">
            <div className="d-flex flex-column align-items-start mx-3">
              <i
                className="bi bi-chevron-left"
                style={{ fontSize: "1.5rem", cursor: "pointer" }}
              ></i>
            </div>
            <InfoPanel
              zones={zonesRef}
              rutes={rutesRef}
              onRemoveZone={handleRemoveZone}
              onEditZone={handleEditZone}
              dangerColor={dangerColor}
              typesDanger={dangerTranslate}
              zoneSelected={dataZoneSelected}
              onZoneSelected={setDataZoneSelected}
              onRuteSelected={setDataRuteSelected}
            />
          </div>}
      </div>
      <SelectorRutes rutesList={rutesRef} lineasObjetosList={linesObjectsRef} onSelectRute={setDataRuteSelected} />
    </div>
  );
}

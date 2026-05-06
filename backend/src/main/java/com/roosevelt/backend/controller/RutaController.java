package com.roosevelt.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roosevelt.backend.model.Ruta;
import com.roosevelt.backend.service.RutaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Rutas", description = "API para gestión de Rutas")
@RestController
@RequestMapping("/api/rutas")
@CrossOrigin(origins = "/*")
public class RutaController {
    

    @Autowired
    private RutaService rutaService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/rutas
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener todas las Rutas",
            description = "Retorna una lista con todas las Rutas disponibles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rutas obtenidas con éxito")
    })
    // ***************************************************************************    
    @GetMapping("")
    public ResponseEntity<List<Ruta>> showRutas() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(rutaService.findAll());
    }

    // http://localhost:8080/roosevelt/api/rutas/2
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Ruta por ID",
            description = "Retorna una Ruta especifica basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ruta encontrada"),
        @ApiResponse(responseCode = "404", description = "Ruta no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/{id}")
    public ResponseEntity<Ruta> detailsRuta(@PathVariable int id) {
        Ruta ruta = rutaService.findByIdRuta(id);

        if (ruta == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);  // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(ruta);
        }
    }


    // http://localhost:8080/roosevelt/api/rutas/zona/id_zona
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Rutas por un id_zona",
            description = "Retorna una lista con las Rutas de una zona")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rutas obtenidas con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/zona/{id_zona}")
    public ResponseEntity<List<Ruta>> showRutasDeZona(@PathVariable int id_zona) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(rutaService.findByIdZona(id_zona));
    }

    // http://localhost:8080/roosevelt/api/rutas/usuario/{id_usuario}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Rutas por un id_usuario_autor",
            description = "Retorna una lista con las Rutas de un User")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rutas obtenidas con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/usuario/{id_usuario_autor}")
    public ResponseEntity<List<Ruta>> showRutasDeUsuario(@PathVariable int id_usuario_autor) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(rutaService.findByIdUsuario(id_usuario_autor));
    }

    // http://localhost:8080/roosevelt/api/rutas/nombre/{nombre_ruta}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Rutas por su Nombre",
            description = "Retorna una lista con las Rutas con un nombre especifico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rutas obtenidas con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/nombre/{nombre_ruta}")
    public ResponseEntity<List<Ruta>> showRutasPorNombre(@PathVariable String nombre_ruta) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(rutaService.findByNombreRuta(nombre_ruta));
    }

    // http://localhost:8080/roosevelt/api/rutas/popular
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Ruta más popular",
            description = "Retorna una con mas cantidad de likes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Rutas obtenidas con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/popular")
    public ResponseEntity<Ruta> showRutaMasPopular() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(rutaService.findMasPopular());
    }


    // http://localhost:8080/roosevelt/api/rutas/count
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener el número de Rutas existentes",
            description = "Retorna la cantidad de Rutas")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Número de Rutas obtenidas con éxito", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countRutas() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("Rutas", rutaService.count());

        response = ResponseEntity
                .status(HttpStatus.OK)
                .body(map);

        return response;
    }

    


    // ***************************************************************************
    // ACTUALIZACIONES
    // ***************************************************************************
    // ****************************************************************************
    // INSERT (POST)    
    // http://localhost:8080/roosevelt/api/rutas
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Crear un nuevo Ruta",
            description = "Registra un nuev Ruta en el sistema con las datos proporcionados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Ruta creada con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createRuta(
            @Valid @RequestBody Ruta ruta) {

        ResponseEntity<Map<String, Object>> response;

        if (ruta == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (ruta.getNombreRuta() == null || ruta.getNombreRuta().trim().isEmpty()
                    || ruta.getDescripcion() == null || ruta.getDescripcion().trim().isEmpty()
                    || ruta.getMapboxJSON() == null || ruta.getMapboxJSON().trim().isEmpty()
                    || ruta.getFecha_pub() == null
                    || ruta.getLikesCount() <= 0
                    || ruta.getZona() == null
                    || ruta.getUsuario_autor() == null
                    ) {

                Map<String, Object> map = new HashMap<>();
                map.put("error", "las campos 'nombre', 'descripcion', 'mapboxJSON', 'fecha_pub', 'likes_count', 'zona' y 'usuario' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(ruta);
                Ruta rutaPost = rutaService.save(ruta);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Ruta creado con éxito");
                map.put("insertRuta", rutaPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/rutas
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Actualizar un Ruta existente",
            description = "Reemplaza completamente las datos de unu Ruta identificado por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Ruta actualizado con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Ruta no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateRuta(
            @Valid @RequestBody Ruta rutaUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (rutaUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            int id = rutaUpdate.getId();
            Ruta existingRuta = rutaService.findByIdRuta(id);

            if (existingRuta == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Ruta no encontrada");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (rutaUpdate.getNombreRuta() != null) {
                    existingRuta.setNombreRuta(rutaUpdate.getNombreRuta());
                }
                if (rutaUpdate.getDescripcion() != null) {
                    existingRuta.setDescripcion(rutaUpdate.getDescripcion());
                }
                if (rutaUpdate.getMapboxJSON() != null) {
                    existingRuta.setMapboxJSON(rutaUpdate.getMapboxJSON());
                }
                if (rutaUpdate.getFecha_pub() != null) {
                    existingRuta.setFecha_pub(rutaUpdate.getFecha_pub());
                }
                if (rutaUpdate.getLikesCount() > 0) {
                    existingRuta.setLikesCount(rutaUpdate.getLikesCount());
                }
                if (rutaUpdate.getZona() != null) {
                    existingRuta.setZona(rutaUpdate.getZona());
                }
                if (rutaUpdate.getUsuario_autor() != null) {
                    existingRuta.setUsuario_autor(rutaUpdate.getUsuario_autor());
                }              

                Ruta rutaPut = rutaService.save(existingRuta);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Ruta actualizado con éxito");
                map.put("updatedRuta", rutaPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }

        return response;
    }


    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/rutas/16
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Eliminar Ruta por ID",
            description = "Elimina una Ruta especifica del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Ruta eliminado con éxito", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Ruta no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRuta(@PathVariable int id) {

        ResponseEntity<Map<String, Object>> response;

        Ruta existingRuta = rutaService.findByIdRuta(id);
        if (existingRuta == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Ruta no encontrada");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            rutaService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Ruta eliminada con éxito");
            map.put("deletedRuta", existingRuta);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}
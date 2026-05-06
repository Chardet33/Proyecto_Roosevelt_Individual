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

import com.roosevelt.backend.model.LineaRutasFav;
import com.roosevelt.backend.model.LineaRutasFavId;
import com.roosevelt.backend.model.Ruta;
import com.roosevelt.backend.service.LineaRutasFavService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "LineaRutasFav", description = "API para gestión de LineaRutasFav")
@RestController
@RequestMapping("/api/rutasfav")
@CrossOrigin(origins = "/*")
public class LineaRutasFavController {

    @Autowired
    private LineaRutasFavService lineaRutasFavService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/rutasfav
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener todos los LineaRutasFavs", description = "Retorna una lista con todos los LineaRutasFavs disponibles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaRutasFavs obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("")
    public ResponseEntity<List<LineaRutasFav>> showLineaRutasFavs() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaRutasFavService.findAll());
    }

    // http://localhost:8080/roosevelt/api/rutasfav/2
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaRutasFav por ID", description = "Retorna un LineaRutasFav especifico basado en su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaRutasFav encontrado"),
            @ApiResponse(responseCode = "404", description = "LineaRutasFav no encontrado", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/{id_usuario}/{id_ruta}")
    public ResponseEntity<LineaRutasFav> detailsLineaRutasFav(@PathVariable int id_usuario, @PathVariable int id_ruta) {
        LineaRutasFav lineaRutasFav = lineaRutasFavService.findById(id_usuario, id_ruta);

        if (lineaRutasFav == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(lineaRutasFav);
        }
    }

    // http://localhost:8080/roosevelt/api/rutasfav/rutas/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaRutasFavs de un usuario", description = "Retorna una lista con todos los LineaRutasFavs de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaRutasFavs obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/ruta/{id_ruta}")
    public ResponseEntity<List<LineaRutasFav>> showLineaRutasFavsDeRuta(@PathVariable int id_ruta) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaRutasFavService.findByRutaId(id_ruta));
    }

    // http://localhost:8080/roosevelt/api/rutasfav/usuario/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaRutasFavs de un usuario", description = "Retorna una lista con todos las LineaRutasFavs de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaRutasFavs obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/usuario/{id_usuario}")
    public ResponseEntity<List<LineaRutasFav>> showLineaRutasFavsDeusuario(@PathVariable int id_usuario) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaRutasFavService.findByUsuarioId(id_usuario));
    }


    // http://localhost:8080/roosevelt/api/rutasfav/rutas/usuario/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaRutasFavs de un usuario", description = "Retorna una lista con todos las rutasFav de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaRutasFavs obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/rutas/usuario/{id_usuario}")
    public ResponseEntity<List<Ruta>> showRutasFavDeUsuario(@PathVariable int id_usuario) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaRutasFavService.findRutasByIdUsuario(id_usuario));
    }

    // http://localhost:8080/roosevelt/api/rutasfav/count
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener el número de LineaRutasFavs existentes", description = "Retorna la cantidad de LineaRutasFavs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Número de LineaRutasFavs obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countLineaRutasFavs() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("LineaRutasFavs", lineaRutasFavService.count());

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
    // http://localhost:8080/roosevelt/api/rutasfav
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Crear un nuev LineaRutasFav", description = "Registra un nuev LineaRutasFav en el sistema con los datos proporcionados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "LineaRutasFav creado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createLineaRutasFav(
            @Valid @RequestBody LineaRutasFav lineaRutasFav) {

        ResponseEntity<Map<String, Object>> response;

        if (lineaRutasFav == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (lineaRutasFav.getLineaRutasFavId() == null) {

                Map<String, Object> map = new HashMap<>();
                map.put("error",
                        "Los campos 'ruta' y 'usuario' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(lineaRutasFav);
                LineaRutasFav lineaRutasFavPost = lineaRutasFavService.save(lineaRutasFav);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "LineaRutasFav creada con éxito");
                map.put("insertLineaRutasFav", lineaRutasFavPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/rutasfav
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Actualizar un LineaRutasFav existente", description = "Reemplaza completamente los datos de un LineaRutasFav identificado por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "LineaRutasFav actualizado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
            @ApiResponse(responseCode = "404", description = "LineaRutasFav no encontrado", content = @Content())
    })
    // ***************************************************************************
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateLineaRutasFav(
            @Valid @RequestBody LineaRutasFav lineaRutasFavUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (lineaRutasFavUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            LineaRutasFavId id = lineaRutasFavUpdate.getLineaRutasFavId();
            LineaRutasFav existingLineaRutasFav = lineaRutasFavService.findById(id.getUsuario().getId(), id.getRuta().getId());

            if (existingLineaRutasFav == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "LineaRutasFav no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (lineaRutasFavUpdate.getLineaRutasFavId() != null) {
                    existingLineaRutasFav.setLineaRutasFavId(lineaRutasFavUpdate.getLineaRutasFavId());
                }

                LineaRutasFav lineaRutasFavPut = lineaRutasFavService.save(existingLineaRutasFav);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "LineaRutasFav actualizado con éxito");
                map.put("updatedLineaRutasFav", lineaRutasFavPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/rutasfav/1/3
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Eliminar LineaRutasFav por ID", description = "Elimina un LineaRutasFav especifico del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "LineaRutasFav eliminado con éxito", content = @Content()),
            @ApiResponse(responseCode = "404", description = "LineaRutasFav no encontrado", content = @Content())
    })
    // ***************************************************************************
    @DeleteMapping("/{id_usuario}/{id_ruta}")
    public ResponseEntity<Map<String, Object>> deleteLineaRutasFav(@PathVariable int id_usuario, @PathVariable int id_ruta) {

        ResponseEntity<Map<String, Object>> response;

        LineaRutasFav existingLineaRutasFav = lineaRutasFavService.findById(id_usuario, id_ruta);
        if (existingLineaRutasFav == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "LineaRutasFav no encontrado");
            map.put("id", Integer.toString(id_usuario) + " " + Integer.toString(id_ruta));

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            lineaRutasFavService.deleteById(existingLineaRutasFav.getLineaRutasFavId());

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "LineaRutasFav eliminado con éxito");
            map.put("deletedLineaRutasFav", existingLineaRutasFav);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}
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

import com.roosevelt.backend.model.LineaObjetos;
import com.roosevelt.backend.model.LineaObjetosId;
import com.roosevelt.backend.model.Objeto;
import com.roosevelt.backend.service.LineaObjetosService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "LineasObjetos", description = "API para gestión de LineasObjetos")
@RestController
@RequestMapping("/api/lineasobjetos")
@CrossOrigin(origins = "/*")
public class LineaObjetosController {

    @Autowired
    private LineaObjetosService lineaObjetosService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/lineaobjetos
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener todos los LineaObjetos", description = "Retorna una lista con todos los LineaObjetos disponibles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaObjetos obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("")
    public ResponseEntity<List<LineaObjetos>> showLineaObjetos() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaObjetosService.findAll());
    }

    // http://localhost:8080/roosevelt/api/lineaobjetos/2
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaObjetos por ID", description = "Retorna un LineaObjetos especifico basado en su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaObjetos encontrado"),
            @ApiResponse(responseCode = "404", description = "LineaObjetos no encontrado", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/{id_ruta}/{id_objeto}")
    public ResponseEntity<LineaObjetos> detailsLineaObjetos(@PathVariable int id_ruta, @PathVariable int id_objeto) {
        LineaObjetos lineaObjetos = lineaObjetosService.findById(id_ruta, id_objeto);

        if (lineaObjetos == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(lineaObjetos);
        }
    }

    // http://localhost:8080/roosevelt/api/rutasfav/rutas/usuario/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Objetos de una Ruta", description = "Retorna una lista con todos los objetos de una Ruta")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Objetos obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/objetos/ruta/{id_ruta}")
    public ResponseEntity<List<Objeto>> showRutasFavDeUsuario(@PathVariable int id_ruta) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaObjetosService.findObjetosByIdRuta(id_ruta));
    }

    // http://localhost:8080/roosevelt/api/lineaobjetos/rutas/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaObjetos de un usuario", description = "Retorna una lista con todos los LineaObjetos de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaObjetos obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/ruta/{id_ruta}")
    public ResponseEntity<List<LineaObjetos>> showLineaObjetosDeRuta(@PathVariable int id_ruta) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaObjetosService.findByRutaId(id_ruta));
    }

    // http://localhost:8080/roosevelt/api/lineaobjetos/usuario/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener LineaObjetos de un usuario", description = "Retorna una lista con todos los LineaObjetos de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "LineaObjetos obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/objeto/{id_objeto}")
    public ResponseEntity<List<LineaObjetos>> showLineaObjetosDeObjeto(@PathVariable int id_objeto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(lineaObjetosService.findByObjetoId(id_objeto));
    }

    // http://localhost:8080/roosevelt/api/lineaobjetos/count
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener el número de LineaObjetos existentes", description = "Retorna la cantidad de LineaObjetos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Número de LineaObjetos obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countLineaObjetos() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("LineaObjetos", lineaObjetosService.count());

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
    // http://localhost:8080/roosevelt/api/lineaobjetos
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Crear un nuev LineaObjetos", description = "Registra un nuev LineaObjetos en el sistema con los datos proporcionados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "LineaObjetos creado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createLineaObjetos(
            @Valid @RequestBody LineaObjetos lineaObjetos) {

        ResponseEntity<Map<String, Object>> response;

        if (lineaObjetos == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (lineaObjetos.getLineaObjetosId() == null) {

                Map<String, Object> map = new HashMap<>();
                map.put("error",
                        "Los campos 'ruta' y 'objeto' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(lineaObjetos);
                LineaObjetos lineaObjetosPost = lineaObjetosService.save(lineaObjetos);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "LineaObjetos creada con éxito");
                map.put("insertLineaObjetos", lineaObjetosPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/lineaobjetos
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Actualizar un LineaObjetos existente", description = "Reemplaza completamente los datos de un LineaObjetos identificado por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "LineaObjetos actualizado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
            @ApiResponse(responseCode = "404", description = "LineaObjetos no encontrado", content = @Content())
    })
    // ***************************************************************************
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateLineaObjetos(
            @Valid @RequestBody LineaObjetos LineaObjetosUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (LineaObjetosUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            LineaObjetosId id = LineaObjetosUpdate.getLineaObjetosId();
            LineaObjetos existingLineaObjetos = lineaObjetosService.findById(id.getRuta().getId(), id.getObjeto().getId());

            if (existingLineaObjetos == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "LineaObjetos no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (LineaObjetosUpdate.getLineaObjetosId() != null) {
                    existingLineaObjetos.setLineaObjetosId(LineaObjetosUpdate.getLineaObjetosId());
                }

                LineaObjetos LineaObjetosPut = lineaObjetosService.save(existingLineaObjetos);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "LineaObjetos actualizado con éxito");
                map.put("updatedLineaObjetos", LineaObjetosPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/lineaobjetos/1/3
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Eliminar LineaObjetos por ID", description = "Elimina un LineaObjetos especifico del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "LineaObjetos eliminado con éxito", content = @Content()),
            @ApiResponse(responseCode = "404", description = "LineaObjetos no encontrado", content = @Content())
    })
    // ***************************************************************************
    @DeleteMapping("/{id_ruta}/{id_objeto}")
    public ResponseEntity<Map<String, Object>> deleteLineaObjetos(@PathVariable int id_ruta, @PathVariable int id_objeto) {

        ResponseEntity<Map<String, Object>> response;

        LineaObjetos existingLineaObjetos = lineaObjetosService.findById(id_ruta, id_objeto);
        if (existingLineaObjetos == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "LineaObjetos no encontrado");
            map.put("id", Integer.toString(id_ruta) + " " + Integer.toString(id_objeto));

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            lineaObjetosService.deleteById(existingLineaObjetos.getLineaObjetosId());

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "LineaObjetos eliminado con éxito");
            map.put("deletedLineaObjetos", existingLineaObjetos);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}
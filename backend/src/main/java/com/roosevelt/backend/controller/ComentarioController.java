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

import com.roosevelt.backend.model.Comentario;
import com.roosevelt.backend.service.ComentarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Comentarios", description = "API para gestión de Comentarios")
@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "/*")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/comentarios
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener todos los Comentarios", description = "Retorna una lista con todos los Comentarios disponibles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comentarios obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("")
    public ResponseEntity<List<Comentario>> showComentarios() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(comentarioService.findAll());
    }

    // http://localhost:8080/roosevelt/api/comentarios/2
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Comentario por ID", description = "Retorna un Comentario especifico basado en su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comentario encontrado"),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/{id}")
    public ResponseEntity<Comentario> detailsComentario(@PathVariable int id) {
        Comentario comentario = comentarioService.findById(id);

        if (comentario == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(comentario);
        }
    }

    // http://localhost:8080/roosevelt/api/comentarios/usuario/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Comentarios de un usuario", description = "Retorna una lista con todos los Comentarios de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comentarios obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/usuario/{id_usuario}")
    public ResponseEntity<List<Comentario>> showComentariosDeUsuario(@PathVariable int id_usuario) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(comentarioService.findByUsuarioId(id_usuario));
    }

    // http://localhost:8080/roosevelt/api/comentarios/rutas/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Comentarios de una ruta", description = "Retorna una lista con todos los Comentarios de una Ruta")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comentarios obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/ruta/{id_ruta}")
    public ResponseEntity<List<Comentario>> showComentariosDeRuta(@PathVariable int id_ruta) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(comentarioService.findByUsuarioId(id_ruta));
    }

    // http://localhost:8080/roosevelt/api/comentarios/count
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener el número de Comentarios existentes", description = "Retorna la cantidad de Comentarios")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Número de Comentarios obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countComentarios() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("Comentarios", comentarioService.count());

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
    // http://localhost:8080/roosevelt/api/comentarios
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Crear un nuev Comentario", description = "Registra un nuev Comentario en el sistema con los datos proporcionados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Comentario creado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createComentario(
            @Valid @RequestBody Comentario comentario) {

        ResponseEntity<Map<String, Object>> response;

        if (comentario == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (comentario.getComentario() == null || comentario.getComentario().trim().isEmpty()
                    || comentario.getFecha_pub() == null
                    || comentario.getRuta() == null
                    || comentario.getUsuario() == null) {

                Map<String, Object> map = new HashMap<>();
                map.put("error",
                        "Los campos 'comentario', 'fecha_pub', 'ruta' y 'usuario' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(comentario);
                Comentario comentarioPost = comentarioService.save(comentario);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Comentario creada con éxito");
                map.put("insertComentario", comentarioPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/comentarios
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Actualizar un Comentario existente", description = "Reemplaza completamente los datos de un Comentario identificado por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Comentario actualizado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado", content = @Content())
    })
    // ***************************************************************************
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateComentario(
            @Valid @RequestBody Comentario ComentarioUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (ComentarioUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            int id = ComentarioUpdate.getId();
            Comentario existingComentario = comentarioService.findById(id);

            if (existingComentario == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Comentario no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (ComentarioUpdate.getComentario() != null) {
                    existingComentario.setComentario(ComentarioUpdate.getComentario());
                }
                if (ComentarioUpdate.getFecha_pub() != null) {
                    existingComentario.setFecha_pub(ComentarioUpdate.getFecha_pub());
                }
                if (ComentarioUpdate.getRuta() != null) {
                    existingComentario.setRuta(ComentarioUpdate.getRuta());
                }
                if (ComentarioUpdate.getUsuario() != null) {
                    existingComentario.setUsuario(ComentarioUpdate.getUsuario());
                }

                Comentario ComentarioPut = comentarioService.save(existingComentario);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Comentario actualizado con éxito");
                map.put("updatedComentario", ComentarioPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/Comentarios/16
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Eliminar Comentario por ID", description = "Elimina un Comentario especifico del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Comentario eliminado con éxito", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Comentario no encontrado", content = @Content())
    })
    // ***************************************************************************
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteComentario(@PathVariable int id) {

        ResponseEntity<Map<String, Object>> response;

        Comentario existingComentario = comentarioService.findById(id);
        if (existingComentario == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Comentario no encontrado");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            comentarioService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Comentario eliminado con éxito");
            map.put("deletedComentario", existingComentario);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}

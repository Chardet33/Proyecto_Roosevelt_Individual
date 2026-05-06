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

import com.roosevelt.backend.model.Like;
import com.roosevelt.backend.model.LikeId;
import com.roosevelt.backend.service.LikeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Likes", description = "API para gestión de Likes")
@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "/*")
public class LikeController {

    @Autowired
    private LikeService likeService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/likes
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener todos los Likes", description = "Retorna una lista con todos los Likes disponibles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Likes obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("")
    public ResponseEntity<List<Like>> showLikes() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(likeService.findAll());
    }

    // http://localhost:8080/roosevelt/api/likes/2
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Like por ID", description = "Retorna un Like especifico basado en su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Like encontrado"),
            @ApiResponse(responseCode = "404", description = "Like no encontrado", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/{id_usuario}/{id_ruta}")
    public ResponseEntity<Like> detailsLike(@PathVariable int id_usuario, @PathVariable int id_ruta) {
        Like Like = likeService.findById(id_usuario, id_ruta);

        if (Like == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Like);
        }
    }

    // http://localhost:8080/roosevelt/api/likes/rutas/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Likes de un usuario", description = "Retorna una lista con todos los Likes de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Likes obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/ruta/{id_ruta}")
    public ResponseEntity<List<Like>> showLikesDeRuta(@PathVariable int id_ruta) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(likeService.findByRutaId(id_ruta));
    }

    // http://localhost:8080/roosevelt/api/likes/usuario/7
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener Likes de un usuario", description = "Retorna una lista con todos los Likes de un Usuario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Likes obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/usuario/{id_usuario}")
    public ResponseEntity<List<Like>> showLikesDeusuario(@PathVariable int id_usuario) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(likeService.findByUsuarioId(id_usuario));
    }

    // http://localhost:8080/roosevelt/api/likes/count
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener el número de Likes existentes", description = "Retorna la cantidad de Likes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Número de Likes obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countLikes() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("Likes", likeService.count());

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
    // http://localhost:8080/roosevelt/api/Likes
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Crear un nuev Like", description = "Registra un nuev Like en el sistema con los datos proporcionados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Like creado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createLike(
            @Valid @RequestBody Like like) {

        ResponseEntity<Map<String, Object>> response;

        if (like == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (like.getLikeId() == null) {

                Map<String, Object> map = new HashMap<>();
                map.put("error",
                        "Los campos 'ruta' y 'usuario' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(like);
                Like likePost = likeService.save(like);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Like creada con éxito");
                map.put("insertLike", likePost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/likes
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Actualizar un Like existente", description = "Reemplaza completamente los datos de un Like identificado por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Like actualizado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Like no encontrado", content = @Content())
    })
    // ***************************************************************************
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateLike(
            @Valid @RequestBody Like likeUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (likeUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            LikeId id = likeUpdate.getLikeId();
            Like existingLike = likeService.findById(id.getUsuario().getId(), id.getRuta().getId());

            if (existingLike == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Like no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (likeUpdate.getLikeId() != null) {
                    existingLike.setLikeId(likeUpdate.getLikeId());
                }

                Like LikePut = likeService.save(existingLike);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Like actualizado con éxito");
                map.put("updatedLike", LikePut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }
        return response;
    }

    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/likes/1/3
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Eliminar Like por ID", description = "Elimina un Like especifico del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Like eliminado con éxito", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Like no encontrado", content = @Content())
    })
    // ***************************************************************************
    @DeleteMapping("/{id_usuario}/{id_ruta}")
    public ResponseEntity<Map<String, Object>> deleteLike(@PathVariable int id_usuario, @PathVariable int id_ruta) {

        ResponseEntity<Map<String, Object>> response;

        Like existingLike = likeService.findById(id_usuario, id_ruta);
        if (existingLike == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Like no encontrado");
            map.put("id", Integer.toString(id_usuario) + " " + Integer.toString(id_ruta));

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            likeService.deleteById(existingLike.getLikeId());

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Like eliminado con éxito");
            map.put("deletedLike", existingLike);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}
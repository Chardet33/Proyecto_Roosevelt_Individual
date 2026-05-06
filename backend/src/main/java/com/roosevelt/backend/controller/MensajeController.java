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

import com.roosevelt.backend.model.Mensaje;
import com.roosevelt.backend.service.MensajeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Mensajes", description = "API para gestión de mensajes")
@RestController
@RequestMapping("/api/mensajes")
@CrossOrigin(origins = "/*")
public class MensajeController {

    @Autowired
    private MensajeService mensajeService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/mensajes
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener todos los mensajes", description = "Retorna una lista con todos los mensajes disponibles")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mensajes obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("")
    public ResponseEntity<List<Mensaje>> showMensajes() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(mensajeService.findAll());
    }

    // http://localhost:8080/roosevelt/api/mensajes/{2}
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener mensaje por ID", description = "Retorna un mensaje específico basado en su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mensaje encontrado"),
            @ApiResponse(responseCode = "404", description = "Mensaje no encontrado", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/{id}")
    public ResponseEntity<Mensaje> detailsMensaje(@PathVariable int id) {
        Mensaje mensaje = mensajeService.findById(id);

        if (mensaje == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null); // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(mensaje);
        }
    }

    // http://localhost:8080/roosevelt/api/mensajes/titulo/{miTitulo}
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener mensajes por su titulo", description = "Retorna una lista con todos los mensajes con titulo especifico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mensajes obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<List<Mensaje>> showMensajesPorTitulo(@PathVariable String titulo) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(mensajeService.findByTitulo(titulo));
    }

    // http://localhost:8080/roosevelt/api/mensajes/email/{miEmail}
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener mensajes por el email", description = "Retorna una lista con todos los mensajes con email especifico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mensajes obtenidos con éxito")
    })
    // ***************************************************************************
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Mensaje>> showMensajesPorEmail(@PathVariable String email) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(mensajeService.findByEmail(email));
    }

    // http://localhost:8080/roosevelt/api/mensajes/count
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Obtener el número de mensajes existentes", description = "Retorna la cantidad de mensajes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Número de mensajes obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countMensajes() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("mensajes", mensajeService.count());

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
    // http://localhost:8080/roosevelt/api/mensajes
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Crear un nuev mensaje", description = "Registra un nuevo mensaje en el sistema con los datos proporcionados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Mensaje creado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createMensaje(
            @Valid @RequestBody Mensaje mensaje) {

        ResponseEntity<Map<String, Object>> response;

        if (mensaje == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (mensaje.getTitulo() == null || mensaje.getTitulo().trim().isEmpty()
                    || mensaje.getMensaje() == null || mensaje.getMensaje().trim().isEmpty()
                    || mensaje.getNombre() == null || mensaje.getNombre().trim().isEmpty()
                    || mensaje.getEmail() == null || mensaje.getEmail().trim().isEmpty()
                    || mensaje.getTel() == null || mensaje.getTel().trim().isEmpty()
                    || mensaje.getFecha_pub() == null) {

                Map<String, Object> map = new HashMap<>();
                map.put("error", "Los campos 'titulo, 'mensaje', 'nombre', 'email', 'tel' y 'fecha_pub' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(mensaje);
                Mensaje mensajePost = mensajeService.save(mensaje);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Mensaje creado con éxito");
                map.put("insertMensaje", mensajePost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }

        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/mensajes
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Actualizar un mensaje existente", description = "Reemplaza completamente los datos de un mensaje identificado por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Mensaje actualizado con éxito", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Mensaje no encontrado", content = @Content())
    })
    // ***************************************************************************
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateMensaje(
            @Valid @RequestBody Mensaje mensajeUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (mensajeUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            int id = mensajeUpdate.getId();
            Mensaje existingMensaje = mensajeService.findById(id);

            if (existingMensaje == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Mensaje no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (mensajeUpdate.getTitulo() != null) {
                    existingMensaje.setTitulo(mensajeUpdate.getTitulo());
                }
                if (mensajeUpdate.getMensaje() != null) {
                    existingMensaje.setMensaje(mensajeUpdate.getMensaje());
                }
                if (mensajeUpdate.getNombre() != null) {
                    existingMensaje.setNombre(mensajeUpdate.getNombre());
                }
                if (mensajeUpdate.getEmail() != null) {
                    existingMensaje.setEmail(mensajeUpdate.getEmail());
                }
                if (mensajeUpdate.getTel() != null) {
                    existingMensaje.setTel(mensajeUpdate.getTel());
                }
                if (mensajeUpdate.getFecha_pub() != null) {
                    existingMensaje.setFecha_pub(mensajeUpdate.getFecha_pub());
                }

                Mensaje mensajePut = mensajeService.save(existingMensaje);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Mensaje actualizado con éxito");
                map.put("updatedMensaje", mensajePut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }

        return response;
    }

    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/mensajes/{3}
    // ***************************************************************************
    // SWAGGER
    @Operation(summary = "Eliminar mensaje por ID", description = "Elimina un mensaje específico del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Mensaje eliminado con éxito", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Mensaje no encontrado", content = @Content())
    })
    // ***************************************************************************
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteMensaje(@PathVariable int id) {

        ResponseEntity<Map<String, Object>> response;

        Mensaje existingMensaje = mensajeService.findById(id);
        if (existingMensaje == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Mensaje no encontrado");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            mensajeService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Mensaje eliminado con éxito");
            map.put("deletedMensaje", existingMensaje);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}

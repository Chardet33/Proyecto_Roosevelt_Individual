package com.roosevelt.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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

import com.roosevelt.backend.model.Usuario;
import com.roosevelt.backend.service.UsuarioService;

@Tag(name = "Usuarios", description = "API para gestión de usuarios")
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "/*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/usuarios
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener todos los usuarios",
            description = "Retorna una lista con todos los usuarios disponibles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuarios obtenidos con éxito")
    })  
    @GetMapping("")
    public ResponseEntity<List<Usuario>> showusuarios() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(usuarioService.findAll());
    }

    // http://localhost:8080/roosevelt/api/usuarios/2
    // SWAGGER
    @Operation(summary = "Obtener usuario por ID",
            description = "Retorna un usuario específico basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado", content = @Content())
    })
   
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> detailsusuario(@PathVariable Integer id) {
        Usuario usu = usuarioService.findById(id);

        if (usu == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);  // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(usu);
        }
    }

    // http://localhost:8080/roosevelt/api/usuarios/count
     // SWAGGER
    @Operation(summary = "Obtener el número de usuarios existentes",
            description = "Retorna la cantidad de usuarios")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Número de usuarios obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************    
    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countusuarios() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("usuarios", usuarioService.count());

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
    // http://localhost:8080/roosevelt/api/usuarios
    // ***************************************************************************      
    // SWAGGER
    @Operation(summary = "Crear un nuevo usuario",
            description = "Registra un nuevo usuario en el sistema con los datos proporcionados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuario creado con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************    

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createusuario(
            @Valid @RequestBody Usuario usuario) {

        ResponseEntity<Map<String, Object>> response;

        if (usuario == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (usuario.getUsername() == null || usuario.getUsername().trim().isEmpty()
                    || usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()
                    || usuario.getPassword() == null || usuario.getPassword().trim().isEmpty()
                    || usuario.getEmail_sec() == null || usuario.getEmail_sec().trim().isEmpty()
                    || usuario.getTel() == null || usuario.getTel().trim().isEmpty()
                    || usuario.getFechaNac() == null
                    || usuario.getFoto() == null || usuario.getFoto().trim().isEmpty()
                    ) {

                Map<String, Object> map = new HashMap<>();
                map.put("error", "Los campos 'name', 'email' y 'password' y otros son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(usuario);
                Usuario usuPost = usuarioService.save(usuario);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Usuario creado con éxito");
                map.put("insertusuario", usuPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }

        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/usuarios
    // SWAGGER
    @Operation(summary = "Actualizar un usuario existente",
            description = "Reemplaza completamente los datos de un usuario identificado por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuario actualizado con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado", content = @Content())
    })
    // ***************************************************************************    
   
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateusuario(
            @Valid
            @RequestBody 
        Usuario usuarioUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (usuarioUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            Integer id = usuarioUpdate.getId();
            Usuario existingusuario = usuarioService.findById(id);

            if (existingusuario == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Usuario no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (usuarioUpdate.getUsername() != null) {
                    existingusuario.setUsername(usuarioUpdate.getUsername());
                }
                if (usuarioUpdate.getEmail() != null) {
                    existingusuario.setEmail(usuarioUpdate.getEmail());
                }
                if (usuarioUpdate.getPassword() != null) {
                    existingusuario.setPassword(usuarioUpdate.getPassword());
                }
                existingusuario.setAdministrador(usuarioUpdate.isAdministrador());
                          
                Usuario usuPut = usuarioService.save(existingusuario);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Usuario actualizado con éxito");
                map.put("updatedusuario", usuPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }

        return response;
    }

    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/usuarios/16
     // SWAGGER
    @Operation(summary = "Eliminar usuario por ID",
            description = "Elimina un usuario específico del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuario eliminado con éxito", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado", content = @Content())
    })
    // ***************************************************************************    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteusuario(@PathVariable Integer id) {

        ResponseEntity<Map<String, Object>> response;

        Usuario existingusuario = usuarioService.findById(id);
        if (existingusuario == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Usuario no encontrado");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            usuarioService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Usuario eliminado con éxito");
            map.put("deletedusuario", existingusuario);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}

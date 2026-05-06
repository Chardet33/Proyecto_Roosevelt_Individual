package com.roosevelt.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody; // IMPORTANTE: no cambiar por el de SWAGGER
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@Tag(name = "Auth", description = "API para gestión de identificación")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final AuthenticationManager authManager;

    public AuthController(AuthenticationManager authManager) {
        this.authManager = authManager;
        // Este método permite conectar este controller con los datos de UserDetails de SecurityConfig
    }

    // SWAGGER
    @Operation(summary = "Identificación de usuario",
            description = "Inicia una sesión indicando usuario y contraseña")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sesión iniciada con éxito",
                content = @Content(mediaType = "application/json", examples = @ExampleObject(
                        value = """
                                {
                                   "message" : "string",
                                   "user" : "string",
                                   "roles": "string"
                                }
                                """
                ))
        )
    })
    // ***************************************************************************       
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Credenciales de acceso",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "Ejemplo de login",
                                    value = """
                                            {
                                              "username": "admin",
                                              "password": "****"
                                            }
                                            """
                            )
                    )
            )            
            @RequestBody Map<String, String> credentials,
            HttpServletRequest request) {

        String username = credentials.get("username");
        String password = credentials.get("password");
        
        
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        // Muy importante: guardar en la sesión
        request.getSession(true).setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                context);

        // Obtener datos del usuario autenticado
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Map<String, String> map = Map.of(
                "message", "Login realizado con éxito",
                "user", userDetails.getUsername(),
                "roles", userDetails.getAuthorities().toString());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(map);
    }

    // SWAGGER
    @Operation(summary = "Cerrar sesión de usuario",
            description = "Cierra la sesión existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sesión cerrada con éxito", content = @Content())
    })
    // ***************************************************************************       
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        Map<String, String> map = Map.of("message", "Sesión cerrada");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(map);
    }

    // SWAGGER
    @Operation(summary = "Información del usuario identificado",
            description = "Muestra el usuario identificado y sus roles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Información obtenida con éxito",
                content = @Content(mediaType = "application/json", examples = @ExampleObject(
                        value = """
                                 {
                                   "username" : "string",
                                   "roles" : "string"
                                 }
                                 """
                ))
        )
    })
    // ***************************************************************************       
    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> user(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        Map<String, String> map;
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            map = Map.of(
                    "message", "Usuario no identificado"
            );
        } else {
            UserDetails userDetails = (UserDetails) auth.getPrincipal();

            map = Map.of(
                    "username", userDetails.getUsername(),
                    "roles", userDetails.getAuthorities().toString()
            );
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(map);
    }
}



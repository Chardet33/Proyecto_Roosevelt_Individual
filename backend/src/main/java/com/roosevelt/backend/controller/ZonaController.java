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

import com.roosevelt.backend.model.Zona;
import com.roosevelt.backend.service.ZonaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Zonas", description = "API para gestión de Zonas")
@RestController
@RequestMapping("/api/zonas")
@CrossOrigin(origins = "/*")
public class ZonaController {
    

    @Autowired
    private ZonaService zonaService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/zonas
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener todas las Zonas",
            description = "Retorna una lista con todas las Zonas disponibles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Zonas obtenidas con éxito")
    })
    // ***************************************************************************    
    @GetMapping("")
    public ResponseEntity<List<Zona>> showZonas() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(zonaService.findAll());
    }

    // http://localhost:8080/roosevelt/api/zonas/{2}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Zona por ID",
            description = "Retorna una Zona específica basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Zona encontrada"),
        @ApiResponse(responseCode = "404", description = "Zona no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/{id}")
    public ResponseEntity<Zona> detailsZona(@PathVariable int id) {
        Zona Zona = zonaService.findById(id);

        if (Zona == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);  // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(Zona);
        }
    }

    // http://localhost:8080/roosevelt/api/nombre/zonas/{nombre_zona}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Zona por ID",
            description = "Retorna una Zona específica basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Zona encontrada"),
        @ApiResponse(responseCode = "404", description = "Zona no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/nombre/{nombre_zona}")
    public ResponseEntity<List<Zona>> detailsNombreZona(@PathVariable String nombre_zona) {
        List<Zona> zonas = zonaService.findByNombreZona(nombre_zona);

        if (zonas == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);  // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(zonas);
        }
    }



    // http://localhost:8080/roosevelt/api/zonas/count
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener el número de Zonas existentes",
            description = "Retorna la cantidad de Zonas")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Número de Zonas obtenidas con éxito", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countZonas() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("Zonas", zonaService.count());

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
    // http://localhost:8080/roosevelt/api/zonas
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Crear una nueva Zona",
            description = "Registra una nueva Zona en el sistema con los datos proporcionados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Zona creada con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createZona(
            @Valid @RequestBody Zona zona) {

        ResponseEntity<Map<String, Object>> response;

        if (zona == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (zona.getNombre_zona() == null || zona.getNombre_zona().trim().isEmpty()
                    || zona.getMapbox_json() == null || zona.getMapbox_json().trim().isEmpty()
                    ) {

                Map<String, Object> map = new HashMap<>();
                map.put("error", "Los campos 'nombre_zona' y 'mapboxJSON' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(zona);
                Zona zonaPost = zonaService.save(zona);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Zona creada con éxito");
                map.put("insertZona", zonaPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }

        return response;
    }

        // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/zonas
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Actualizar una Zona existente",
            description = "Reemplaza completamente los datos de una Zona identificada por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Zona actualizada con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Zona no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateZona(
            @Valid @RequestBody Zona zonaUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (zonaUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            int id = zonaUpdate.getId();
            Zona existingZona = zonaService.findById(id);

            if (existingZona == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Zona no encontrada");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (zonaUpdate.getNombre_zona() != null) {
                    existingZona.setNombre_zona(zonaUpdate.getNombre_zona());
                }
                if (zonaUpdate.getMapbox_json() != null) {
                    existingZona.setMapbox_json(zonaUpdate.getMapbox_json());
                }                

                Zona zonaPut = zonaService.save(existingZona);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Zona actualizada con éxito");
                map.put("updatedZona", zonaPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }

        return response;
    }


    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/zonas/16
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Eliminar Zona por ID",
            description = "Elimina una Zona específica del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Zona eliminada con éxito", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Zona no encontrada", content = @Content())
    })
    // ***************************************************************************    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteZona(@PathVariable int id) {

        ResponseEntity<Map<String, Object>> response;

        Zona existingZona = zonaService.findById(id);
        if (existingZona == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Zona no encontrada");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            zonaService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Zona eliminada con éxito");
            map.put("deletedZona", existingZona);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}
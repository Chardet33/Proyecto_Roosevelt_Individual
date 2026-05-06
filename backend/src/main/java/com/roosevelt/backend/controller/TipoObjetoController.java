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

import com.roosevelt.backend.model.TipoObjeto;
import com.roosevelt.backend.service.TipoObjetoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "TiposObjeto", description = "API para gestión de tipos_objeto")
@RestController
@RequestMapping("/api/tiposobjeto")
@CrossOrigin(origins = "/*")
public class TipoObjetoController {
    

    @Autowired
    private TipoObjetoService tipoObjetoService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/api/tiposobjeto
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener todos los tipos_objeto",
            description = "Retorna una lista con todos los tipos_objeto disponibles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "tipos_objeto obtenidos con éxito")
    })
    // ***************************************************************************    
    @GetMapping("")
    public ResponseEntity<List<TipoObjeto>> showTiposObjeto() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(tipoObjetoService.findAll());
    }

    // http://localhost:8080/roosevelt/api/tiposobjeto/2
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener TipoObjeto por ID",
            description = "Retorna un TipoObjeto especifico basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "TipoObjeto encontrado"),
        @ApiResponse(responseCode = "404", description = "TipoObjeto no encontrado", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/{id}")
    public ResponseEntity<TipoObjeto> detailsTipoObjeto(@PathVariable int id) {
        TipoObjeto tipoObjeto = tipoObjetoService.findById(id);

        if (tipoObjeto == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);  // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(tipoObjeto);
        }
    }


    // http://localhost:8080/roosevelt/api/tiposobjeto/count
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener el número de tipos_objeto existentes",
            description = "Retorna la cantidad de tipos_objeto")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Número de tipos_objeto obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countTiposObjeto() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("tipos_objeto", tipoObjetoService.count());

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
    // http://localhost:8080/roosevelt/api/tiposobjeto
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Crear un nuevo TipoObjeto",
            description = "Registra un nuevo TipoObjeto en el sistema con los datos proporcionados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "TipoObjeto creada con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createTipoObjeto(
            @Valid @RequestBody TipoObjeto tipoObjeto) {

        ResponseEntity<Map<String, Object>> response;

        if (tipoObjeto == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (tipoObjeto.getNombre_tipo() == null || tipoObjeto.getNombre_tipo().trim().isEmpty()
                    || tipoObjeto.getIcono() == null || tipoObjeto.getIcono().trim().isEmpty()
                    ) {

                Map<String, Object> map = new HashMap<>();
                map.put("error", "Los campos 'nombre_tipo' y 'icono' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(tipoObjeto);
                TipoObjeto tipoObjetoPost = tipoObjetoService.save(tipoObjeto);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "TipoObjetoPost creado con éxito");
                map.put("insertTipoObjetoPost", tipoObjetoPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }

        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/tiposobjeto
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Actualizar un tipoObjeto existente",
            description = "Reemplaza completamente los datos de unu tipoObjeto identificado por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "TipoObjeto actualizado con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
        @ApiResponse(responseCode = "404", description = "tipoObjeto no encontrado", content = @Content())
    })
    // ***************************************************************************    
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateTipoObjeto(
            @Valid @RequestBody TipoObjeto tipoObjetoUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (tipoObjetoUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            int id = tipoObjetoUpdate.getId();
            TipoObjeto existingTipoObjeto = tipoObjetoService.findById(id);

            if (existingTipoObjeto == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "TipoObjeto no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (tipoObjetoUpdate.getNombre_tipo() != null) {
                    existingTipoObjeto.setNombre_tipo(tipoObjetoUpdate.getNombre_tipo());
                }  
                if (tipoObjetoUpdate.getNombre_tipo() != null) {
                    existingTipoObjeto.setNombre_tipo(tipoObjetoUpdate.getNombre_tipo());
                }            

                TipoObjeto tipoObjetoPut = tipoObjetoService.save(existingTipoObjeto);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "TipoObjeto actualizado con éxito");
                map.put("updatedTipoObjeto", tipoObjetoPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }

        return response;
    }


    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/tiposobjeto/4
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Eliminar tipoObjeto por ID",
            description = "Elimina un TipoObjeto especifico del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "TipoObjeto eliminado con éxito", content = @Content()),
        @ApiResponse(responseCode = "404", description = "TipoObjeto no encontrado", content = @Content())
    })
    // ***************************************************************************    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteTipoObjeto(@PathVariable int id) {

        ResponseEntity<Map<String, Object>> response;

        TipoObjeto existingTipoObjeto = tipoObjetoService.findById(id);
        if (existingTipoObjeto == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "TipoObjeto no encontrado");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            tipoObjetoService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "TipoObjeto eliminado con éxito");
            map.put("deletedTipoObjeto", existingTipoObjeto);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}
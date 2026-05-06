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

import com.roosevelt.backend.model.Objeto;
import com.roosevelt.backend.service.ObjetoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Objetos", description = "API para gestión de Objetos")
@RestController
@RequestMapping("/api/objetos")
@CrossOrigin(origins = "/*")
public class ObjetoController {
    

    @Autowired
    private ObjetoService objetoService;

    // ***************************************************************************
    // CONSULTAS
    // ***************************************************************************
    // http://localhost:8080/roosevelt/roosevelt/objetos
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener todos los Objetos",
            description = "Retorna una lista con todos los Objetos disponibles")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Objetos obtenidos con éxito")
    })
    // ***************************************************************************    
    @GetMapping("")
    public ResponseEntity<List<Objeto>> showObjetos() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objetoService.findAll());
    }

    // http://localhost:8080/roosevelt/api/objetos/2
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Objeto por ID",
            description = "Retorna un Objeto especifico basado en su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Objeto encontrado"),
        @ApiResponse(responseCode = "404", description = "Objeto no encontrado", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/{id}")
    public ResponseEntity<Objeto> detailsObjeto(@PathVariable int id) {
        Objeto objeto = objetoService.findById(id);

        if (objeto == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);  // 404 Not Found
        } else {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(objeto);
        }
    }

    // http://localhost:8080/roosevelt/api/objetos/zona/{7}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Objetos de una zona",
            description = "Retorna una lista con todos los Objetos de una Zona")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Objetos obtenidos con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/zona/{id_zona}")
    public ResponseEntity<List<Objeto>> detailsObjetoZona(@PathVariable int id_zona) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objetoService.findByIdZona(id_zona));
    }

    // http://localhost:8080/roosevelt/api/objetos/tipo/{7}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Objetos por su tipo",
            description = "Retorna una lista con todos los Objetos de tipo especifico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Objetos obtenidos con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/tipo/{id_tipo_objeto}")
    public ResponseEntity<List<Objeto>> detailsObjetoTipo(@PathVariable int id_tipo_objeto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objetoService.findByIdTipoObjeto(id_tipo_objeto));
    }

    // http://localhost:8080/roosevelt/api/objetos/peligrosidad/{peligrosidad}
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener Objetos por su peligrosidad",
            description = "Retorna una lista con todos los Objetos por su peligrosidad")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Objetos obtenidos con éxito")
    })
    // ***************************************************************************    
    @GetMapping("/peligrosidad/{peligrosidad}")
    public ResponseEntity<List<Objeto>> detailsObjetoPeligrosidad(@PathVariable String peligrosidad) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(objetoService.findByPeligrosidad(peligrosidad));
    }


    // http://localhost:8080/roosevelt/api/objetos/count
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Obtener el número de Objetos existentes",
            description = "Retorna la cantidad de Objetos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Número de Objetos obtenidos con éxito", content = @Content())
    })
    // ***************************************************************************    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countObjetos() {

        ResponseEntity<Map<String, Object>> response = null;

        Map<String, Object> map = new HashMap<>();
        map.put("Objetos", objetoService.count());

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
    // http://localhost:8080/roosevelt/api/objetos
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Crear un nuevo Objeto",
            description = "Registra un nuevo Objeto en el sistema con los datos proporcionados")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Objeto creado con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos", content = @Content())
    })
    // ***************************************************************************
    @PostMapping("")
    public ResponseEntity<Map<String, Object>> createObjeto(
            @Valid @RequestBody Objeto objeto) {

        ResponseEntity<Map<String, Object>> response;

        if (objeto == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(map);
        } else {

            if (objeto.getNombre_objeto() == null || objeto.getNombre_objeto().trim().isEmpty()
                    || objeto.getDescripcion() == null || objeto.getDescripcion().trim().isEmpty()
                    || objeto.getMapBoxJSON() == null || objeto.getMapBoxJSON().trim().isEmpty()
                    || objeto.getImagen() == null || objeto.getImagen().trim().isEmpty()
                    || objeto.getPeligrosidad() == null
                    || objeto.getZona() == null || objeto.getTipoObjeto() == null
                    ) {

                Map<String, Object> map = new HashMap<>();
                map.put("error", "Los campos 'nombre_objeto', 'descripcion', 'mapboxJSON', 'imagen', 'peligrosidad', 'zona' y 'tipo_objeto' son obligatorios");

                response = ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(map);
            } else {
                System.out.println(objeto);
                Objeto objetoPost = objetoService.save(objeto);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Objeto creado con éxito");
                map.put("insertObjeto", objetoPost);

                response = ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(map);
            }
        }

        return response;
    }

    // ****************************************************************************
    // UPDATE (PUT)
    // http://localhost:8080/roosevelt/api/objetos
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Actualizar un Objeto existente",
            description = "Reemplaza completamente los datos de unu Objeto identificado por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Objeto actualizado con éxito", content = @Content()),
        @ApiResponse(responseCode = "400", description = "Datos de actualización inválidos", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Objeto no encontrado", content = @Content())
    })
    // ***************************************************************************    
    @PutMapping("")
    public ResponseEntity<Map<String, Object>> updateObjeto(
            @Valid @RequestBody Objeto objetoUpdate) {

        ResponseEntity<Map<String, Object>> response;

        if (objetoUpdate == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "El cuerpo de la solicitud no puede estar vacío");

            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        } else {
            int id = objetoUpdate.getId();
            Objeto existingObjeto = objetoService.findById(id);

            if (existingObjeto == null) {
                Map<String, Object> map = new HashMap<>();
                map.put("error", "Objeto no encontrado");
                map.put("id", id);

                response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            } else {

                // Actualizar campos si están presentes
                if (objetoUpdate.getNombre_objeto() != null) {
                    existingObjeto.setNombre_objeto(objetoUpdate.getNombre_objeto());
                }
                if (objetoUpdate.getDescripcion() != null) {
                    existingObjeto.setDescripcion(objetoUpdate.getDescripcion());
                } 
                if (objetoUpdate.getMapBoxJSON() != null) {
                    existingObjeto.setMapBoxJSON(objetoUpdate.getMapBoxJSON());
                } 
                if (objetoUpdate.getImagen() != null) {
                    existingObjeto.setImagen(objetoUpdate.getImagen());
                }           
                if (objetoUpdate.getPeligrosidad() != null) {
                    existingObjeto.setPeligrosidad(objetoUpdate.getPeligrosidad());
                } 
                if (objetoUpdate.getZona() != null) {
                    existingObjeto.setZona(objetoUpdate.getZona());
                } 
                if (objetoUpdate.getTipoObjeto() != null) {
                    existingObjeto.setTipoObjeto(objetoUpdate.getTipoObjeto());
                } 

                Objeto objetoPut = objetoService.save(existingObjeto);

                Map<String, Object> map = new HashMap<>();
                map.put("mensaje", "Objeto actualizada con éxito");
                map.put("updatedObjeto", objetoPut);

                response = ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }

        return response;
    }


    // ****************************************************************************
    // DELETE
    // http://localhost:8080/roosevelt/api/objetos/16
    // ***************************************************************************    
    // SWAGGER
    @Operation(summary = "Eliminar Objeto por ID",
            description = "Elimina un Objeto especifico del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Objeto eliminado con éxito", content = @Content()),
        @ApiResponse(responseCode = "404", description = "Objeto no encontrado", content = @Content())
    })
    // ***************************************************************************    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteObjeto(@PathVariable int id) {

        ResponseEntity<Map<String, Object>> response;

        Objeto existingObjeto = objetoService.findById(id);
        if (existingObjeto == null) {
            Map<String, Object> map = new HashMap<>();
            map.put("error", "Objeto no encontrado");
            map.put("id", id);

            response = ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        } else {

            objetoService.deleteById(id);

            Map<String, Object> map = new HashMap<>();
            map.put("mensaje", "Objeto eliminado con éxito");
            map.put("deletedObjeto", existingObjeto);

            response = ResponseEntity.status(HttpStatus.OK).body(map);
        }
        return response;
    }
}




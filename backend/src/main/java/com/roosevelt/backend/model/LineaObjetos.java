package com.roosevelt.backend.model;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// LOMBOK
@AllArgsConstructor
@NoArgsConstructor
@Data

// SWAGGER
@Schema(description = "Modelo de LineaObjetos", name="LineaObjetos")

// JPA
@Entity
@Table(name = "lineas_objetos")

public class LineaObjetos implements Serializable{

    private static final long serialVersionUID = 1L;

    @Schema(description = "EmbeddedId del lineaObjetos. Se compone de Ruta y Objeto")
    @EmbeddedId
    private LineaObjetosId lineaObjetosId;
}

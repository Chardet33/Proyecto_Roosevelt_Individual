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
@Schema(description = "Modelo de LineaRutasFav", name="LineaRutasFav")

// JPA
@Entity
@Table(name = "lineas_rutas_fav")

public class LineaRutasFav implements Serializable{

    private static final long serialVersionUID = 1L;

    @Schema(description = "EmbeddedId del like. Se compone de Usuario y Ruta")
    @EmbeddedId
    private LineaRutasFavId lineaRutasFavId;
    
    // @Schema(description = "ID único del mensaje", example = "0")
    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // @Column(name = "id", nullable = false, unique = true) 
    // private int id;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_ruta", referencedColumnName = "id")
    // @JsonIgnoreProperties("rutas")  
    // private Ruta ruta;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    // @JsonIgnoreProperties("usuarios")  
    // private Usuario usuario;
}

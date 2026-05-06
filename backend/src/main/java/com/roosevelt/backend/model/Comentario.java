package com.roosevelt.backend.model;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// LOMBOK
@AllArgsConstructor
@NoArgsConstructor
@Data


// SWAGGER
@Schema(description = "Modelo de Comentario", name="Comentario")

// JPA
@Entity
@Table(name = "comentarios")

public class Comentario implements Serializable{

    private static final long serialVersionUID = 1L;

    @Schema(description = "ID único del comentario", example = "0")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true) 
    private int id;

    @Schema(description = "El comentario", example = "This is nice!")
    @NotBlank(message = "El comentario es obligatorios")
    @Size(min = 1, max = 200, message = "El comentario del pedido no pueden tener más de 300 caracteres")
    @Column(name = "comentario", nullable = false, unique = false)
    private String comentario;

    @Schema(description = "La fecha de publicación del comentario", example = "2015-01-11")
    @NotNull(message = "La fecha de publicación es obligatoria")
    @Column(name = "fecha_pub", nullable = false, unique = false)
    private LocalDate fecha_pub;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ruta", referencedColumnName = "id")
    @JsonIgnoreProperties("rutas")  
    private Ruta ruta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    @JsonIgnoreProperties("usuarios")  
    private Usuario usuario;
}
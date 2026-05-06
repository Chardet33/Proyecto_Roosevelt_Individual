package com.roosevelt.backend.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;


// LOMBOK
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "objetos")           // Excluir del toString para evitar recursividad
@EqualsAndHashCode(exclude = "objetos")  // Excluir de equals y hashCode para evitar recursividad

// SWAGGER
@Schema(description = "Modelo de TipoObjeto", name="TipoObjeto")

// JPA
@Entity
@Table(name = "tipos_objeto")

public class TipoObjeto implements Serializable{

    private static final long serialVersionUID = 1L;
    
    @Schema(description = "ID único del tipo_objeto", example = "0")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true) 
    private int id;

    @Schema(description = "El nombre_tipo del tipo_objeto", example = "Escalera")
    @NotBlank(message = "El nombre_tipo del tipo_objeto es obligatorio")
    @Size(min=1, max=30, message = "El nombre_tipo del tipo_objeto no puede tener más de 30 caracteres")
    @Column(name = "nombre_tipo", nullable = false, unique = true) 
    private String nombre_tipo;
    
    @Schema(description = "El icono del tipo_objeto", example = "./icono.png")
    @NotBlank(message = "El icono es obligatorio")
    @Size(min=1, max=50, message = "El icono no puede tener más de 50 caracteres")
    @Column(name = "icono", nullable = false, unique = false) 
    private String icono;

    @OneToMany(mappedBy = "tipoObjeto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("tipoObjeto")  
    private Set<Objeto> objetos = new HashSet<>();
}
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


//LOMBOK
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "rutas")           // Excluir del toString para evitar recursividad
@EqualsAndHashCode(exclude = "rutas")  // Excluir de equals y hashCode para evitar recursividad

// SWAGGER
@Schema(description = "Modelo de Zona", name="Zona")

// JPA
@Entity
@Table(name = "zonas")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Zona implements Serializable{

    private static final long serialVersionUID = 1L;
    
    @Schema(description = "ID único de la Zona", example = "0")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true) 
    private int id;

    @Schema(description = "El nombre de la Zona", example = "Castillo")
    @NotBlank(message = "El nombre de la Zona es obligatorio")
    @Size(min=1, max=50, message = "El nombre de la Zona no puede tener más de 50 caracteres")
    @Column(name = "nombre_zona", nullable = false, unique = false) 
    private String nombre_zona;

    @Schema(description = "JSON de MapBox de la Zona", example = "{coords: ...}}")
    @NotBlank(message = "JSON de MapBox de la Zona es obligatoria")
    @Size(min=1, max=300, message = "JSON de MapBox de la Zona no puede tener más de 300 caracteres")
    @Column(name = "mapbox_json", nullable = false, unique = false) 
    private String mapbox_json;

    @Schema(description = "La peligrosidad de la Zona", example = "Verde")
    @NotBlank(message = "La peligrosidad nombre de la Zona es obligatorio")
    @Size(min=1, max=20, message = "La peligrosidad de la Zona no puede tener más de 20 caracteres")
    @Column(name = "peligrosidad", nullable = false, unique = false) 
    private PeligrosidadEnum peligrosidad;

    @OneToMany(mappedBy = "zona", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("zona")  
    private Set<Ruta> rutas = new HashSet<>();
}

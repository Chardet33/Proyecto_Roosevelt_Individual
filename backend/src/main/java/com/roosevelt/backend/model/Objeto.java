package com.roosevelt.backend.model;

import java.io.Serializable;

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
@ToString(exclude = {"zona","tipoObjeto"}) // Excluir del toString para evitar recursividad
@EqualsAndHashCode(exclude = {"zona","tipoObjeto"}) // Excluir de equals y hashCode para evitar recursividad

// SWAGGER
@Schema(description = "Modelo de Objeto", name = "Objeto")

// JPA
@Entity
@Table(name = "objetos")

public class Objeto implements Serializable {

    public enum Peligrosidad {
        Verde,
        Amarillo,
        Rojo
    }

    private static final long serialVersionUID = 1L;

    @Schema(description = "ID único del Objeto", example = "0")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private int id;

    @Schema(description = "JSON de MapBox del Objeto", example = "{coords...}")
    @NotBlank(message = "JSON de MapBox del Objeto es obligatorio")
    @Size(min = 1, max = 300, message = "JSON de MapBox del Objeto no puede tener más de 300 caracteres")
    @Column(name = "mapbox_json", nullable = false, unique = false)
    private String mapBoxJSON;

    @Schema(description = "El nombre del Objeto", example = "Escalera de Castillo")
    @NotBlank(message = "El nombre del Objeto es obligatorio")
    @Size(min = 1, max = 50, message = "El nombre del Objeto no puede tener más de 50 caracteres")
    @Column(name = "nombre_objeto", nullable = false, unique = false)
    private String nombre_objeto;

    @Schema(description = "La descripcion del Objeto", example = "Escalera muy grande")
    @NotBlank(message = "La descripcion del Objeto es obligatorio")
    @Size(min = 1, max = 200, message = "La descripcion del Objeto no puede tener más de 200 caracteres")
    @Column(name = "descripcion", nullable = false, unique = false)
    private String descripcion;

    @Schema(description = "la imagen del Objeto", example = "./escalera_castillo.png")
    @NotBlank(message = "El directorio de la imagen del Objeto es obligatorio")
    @Size(min = 1, max = 50, message = "El directorio de la imagen del Objeto no puede tener más de 50 caracteres")
    @Column(name = "imagen", nullable = false, unique = false)
    private String imagen;

    @Schema(description = "La peligrosidad del Objeto", example = "Amarillo")
    @NotBlank(message = "La peligrosidad del Objeto es obligatorio")
    @Size(min = 1, max = 20, message = "La peligrosidad del Objeto no puede tener más de 20 caracteres")
    @Column(name = "peligrosidad", nullable = false, unique = false)
    private PeligrosidadEnum peligrosidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_zona", referencedColumnName = "id")
    @JsonIgnoreProperties("objetos")
    private Zona zona;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_objeto", referencedColumnName = "id")
    @JsonIgnoreProperties("objetos")
    private TipoObjeto tipoObjeto;
}

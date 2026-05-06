package com.roosevelt.backend.model;

import java.io.Serializable;
import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Schema(description = "Modelo de Mensaje", name = "Mensaje")

// JPA
@Entity
@Table(name = "mensajes")

public class Mensaje implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "ID único del mensaje", example = "0")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Integer id;

    @Schema(description = "El titulo del mensaje", example = "El Titulo")
    @NotBlank(message = "El titulo del mensaje es obligatorio")
    @Size(min = 1, max = 30, message = "El titulo del mensaje no puede tener más de 30 caracteres")
    @Column(name = "titulo", nullable = false, unique = false)
    private String titulo;

    @Schema(description = "El mensaje del usuario", example = "Mi Mensaje")
    @NotBlank(message = "El mensaje es obligatorio")
    @Size(min = 1, max = 300, message = "El mensaje no puede tener más de 300 caracteres")
    @Column(name = "mensaje", nullable = false, unique = false)
    private String mensaje;

    @Schema(description = "El nombre del usuario", example = "user@balmis.com")
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 1, max = 50, message = "El nombre no puede tener más de 100 caracteres")
    @Column(name = "nombre", nullable = false, unique = false)
    private String nombre;

    @Schema(description = "El email del usuario", example = "user@balmis.com")
    @NotBlank(message = "El email es obligatorio")
    @Size(min = 1, max = 100, message = "El email no puede tener más de 100 caracteres")
    @Column(name = "email", nullable = false, unique = false)
    private String email;

    @Schema(description = "El telefono del usuario", example = "644 822 333")
    @NotBlank(message = "El telefono es obligatorio")
    @Size(min = 1, max = 15, message = "El telefono no puede tener más de 100 caracteres")
    @Column(name = "tel", nullable = false, unique = false)
    private String tel;

    @Schema(description = "La fecha del mensaje", example = "2015-11-01")
    @NotNull(message = "La fecha es obligatoria")
    @Column(name = "fecha_pub", nullable = false, unique = false)
    private LocalDate fecha_pub;
}

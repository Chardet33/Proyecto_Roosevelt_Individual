package com.roosevelt.backend.model;

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
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

// LOMBOK
@AllArgsConstructor         // => Constructor con todos los argumentos
@NoArgsConstructor          // => Constructor sin argumentos
@Data                       // => @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor
@ToString(exclude = "misRutas")           // Excluir del toString para evitar recursividad
@EqualsAndHashCode(exclude = "misRutas")  // Excluir de equals y hashCode para evitar recursividad


// JPA
@Entity
@Table(name = "usuarios")

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 

public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L; 
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true) 
    private Integer id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min=1, max=50, message = "El nombre no puede tener más de 50 caracteres")
    @Column(name = "username", nullable = false, unique = false) 
    private String username;

    @NotBlank(message = "El email es obligatorio")
    @Size(min=1, max=100, message = "El email no puede tener más de 100 caracteres")
    @Column(name = "email", nullable = false, unique = true) 
    private String email;

    @NotBlank(message = "El password es obligatorio")
    @Column(name = "password", nullable = false, unique = false) 
    private String password;


    @NotBlank(message = "El email es obligatorio")
    @Size(min=1, max=100, message = "El email no puede tener más de 100 caracteres")
    @Column(name = "email_sec", nullable = false, unique = true) 
    private String email_sec;
   
    @Column(name = "administrador", nullable = false, unique = false) 
    private boolean administrador;
    @Size(max = 15)
    @Column(length = 15)
    private String tel;

    @Column(name = "fecha_nac")
    private LocalDate fechaNac;

    @Size(max = 50)
    @Column(length = 50)
    private String foto;

    @OneToMany(mappedBy = "usuario_autor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("usuario_autor")  
    private Set<Ruta> misRutas = new HashSet<>();
}

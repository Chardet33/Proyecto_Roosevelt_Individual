package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.Mensaje;

public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {

    // Buscar - Todos
    @Query(value = "SELECT * FROM mensajes", nativeQuery = true)
    List<Mensaje> findSqlAll();

    // Buscar - Por ID
    @Query(value = "SELECT * FROM mensajes WHERE id = :id", nativeQuery = true)
    Mensaje findSqlByIdMensaje(@Param("id") Integer id);

    // Buscar - Por Titulo de Mensaje
    @Query(value = "SELECT * FROM mensajes WHERE LOWER(titulo) LIKE LOWER(CONCAT('%',:titulo,'%'))", nativeQuery = true)
    List<Mensaje> findSqlByTitulo(@Param("titulo") String titulo);

    // Buscar - Por Email de Mensaje
    @Query(value = "SELECT * FROM mensajes WHERE LOWER(email) LIKE LOWER(CONCAT('%',:email,'%'))", nativeQuery = true)
    List<Mensaje> findSqlByEmail(@Param("email") String email);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM mensajes", nativeQuery = true)
    Long countSql();
}

package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.roosevelt.backend.model.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    
    // Buscar - Todos
    @Query(value = "SELECT * FROM comentarios", nativeQuery = true)
    List<Comentario> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM comentarios WHERE id = :id", nativeQuery = true)
    Comentario findSqlByIdComentario(@Param("id") int id);

    // Buscar - Por ID de Ruta
    @Query(value = "SELECT * FROM comentarios WHERE id_ruta = :id_ruta", nativeQuery = true)
    List<Comentario> findSqlByIdRuta(@Param("id_ruta") int id_ruta);

    // Buscar - Por ID de Usuario
    @Query(value = "SELECT * FROM comentarios WHERE id_usuario = :id_usuario", nativeQuery = true)
    List<Comentario> findSqlByIdUsuario(@Param("id_usuario") int id_usuario);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM comentarios", nativeQuery = true)
    Long countSql();    
}
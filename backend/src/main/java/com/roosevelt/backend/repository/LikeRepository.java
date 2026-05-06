package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.Like;
import com.roosevelt.backend.model.LikeId;

public interface LikeRepository extends JpaRepository<Like, LikeId> {
    
  // Buscar - Todos
    @Query(value = "SELECT * FROM likes", nativeQuery = true)
    List<Like> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM likes WHERE id_usuario = :id_usuario AND id_ruta = :id_ruta", nativeQuery = true)
    Like findSqlByIdLike(@Param("id_usuario") int id_usuario, @Param("id_ruta") int id_ruta);

    // Buscar - Por ID de Ruta
    @Query(value = "SELECT * FROM likes WHERE id_ruta = :id_ruta", nativeQuery = true)
    List<Like> findSqlByIdRuta(@Param("id_ruta") int id_ruta);

    // Buscar - Por ID de Usuario
    @Query(value = "SELECT * FROM likes WHERE id_usuario = :id_usuario", nativeQuery = true)
    List<Like> findSqlByIdUsuario(@Param("id_usuario") int id_usuario);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM likes", nativeQuery = true)
    Long countSql(); 
}

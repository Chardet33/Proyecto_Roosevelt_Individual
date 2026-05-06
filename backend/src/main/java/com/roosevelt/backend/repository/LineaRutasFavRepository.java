package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.LineaRutasFav;
import com.roosevelt.backend.model.LineaRutasFavId;
import com.roosevelt.backend.model.Ruta;

public interface LineaRutasFavRepository extends JpaRepository<LineaRutasFav, LineaRutasFavId> {
    
  // Buscar - Todos
    @Query(value = "SELECT * FROM lineas_rutas_fav", nativeQuery = true)
    List<LineaRutasFav> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM lineas_rutas_fav WHERE id_usuario = :id_usuario AND id_ruta = :id_ruta", nativeQuery = true)
    LineaRutasFav findSqlById(@Param("id_usuario") int id_usuario, @Param("id_ruta") int id_ruta);

    // Buscar - Por ID de Usuario
    @Query(value = "SELECT * FROM lineas_rutas_fav WHERE id_usuario = :id_usuario", nativeQuery = true)
    List<LineaRutasFav> findSqlByIdUsuario(@Param("id_usuario") int id_usuario);

    // Buscar Rutas - Por ID de Usuario
    @Query(value = "SELECT rutas.* FROM (lineas_rutas_fav INNER JOIN rutas ON lineas_rutas_fav.id_ruta = rutas.id) WHERE lineas_rutas_fav.id_usuario = :id_usuario", nativeQuery = true)
    List<Ruta> findSqlRutasByIdUsuario(@Param("id_usuario") int id_usuario);

    // Buscar - Por ID de Ruta
    @Query(value = "SELECT * FROM lineas_rutas_fav WHERE id_ruta = :id_ruta", nativeQuery = true)
    List<LineaRutasFav> findSqlByIdRuta(@Param("id_ruta") int id_ruta);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM lineas_rutas_fav", nativeQuery = true)
    Long countSql(); 
}

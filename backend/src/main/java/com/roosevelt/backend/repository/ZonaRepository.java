package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.Zona;

public interface ZonaRepository extends JpaRepository<Zona, Integer> {

    // Buscar - Todos
    @Query(value = "SELECT * FROM zonas", nativeQuery = true)
    List<Zona> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM zonas WHERE id = :id", nativeQuery = true)
    Zona findSqlByIdZona(@Param("id") int id);

    // Buscar - Por Peligrosidad
    @Query(value = "SELECT * FROM zonas WHERE peligrosidad = :peligrosidad", nativeQuery = true)
    Zona findSqlByPeligrosidad(@Param("peligrosidad") String peligrosidad);

    // Buscar - Por Nombre de Zona
    @Query(value = "SELECT * FROM zonas WHERE LOWER(nombre_zona) LIKE LOWER(CONCAT('%',:nombre_zona,'%'))", nativeQuery = true)
    List<Zona> findSqlByNombreZona(@Param("nombre_zona") String nombre_zona);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM zonas", nativeQuery = true)
    Long countSql();    
}

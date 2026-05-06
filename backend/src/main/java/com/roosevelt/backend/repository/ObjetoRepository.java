package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.Objeto;

public interface ObjetoRepository extends JpaRepository<Objeto, Integer> {
    
    // Buscar - Todos
    @Query(value = "SELECT * FROM objetos", nativeQuery = true)
    List<Objeto> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM objetos WHERE id = :id", nativeQuery = true)
    Objeto findSqlByIdObjeto(@Param("id") int id);

    // Buscar - Por ID de Zona
    @Query(value = "SELECT * FROM objetos WHERE id_zona = :id_zona", nativeQuery = true)
    List<Objeto> findSqlByIdZona(@Param("id_zona") int id_zona);

    // Buscar - Por ID de TipoObjeto
    @Query(value = "SELECT * FROM objetos WHERE id_tipo_objeto = :id_tipo_objeto", nativeQuery = true)
    List<Objeto> findSqlByIdTipoObjeto(@Param("id_tipo_objeto") int id_tipo_objeto);

    // Buscar - Por Peligrosidad
    @Query(value = "SELECT * FROM objetos WHERE peligrosidad = :peligrosidad", nativeQuery = true)
    List<Objeto> findSqlByPeligrosidad(@Param("peligrosidad") String peligrosidad);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM objetos", nativeQuery = true)
    Long countSql();    
}

package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.LineaObjetos;
import com.roosevelt.backend.model.LineaObjetosId;
import com.roosevelt.backend.model.Objeto;

public interface LineaObjetosRepository extends JpaRepository<LineaObjetos, LineaObjetosId> {
    
  // Buscar - Todos
    @Query(value = "SELECT * FROM likes", nativeQuery = true)
    List<LineaObjetos> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM lineas_objetos WHERE id_ruta = :id_ruta AND id_objeto = :id_objeto", nativeQuery = true)
    LineaObjetos findSqlById(@Param("id_ruta") int id_ruta, @Param("id_objeto") int id_objeto);

    // Buscar Objetos - Por ID de Ruta
    @Query(value = "SELECT objetos.* FROM (lineas_objetos INNER JOIN objetos ON lineas_objetos.id_objeto = objetos.id) WHERE lineas_objetos.id_ruta = :id_ruta", nativeQuery = true)
    List<Objeto> findSqlObjetosDeRuta(@Param("id_ruta") int id_ruta);

    // Buscar - Por ID de Ruta
    @Query(value = "SELECT * FROM lineas_objetos WHERE id_ruta = :id_ruta", nativeQuery = true)
    List<LineaObjetos> findSqlByIdRuta(@Param("id_ruta") int id_ruta);

    // Buscar - Por ID de Objeto
    @Query(value = "SELECT * FROM lineas_objetos WHERE id_objeto = :id_objeto", nativeQuery = true)
    List<LineaObjetos> findSqlByIdObjeto(@Param("id_objeto") int id_objeto);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM lineas_objetos", nativeQuery = true)
    Long countSql(); 
}

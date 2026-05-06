package com.roosevelt.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.Ruta;

public interface RutaRepository extends JpaRepository<Ruta, Integer> {
    
    // Buscar - Todos
    @Query(value = "SELECT * FROM rutas", nativeQuery = true)
    List<Ruta> findSqlAll();
    
    // Buscar - Por ID
    @Query(value = "SELECT * FROM rutas WHERE id = :id", nativeQuery = true)
    Ruta findSqlByIdRuta(@Param("id") int id);

    // Buscar - Por ID del Usuario
    @Query(value = "SELECT * FROM rutas WHERE id_usuario_autor = :id_usuario_autor", nativeQuery = true)
    List<Ruta> findSqlByIdUsuario(@Param("id_usuario_autor") int id_usuario_autor);

    // Buscar - Por ID de la Zona
    @Query(value = "SELECT * FROM rutas WHERE id_zona = :id_zona", nativeQuery = true)
    List<Ruta> findSqlByIdZona(@Param("id_zona") int id_zona);

    // Buscar - Por Nombre de la Ruta
    @Query(value = "SELECT * FROM rutas WHERE LOWER(nombre_ruta) LIKE LOWER(CONCAT('%',:nombre_ruta,'%'))", nativeQuery = true)
    List<Ruta> findSqlByNombreRuta(@Param("nombre_ruta") String nombre_ruta);

    // Buscar - Por Tipo
    // @Query(value = "SELECT * FROM rutas WHERE LOWER(:tipos) LIKE LOWER(CONCAT('%', (SELECT tipos_objeto.nombre_tipo ((tipos_objeto INNER JOIN objetos ON tipos_objeto.id = objetos.id_tipo_objeto) INNER JOIN lineas_objetos ON objetos.id = lineas_objetos.id_objeto) INNER JOIN rutas ON lineas_objetos.id_ruta = rutas.id), '%'))", nativeQuery = true)
    // List<Ruta> findSqlByType(@Param("tipos") String tipos);

    // Buscar - Contar todos
    @Query(value = "SELECT COUNT(*) as cantidad FROM rutas", nativeQuery = true)
    Long countSql();    

    // Buscar - Ruta mas popular
    @Query(value = "SELECT * FROM rutas WHERE likes_count = (SELECT MAX(likes_count) FROM rutas)", nativeQuery = true)
    Ruta findSqlMasPopular();
}

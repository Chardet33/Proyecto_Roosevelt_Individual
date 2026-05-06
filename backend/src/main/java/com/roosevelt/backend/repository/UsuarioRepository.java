package com.roosevelt.backend.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.roosevelt.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // ****************************
    // Métodos HEREDADOS
    // ****************************
    /*
        findAll()
        findById(id)

        count()
        delete(User)
        deleteById(id)
        deleteAll()

        equals(User)
        exist(User)
        existById(id)
     */
    
    // **********************************************************
    // Obtener datos (find y count)
    // **********************************************************

    // Consulta con DQM 
    Optional<Usuario> findByUsername(String username);
    
    // Consulta con SQL 
    @Query(value = "SELECT * FROM usuarios", nativeQuery = true)
    public
    List<Usuario> findSqlAll();
    
    // Consulta con SQL 
    @Query(value = "SELECT * FROM usuarios WHERE id = :id", nativeQuery = true)
    public
    Usuario findSqlById(@Param("id") Integer id);

    // Consulta con SQL 
    @Query(value = "SELECT COUNT(*) as cantidad FROM usuarios", nativeQuery = true)
    Long countSql();

    boolean existsById(Integer id);

    void deleteById(Integer id);

    Optional<Usuario> findById(Integer id);    
    
    
    // **********************************************************
    // Actualizaciones
    // **********************************************************
    
    // ****************************
    // Métodos HEREDADOS
    // ****************************
    /*
        delete(User)
        deleteById(id)
        deleteAll()

        save(User)
     */    
    
}

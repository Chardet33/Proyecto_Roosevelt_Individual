package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Ruta;
import com.roosevelt.backend.repository.RutaRepository;

@Service
public class RutaService {

    @Autowired
    public RutaRepository rutaRepository;


    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<Ruta> findAll(){
        return rutaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Ruta findByIdRuta(int id){
        return rutaRepository.findSqlByIdRuta(id);
    }

    @Transactional(readOnly = true)
    public List<Ruta> findByIdZona(int id_zona){
        return rutaRepository.findSqlByIdZona(id_zona);
    }

    @Transactional(readOnly = true)
    public List<Ruta> findByIdUsuario(int id_user){
        return rutaRepository.findSqlByIdUsuario(id_user);
    }

    @Transactional(readOnly = true)
    public List<Ruta> findByNombreRuta(String nombre_ruta){
        return rutaRepository.findSqlByNombreRuta(nombre_ruta);
    }

    // @Transactional(readOnly = true)
    // public List<Ruta> findByType(String tipo){
    //     return rutaRepository.findSqlByType(tipo);
    // }

    @Transactional(readOnly = true)
    public Ruta findMasPopular(){
        return rutaRepository.findSqlMasPopular();
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return rutaRepository.count();
    }

    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public Ruta save(Ruta ruta) {
        return rutaRepository.save(ruta);
    }


    @Transactional
    public Ruta update(int id, Ruta rutaDetails) {
        Ruta ruta = rutaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ruta no encontrada"));
        
        if (rutaDetails.getNombreRuta() != null) {
            ruta.setNombreRuta(rutaDetails.getNombreRuta());
        }
        if (rutaDetails.getMapboxJSON() != null) {
            ruta.setMapboxJSON(rutaDetails.getMapboxJSON());
        }
        if (rutaDetails.getDescripcion() != null) {
            ruta.setDescripcion(rutaDetails.getDescripcion());
        }
        if (rutaDetails.getFecha_pub() != null) {
            ruta.setFecha_pub(rutaDetails.getFecha_pub());
        }
        if (rutaDetails.getLikesCount() > 0) {
            ruta.setLikesCount(rutaDetails.getLikesCount());
        }
        if (rutaDetails.getZona() != null) {
            ruta.setZona(rutaDetails.getZona());
        }
        if (rutaDetails.getUsuario_autor() != null) {
            ruta.setUsuario_autor(rutaDetails.getUsuario_autor());
        }
    
        return rutaRepository.save(ruta);
    }
    
    @Transactional
    public void deleteById(int id) {
        if (!rutaRepository.existsById(id)) {
            throw new RuntimeException("Ruta no encontrada");
        }
        rutaRepository.deleteById(id);
    }
}
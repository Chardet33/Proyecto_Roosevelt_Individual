package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Zona;
import com.roosevelt.backend.repository.ZonaRepository;

@Service
public class ZonaService {

    @Autowired
    public ZonaRepository zonaRepository;


    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<Zona> findAll(){
        return zonaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Zona findById(int id){
        return zonaRepository.findSqlByIdZona(id);
    }

    @Transactional(readOnly = true)
    public Zona findByPeligrosidad(String peligrosidad){
        return zonaRepository.findSqlByPeligrosidad(peligrosidad);
    }

    @Transactional(readOnly = true)
    public List<Zona> findByNombreZona(String nombre_zona){
        return zonaRepository.findSqlByNombreZona(nombre_zona);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return zonaRepository.count();
    }

    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public Zona save(Zona zona) {
        return zonaRepository.save(zona);
    }

    @Transactional
    public Zona update(int id, Zona zonaDetails) {
        Zona zona = zonaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Zona no encontrada"));
        
        if (zonaDetails.getNombre_zona() != null) {
            zona.setNombre_zona(zonaDetails.getNombre_zona());
        }
        if (zonaDetails.getMapbox_json() != null) {
            zona.setMapbox_json(zonaDetails.getMapbox_json());
        }
        if (zonaDetails.getPeligrosidad() != null) {
            zona.setPeligrosidad(zonaDetails.getPeligrosidad());
        }
        
        return zonaRepository.save(zona);
    }
    
    @Transactional
    public void deleteById(int id) {
        if (!zonaRepository.existsById(id)) {
            throw new RuntimeException("Zona no encontrada");
        }
        zonaRepository.deleteById(id);
    }
}

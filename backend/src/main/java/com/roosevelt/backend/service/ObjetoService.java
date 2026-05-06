package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Objeto;
import com.roosevelt.backend.repository.ObjetoRepository;

@Service
public class ObjetoService {
    

    @Autowired
    public ObjetoRepository objetoRepository;

    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<Objeto> findAll(){
        return objetoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Objeto findById(int id){
        return objetoRepository.findSqlByIdObjeto(id);
    }

    @Transactional(readOnly = true)
    public List<Objeto> findByIdZona(int id_zona){
        return objetoRepository.findSqlByIdZona(id_zona);
    }

    @Transactional(readOnly = true)
    public List<Objeto> findByIdTipoObjeto(int id_tipo_objeto){
        return objetoRepository.findSqlByIdTipoObjeto(id_tipo_objeto);
    }

    @Transactional(readOnly = true)
    public List<Objeto> findByPeligrosidad(String peligrosidad){
        return objetoRepository.findSqlByPeligrosidad(peligrosidad);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return objetoRepository.count();
    }
    
    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public Objeto save(Objeto objeto) {
        return objetoRepository.save(objeto);
    }


    @Transactional
    public Objeto update(int id, Objeto objetoDetails) {
        Objeto objeto = objetoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Objeto no encontrado"));
        
        if (objetoDetails.getNombre_objeto() != null) {
            objeto.setNombre_objeto(objetoDetails.getNombre_objeto());
        }
        if (objetoDetails.getDescripcion() != null) {
            objeto.setDescripcion(objetoDetails.getDescripcion());
        }
        if (objetoDetails.getMapBoxJSON() != null) {
            objeto.setMapBoxJSON(objetoDetails.getMapBoxJSON());
        }
        if (objetoDetails.getImagen() != null) {
            objeto.setImagen(objetoDetails.getImagen());
        }
        if (objetoDetails.getPeligrosidad() != null) {
            objeto.setPeligrosidad(objetoDetails.getPeligrosidad());
        }
        if (objetoDetails.getImagen() != null) {
            objeto.setImagen(objetoDetails.getImagen());
        }
        if (objetoDetails.getTipoObjeto() != null) {
            objeto.setTipoObjeto(objetoDetails.getTipoObjeto());
        }

        return objetoRepository.save(objeto);
    }
    
    @Transactional
    public void deleteById(int id) {
        if (!objetoRepository.existsById(id)) {
            throw new RuntimeException("Objeto no encontrado");
        }
        objetoRepository.deleteById(id);
    }
}
package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.LineaObjetos;
import com.roosevelt.backend.model.LineaObjetosId;
import com.roosevelt.backend.model.Objeto;
import com.roosevelt.backend.repository.LineaObjetosRepository;

@Service
public class LineaObjetosService {
    
    @Autowired
    public LineaObjetosRepository lineaObjetosRepository;

    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<LineaObjetos> findAll(){
        return lineaObjetosRepository.findAll();
    }

    @Transactional(readOnly = true)
    public LineaObjetos findById(int id_ruta, int id_objeto){
        return lineaObjetosRepository.findSqlById(id_ruta, id_objeto);
    }

    @Transactional(readOnly = true)
    public List<LineaObjetos> findByRutaId(int id){
        return lineaObjetosRepository.findSqlByIdRuta(id);
    }

    @Transactional(readOnly = true)
    public List<LineaObjetos> findByObjetoId(int id){
        return lineaObjetosRepository.findSqlByIdObjeto(id);
    }

    @Transactional(readOnly = true)
    public List<Objeto> findObjetosByIdRuta(int id_ruta){
        return lineaObjetosRepository.findSqlObjetosDeRuta(id_ruta);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return lineaObjetosRepository.count();
    }
    
    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public LineaObjetos save(LineaObjetos lineaObjetos) {
        return lineaObjetosRepository.save(lineaObjetos);
    }


    @Transactional
    public LineaObjetos update(LineaObjetosId id, LineaObjetos lineaObjetosDetails) {
        LineaObjetos lineaObjetos = lineaObjetosRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("LineaObjetos no encontrado"));
        
        if (lineaObjetosDetails.getLineaObjetosId() != null) {
            lineaObjetos.setLineaObjetosId(lineaObjetosDetails.getLineaObjetosId());
        }
        return lineaObjetosRepository.save(lineaObjetos);
    }
    
    @Transactional
    public void deleteById(LineaObjetosId id) {
        if (!lineaObjetosRepository.existsById(id)) {
            throw new RuntimeException("LineaObjetos no encontrado");
        }
        lineaObjetosRepository.deleteById(id);
    }
}
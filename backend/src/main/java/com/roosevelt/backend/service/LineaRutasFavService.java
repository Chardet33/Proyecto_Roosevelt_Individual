package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.LineaRutasFav;
import com.roosevelt.backend.model.LineaRutasFavId;
import com.roosevelt.backend.model.Ruta;
import com.roosevelt.backend.repository.LineaRutasFavRepository;

@Service
public class LineaRutasFavService {
    
    @Autowired
    public LineaRutasFavRepository lineaRutasFavRepository;

    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<LineaRutasFav> findAll(){
        return lineaRutasFavRepository.findAll();
    }

    @Transactional(readOnly = true)
    public LineaRutasFav findById(int id_usuario, int id_ruta){
        return lineaRutasFavRepository.findSqlById(id_usuario, id_ruta);
    }

    @Transactional(readOnly = true)
    public List<LineaRutasFav> findByRutaId(int id){
        return lineaRutasFavRepository.findSqlByIdRuta(id);
    }

    @Transactional(readOnly = true)
    public List<LineaRutasFav> findByUsuarioId(int id){
        return lineaRutasFavRepository.findSqlByIdUsuario(id);
    }

    @Transactional(readOnly = true)
    public List<Ruta> findRutasByIdUsuario(int id_usuario){
        return lineaRutasFavRepository.findSqlRutasByIdUsuario(id_usuario);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return lineaRutasFavRepository.count();
    }
    
    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public LineaRutasFav save(LineaRutasFav lineaRutasFav) {
        return lineaRutasFavRepository.save(lineaRutasFav);
    }


    @Transactional
    public LineaRutasFav update(LineaRutasFavId id, LineaRutasFav lineaRutasFavDetails) {
        LineaRutasFav LineaRutasFav = lineaRutasFavRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("LineaRutasFav no encontrado"));
        
        if (lineaRutasFavDetails.getLineaRutasFavId() != null) {
            LineaRutasFav.setLineaRutasFavId(lineaRutasFavDetails.getLineaRutasFavId());
        }
        return lineaRutasFavRepository.save(LineaRutasFav);
    }
    
    @Transactional
    public void deleteById(LineaRutasFavId id) {
        if (!lineaRutasFavRepository.existsById(id)) {
            throw new RuntimeException("LineaRutasFav no encontrado");
        }
        lineaRutasFavRepository.deleteById(id);
    }
}
package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Comentario;
import com.roosevelt.backend.repository.ComentarioRepository;

@Service
public class ComentarioService {
    

    @Autowired
    public ComentarioRepository comentarioRepository;

    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<Comentario> findAll(){
        return comentarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Comentario findById(int id){
        return comentarioRepository.findSqlByIdComentario(id);
    }

    @Transactional(readOnly = true)
    public List<Comentario> findByRutaId(int id){
        return comentarioRepository.findSqlByIdRuta(id);
    }

    @Transactional(readOnly = true)
    public List<Comentario> findByUsuarioId(int id){
        return comentarioRepository.findSqlByIdUsuario(id);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return comentarioRepository.count();
    }
    
    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public Comentario save(Comentario categoria) {
        return comentarioRepository.save(categoria);
    }


    @Transactional
    public Comentario update(int id, Comentario comentarioDetails) {
        Comentario comentario = comentarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Comentario no encontrado"));
        
        if (comentarioDetails.getComentario() != null) {
            comentario.setComentario(comentarioDetails.getComentario());
        }
        if (comentarioDetails.getFecha_pub() != null) {
            comentario.setFecha_pub(comentarioDetails.getFecha_pub());
        }
        if (comentarioDetails.getRuta() != null) {
            comentario.setRuta(comentarioDetails.getRuta());
        }
        if (comentarioDetails.getUsuario() != null) {
            comentario.setUsuario(comentarioDetails.getUsuario());
        }
        return comentarioRepository.save(comentario);
    }
    
    @Transactional
    public void deleteById(int id) {
        if (!comentarioRepository.existsById(id)) {
            throw new RuntimeException("Comentario no encontrado");
        }
        comentarioRepository.deleteById(id);
    }
}

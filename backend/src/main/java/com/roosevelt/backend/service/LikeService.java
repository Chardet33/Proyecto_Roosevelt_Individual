package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Like;
import com.roosevelt.backend.model.LikeId;
import com.roosevelt.backend.repository.LikeRepository;

@Service
public class LikeService {
    
    @Autowired
    public LikeRepository likeRepository;

    // ************************
    // CONSULTAS
    // ************************ 
    @Transactional(readOnly = true)
    public List<Like> findAll(){
        return likeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Like findById(int id_usuario, int id_ruta){
        return likeRepository.findSqlByIdLike(id_usuario, id_ruta);
    }

    @Transactional(readOnly = true)
    public List<Like> findByRutaId(int id){
        return likeRepository.findSqlByIdRuta(id);
    }

    @Transactional(readOnly = true)
    public List<Like> findByUsuarioId(int id){
        return likeRepository.findSqlByIdUsuario(id);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return likeRepository.count();
    }
    
    // ************************
    // ACTUALIZACIONES
    // ************************ 
    @Transactional
    public Like save(Like like) {
        return likeRepository.save(like);
    }


    @Transactional
    public Like update(LikeId id, Like likeDetails) {
        Like Like = likeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Like no encontrado"));
        
        if (likeDetails.getLikeId() != null) {
            Like.setLikeId(likeDetails.getLikeId());
        }
        return likeRepository.save(Like);
    }
    
    @Transactional
    public void deleteById(LikeId id) {
        if (!likeRepository.existsById(id)) {
            throw new RuntimeException("Like no encontrado");
        }
        likeRepository.deleteById(id);
    }
}
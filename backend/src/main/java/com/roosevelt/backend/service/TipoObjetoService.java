package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.TipoObjeto;
import com.roosevelt.backend.repository.TipoObjetoRepository;

@Service
public class TipoObjetoService {

    @Autowired
    public TipoObjetoRepository tipoObjetoRepository;

    // ************************
    // CONSULTAS
    // ************************
    @Transactional(readOnly = true)
    public List<TipoObjeto> findAll() {
        return tipoObjetoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public TipoObjeto findById(int id) {
        return tipoObjetoRepository.findSqlByIdTipoObjeto(id);
        
    }

    @Transactional(readOnly = true)
    public Long count() {
        return tipoObjetoRepository.count();
    }

    // ************************
    // ACTUALIZACIONES
    // ************************
    @Transactional
    public TipoObjeto save(TipoObjeto tipoObjeto) {
        return tipoObjetoRepository.save(tipoObjeto);
    }

    @Transactional
    public TipoObjeto update(int id, TipoObjeto tipoObjetoDetails) {
        TipoObjeto tipoObjeto = tipoObjetoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TipoObjeto no encontrado"));

        if (tipoObjetoDetails.getNombre_tipo() != null) {
            tipoObjeto.setNombre_tipo(tipoObjetoDetails.getNombre_tipo());
        }
        if (tipoObjetoDetails.getIcono() != null) {
            tipoObjeto.setIcono(tipoObjetoDetails.getIcono());
        }

        return tipoObjetoRepository.save(tipoObjeto);
    }

    @Transactional
    public void deleteById(int id) {
        if (!tipoObjetoRepository.existsById(id)) {
            throw new RuntimeException("TipoObjeto no encontrado");
        }
        tipoObjetoRepository.deleteById(id);
    }
}
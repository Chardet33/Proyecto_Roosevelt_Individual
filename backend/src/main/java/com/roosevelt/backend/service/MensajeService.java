package com.roosevelt.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Mensaje;
import com.roosevelt.backend.repository.MensajeRepository;

@Service
public class MensajeService {
    @Autowired
    public MensajeRepository mensajeRepository;

    // ************************
    // CONSULTAS
    // ************************
    @Transactional(readOnly = true)
    public List<Mensaje> findAll() {
        return mensajeRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Mensaje findById(Integer id) {
        return mensajeRepository.findSqlByIdMensaje(id);
    }

    @Transactional(readOnly = true)
    public List<Mensaje> findByTitulo(String titulo) {
        return mensajeRepository.findSqlByTitulo(titulo);
    }

    @Transactional(readOnly = true)
    public List<Mensaje> findByEmail(String email) {
        return mensajeRepository.findSqlByEmail(email);
    }

    @Transactional(readOnly = true)
    public Long count() {
        return mensajeRepository.count();
    }

    // ************************
    // ACTUALIZACIONES
    // ************************
    @Transactional
    public Mensaje save(Mensaje mensaje) {
        return mensajeRepository.save(mensaje);
    }

    @Transactional
    public Mensaje update(Integer id, Mensaje mensajeDetails) {
        Mensaje mensaje = mensajeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensaje no encontrado"));

        if (mensajeDetails.getMensaje() != null) {
            mensaje.setMensaje(mensajeDetails.getMensaje());
        }
        if (mensajeDetails.getTitulo() != null) {
            mensaje.setTitulo(mensajeDetails.getTitulo());
        }
        if (mensajeDetails.getNombre() != null) {
            mensaje.setNombre(mensajeDetails.getNombre());
        }
        if (mensajeDetails.getEmail() != null) {
            mensaje.setEmail(mensajeDetails.getEmail());
        }
        if (mensajeDetails.getTel() != null) {
            mensaje.setTel(mensajeDetails.getTel());
        }
        if (mensajeDetails.getFecha_pub() != null) {
            mensaje.setFecha_pub(mensajeDetails.getFecha_pub());
        }

        return mensajeRepository.save(mensaje);
    }

    @Transactional
    public void deleteById(Integer id) {
        if (!mensajeRepository.existsById(id)) {
            throw new RuntimeException("Mensaje no encontrado");
        }
        mensajeRepository.deleteById(id);
    }
}

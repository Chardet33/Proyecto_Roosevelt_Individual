package com.roosevelt.backend.service;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.roosevelt.backend.model.Usuario;
import com.roosevelt.backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service

public class UsuarioService {
    @Autowired
    public UsuarioRepository userRepository;

   @Autowired
    private PasswordEncoder passwordEncoder;
    // ************************
    // CONSULTAS
    // ************************  
    @Transactional(readOnly = true) 
    public List<Usuario> findAll() {
        return userRepository.findSqlAll();
    }
    
    @Transactional(readOnly = true) 
    public Usuario findById(Integer id) {
        return userRepository.findSqlById(id);
    }

    @Transactional(readOnly = true) 
    public Long count() {
        return userRepository.count();
    }    
    
    // ************************
    // ACTUALIZACIONES
    // ************************  
    @Transactional
    public Usuario save(Usuario user) {
        String encodePassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        return userRepository.save(user);
    }
    @Transactional
    public Usuario update(Integer id, Usuario userUpdate) {
        Usuario usuario = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        if (userUpdate.getUsername() != null) {
            usuario.setUsername(userUpdate.getUsername());
        }
        if (userUpdate.getEmail() != null) {
            usuario.setEmail(userUpdate.getEmail());
        }
        if (userUpdate.getPassword() != null) {
            usuario.setPassword(userUpdate.getPassword());
        }
        usuario.setAdministrador(userUpdate.isAdministrador());
        
        return userRepository.save(usuario);
    }
    
    @Transactional
    public void deleteById(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }        
}

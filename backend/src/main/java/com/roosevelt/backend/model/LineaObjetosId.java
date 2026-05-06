package com.roosevelt.backend.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class LineaObjetosId implements Serializable{

    @ManyToOne
    @JoinColumn(name = "id_ruta", referencedColumnName = "id")
    private Ruta ruta;

    @ManyToOne
    @JoinColumn(name = "id_objeto", referencedColumnName = "id")
    private Objeto objeto;


    // Getters & Setters
    public Ruta getRuta(){
        return this.ruta;
    }

    public void setRuta(Ruta ruta){
        this.ruta = ruta;
    }

    public Objeto getObjeto(){
        return this.objeto;
    }

    public void setUsuario(Objeto objeto){
        this.objeto = objeto;
    }
}
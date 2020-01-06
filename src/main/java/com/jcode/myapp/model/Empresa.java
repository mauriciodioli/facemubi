/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.model;

/**
 *
 * @author Mauricio
 */
public class Empresa {

    private Integer idempresa;
    private String nombreempresa;
    private String direccionempresa;
    private long telefonoempresa;
    private String categoriaempresa;

    public String getCategoriaempresa() {
        return categoriaempresa;
    }

    public void setCategoriaempresa(String categoriaempresa) {
        this.categoriaempresa = categoriaempresa;
    }
    private String imagenfrente;
    private String logoticket;
    private String logoempresa;
    private String ip;

    public Empresa() {
    }

    public Empresa(Integer idempresa) {
        this.idempresa = idempresa;
    }

    public Empresa(Integer idempresa, String nombreempresa, String direccionempresa, long telefonoempresa, String categoriaempresa, String imagenfrente, String logoticket, String logoempresa, String ip) {
        this.idempresa = idempresa;
        this.nombreempresa = nombreempresa;
        this.direccionempresa = direccionempresa;
        this.telefonoempresa = telefonoempresa;
        this.categoriaempresa = categoriaempresa;
        this.imagenfrente = imagenfrente;
        this.logoticket = logoticket;
        this.logoempresa = logoempresa;
        this.ip = ip;
    }

    

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getIp() {
        
        return ip;
    }

    public Integer getIdempresa() {
        return idempresa;
    }

    public void setIdempresa(Integer idempresa) {
        this.idempresa = idempresa;
    }

    public String getNombreempresa() {
        return nombreempresa;
    }

    public void setNombreempresa(String nombreempresa) {
        this.nombreempresa = nombreempresa;
    }

    public String getDireccionempresa() {
        return direccionempresa;
    }

    public void setDireccionempresa(String direccionempresa) {
        this.direccionempresa = direccionempresa;
    }

    public long getTelefonoempresa() {
        return telefonoempresa;
    }

    public void setTelefonoempresa(long telefonoempresa) {
        this.telefonoempresa = telefonoempresa;
    }

    public String getImagenfrente() {
        return imagenfrente;
    }

    public void setImagenfrente(String imagenfrente) {
        this.imagenfrente = imagenfrente;
    }

    public String getLogoticket() {
        return logoticket;
    }

    public void setLogoticket(String logoticket) {
        this.logoticket = logoticket;
    }

    public String getLogoempresa() {
        return logoempresa;
    }

    public void setLogoempresa(String logoempresa) {
        this.logoempresa = logoempresa;
    }
}

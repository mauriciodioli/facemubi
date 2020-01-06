/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.model.session;

import java.util.List;

/**
 *
 * @author JCode
 */
public class Usuario {

    private String user;
    private String password;
    private Integer idusuario;
    private Integer idempresa;
    private String nombreUsuario;
    private String apellidoUsuario;
    private String tipo;
    private List<String> listaUsuario;

    public Usuario(String user, String password, Integer idusuario, String nombreUsuario, String apellidoUsuario, String tipo) {
        this.user = user;
        this.password = password;
        this.idusuario = idusuario;
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.tipo = tipo;
    }

    public Usuario(Integer idusuario) {
        this.idusuario = idusuario;
    }

    public List<String> getListaUsuario() {
        return listaUsuario;
    }

    public Integer getIdempresa() {
        return idempresa;
    }

    public void setIdempresa(Integer idempresa) {
        this.idempresa = idempresa;
    }

    public void setListaUsuario(List<String> listaUsuario) {
        this.listaUsuario = listaUsuario;
    }
     

    public Integer getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(Integer idusuario) {
        this.idusuario = idusuario;
    }
    

    public Usuario() {
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getApellidoUsuario() {
        return apellidoUsuario;
    }

    public void setApellidoUsuario(String apellidoUsuario) {
        this.apellidoUsuario = apellidoUsuario;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Usuario{" + "idempresa=" + idempresa + ",tipo=" + tipo + ",idusuario=" + idusuario + ", nombreusuario=" + nombreUsuario + '}';
    }

}

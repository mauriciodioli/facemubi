/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.model;

import java.awt.Image;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author JCode
 */
public class Producto {
    
    private Integer idproducto;
    private Integer idempresa;

    public Integer getIdempresa() {
        return idempresa;
    }

    public void setIdempresa(Integer idempresa) {
        this.idempresa = idempresa;
    }
    private String nombre;
    private Double precio;
    private Integer stock;
    private Integer stock_min;
    private Integer stock_max;
    private String nombreImagenBoton;   
    private InputStream archivoimg;
    private byte[] archivoimg2;
    private String ip;
    private Categoria categoria;

    public Producto() {
    }

    public Producto(Integer idproducto) {
        this.idproducto = idproducto;
    }

    public Producto(Integer idproducto, String nombre, Double precio, Integer stock, Integer stock_min, Integer stock_max, String nombreImagenBoton, InputStream archivoimg, byte[] archivoimg2, String ip, Categoria categoria) {
        this.idproducto = idproducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.stock_min = stock_min;
        this.stock_max = stock_max;
        this.nombreImagenBoton = nombreImagenBoton;
        this.archivoimg = archivoimg;
        this.archivoimg2 = archivoimg2;
        this.ip = ip;
        this.categoria = categoria;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getIp() {
       
        try {
            InetAddress address = InetAddress.getLocalHost();
            ip=address.getHostAddress();
                    
        } catch (UnknownHostException ex) {
            Logger.getLogger(Producto.class.getName()).log(Level.SEVERE, null, ex);
        }
    return ip;
    }

    

    
    
    public InputStream getArchivoimg() {
        return archivoimg;
    }

    public void setArchivoimg(InputStream archivoimg) {
        this.archivoimg = archivoimg;
    }

    public byte[] getArchivoimg2() {
        return archivoimg2;
    }

    public void setArchivoimg2(byte[] archivoimg2) {
        this.archivoimg2 = archivoimg2;
    }  

    public String getNombreImagenBoton() {
        return nombreImagenBoton;
    }

    public void setNombreImagenBoton(String nombreImagenBoton) {
        this.nombreImagenBoton = nombreImagenBoton;
    }
    

    public Integer getIdproducto() {
        return idproducto;
    }


    public void setIdproducto(Integer idproducto) {
        this.idproducto = idproducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getStock_min() {
        return stock_min;
    }

    public void setStock_min(Integer stock_min) {
        this.stock_min = stock_min;
    }

    public Integer getStock_max() {
        return stock_max;
    }

    public void setStock_max(Integer stock_max) {
        this.stock_max = stock_max;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
}

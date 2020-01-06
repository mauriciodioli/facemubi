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
public class Impresion {

    public Integer getIdimpresion() {
        return idimpresion;
    }

    public void setIdimpresion(Integer idimpresion) {
        this.idimpresion = idimpresion;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Impresion() {
    }

    public Impresion(Integer idimpresion, Producto producto, Cliente cliente) {
        this.idimpresion = idimpresion;
        this.producto = producto;
        this.cliente = cliente;
    }
    private Integer idimpresion;
    private Producto producto;
    private Cliente cliente;
}

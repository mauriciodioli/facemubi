/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.model;

import java.util.Date;
import java.sql.Timestamp;

/**
 *
 * @author Mauricio
 */
public class Pedido {
    private long idpedido;
    private Integer idempresa;
    private String nombreempresa;
    private String telefonoempresa;
    private long codigopedido;
    private long idcliente;
    private Integer idproducto;
    private String nombrecliente;
    private String telefonocliente;
    private String direccioncliente;
    private String estado;
    private String descripcion;
    private String litrosdepedido;
    private double subtotalpedido;
    private double impuestopedido;
    private double totalpedido;
    private String fecha_entrada;
    private String fecha_terminado;
    private Empresa empresa;
    private Cliente cliente;
    private Producto producto;

    public Pedido(long idpedido, Integer idempresa, String nombreempresa, String telefonoempresa, long codigopedido, long idcliente, Integer idproducto, String nombrecliente, String telefonocliente, String direccioncliente, String estado, String descripcion, String litrosdepedido, double subtotalpedido, double impuestopedido, double totalpedido, String fecha_entrada, String fecha_terminado, Empresa empresa, Cliente cliente, Producto producto) {
        this.idpedido = idpedido;
        this.idempresa = idempresa;
        this.nombreempresa = nombreempresa;
        this.telefonoempresa = telefonoempresa;
        this.codigopedido = codigopedido;
        this.idcliente = idcliente;
        this.idproducto = idproducto;
        this.nombrecliente = nombrecliente;
        this.telefonocliente = telefonocliente;
        this.direccioncliente = direccioncliente;
        this.estado = estado;
        this.descripcion = descripcion;
        this.litrosdepedido = litrosdepedido;
        this.subtotalpedido = subtotalpedido;
        this.impuestopedido = impuestopedido;
        this.totalpedido = totalpedido;
        this.fecha_entrada = fecha_entrada;
        this.fecha_terminado = fecha_terminado;
        this.empresa = empresa;
        this.cliente = cliente;
        this.producto = producto;
    }

    public Pedido(long idpedido) {
        this.idpedido = idpedido;
    }

    public Pedido() {
    }

    public String getFecha_entrada() {
        return fecha_entrada;
    }

    public void setFecha_entrada(String fecha_entrada) {
        this.fecha_entrada = fecha_entrada;
    }

    public String getFecha_terminado() {
        return fecha_terminado;
    }

    public void setFecha_terminado(String fecha_terminado) {
        this.fecha_terminado = fecha_terminado;
    }
   

    public Pedido(Empresa empresa) {
        this.empresa = empresa;
    }

    public Pedido(Cliente cliente) {
        this.cliente = cliente;
    }

    public Pedido(Producto producto) {
        this.producto = producto;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

 
    public Integer getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(Integer idproducto) {
        this.idproducto = idproducto;
    }

    

    public long getIdcliente() {
        return idcliente;
    }

    public void setIdcliente(long idcliente) {
        this.idcliente = idcliente;
    }

    

    public Integer getIdempresa() {
        return idempresa;
    }

    public void setIdempresa(Integer idempresa) {
        this.idempresa = idempresa;
    }

    public long getIdpedido() {
        return idpedido;
    }

    public void setIdpedido(long idpedido) {
        this.idpedido = idpedido;
    }

    public String getNombreempresa() {
        return nombreempresa;
    }

    public void setNombreempresa(String nombreempresa) {
        this.nombreempresa = nombreempresa;
    }

    public String getTelefonoempresa() {
        return telefonoempresa;
    }

    public void setTelefonoempresa(String telefonoempresa) {
        this.telefonoempresa = telefonoempresa;
    }

    public long getCodigopedido() {
        return codigopedido;
    }

    public void setCodigopedido(long codigopedido) {
        this.codigopedido = codigopedido;
    }

    public String getNombrecliente() {
        return nombrecliente;
    }

    public void setNombrecliente(String nombrecliente) {
        this.nombrecliente = nombrecliente;
    }

    public String getTelefonocliente() {
        return telefonocliente;
    }

    public void setTelefonocliente(String telefonocliente) {
        this.telefonocliente = telefonocliente;
    }

    public String getDireccioncliente() {
        return direccioncliente;
    }

    public void setDireccioncliente(String direccioncliente) {
        this.direccioncliente = direccioncliente;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLitrosdepedido() {
        return litrosdepedido;
    }

    public void setLitrosdepedido(String litrosdepedido) {
        this.litrosdepedido = litrosdepedido;
    }

    public double getSubtotalpedido() {
        return subtotalpedido;
    }

    public void setSubtotalpedido(double subtotalpedido) {
        this.subtotalpedido = subtotalpedido;
    }

    public double getImpuestopedido() {
        return impuestopedido;
    }

    public void setImpuestopedido(double impuestopedido) {
        this.impuestopedido = impuestopedido;
    }

    public double getTotalpedido() {
        return totalpedido;
    }

    public void setTotalpedido(double totalpedido) {
        this.totalpedido = totalpedido;
    }

   

    

   

    
}
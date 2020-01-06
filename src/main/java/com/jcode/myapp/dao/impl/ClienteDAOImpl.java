/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.dao.impl;

import com.jcode.myapp.dao.ClienteDAO;
import com.jcode.myapp.dao.SQLCloseable;
import com.jcode.myapp.model.Cliente;
import com.jcode.myapp.utilities.BEAN_CRUD;
import com.jcode.myapp.utilities.BEAN_PAGINATION;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.sql.DataSource;
import java.util.logging.Logger;

/**
 *
 * @author Mauricio
 */
public class ClienteDAOImpl implements ClienteDAO {

    private static final Logger LOG = Logger.getLogger(ProductoDAOImpl.class.getName());

    private final DataSource pool;

    public ClienteDAOImpl(DataSource pool) {
        this.pool = pool;
    }

    @Override
    public BEAN_PAGINATION getPagination(HashMap<String, Object> parameters, Connection conn) throws SQLException {
        BEAN_PAGINATION beanPagination = new BEAN_PAGINATION();
        List<Cliente> list = new ArrayList<>();
        PreparedStatement pst;
        ResultSet rs;
        try {
            
            pst = conn.prepareStatement("SELECT COUNT(IDCLIENTE) AS COUNT FROM CLIENTE WHERE "
                    + "LOWER(NOMBRE) LIKE CONCAT('%',?,'%')");             
            pst.setString(1, String.valueOf(parameters.get("FILTER")));
            LOG.info(pst.toString());
            rs = pst.executeQuery();
            while (rs.next()) {
                beanPagination.setCOUNT_FILTER(rs.getInt("COUNT"));
                if (rs.getInt("COUNT") > 0) {
                    pst = conn.prepareStatement("SELECT * FROM CLIENTE WHERE "
                            + "LOWER(NOMBRE) LIKE CONCAT('%',?,'%') "
                            + "ORDER BY " + String.valueOf(parameters.get("SQL_ORDERS")) + " " + parameters.get("SQL_LIMIT"));
                    pst.setString(1, String.valueOf(parameters.get("FILTER")));
                    LOG.info("getPagination clienteDAOImpl "+pst.toString());
                    rs = pst.executeQuery();
                    while (rs.next()) {
                        Cliente cliente = new Cliente();
                        cliente.setIdcliente(rs.getInt("IDCLIENTE"));
                        cliente.setNombre(rs.getString("NOMBRE"));
                        cliente.setDireccion(rs.getString("DIRECCION"));
                        cliente.setRedSocial(rs.getString("REDSOCIAL"));
                        cliente.setTelefono(rs.getLong("TELEFONO"));
                        cliente.setCorreoelectronico(rs.getString("CORREOELECTRONICO"));
                        cliente.setIdempresa(rs.getInt("IDEMPRESA"));
                        //  cliente.setCategoria(new Categoria(rs.getInt("IDCATEGORIA")));
                      //  LOG.info("llegamos aquiiiiiiiiiiiiiiiii******-------------"+cliente.getNombre());
                        list.add(cliente);
                    }
                }
            }
            beanPagination.setLIST(list);
            rs.close();
            pst.close();
        } catch (SQLException ex) {
            throw ex;
        }
        return beanPagination;
    }

    @Override
    public BEAN_PAGINATION getPagination(HashMap<String, Object> parameters) throws SQLException {
        BEAN_PAGINATION beanPagination = null;
        try (Connection conn = pool.getConnection()) {
            beanPagination = getPagination(parameters, conn);
        } catch (SQLException e) {
            throw e;
        }
        return beanPagination;
    }

    @Override
    public BEAN_CRUD add(Cliente obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDCLIENTE) AS COUNT FROM CLIENTE WHERE NOMBRE = ?");
            pst.setString(1, obj.getNombre());
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("INSERT INTO CLIENTE(NOMBRE,TELEFONO,DIRECCION,REDSOCIAL,CORREOELECTRONICO,IDEMPRESA) VALUES(?,?,?,?,?,?)");
                    pst.setString(1, obj.getNombre());
                    pst.setLong(2, obj.getTelefono());
                    pst.setString(3, obj.getDireccion());
                    pst.setString(4, obj.getRedSocial());
                    pst.setString(5,obj.getCorreoelectronico());
                    pst.setInt(6, obj.getIdempresa());
                    
                    //pst.setInt(6, obj.getCategoria().getIdcategoria());
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se registró, ya existe un Producto con el nombre ingresado");
                }
            }
            pst.close();
            rs.close();
        } catch (SQLException e) {
            throw e;
        }
        return beanCrud;
    }

    @Override
    public BEAN_CRUD update(Cliente obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            
            pst = conn.prepareStatement("SELECT COUNT(IDCLIENTE) AS COUNT FROM CLIENTE WHERE NOMBRE = ? AND IDCLIENTE != ?");
            pst.setString(1, obj.getNombre());
            pst.setInt(2, obj.getIdcliente());
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("UPDATE CLIENTE SET NOMBRE = ?, TELEFONO = ?, DIRECCION = ?, REDSOCIAL = ?, "
                            +"CORREOELECTRONICO = ? WHERE IDCLIENTE = ?");
                    
                    pst.setString(1, obj.getNombre());
                    pst.setLong(2, obj.getTelefono());
                    pst.setString(3, obj.getDireccion());
                    pst.setString(4, obj.getRedSocial()); 
                    pst.setString(5, obj.getCorreoelectronico()); 
                   // pst.setInt(6, obj.getCategoria().getIdcategoria());
                   pst.setInt(6, obj.getIdcliente());
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se modificó, ya existe un Producto con el nombre ingresado");
                }
            }
            pst.close();
            rs.close();
        } catch (SQLException e) {
            throw e;
        }
        return beanCrud;
    }

    @Override
    public BEAN_CRUD delete(int id, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("DELETE FROM CLIENTE WHERE IDCLIENTE = ?");
            pst.setInt(1, id);
            LOG.info(pst.toString());
            pst.executeUpdate();
            conn.commit();
            beanCrud.setMESSAGE_SERVER("ok");
            beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
            pst.close();
        } catch (SQLException e) {
            throw e;
        }
        return beanCrud;
    }

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.dao.impl;

import com.jcode.myapp.dao.EmpresaDAO;
import com.jcode.myapp.dao.SQLCloseable;
import com.jcode.myapp.model.Categoria;
import com.jcode.myapp.model.Empresa;
import com.jcode.myapp.utilities.BEAN_CRUD;
import com.jcode.myapp.utilities.BEAN_PAGINATION;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;
import javax.sql.DataSource;

/**
 *
 * @author Mauricio
 */
public class EmpresaDAOImpl implements EmpresaDAO{
 
    private static final Logger LOG = Logger.getLogger(EmpresaDAOImpl.class.getName());
    private final DataSource pool;

    public EmpresaDAOImpl(DataSource pool) {
        this.pool = pool;
    }

    @Override
    public BEAN_PAGINATION getPagination(HashMap<String, Object> parameters, Connection conn) throws SQLException {
        BEAN_PAGINATION beanPagination = new BEAN_PAGINATION();
        List<Empresa> list = new ArrayList<>();
        PreparedStatement pst;        
        ResultSet rs;
        try {
            pst = conn.prepareStatement("SELECT COUNT(IDEMPRESA) AS COUNT FROM EMPRESA WHERE "
                    + "LOWER(NOMBREEMPRESA) LIKE CONCAT('%',?,'%')");
            pst.setString(1, String.valueOf(parameters.get("FILTER")));
            LOG.info(pst.toString());
            rs = pst.executeQuery();
            while (rs.next()) {
                beanPagination.setCOUNT_FILTER(rs.getInt("COUNT"));
                if (rs.getInt("COUNT") > 0) {
                    pst = conn.prepareStatement("SELECT * FROM EMPRESA WHERE "
                            + "LOWER(NOMBREEMPRESA) LIKE CONCAT('%',?,'%') "
                            + "ORDER BY " + String.valueOf(parameters.get("SQL_ORDERS")) + " " + parameters.get("SQL_LIMIT"));
                    pst.setString(1, String.valueOf(parameters.get("FILTER")));
                   
                    rs = pst.executeQuery();
                    while (rs.next()) {
                        Empresa empresa = new Empresa();
                        empresa.setIdempresa(rs.getInt("IDEMPRESA"));
                        empresa.setNombreempresa(rs.getString("NOMBREEMPRESA"));
                        empresa.setDireccionempresa(rs.getString("DIRECCIONEMPRESA"));
                        empresa.setCategoriaempresa(rs.getString("CATEGORIAEMPRESA"));
                        empresa.setTelefonoempresa(rs.getLong("TELEFONOEMPRESA"));
                        empresa.setImagenfrente(rs.getString("IMAGENFRENTE"));
                        empresa.setLogoempresa(rs.getString("LOGOEMPRESA"));
                        // LOG.info("rs.getString(NOMBREIMAGENBOTON)))))))))))))))))))))))) "+rs.getString("NOMBREIMAGENBOTON"));
                        empresa.setLogoticket(rs.getString("LOGOTICKET"));                        
                        list.add(empresa);
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
    public BEAN_CRUD add(Empresa obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDPRODUCTO) AS COUNT FROM PRODUCTO WHERE NOMBRE = ?");
            pst.setString(1, obj.getNombreempresa());
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("INSERT INTO EMPRESA(NOMBREEMPRESA,DIRECCIONEMPRESA,TELEFONOEMPRESA,CATEGORIAEMPRESA,IMAGENFRENTE,LOGOEMPRESA,LOGOTICKET) VALUES(?,?,?,?,?,?,?)");
                    pst.setString(1, obj.getNombreempresa());
                    pst.setString(2, obj.getDireccionempresa());
                    pst.setLong(3, obj.getTelefonoempresa());
                    pst.setString(4,obj.getCategoriaempresa());
                    pst.setString(5, obj.getImagenfrente());
                    pst.setString(6, obj.getLogoempresa());
                    pst.setString(7, obj.getLogoticket());
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se registró, ya existe un Empresa con el nombre ingresado");
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
    public BEAN_CRUD update(Empresa obj, HashMap<String, Object> parameters) throws SQLException {
        
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDEMPRESA) AS COUNT FROM EMPRESA WHERE NOMBREEMPRESA = ? AND IDEMPRESA != ?");
            pst.setString(1, obj.getNombreempresa());
            pst.setInt(2, obj.getIdempresa());
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("UPDATE EMPRESA SET NOMBREEMPRESA = ?, DIRECCIONEMPRESA = ?, TELEFONOEMPRESA = ?, CATEGORIAEMPRESA = ?, IMAGENFRENTE = ?, "
                            + "LOGOEMPRESA = ?, LOGOTICKET = ? WHERE IDEMPRESA = ?");
                     
                    pst.setString(1, obj.getNombreempresa());
                    pst.setString(2, obj.getDireccionempresa());
                    pst.setLong(3, obj.getTelefonoempresa());
                    pst.setString(4, obj.getCategoriaempresa());
                    pst.setString(5, obj.getImagenfrente());
                    pst.setString(6, obj.getLogoempresa());
                    pst.setString(7, obj.getLogoticket());
                    pst.setInt(8, obj.getIdempresa());
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se modificó, ya existe un Empresa con el nombre ingresado");
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
            pst = conn.prepareStatement("DELETE FROM EMPRESA WHERE IDEMPRESA = ?");
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


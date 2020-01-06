/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.dao.impl.session;

import com.jcode.myapp.dao.SQLCloseable;
import com.jcode.myapp.dao.session.UsuarioDAO;
import com.jcode.myapp.model.session.Usuario;
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
 * @author JCode
 */
public class UsuarioDAOImpl implements UsuarioDAO {

    private static final Logger LOG = Logger.getLogger(UsuarioDAOImpl.class.getName());
    private final DataSource pool;

    public UsuarioDAOImpl(DataSource pool) {
        this.pool = pool;
    }

    @Override
    public Usuario getUser(String user) throws SQLException {
        Usuario usuario = null;
        String[] palabra = null;
        palabra = user.split(",");

        usuario = new Usuario();
        for (int i = 0; i < palabra.length; i++) {
//            LOG.info(i + " i getUser " + palabra[i]);
            if (i == 0) {
                usuario.setIdusuario(Integer.parseInt(palabra[0]));
                usuario.setUser(palabra[1]);
                usuario.setNombreUsuario(palabra[1]);
                usuario.setIdempresa(Integer.parseInt(palabra[2]));
                usuario.setTipo(palabra[3]);
                
                
            }
            if (i == 1) {
                usuario.setPassword(palabra[i]);
            }
        }

//        if (user.equals("user")) {
//            usuario.setUser(user);
//            usuario.setPassword("dioli@gmail.com");
//            usuario.setNombreUsuario("dioli@gmail.com");
//        }
        return usuario;
    }

    @Override
    public BEAN_PAGINATION getPagination(HashMap<String, Object> parameters, Connection conn) throws SQLException {
        BEAN_PAGINATION beanPagination = new BEAN_PAGINATION();
        List<Usuario> list = new ArrayList<>();
        PreparedStatement pst;
        ResultSet rs;
        String sentencia = null;
        String sentencia1 = null;
        try {
            if (parameters.get("FILTER").equals("")) {
                LOG.info("FILTER " + parameters.get("FILTER"));
                sentencia = "SELECT COUNT(IDUSUARIO) AS COUNT FROM USUARIO WHERE "
                        + "LOWER(USUARIO) LIKE CONCAT('%',?,'%')";
            } else {
                sentencia = "SELECT COUNT(IDUSUARIO) AS COUNT FROM USUARIO WHERE "
                        + "LOWER(USUARIO) LIKE CONCAT(?)";
            }
            pst = conn.prepareStatement(sentencia);

            pst.setString(1, String.valueOf(parameters.get("FILTER")));
            LOG.info(pst.toString());
            rs = pst.executeQuery();

            while (rs.next()) {
                beanPagination.setCOUNT_FILTER(rs.getInt("COUNT"));
                if (rs.getInt("COUNT") > 0) {
                    if (parameters.get("FILTER").equals("")) {
                        LOG.info("FILTER " + parameters.get("FILTER"));
                        sentencia1 = "SELECT * FROM USUARIO WHERE "
                                + "LOWER(USUARIO) LIKE CONCAT('%',?,'%') "
                                + "ORDER BY " + String.valueOf(parameters.get("SQL_ORDERS")) + " " + parameters.get("SQL_LIMIT");
                    } else {
                        sentencia1 = "SELECT * FROM USUARIO WHERE "
                                + "LOWER(USUARIO) LIKE CONCAT(?) "
                                + "ORDER BY " + String.valueOf(parameters.get("SQL_ORDERS")) + " " + parameters.get("SQL_LIMIT");
                    }
                    pst = conn.prepareStatement(sentencia1);
                    pst.setString(1, String.valueOf(parameters.get("FILTER")));
//                    LOG.info("pagiantion usuario " + pst.toString());
                    rs = pst.executeQuery();
                    while (rs.next()) {
                        Usuario usuario = new Usuario();
//                        LOG.info("pagiantion usuario " + rs.getString("USUARIO"));
                        usuario.setIdusuario(rs.getInt("IDUSUARIO"));
                        usuario.setApellidoUsuario(rs.getString("APELLIDOUSUARIO"));
                        usuario.setNombreUsuario(rs.getString("NOMBREUSUARIO"));
                        usuario.setPassword(rs.getString("PASSWORD"));
                        usuario.setUser(rs.getString("USUARIO"));
                        usuario.setTipo(rs.getString("TIPO"));
                        usuario.setIdempresa(rs.getInt("IDEMPRESA"));
                        list.add(usuario);
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
    public BEAN_CRUD add(Usuario obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDUSUARIO) AS COUNT FROM USUARIO WHERE USUARIO = ?");
            pst.setString(1, obj.getUser());
            rs = pst.executeQuery();
            LOG.info(pst.toString());
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("INSERT INTO USUARIO(NOMBREUSUARIO,USUARIO,PASSWORD,APELLIDOUSUARIO,TIPO) VALUES(?,?,?,?,?)");
                    pst.setString(1, obj.getNombreUsuario());
                    pst.setString(2, obj.getUser());
                    pst.setString(3, obj.getPassword());
                    pst.setString(4, obj.getApellidoUsuario());
                    pst.setString(5, obj.getTipo());
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se registró, ya existe una USUARIO con el nombre ingresado");
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
    public BEAN_CRUD update(Usuario obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDUSUARIO) AS COUNT FROM USUARIO WHERE USUARIO = ? AND IDUSUARIO != ?");
            pst.setString(1, obj.getUser());
            pst.setInt(2, obj.getIdusuario());
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("UPDATE USUARIO SET IDEMPRESA = ? , TIPO = ? WHERE IDUSUARIO = ?");
                    pst.setInt(1, obj.getIdempresa());
                    pst.setString(2, obj.getTipo());
                    pst.setInt(3, obj.getIdusuario());
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se modificó, ya existe una Usuario con el nombre ingresado");
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
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDUSUARIO) AS COUNT FROM USUARIO WHERE IDUSUARIO = ?");
            pst.setInt(1, id);
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("DELETE FROM USUARIO WHERE IDUSUARIO = ?");
                    pst.setInt(1, id);
                    LOG.info(pst.toString());
                    pst.executeUpdate();
                    conn.commit();
                    beanCrud.setMESSAGE_SERVER("ok");
                    beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
                } else {
                    beanCrud.setMESSAGE_SERVER("No se eliminó, existe una USUARIO asociado a esta Categoria");
                }
            }
            pst.close();
            rs.close();
        } catch (SQLException e) {
            throw e;
        }
        return beanCrud;

    }

}

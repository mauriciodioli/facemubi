/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.dao.impl;

import com.jcode.myapp.dao.PedidoDAO;
import com.jcode.myapp.dao.SQLCloseable;
import com.jcode.myapp.model.Empresa;
import com.jcode.myapp.model.Pedido;
import com.jcode.myapp.utilities.BEAN_CRUD;
import com.jcode.myapp.utilities.BEAN_PAGINATION;
import java.sql.Connection;
import java.sql.Timestamp;
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
public class PedidoDAOImpl implements PedidoDAO {

    private static final Logger LOG = Logger.getLogger(ProductoDAOImpl.class.getName());

    private final DataSource pool;

    public PedidoDAOImpl(DataSource pool) {
        this.pool = pool;
    }

    @Override
    public BEAN_PAGINATION getPagination(HashMap<String, Object> parameters, Connection conn) throws SQLException {
        BEAN_PAGINATION beanPagination = new BEAN_PAGINATION();
        List<Pedido> list = new ArrayList<>();
        PreparedStatement pst;
        ResultSet rs;
        try {

            pst = conn.prepareStatement("SELECT COUNT(IDPEDIDO) AS COUNT FROM PEDIDO WHERE "
                    + "LOWER(NOMBRECLIENTE) LIKE CONCAT('%',?,'%')");
            pst.setString(1, String.valueOf(parameters.get("FILTER")));
            LOG.info(pst.toString());
            rs = pst.executeQuery();
            while (rs.next()) {
                beanPagination.setCOUNT_FILTER(rs.getInt("COUNT"));
                if (rs.getInt("COUNT") > 0) {
                    pst = conn.prepareStatement("SELECT * FROM PEDIDO WHERE "
                            + "LOWER(NOMBRECLIENTE) LIKE CONCAT('%',?,'%') "
                            + "ORDER BY " + String.valueOf(parameters.get("SQL_ORDERS")) + " " + parameters.get("SQL_LIMIT"));
                    pst.setString(1, String.valueOf(parameters.get("FILTER")));
                    LOG.info("getPagination pedidoDAOImpl " + pst.toString());
                    rs = pst.executeQuery();
                    while (rs.next()) {
                        Pedido pedido = new Pedido();
                        pedido.setIdpedido(rs.getLong("IDPEDIDO"));
                        pedido.setCodigopedido(Long.parseLong(rs.getString("CODIGOPEDIDO")));
                        pedido.setDescripcion(rs.getString("DESCRIPCION"));
                        pedido.setDireccioncliente(rs.getString("DIRECCIONCLIENTE"));
                        pedido.setEstado(rs.getString("ESTADO"));
                        pedido.setNombreempresa(rs.getString("NOMBREEMPRESA"));
                        pedido.setFecha_entrada(rs.getString("FECHA_ENTRADA"));
                        pedido.setFecha_terminado(rs.getString("FECHA_TERMINADO"));
                        pedido.setIdcliente(rs.getInt("IDCLIENTE"));
                        pedido.setIdproducto(rs.getInt("IDPRODUCTO"));
                        pedido.setImpuestopedido(rs.getDouble("IMPUESTOPEDIDO"));
                        pedido.setIdempresa(rs.getInt("IDEMPRESA"));
                        pedido.setLitrosdepedido(rs.getString("LITROSPEDIDO"));
                        pedido.setNombrecliente(rs.getString("NOMBRECLIENTE"));
                        pedido.setSubtotalpedido(rs.getDouble("SUBTOTALPEDIDO"));
                        pedido.setTelefonocliente(rs.getString("TELEFONOCLIENTE"));
                        pedido.setTelefonoempresa(rs.getString("TELEFONOEMPRESA")); //  pedido.setCategoria(new Categoria(rs.getInt("IDCATEGORIA")));
                        pedido.setTotalpedido(rs.getDouble("TOTALPEDIDO"));

//  LOG.info("llegamos aquiiiiiiiiiiiiiiiii******-------------"+pedido.getNombre());
                        list.add(pedido);
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
    public BEAN_CRUD add(Pedido obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);
            pst = conn.prepareStatement("SELECT COUNT(IDPEDIDO) AS COUNT FROM PEDIDO WHERE NOMBRECLIENTE = ?");
            pst.setString(1, obj.getNombrecliente());
            rs = pst.executeQuery();
            while (rs.next()) {
//                if (rs.getInt("COUNT") == 0) {
                pst = conn.prepareStatement("INSERT INTO PEDIDO(NOMBRECLIENTE,CODIGOPEDIDO,DESCRIPCION,DIRECCIONCLIENTE,ESTADO,IDEMPRESA,NOMBREEMPRESA,FECHA_ENTRADA,FECHA_TERMINADO,IDCLIENTE,IDPRODUCTO,IMPUESTOPEDIDO"
                        + ",LITROSPEDIDO,SUBTOTALPEDIDO,TELEFONOCLIENTE,TELEFONOEMPRESA,TOTALPEDIDO) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                pst.setString(1, obj.getNombrecliente());
                pst.setLong(2, obj.getCodigopedido());
                pst.setString(3, obj.getDescripcion());
                pst.setString(4, obj.getDireccioncliente());
                pst.setString(5, obj.getEstado());
//                LOG.info("  obj.getEstado() " + obj.getEstado());
                pst.setInt(6, obj.getEmpresa().getIdempresa());
//                LOG.info(obj.getFecha_entrada() +" obj.getEmpresa().getIdempresa() " + obj.getEmpresa().getIdempresa());
                pst.setString(7, obj.getNombreempresa());
                pst.setString(8, obj.getFecha_entrada());
                pst.setString(9, obj.getFecha_entrada());
                pst.setLong(10, obj.getIdcliente());
                obj.setIdproducto(1);
                pst.setInt(11, obj.getIdproducto());
                pst.setDouble(12, obj.getImpuestopedido());
                pst.setString(13, obj.getLitrosdepedido());
                pst.setDouble(14, obj.getSubtotalpedido());
                pst.setString(15, obj.getTelefonocliente());
                pst.setString(16, obj.getTelefonoempresa());
                pst.setDouble(17, obj.getTotalpedido());

                //pst.setInt(6, obj.getCategoria().getIdcategoria());
                LOG.info(pst.toString());
                pst.executeUpdate();
                conn.commit();
                beanCrud.setMESSAGE_SERVER("ok");
                beanCrud.setBEAN_PAGINATION(getPagination(parameters, conn));
//                } else {
//                    beanCrud.setMESSAGE_SERVER("No se registró, ya existe un Producto con el nombre ingresado");
//                }
            }
            pst.close();
            rs.close();
        } catch (SQLException e) {
            throw e;
        }
        return beanCrud;
    }

    private static java.sql.Date convert(java.util.Date uDate) {
        java.sql.Date sDate = new java.sql.Date(uDate.getTime());
        return sDate;
    }

    @Override
    public BEAN_CRUD update(Pedido obj, HashMap<String, Object> parameters) throws SQLException {
        BEAN_CRUD beanCrud = new BEAN_CRUD();
        PreparedStatement pst;
        ResultSet rs;
        try (Connection conn = this.pool.getConnection();
                SQLCloseable finish = conn::rollback;) {
            conn.setAutoCommit(false);

            pst = conn.prepareStatement("SELECT COUNT(IDPEDIDO) AS COUNT FROM PEDIDO WHERE NOMBRECLIENTE = ? AND IDPEDIDO != ?");
            pst.setString(1, obj.getNombrecliente());
            pst.setLong(2, obj.getIdpedido());
            rs = pst.executeQuery();
            while (rs.next()) {
                if (rs.getInt("COUNT") == 0) {
                    pst = conn.prepareStatement("UPDATE PEDIDO SET NOMBRECLIENTE = ?, CODIGOPEDIDO = ?, DESCRIPCION = ?, DIRECCIONCLIENTE = ?, ESTADO = ?, IDEMPRESA = ?, NOMBREEMPRESA = ?, FECHA_ENTRADA = ?,"
                            + "FECHA_TERMINADO = ?, IDCLIENTE = ?, IDPRODUCTO = ?, IMPUESTOPEDIDO = ? WHERE IDPEDIDO = ?");

                    pst.setString(1, obj.getNombrecliente());
                    pst.setLong(2, obj.getCodigopedido());
                    pst.setString(3, obj.getDescripcion());
                    pst.setString(4, obj.getDireccioncliente());
                    pst.setString(5, obj.getEstado());
                    pst.setInt(6, obj.getIdempresa());
                    pst.setString(7, obj.getNombreempresa());
                    pst.setString(8, obj.getFecha_entrada());
                    pst.setString(9, obj.getFecha_entrada());
                    pst.setLong(10, obj.getIdcliente());
                    pst.setInt(11, obj.getIdproducto());
                    pst.setDouble(12, obj.getImpuestopedido());
                    pst.setString(13, obj.getLitrosdepedido());
                    pst.setDouble(14, obj.getSubtotalpedido());
                    pst.setString(15, obj.getTelefonocliente());
                    pst.setString(16, obj.getTelefonoempresa());
                    pst.setDouble(17, obj.getTotalpedido());
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
            pst = conn.prepareStatement("DELETE FROM PEDIDO WHERE IDPEDIDO = ?");
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

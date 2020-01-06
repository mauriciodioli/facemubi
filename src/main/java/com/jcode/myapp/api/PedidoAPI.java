/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.api;

import com.google.gson.Gson;
import com.jcode.myapp.dao.PedidoDAO;
import com.jcode.myapp.dao.impl.PedidoDAOImpl;
import com.jcode.myapp.model.Empresa;
import com.jcode.myapp.model.Pedido;
import com.jcode.myapp.utilities.BEAN_CRUD;
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

/**
 *
 * @author Mauricio
 */
@WebServlet(name = "PedidoAPI", urlPatterns = {"/pedidos"})
public class PedidoAPI extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(PedidoAPI.class.getName());
    @Resource(name = "jdbc/dbmyapp")
    private DataSource pool;
    private Gson json;
    private String jsonResponse;
    private HashMap<String, Object> parameters;
    private String action;
    private HttpSession session;

    private PedidoDAO pedidoDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        this.parameters = new HashMap<>();
        this.json = new Gson();

        this.pedidoDAO = new PedidoDAOImpl(this.pool);
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            this.action = request.getParameter("action") == null ? "" : request.getParameter("action");
            switch (this.action) {
                case "paginarPedido":
                    processPedido(new BEAN_CRUD(this.pedidoDAO.getPagination(getParameters(request))), response);
                    break;
                case "addPedido":
                    processPedido(this.pedidoDAO.add(getPedido(request), getParameters(request)), response);
                    break;
                case "updatePedido":
                    LOG.info("estoy en editar PEDIDOOOOOOOO");
                    processPedido(this.pedidoDAO.update(getPedido(request), getParameters(request)), response);
                    break;
                case "deletePedido":
                    processPedido(this.pedidoDAO.delete(Integer.parseInt(request.getParameter("txtIdEmpresaER")), getParameters(request)), response);
                    break;
                case "ipRemoto":
                    String ip = request.getRemoteAddr();
                    LOG.info("ip user remoto " + ip);
                    response.setContentType("text/plain");
                    response.getWriter().write(ip);
                    break;
                default:
                    request.getRequestDispatcher("/jsp_app/tareas/pedido.jsp").forward(request, response);
                    break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(EmpresaAPI.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.session = request.getSession();
        if (this.session.getAttribute("usuario") == null) {
            response.sendRedirect("login");
        } else {
            processRequest(request, response);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.session = request.getSession();
        if (this.session.getAttribute("usuario") == null) {
            response.sendRedirect("login");
        } else {
            processRequest(request, response);
        }
    }

    private Pedido getPedido(HttpServletRequest request) {
        Pedido pedido = new Pedido();        
        if (request.getParameter("action").equals("updatePedido")) {
            pedido.setIdpedido(Integer.parseInt(request.getParameter("txtIdPedidoER")));
        }
        pedido.setNombreempresa(request.getParameter("nombreEmpresa"));
        pedido.setTelefonoempresa(request.getParameter("telefonoEmpresa"));
        pedido.setCodigopedido(Long.parseLong(request.getParameter("barcode")));
        pedido.setNombrecliente(request.getParameter("nombreClienteTicket"));
        pedido.setTelefonocliente(request.getParameter("telefonoClienteTicket"));
        pedido.setEmpresa(new Empresa(1));//falta
        pedido.setDireccioncliente(request.getParameter("direccionClienteTicket"));
        pedido.setFecha_entrada(request.getParameter("fechaR"));
        pedido.setDescripcion(request.getParameter("entregaPedidoTicket"));
        pedido.setLitrosdepedido(request.getParameter("cantidadPrendasTicket"));
        pedido.setSubtotalpedido(Double.parseDouble(request.getParameter("sutTotalTicket")));
        pedido.setImpuestopedido(Double.parseDouble(request.getParameter("invchgTicket")));
        pedido.setTotalpedido(Double.parseDouble(request.getParameter("total")));
        pedido.setEstado(request.getParameter("estadoPedidoTicket"));
        return pedido;
    }

    private HashMap<String, Object> getParameters(HttpServletRequest request) {
        this.parameters.clear();
//        LOG.info("getparameters PedidoAPI 2222 " + request.getParameter("nombreClienteTicket"));
        this.parameters.put("FILTER", request.getParameter("nombreClienteTicket"));
        this.parameters.put("SQL_ORDERS", "NOMBRECLIENTE DESC");
        if (request.getParameter("sizePagePedido").equals("ALL")) {
            this.parameters.put("SQL_LIMIT", "");
        } else {
            this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePagePedido") + " OFFSET "
                    + (Integer.parseInt(request.getParameter("numberPagePedido")) - 1) * Integer.parseInt(request.getParameter("sizePagePedido")));
        }
        return this.parameters;
    }

    private void processPedido(BEAN_CRUD beanCrud, HttpServletResponse response) {
        try {
            this.jsonResponse = this.json.toJson(beanCrud);
            LOG.info(this.jsonResponse);
            response.setContentType("application/json");
            response.getWriter().write(this.jsonResponse);
        } catch (IOException ex) {
            Logger.getLogger(PedidoAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

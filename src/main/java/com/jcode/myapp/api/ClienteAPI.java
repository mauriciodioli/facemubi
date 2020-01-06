/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.api;

import com.google.gson.Gson;
import com.jcode.myapp.dao.ClienteDAO;
import com.jcode.myapp.dao.impl.ClienteDAOImpl;
import com.jcode.myapp.model.Cliente;
import com.jcode.myapp.model.session.Usuario;
import com.jcode.myapp.utilities.BEAN_CRUD;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.SQLException;
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
@WebServlet(name = "ClienteAPI", urlPatterns = {"/clientes"})
public class ClienteAPI extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(ClienteAPI.class.getName());
    @Resource(name = "jdbc/dbmyapp")
    private DataSource pool;
    private Gson json;
    private String jsonResponse;
    private HashMap<String, Object> parameters;
    private String action;
    private HttpSession session;

    private ClienteDAO clienteDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        this.parameters = new HashMap<>();
        this.json = new Gson();

        this.clienteDAO = new ClienteDAOImpl(this.pool);
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
                case "paginarCliente":
                    /*
                    BEAN_PAGINATION beanPagination = this.clienteDAO.getPagination(getParameters(request));
                    BEAN_CRUD beanCrud = new BEAN_CRUD(beanPagination);
                    processCliente(beanCrud, response);
                     */
                    // LOG.info("llegamos aquiiiiiiiiiiiiiiiii-------------");
                    //ipLocal();
                    processCliente(new BEAN_CRUD(this.clienteDAO.getPagination(getParameters(request))), response);
                    break;
                case "addCliente":
                    /*
                    BEAN_CRUD beanCrud = this.clienteDAO.add(getCliente(request), getParameters(request));
                    processCliente(beanCrud, response);
                     */
                    processCliente(this.clienteDAO.add(getCliente(request), getParameters(request)), response);
                    break;
                case "updateCliente":

                    processCliente(this.clienteDAO.update(getCliente(request), getParameters(request)), response);
                    break;
                case "deleteCliente":

                    processCliente(this.clienteDAO.delete(Integer.parseInt(request.getParameter("txtIdClienteER")), getParameters(request)), response);
                    break;
                default:
                    request.getRequestDispatcher("/jsp_app/tareas/cliente.jsp").forward(request, response);
                    break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(ClienteAPI.class.getName()).log(Level.SEVERE, null, ex);
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
            Usuario u = (Usuario) this.session.getAttribute("usuario");
//            LOG.info("this.session.getAttribute "+u.getIdempresa());
            if (u.getTipo().equals("administrador") || u.getTipo().equals("root")) {
                processRequest(request, response);
            }
        }
    }

    private Cliente getCliente(HttpServletRequest request) {
        Cliente cliente = new Cliente();
        if (request.getParameter("action").equals("updateCliente")) {
            cliente.setIdcliente(Integer.parseInt(request.getParameter("txtIdClienteER")));
        }
        cliente.setIdempresa(Integer.parseInt(request.getParameter("txtIdEmpresa")));
        cliente.setNombre(request.getParameter("txtNombreClienteER"));
        cliente.setTelefono(Long.valueOf(request.getParameter("txtTelefonoClienteER")));
        cliente.setDireccion(request.getParameter("txtDireccionClienteER"));
        cliente.setRedSocial(request.getParameter("txtRed_SocialClienteER"));
        cliente.setCorreoelectronico(request.getParameter("txtemailClienteER"));
        return cliente;
    }

    private HashMap<String, Object> getParameters(HttpServletRequest request) {
        this.parameters.clear();
        LOG.info("getparameters txtNombreCliente  " + request.getParameter("txtNombreCliente") + " " + request.getParameter("numberPageCliente") + " " + request.getParameter("sizePageCliente"));
        this.parameters.put("FILTER", request.getParameter("txtNombreCliente"));
        this.parameters.put("SQL_ORDERS", "NOMBRE ASC");
        if (request.getParameter("sizePageCliente").equals("ALL")) {
            this.parameters.put("SQL_LIMIT", "");
            //LOG.info("llegamos aquiiiiiiiiiiiiiiiii------++++-------");
        } else {
            this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePageCliente") + " OFFSET "
                    + (Integer.parseInt(request.getParameter("numberPageCliente")) - 1) * Integer.parseInt(request.getParameter("sizePageCliente")));
        }

        return this.parameters;
    }

    private void processCliente(BEAN_CRUD beanCrud, HttpServletResponse response) {
        try {
            this.jsonResponse = this.json.toJson(beanCrud);
            LOG.info(this.jsonResponse);
            response.setContentType("application/json");
            response.getWriter().write(this.jsonResponse);
        } catch (IOException ex) {
            Logger.getLogger(ClienteAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void ipLocal() throws UnknownHostException {
        InetAddress address = InetAddress.getLocalHost();
        //LOG.info("IP Local :"+address.getHostAddress());

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

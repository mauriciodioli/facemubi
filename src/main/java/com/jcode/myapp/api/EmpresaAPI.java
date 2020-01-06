/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.api;

import com.google.gson.Gson;
import com.jcode.myapp.dao.EmpresaDAO;
import com.jcode.myapp.dao.impl.EmpresaDAOImpl;
import com.jcode.myapp.model.Empresa;
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
import javax.servlet.annotation.MultipartConfig;
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
@WebServlet(name = "EmpresaAPI", urlPatterns = {"/empresas"})
//@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 10,
//        maxFileSize = 1024 * 1024 * 50,
//        maxRequestSize = 1024 * 1024 * 100)   // upload file's size up to 16MB

public class EmpresaAPI extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(EmpresaAPI.class.getName());
    @Resource(name = "jdbc/dbmyapp")
    private DataSource pool;
    private Gson json;
    private String jsonResponse;
    private HashMap<String, Object> parameters;
    private String action;
    private HttpSession session;

    private EmpresaDAO empresaDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        this.parameters = new HashMap<>();
        this.json = new Gson();

        this.empresaDAO = new EmpresaDAOImpl(this.pool);
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
                case "paginarEmpresa":
                    processEmpresa(new BEAN_CRUD(this.empresaDAO.getPagination(getParameters(request))), response);
                    break;
                case "addEmpresa":
                    processEmpresa(this.empresaDAO.add(getEmpresa(request), getParameters(request)), response);
                    break;
                case "updateEmpresa":
                    LOG.info("estoy en editar EMPRESAAAAAAAA--------->");
                    processEmpresa(this.empresaDAO.update(getEmpresa(request), getParameters(request)), response);
                    break;
                case "addImagenBotonEmpresa":
                    LOG.info("estoy en editar addImagenBotonEmpresa<<<<<<<<<<<<<<<<<<<<<");
                    processEmpresa(this.empresaDAO.update(getEmpresa(request), getParameters(request)), response);
                    break;
                case "deleteEmpresa":
                    processEmpresa(this.empresaDAO.delete(Integer.parseInt(request.getParameter("txtIdEmpresaER")), getParameters(request)), response);
                    break;
                case "ipRemoto":
                    String ip = null;//request.getRemoteAddr();
                    ip = ipServidor();
//                    LOG.info("ip user remoto " + ip);
                    response.setContentType("text/plain");
                    response.getWriter().write(ip);
                    break;
                default:
                    request.getRequestDispatcher("/jsp_app/mantenimiento/empresa.jsp").forward(request, response);
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
            Usuario u = (Usuario) this.session.getAttribute("usuario");
            LOG.info("this.session.getAttribute " + this.session.getAttribute("usuario"));
            if (u.getTipo().equals("usuario") ||u.getTipo().equals("administrador") || u.getTipo().equals("root")) {
                processRequest(request, response);
            }

        }
    }

    private Empresa getEmpresa(HttpServletRequest request) {
        Empresa empresa = new Empresa();
        //response.setContentType("text/html:chartset-UTF-8");
        //LOG.info("estoy en getEmpresa(HttpServletRequest requestdddddddddddddddddddddddddd) ");
        if (request.getParameter("action").equals("updateEmpresa") || request.getParameter("action").equals("addImagenBotonEmpresa")) {
            empresa.setIdempresa(Integer.parseInt(request.getParameter("txtIdEmpresaER")));
        }
        empresa.setNombreempresa(request.getParameter("txtNombreEmpresaER"));
        empresa.setDireccionempresa(request.getParameter("txtDireccionEmpresaER"));
        empresa.setTelefonoempresa(Long.valueOf(request.getParameter("txtTelefonoEmpresaER")));
        empresa.setCategoriaempresa(request.getParameter("txtCboCategoriaEmpresaER"));
        empresa.setImagenfrente(request.getParameter("txtImagenFrenteEmpresaER"));
        empresa.setLogoempresa(request.getParameter("txtImagenLogoEmpresaER"));

//        empresa.setLogoticket(request.getParameter("logoTicket"));
        //   empresa.setCategoria(new Categoria(Integer.parseInt(request.getParameter("cboCategoriaEmpresaER"))));
        return empresa;
    }

    private HashMap<String, Object> getParameters(HttpServletRequest request) {
        this.parameters.clear();
        this.parameters.put("FILTER", request.getParameter("txtNombreEmpresa"));
        this.parameters.put("SQL_ORDERS", "NOMBREEMPRESA ASC ");
        if (request.getParameter("sizePageEmpresa").equals("ALL")) {
            this.parameters.put("SQL_LIMIT", "");
        } else {
            this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePageEmpresa") + " OFFSET "
                    + (Integer.parseInt(request.getParameter("numberPageEmpresa")) - 1) * Integer.parseInt(request.getParameter("sizePageEmpresa")));
        }
        return this.parameters;
    }

    private void processEmpresa(BEAN_CRUD beanCrud, HttpServletResponse response) {
        try {
            this.jsonResponse = this.json.toJson(beanCrud);
            LOG.info(this.jsonResponse);
            response.setContentType("application/json");
            response.getWriter().write(this.jsonResponse);
        } catch (IOException ex) {
            Logger.getLogger(EmpresaAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private String ipServidor() {
        String ip = null;
        try {
            // Aqui obtenemos la ip local de la maquina
            InetAddress address = InetAddress.getLocalHost();
//            System.out.println("IP Local :" + address.getHostAddress());
            ip =address.getHostAddress();
            // Aqui obtenemos la ip de la web del programador
//            String domain = "www.lawebdelprogramador.com";
//            InetAddress address2 = InetAddress.getByName(domain);
//            byte IP[] = address2.getAddress();
//            System.out.print("IP del dominio " + domain + " :");
//            for (int index = 0; index < IP.length; index++) {
//                if (index > 0) {
//                    System.out.print(".");
//                }
//                System.out.print(((int) IP[index]) & 0xff);
//            }
        } catch (UnknownHostException ex) {
            Logger.getLogger(EmpresaAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ip;
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

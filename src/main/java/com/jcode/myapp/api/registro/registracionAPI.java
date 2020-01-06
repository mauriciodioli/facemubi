/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.api.registro;

import com.google.gson.Gson;
//import com.jcode.myapp.api.session.UsuarioAPI;
import com.jcode.myapp.dao.session.UsuarioDAO;
import com.jcode.myapp.dao.impl.session.UsuarioDAOImpl;
import com.jcode.myapp.model.session.Usuario;
import com.jcode.myapp.utilities.BEAN_CRUD;
import java.io.IOException;
import java.io.PrintWriter;
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
@WebServlet(name = "registracionAPI", urlPatterns = {"/registracion"})
public class registracionAPI extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(registracionAPI.class.getName());
    @Resource(name = "jdbc/dbmyapp")
    private DataSource pool;
    private Gson json;
    private String jsonResponse;
    private HashMap<String, Object> parameters;
    private String action;
    private HttpSession session;

    private UsuarioDAO usuarioDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        this.parameters = new HashMap<>();
        this.json = new Gson();

        this.usuarioDAO = new UsuarioDAOImpl(this.pool);
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
//                                LOG.info(this.action+" 11111111 "+request.getParameter("action"));

            switch (this.action) {
                case "paginarUsuario":
                    /*
                    BEAN_PAGINATION beanPagination = this.usuarioDAO.getPagination(getParameters(request));
                    BEAN_CRUD beanCrud = new BEAN_CRUD(beanPagination);
                    processUsuario(beanCrud, response);
                     */
                    processUsuario(new BEAN_CRUD(this.usuarioDAO.getPagination(getParameters(request))), response);
                    break;
                case "addUsuario":
//                    LOG.info("11111111111111111111111111111111111111111111");
                    /*
                    BEAN_CRUD beanCrud = this.usuarioDAO.add(getUsuario(request), getParameters(request));
                    processUsuario(beanCrud, response);
                     */
                    processUsuario(this.usuarioDAO.add(getUsuario(request), getParameters(request)), response);
                    break;
                case "updateUsuario":
                    LOG.info("updateUsuario ------------------------->");
                    processUsuario(this.usuarioDAO.update(getUsuario(request), getParameters(request)), response);
                    break;
                case "deleteUsuario":
                    processUsuario(this.usuarioDAO.delete(Integer.parseInt(request.getParameter("txtIdUsuarioER")), getParameters(request)), response);
                    break;
                default:
                    LOG.info("registracionAPI API ENTRA EN: /jsp_app/registro/registracion.jsp");
                    request.getRequestDispatcher("/jsp_app/registro/registracion.jsp").forward(request, response);
                    break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(registracionAPI.class.getName()).log(Level.SEVERE, null, ex);
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
        processRequest(request, response);
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
        processRequest(request, response);
    }

    private Usuario getUsuario(HttpServletRequest request) {
        Usuario usuario = new Usuario();
        if (request.getParameter("action").equals("updateUsuario")) {
//            LOG.info("en getusuarioooooooooooo "+request.getParameter("txtTipoUsuarioER"));
            usuario.setIdusuario(Integer.parseInt(request.getParameter("idusuario")));
            usuario.setTipo(request.getParameter("txtTipoUsuarioER"));
            usuario.setIdempresa(Integer.parseInt(request.getParameter("idempresa")));
            usuario.setUser(request.getParameter("mail"));
        } else {
            usuario.setNombreUsuario(request.getParameter("txtNombreUsuarioER"));
            usuario.setApellidoUsuario(request.getParameter("txtApellidoUsuarioER"));
            usuario.setPassword(request.getParameter("txtContraseñaER"));
            usuario.setUser(request.getParameter("mail"));
            usuario.setTipo(request.getParameter("txtTipoUsuarioER"));
            LOG.info("paso 2 nombre usuario " + request.getParameter("txtNombreUsuarioER"));
        }
        return usuario;
    }

    private HashMap<String, Object> getParameters(HttpServletRequest request) {
        this.parameters.clear();
        LOG.info(request.getParameter("mail"));
        this.parameters.put("FILTER", request.getParameter("mail"));
        this.parameters.put("SQL_ORDERS", "USUARIO ASC");
        if (request.getParameter("sizePageUsuario").equals("ALL")) {
            this.parameters.put("SQL_LIMIT", "");
        } else {
            this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePageusuario") + " OFFSET "
                    + (Integer.parseInt(request.getParameter("numberPageUsuario")) - 1) * Integer.parseInt(request.getParameter("sizePageUsuario")));
        }
        LOG.info(this.parameters.toString());
        return this.parameters;
    }

    private void processUsuario(BEAN_CRUD beanCrud, HttpServletResponse response) {
        try {
            this.jsonResponse = this.json.toJson(beanCrud);
            LOG.info(this.jsonResponse);
            response.setContentType("application/json");
            response.getWriter().write(this.jsonResponse);
        } catch (IOException ex) {
            Logger.getLogger(registracionAPI.class.getName()).log(Level.SEVERE, null, ex);
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

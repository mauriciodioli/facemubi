/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.api.session;

import com.google.gson.Gson;
import com.jcode.myapp.api.registro.registracionAPI;
import com.jcode.myapp.dao.impl.session.UsuarioDAOImpl;
import com.jcode.myapp.dao.session.UsuarioDAO;
import com.jcode.myapp.model.session.Usuario;
import com.jcode.myapp.utilities.BEAN_CRUD;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;
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
 * @author JCode
 */
@WebServlet(name = "SessionAPI", urlPatterns = {"/session"})
public class SessionAPI extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(registracionAPI.class.getName());

    @Resource(name = "jdbc/dbmyapp")
    private DataSource pool;
    private Gson json;
    private String jsonResponse;
    private HashMap<String, Object> JSONROOT;
    private HttpSession session;
    private HashMap<String, Object> parameters;
    private UsuarioDAO usuarioDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        this.JSONROOT = new HashMap<>();
        this.json = new Gson();
        this.parameters = new HashMap<>();

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
        String separador = Pattern.quote("{");
        String[] palabra = null;
        String[] UsuarioDatos = null;
        int bandera = 0;
        Usuario usuarioCargarGetUsuario = new Usuario();
        this.session = request.getSession();
        LOG.info("get atributo session " + this.session.getAttribute("usuario"));
        if (this.session.getAttribute("usuario") == null) {
            try {
                //NO HAY SESSION CREAMOS UNA
                String user = request.getParameter("txtNombreUsuarioER");//SE CARGA EL USUARIO
                usuarioCargarGetUsuario.setUser(user);
                processUsuario(new BEAN_CRUD(this.usuarioDAO.getPagination(getParameters(request))), response);// SE CONSULTA LOS USAURIOS EN LA DB
                LOG.info("this.jsonResponse.length() " + this.jsonResponse.length());
                if (this.jsonResponse.length() > 48) {//SE FIJA SI LA CONSULTA DE USUARIO EXISTE EL NOMBRE DE USUARIO
                    String pass = request.getParameter("txtPass");//SI EXISTE EL USUARIO CARGA EL PASSWORD
//                    for (int i = 0; i < this.jsonResponse.length(); i++) {
                    String[] parts = this.jsonResponse.split(separador);
                    for (int i = 0; i < parts.length; i++) {
                        palabra = parts[i].replace("\"", "").replace("{", "").replace("}", "").replace("[", "").replace("]", "").split(",");
                        for (int j = 0; j < palabra.length; j++) {
//                         LOG.info(j+" j "+palabra[j]);
                            UsuarioDatos = palabra[j].split(":");
                            for (int y = 0; y < UsuarioDatos.length; y++) {
//                                LOG.info(y + " y  " + UsuarioDatos[y]);////                            
//                                if (UsuarioDatos[y].equals("user")) {
//                                 LOG.info("" + UsuarioDatos[y + 1]+" "+request.getParameter("txtNombreUsuarioER"));
//                                    if (UsuarioDatos[y + 1].equals(request.getParameter("txtNombreUsuarioER"))) {//
//                                LOG.info(" UsuarioDatos[y] " + UsuarioDatos[y] + " " + UsuarioDatos[y + 1] + " " + request.getParameter("txtNombreUsuarioER"));
                                if (UsuarioDatos[y].equals("idusuario")) {
//                                    LOG.info("tipo " + UsuarioDatos[y + 1]);
                                    usuarioCargarGetUsuario.setIdusuario(Integer.parseInt(UsuarioDatos[y + 1]));
                                }
                                if (UsuarioDatos[y].equals("tipo")) {
//                                    LOG.info("tipo " + UsuarioDatos[y + 1]);
                                    usuarioCargarGetUsuario.setTipo(UsuarioDatos[y + 1]);
                                }
                                if (UsuarioDatos[y].equals("idempresa")) {
//                                    LOG.info("idempresa " + UsuarioDatos[y + 1]);
                                    usuarioCargarGetUsuario.setIdempresa(Integer.parseInt(UsuarioDatos[y + 1]));
                                }
                                if (UsuarioDatos[y].equals("password")) {
                                    LOG.info("" + UsuarioDatos[y + 1] + " " + request.getParameter("txtPass"));
                                    if (UsuarioDatos[y + 1].equals(request.getParameter("txtPass"))) {
                                        usuarioCargarGetUsuario.setPassword(request.getParameter("txtPass"));
                                        bandera = 1;
//                                        this.session.setAttribute("usuario",request.getParameter("txtNombreUsuarioER"));
//                                        this.JSONROOT.put("RESPUESTA_SERVER", "ok");
//                                        LOG.info("password correcto " + UsuarioDatos[y] + " " + UsuarioDatos[y + 1] + " " + request.getParameter("txtPass"));

                                    } else {
                                        bandera = 0;
                                        this.JSONROOT.put("RESPUESTA_SERVER", "Contraseña Incorrecta");
                                    }

                                }
//                                    } else {
//                                        this.JSONROOT.put("RESPUESTA_SERVER", "El Usuario Ingresado no existe");
//                                        break;
//                                    }

//                                }
                            }
                        }
                    }

//                }
//                String user = request.getParameter("txtNombreUsuarioER");
//                Usuario usuario = this.usuarioDAO.getUser(user);
//                if (usuario != null) {
//                    String pass = request.getParameter("txtPass");
//
//                    if (pass.equals(usuario.getPassword())) {
                    if (bandera == 1) {
                        //ASIGNAMOS EL USUARIO A SESSION
//                        LOG.info(usuarioCargarGetUsuario.getUser() + " " + usuarioCargarGetUsuario.getIdempresa() + " " + usuarioCargarGetUsuario.getTipo());
                        Usuario usuario = this.usuarioDAO.getUser(usuarioCargarGetUsuario.getIdusuario() + "," +usuarioCargarGetUsuario.getUser() + "," + usuarioCargarGetUsuario.getIdempresa() + "," + usuarioCargarGetUsuario.getTipo());
//                        LOG.info("usuario "+request.getParameter("txtNombreUsuarioER"));
                        this.session.setAttribute("usuario", usuario);
                        this.JSONROOT.put("RESPUESTA_SERVER", "ok");
                    } else {
                        this.JSONROOT.put("RESPUESTA_SERVER", "Contraseña Incorrecta");
                    }
                } else {

                    this.JSONROOT.put("RESPUESTA_SERVER", "El Usuario Ingresado no existe");
                }
                this.jsonResponse = this.json.toJson(this.JSONROOT);
                response.setContentType("application/json");
                response.getWriter().write(this.jsonResponse);
            } catch (SQLException ex) {
                Logger.getLogger(SessionAPI.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            response.sendRedirect("index");
        }
    }

    private HashMap<String, Object> getParameters(HttpServletRequest request) {
        this.parameters.clear();
        this.parameters.put("FILTER", request.getParameter("txtNombreUsuarioER"));
        this.parameters.put("SQL_ORDERS", "USUARIO ASC");
        LOG.info(request.getParameter("sizePageUsuario") + " sizePageUsuario request.getParameter(txtNombreUsuarioER) " + request.getParameter("txtNombreUsuarioER"));
        if (request.getParameter("sizePageUsuario").equals("ALL")) {
            this.parameters.put("SQL_LIMIT", "");
        } else {
            this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePageUsuario") + " OFFSET "
                    + (Integer.parseInt(request.getParameter("numberPageUsuario")) - 1) * Integer.parseInt(request.getParameter("sizePageUsuario")));
        }
        return this.parameters;
    }

    private void processUsuario(BEAN_CRUD beanCrud, HttpServletResponse response) {
//        try {

        this.jsonResponse = this.json.toJson(beanCrud);
        LOG.info(this.jsonResponse);
//            response.setContentType("application/json");
//            response.getWriter().write(this.jsonResponse);

//        } catch (IOException ex) {
//            Logger.getLogger(registracionAPI.class.getName()).log(Level.SEVERE, null, ex);
//        }
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

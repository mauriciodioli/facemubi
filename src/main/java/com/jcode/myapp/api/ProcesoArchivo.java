/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.jcode.myapp.api;

import com.google.gson.Gson;
import com.jcode.myapp.dao.EmpresaDAO;
import com.jcode.myapp.dao.ProductoDAO;
import com.jcode.myapp.dao.impl.EmpresaDAOImpl;
import com.jcode.myapp.dao.impl.ProductoDAOImpl;
import com.jcode.myapp.model.Categoria;
import com.jcode.myapp.model.Empresa;
import com.jcode.myapp.model.Producto;
import com.jcode.myapp.model.session.Usuario;
import com.jcode.myapp.utilities.BEAN_CRUD;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.Resource;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import javax.sql.DataSource;

/**
 *
 * @author Mauricio
 */
@WebServlet(name = "ProcesoArchivo", urlPatterns = {"/ProcesoArchivo"})
@MultipartConfig(maxFileSize = 16177215)    // upload file's size up to 16MB
public class ProcesoArchivo extends HttpServlet {

    private static final Logger LOG = Logger.getLogger(ProductoAPI.class.getName());
    @Resource(name = "jdbc/dbmyapp")
    private DataSource pool;
    private Gson json;
    private String jsonResponse;
    private HashMap<String, Object> parameters;
    private String action = null;
    private HttpSession session;

    private ProductoDAO productoDAO;
    private EmpresaDAO empresaDAO;

    @Override
    public void init() throws ServletException {
        super.init(); //To change body of generated methods, choose Tools | Templates.
        this.parameters = new HashMap<>();
        this.json = new Gson();

        this.productoDAO = new ProductoDAOImpl(this.pool);
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
            throws ServletException, IOException, SQLException {

        //response.setContentType("text/html:chartset-UTF-8");
//        Producto producto = new Producto();
        String thisIp = InetAddress.getLocalHost().getHostAddress();
        response.sendRedirect("http://" + thisIp + ":8080/myapp/pedidos");
        String fileName = "";
        LOG.info("switch (this.action) " + request.getParameter("action"));
        // this.action = request.getParameter("action") == null ? "" : request.getParameter("action");
       
        if (this.action == null || this.action == " ") {
            if (request.getParameter("cbox1") == null) {
                this.action = "ImagenFrente";
                // LOG.info("this.actionImagenFrente------ " + this.action);
            } else {
                this.action = request.getParameter("cbox1");
                //LOG.info("this.cbox1------ " + this.action);
            }
        }
        if (request.getParameter("action").equals("ImagenBotonProducto")) {this.action = request.getParameter("action");}
        try {
            LOG.info("switch (this.action) " + this.action);
            switch (this.action) {
                case "ImagenFrente":
                   // LOG.info("request.getParameter(cbox1)------------------- " + request.getParameter("cbox1"));
                    processEmpresa(this.empresaDAO.update(getEmpresa(request, subirImagen(request, response, fileName)), getParameters(request)), response);
                    break;
                case "ImagenBotonProducto":
                    processProducto(this.productoDAO.update(getProducto(request, subirImagen(request, response, fileName)), getParameters(request)), response);
                    break;
                case "LogoEmpresa":
                   LOG.info("estoy en editar PROOOOOOOOOOOOOOOOOOOOOOOOODUCTOOOOOOOOOOO");
                    processEmpresa(this.empresaDAO.update(getEmpresa(request, subirImagen(request, response, fileName)), getParameters(request)), response);
                    break;

                default:
                    request.getRequestDispatcher("/jsp_app/mantenimiento/empresa.jsp").forward(request, response);
                    break;
            }
        } catch (SQLException ex) {
            Logger.getLogger(EmpresaAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
        //sql auto = new sql();
//      //  int nuevoid = auto.auto_increm("SELECT MAX(codigoimg) FROM imagen;");
//        
//       
//
        //System.out.println("ficheroooooooooooooooooo: "+request.getPart("")ParameterNames());
//        InputStream inputStream = null;
//        try {
//            validarExt();
//
//            Part filePart = request.getPart("fichero");

//            if (filePart.getSize() > 0) {
//
//                System.out.println(filePart.getName());
//                System.out.println(filePart.getSize());
//                System.out.println(filePart.getContentType());
//                inputStream = filePart.getInputStream();
//            }
//        } catch (Exception ex) {
//            System.out.println("ficheroooooooooooooooooo: " + ex.getMessage());
//        }
//        try {
//            
//            if (estado.equalsIgnoreCase("insert")) {
//                imagenvo.setCodigoimg(nuevoid);
//                if (inputStream != null) {
//                    imagenvo.setArchivoimg(inputStream);
//                }
//                imagendao.Agregar_ImagenVO(imagenvo);
//            } else {
//                imagenvo.setCodigoimg(id_pdf);
//                if (inputStream != null) {
//                    imagenvo.setArchivoimg(inputStream);
//                    imagendao.Modificar_ImagenVO(imagenvo);
//                } else {
//                    imagendao.Modificar_ImagenVO2(imagenvo);
//                }
//            }
//        } catch (Exception ex) {
//            System.out.println("textos: "+ex.getMessage());
//        }
        //request.getRequestDispatcher("/jsp_app/tareas/pedido.jsp").forward(request, response);
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
            if (u.getTipo().equals("administrador") || u.getTipo().equals("root")) {
                try {
                    processRequest(request, response);
                } catch (SQLException ex) {
                    Logger.getLogger(ProcesoArchivo.class.getName()).log(Level.SEVERE, null, ex);
                }
            }

        }

    }

    private String getFileName(final Part part) {
        final String partHeader = part.getHeader("content-disposition");

        for (String content : part.getHeader("content-disposition").split(";")) {
            if (content.trim().startsWith("filename")) {
                return content.substring(content.indexOf('=') + 1).trim().replace("\"", "");
            }
        }
        return null;
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

    private void processProducto(BEAN_CRUD beanCrud, HttpServletResponse response) {
        try {
            this.jsonResponse = this.json.toJson(beanCrud);
            LOG.info(this.jsonResponse);
            response.setContentType("application/json");
            response.getWriter().write(this.jsonResponse);
        } catch (IOException ex) {
            Logger.getLogger(ProductoAPI.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private Empresa getEmpresa(HttpServletRequest request, String fileName) {
        Empresa empresa = new Empresa();        
        empresa.setIdempresa(Integer.parseInt(request.getParameter("txtIdEmpresaER")));
        empresa.setNombreempresa(request.getParameter("NombreEmpresa"));
        empresa.setDireccionempresa(request.getParameter("DireccionEmpresa"));
        empresa.setTelefonoempresa(Long.valueOf(request.getParameter("telefonoEmpresa")));
        if (request.getParameter("cbox1") == null) {
            this.action = "ImagenFrente";
        }
        switch (this.action) {
            case "ImagenFrente":
                empresa.setImagenfrente(fileName);
                empresa.setLogoempresa(request.getParameter("LogoEmpresa"));
                break;
            case "LogoEmpresa":
                empresa.setImagenfrente(request.getParameter("ImagenFrente"));
                empresa.setLogoempresa(fileName);
                break;

        }
        return empresa;
    }

    private Producto getProducto(HttpServletRequest request, String fileName) {
        
        Producto producto = new Producto();
        producto.setIdproducto(Integer.parseInt(request.getParameter("txtIdProducto")));    
        producto.setNombre(request.getParameter("NombreProducto"));
        producto.setPrecio(Double.parseDouble(request.getParameter("PrecioProducto")));
        producto.setStock(Integer.parseInt(request.getParameter("CantidadPrendas")));
        producto.setStock_min(Integer.parseInt(request.getParameter("Stock_minProducto")));
        producto.setStock_max(Integer.parseInt(request.getParameter("Stock_maxProducto")));
        LOG.info("fileName " + fileName);
        producto.setCategoria(new Categoria(1));
        producto.setNombreImagenBoton(fileName);
        return producto;

        //   producto.setCategoria(new Categoria(Integer.parseInt(request.getParameter("cboCategoriaProductoER"))));
    }

    private HashMap<String, Object> getParameters(HttpServletRequest request) {
        this.parameters.clear();
        switch (request.getParameter("action")) {
            case "ImagenFrente":
                LOG.info("getparameters ProcesoArchivo  " + request.getParameter("txtIdEmpresa"));
                this.parameters.put("FILTER", request.getParameter("NombreEmpresa"));
                this.parameters.put("SQL_ORDERS", "NOMBRE ASC");
                this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePageEmpresa") + " OFFSET "
                        + (Integer.parseInt(request.getParameter("NumberPageEmpresa")) - 1) * Integer.parseInt("10"));
                break;
            case "ImagenBotonProducto":
                LOG.info("getparameters ProcesoArchivo  " + request.getParameter("NombreProducto"));
                this.parameters.put("FILTER", request.getParameter("NombreProducto"));
                this.parameters.put("SQL_ORDERS", "NOMBRE ASC");
                this.parameters.put("SQL_LIMIT", " LIMIT " + request.getParameter("sizePageProducto") + " OFFSET "
                        + (Integer.parseInt(request.getParameter("NumberPageProducto")) - 1) * Integer.parseInt("10"));
                break;
            case "LogoEmpresa":

                break;

            default:
                break;

        }

        return this.parameters;
    }

    private String subirImagen(HttpServletRequest request, HttpServletResponse response, String fileName)
            throws ServletException, IOException, SQLException {
        //final String path = "\\icon";
        String applicationPath = request.getServletContext().getRealPath("");
        applicationPath = applicationPath + "\\assets\\images\\icon";
        final Part filePart = request.getPart("fichero");
        fileName = getFileName(filePart);

//        LOG.info("txtIdProducto "+request.getParameter("txtIdProducto"));
        // LOG.info("path----------------------------------->>>>>>>>>>><< " + applicationPath);
//        LOG.info("subirImagen fileName " + fileName);
        OutputStream out = null;
        InputStream filecontent = null;
        final PrintWriter writer = response.getWriter();
        File directorio = new File(applicationPath);
        if (!directorio.exists()) {
            if (directorio.mkdirs()) {
                System.out.println("Directorio creado");
            }
        }

        try {
            out = new FileOutputStream(new File(applicationPath + File.separator + fileName));
            filecontent = filePart.getInputStream();

            int read = 0;
            final byte[] bytes = new byte[1024];

            while ((read = filecontent.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            // writer.println(fileName + " created at " + path);

        } catch (FileNotFoundException fne) {
            writer.println("Error in file upload  ERROR:" + fne.getMessage());

        } finally {
            if (out != null) {
                out.close();
            }
            if (filecontent != null) {
                filecontent.close();
            }
            if (writer != null) {
                writer.close();
            }
        }
        return fileName;
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

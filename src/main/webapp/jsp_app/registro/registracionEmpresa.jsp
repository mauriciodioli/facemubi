<%-- 
    Document   : registracion
    Created on : 18/12/2019, 18:44:00
    Author     : Mauricio
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Clear Dry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="<%out.print(getServletContext().getContextPath());%>/resources_app/favicon.png">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/font-awesome.min.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/themify-icons.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/metisMenu.css">
        <!-- others css -->
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/typography.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/default-css.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/styles.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/responsive.css">

        <!-- modernizr css -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/modernizr-2.8.3.min.js"></script>
    </head>

    <body>
        <!--[if lt IE 8]>
                     <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
                 <![endif]-->
        <!-- preloader area start -->
        <div id="preloader">
            <div class="loader"></div>
        </div>
        <!-- preloader area end -->
        <!-- page container area start -->
        <div class="page-container">
            <!-- sidebar menu area start -->
            <div class="sidebar-menu">
                <div class="sidebar-header">
                    <div class="logo">
                        <a href="index"><img id="logoEmpresa" src="assets/images/icon/facemubi.png" alt="logo"></a>
                    </div>
                </div>                
            </div>
            <!-- sidebar menu area end -->
            <!-- main content area start -->
            <div class="main-content">
                <!-- header area start -->
                <div class="header-area">
                    <div class="row align-items-center">
                        <!-- nav and search button -->
                        <div class="col-4 clearfix">
                            <div class="nav-btn pull-left" style="margin-top: 0px">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>                        
                        <!-- profile info & task notification -->
                        <div class="col-8 clearfix">                            
                            <ul class="notification-area pull-right">                                 
                                <li>
                                    <a href="cerrarsession">
                                        Cerrar Sessión
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                            <h5 class="card-title pull-left">REGISTRO EMPRESA</h5>
                        </div>
                    </div>
                </div>
                <!-- header area end -->
                <div class="main-content-inner" style="margin-left: 0px">
                    <div class="row">
                        <input type="hidden" id="nameFormEmpresa" value="FrmEmpresa">
                        <input type="hidden" id="actionEmpresa" name="action" value="paginarEmpresa">
                        <input type="hidden" id="numberPageEmpresa" name="numberPageEmpresa" value="1">                       
                        <form id="FrmEmpresa">
                            <div class="col-12 form-group">
                                <label for="txtNombreEmpresaER">NOMBRE DE MI EMPRESA</label>
                                <input type="text" id="txtNombreEmpresaER" name="txtNombreEmpresaER" class="form-control form-control-sm" placeholder="NOMBRE">
                                <div class="error-validation" id="validarNombreEmpresaER">Ingrese Nombre</div>
                            </div>
                            <div class="col-sm-6 col-12 form-group">
                                <label for="txtDireccionEmpresaER">DIRECCION</label>
                                <input type="text" id="txtDireccionEmpresaER" name="txtDireccionEmpresaER" class="form-control form-control-sm" placeholder="DIRECCION">
                                <div class="error-validation" id="validarDireccionEmpresaER">Ingrese Direccion</div>
                            </div>
                            <div class="col-sm-6 col-12 form-group">
                                <label for="txtTelefonoEmpresaER">TELEFONO</label>
                                <input type="text" id="txtTelefonoEmpresaER" name="txtTelefonoEmpresaER" class="form-control form-control-sm" placeholder="TELEFONO">
                                <div class="error-validation" id="validarTelefonoEmpresaER">Ingrese Telefono</div>
                            </div>
                            <div class="col-sm-6 col-12 form-group">
                                <label for="txtImagenFrenteEmpresaER">IMAGEN DE FRENTE</label>
                                <input type="text" id="txtImagenFrenteEmpresaER" name="txtImagenFrenteEmpresaER" class="form-control form-control-sm" placeholder="IMAGEN DE FRENTE">
                                <div class="error-validation" id="validarImagenFrenteEmpresaER">Ingrese Imagen</div>
                            </div>
                            <div class="col-sm-6 col-12 form-group">
                                <label for="txtImagenLogoEmpresaER">LOGO EMPRESA</label>
                                <input type="text" id="txtImagenLogoEmpresaER" name="txtImagenLogoEmpresaER" class="form-control form-control-sm" placeholder="LOGO EMPRESA">
                                <div class="error-validation" id="validarImagenLogoEmpresaER">Ingrese Imagen</div>
                            </div>                                    
                            <input type="hidden" id="txtIdEmpresaER" name="txtIdEmpresaER" value="">
                        </form>  
                    </div>
                </div>

                <div class="col-sm-12 col-12 form-group"> 
                    <form action="ProcesoArchivo" method="POST" enctype="multipart/form-data"  id="formimg" name="formimg" >
                        <label for="fichero">Imagen de Empresa</label>
                        <br><label><input type="checkbox" name="cbox1" id="cbox1" value="LogoEmpresa"> Marcar si es logo de la Empresa</label><br>

                        <input type="file" name="fichero" class="form-control form-control-sm " placeholder="IMAGEN DE EMPRESA"/><br/>

                        <input type="submit" value="Subir Imagen" name="submit" id="ImagenBotonEmpresa " class="ImagenBotonEmpresa btn btn-primary btn-xs "/>
                        <input type="hidden" id="txtIdEmpresa" name="txtIdEmpresa" value="">  
                        <input type="hidden" id="NombreEmpresa" name="NombreEmpresa" value=""> 
                        <input type="hidden" id="DireccionEmpresa" name="DireccionEmpresa" value=""> 
                        <input type="hidden" id="telefonoEmpresa" name="telefonoEmpresa" value="">  
                        <input type="hidden" id="ImagenFrente" name="ImagenFrente" value="10">  
                        <input type="hidden" id="LogoEmpresa" name="LogoEmpresa" value="">  
                        <input type="hidden" id="NumberPageEmpresa" name="NumberPageEmpresa" value="1">
                        <input type="hidden" id="actionEmpresa" name="action" value="">

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                    <button type="submit" class="btn btn-primary btn-xs">GUARDAR</button>
                </div>
            </div>
        </div>

        <!-- main content area end -->
        <!-- footer area start-->

        <!-- footer area end-->
    </div>
    <!-- page container area end -->
    <!-- jquery latest version -->
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/jquery-2.2.4.min.js"></script>
    <!-- bootstrap 4 js -->
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/popper.min.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/bootstrap.min.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/metisMenu.min.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery.slimscroll.min.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery.slicknav.min.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/registroUsuarios/registracionEmpresa.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/scripts.js"></script>
</body>
</html>

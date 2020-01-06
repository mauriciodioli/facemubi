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
                            <h5 class="card-title pull-left">REGISTRO USUARIO</h5>
                        </div>
                    </div>
                </div>
                <!-- header area end -->
                <div class="main-content-inner" style="margin-left: 0px">
                    <div class="row">
                        <input type="hidden" id="actionUsuario" name="action" value="addUsuario">
                        <form id="FrmRegistroUsuario" name="FrmRegistroUsuario">
                            <p>Por favor complete estos campos para crear una cuenta.</p>
                            <hr>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="validartxtNombreUsuarioER">Persona</span>
                                    <div class="error-validation" id="validartxtNombreUsuarioER"></div>
                                </div>
                                <input type="text" class="form-control" id="txtNombreUsuarioER" placeholder="Nombre" required>
                                <input type="text" class="form-control" id="txtApellidoUsuarioER" placeholder="Apellido" required>
                            </div> 
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="Your Email" id="mail" name="email" required>
                                <div class="input-group-append">
                                    <span class="input-group-text">@example.com</span>                                    
                                </div>
                                <div class="error-validation" id="mail"></div>
                            </div>
                            <label for="psw"><b>Contraseña</b></label>
                            <input type="password" id="txtContraseñaER" placeholder="Enter Password" name="psw" required>
                            <label for="psw-repeat"><b>Repetir Contraseña</b></label>
                            <input type="password" id="contraseñaRepetida" placeholder="Repeat Password" name="psw-repeat" required>
                            <div class="error-validation" id="txtContraseñaER"></div>
                            <input type="hidden" id="txtTipoUsuarioER" value="usuario">
                            <hr>
                            <p>By creating an account you agree to our <a href="privacy_policy">Terms & Privacy</a>.</p>
                            <div class="modal-footer col-sm-6 col-12 form-group">                 
                                <button type="submit" class="btn btn-primary btn-xs registerbtn">Registrar</button>                   
                            </div>
                        </form>
                        <input type="hidden" id="txtIdClienteER" name="txtIdClienteER" value="">
                    </div>
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
    <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/utilities/lib-utilities.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/js_app/view/sweetalert.min.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/registroUsuarios/registracion.js"></script>
    <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/scripts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"></script>
    <script src="https://cdn.emailjs.com/dist/email.min.js" type="text/javascript"></script>
</body>
</html>

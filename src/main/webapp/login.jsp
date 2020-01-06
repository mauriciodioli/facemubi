<%-- 
    Document   : login
    Created on : 20/11/2018, 11:18:14 PM
    Author     : JCode
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js" lang="en">
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
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/slicknav.min.css">
        <!-- others css -->
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/typography.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/default-css.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/styles.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/assets/css/responsive.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/css_app/view/sweetalert.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/css_app/view/estilos.css">

        <!-- modernizr css -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/modernizr-2.8.3.min.js"></script>
    </head>

    <body>
        <div id="fb-root"></div>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v5.0&appId=423024761703339&autoLogAppEvents=1"></script>
        <div class="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
        <!--[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
        <!-- preloader area start -->
        <div id="preloader">
            <div class="loader"></div>
        </div>
        <!-- preloader area end -->
        <!-- login area start -->
        <div class="login-area">
            <div class="container">
                <div class="login-box ptb--70">                   
                    <form id="FrmLogin">
                        <div class="login-form-head">
                            <h4 style="text-transform: none">Lavanderia Miami</h4>
                        </div>
                        <div class="login-form-body">
                            <div class="form-gp">
                                <label for="txtUsuario">Usuario</label>
                                <input type="text" id="txtUsuario" name="txtUsuario">
                                <i class="fa fa-user"></i>
                                <div id="validarUsuario" class="error-validation-login">Ingrese Usuario</div>
                            </div>
                            <div class="form-gp">
                                <label for="txtPass">Contraseña</label>
                                <input type="password" id="txtPass" name="txtPass">
                                <i class="ti-lock"></i>
                                <div id="validarPass" class="error-validation-login">Ingrese Contraseña</div>
                            </div>
                            <div class="row mb-4 rmber-area">
                                <div class="col-12 text-right">
                                    <a href="#">Olvidaste Contraseña?</a>
                                </div>
                            </div>
                            <div class="submit-btn-area">
                                <button id="form_submit" type="submit">Ingresar <i class="ti-arrow-right"></i></button>
                                <div class="login-other row mt-4">
                                    <div class="col-12 fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
                                <div class="col-12 row mt-4">
                                    <a class="google-login " style="margin-left: 18%" href="#">Ingresar con <i class="fa fa-google"></i></a>
                                </div>
                                </div>
                                
                            </div>
                            <div class="form-footer text-center mt-3">
                                <label type="text"><p class="text-muted ">No tienes una cuenta?</p> <span class="caret"></span></label>
                                <label type="text" class="dropdown-toggle text-muted"
                                       data-toggle="dropdown">
                                    <span style="color: blue;"><h7>Regístrate</h7> </span>                                     
                                </label>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="registracion">Para mi</a></li>
                                    <li class="divider"></li>
                                    <li><a href="registracionEmpresa">Para mi empresa</a></li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal" id="modalCargandoLogin" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="progress" style="margin-bottom: 0px;">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                                Cargando...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- login area end -->

        <!-- jquery latest version -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/jquery-2.2.4.min.js"></script>
        <!-- bootstrap 4 js -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/popper.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/bootstrap.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/owl.carousel.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/metisMenu.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery.slimscroll.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery.slicknav.min.js"></script>

        <!-- others plugins -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/plugins.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/scripts.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/view/sweetalert.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/utilities/lib-utilities.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/login.js"></script>
        <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
    </body>

</html>

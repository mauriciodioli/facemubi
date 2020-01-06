<%-- 
    Document   : cliente
    Created on : 11/11/2019, 12:43:21
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
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/css_app/view/sweetalert.css">
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/css_app/view/estilos.css">

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
                        <input type="hidden" id="IPRemoto" name="IPRemoto" >

                    </div>
                    <br>
                    <h6 class="text-center" style="color: aliceblue"><i class="fa fa-user"></i> <strong><%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getNombreUsuario());%></strong></h6>
                    <input class="text-center" id="sessionUsuario" type="hidden" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getUser());%>>
                    <input class="text-center" id="sessionEmpresa" type="hidden" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getIdempresa());%>>
                    <input class="text-center" id="sessionTipo" type="hidden" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getTipo());%>>
                    <input class="text-center" id="sessionNombreUsuario" type="hidden" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getNombreUsuario());%>>
                    <input class="text-center" id="sessionIdUsuario" type="hidden" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getIdusuario());%>>

                </div>
                <jsp:include page="../../menu.jsp"/>
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
                        </div>
                    </div>
                </div>
                <!-- header area end -->
                <div class="main-content-inner" style="padding-top: 30px">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">CLIENTES</h5>
                                    <input type="hidden" id="nameFormCliente" value="FrmCliente">
                                    <input type="hidden" id="actionCliente" name="action" value="paginarCliente">
                                    <input type="hidden" id="numberPageCliente" name="numberPageCliente" value="1">                                    
                                    <form id="FrmCliente">
                                        <div class="row mt-3">
                                            <div class="form-group col-md-9 col-12">
                                                <input type="text" name="txtNombreCliente" id="txtNombreCliente" class="form-control form-control-sm" placeholder="NOMBRE">
                                            </div>
                                            <div class="form-group col-md-3 col-12">
                                                <button type="submit" id="btnBuscarCliente" class="btn btn-primary btn-xs mr-3" data-toggle="tooltip" title="Buscar Cliente"><i class="fa fa-search" aria-hidden="true"></i> BUSCAR</button>
                                                <button type="button" id="btnAbrirNCliente" class="btn btn-primary btn-xs" data-toggle="tooltip" title="Agregar Cliente"><i class="fa fa-plus-square" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="table-responsive">
                                                <table
                                                    class="table table-hover table-bordered ">
                                                    <thead class="bg-primary">
                                                        <tr class="text-white">
                                                            <th>NOMBRE</th>
                                                            <th>TELEFONO</th>
                                                            <th>DIRECCION</th>
                                                            <th>RED SOCIAL</th>
                                                            <th>EMAIL</th>
                                                            <th style="width: 10%" colspan="3" class="text-medium-table">ACCIONES</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbodyCliente">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card"
                                                 style="height: 50px; margin-bottom: 0px">
                                                <div class="card-body" style="padding-top: 10px; padding-bottom: 10px; padding-left: 0px; padding-right: 0px">
                                                    <div class="row">
                                                        <div class="col-md-2 col-sm-3 col-4">
                                                            <select id="sizePageCliente" name="sizePageCliente" class="form-control form-control-sm combo-paginar" idBtnBuscar='btnBuscarCliente'>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                                <option value="20">20</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-10 col-sm-9 col-8">
                                                            <nav aria-label="Page navigation example">
                                                                <ul id="paginationCliente" class="pagination pagination-sm justify-content-end">

                                                                </ul>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ventanaModalManCliente" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form id="FrmClienteModal">
                            <div class="modal-header">
                                <h6 class="modal-title" id="tituloModalManCliente"></h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12 form-group">
                                        <label for="txtNombreClienteER">NOMBRE</label>
                                        <input type="text" id="txtNombreClienteER" name="txtNombreClienteER" class="form-control form-control-sm" placeholder="NOMBRE">
                                        <div class="error-validation" id="validarNombreClienteER">Ingrese Nombre</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtTelefonoClienteER">Telefono</label>
                                        <input type="text" id="txtTelefonoClienteER" name="txtTelefonoClienteER" class="form-control form-control-sm" placeholder="CELULAR">
                                        <div class="error-validation" id="validarTelefonoClienteER">Ingrese Telefono</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtemailClienteER">email</label>
                                        <input type="text" id="txtemailClienteER" name="txtemailClienteER" class="form-control form-control-sm" placeholder="EMAIL">
                                        <div class="error-validation" id="validaremailClienteER">Ingrese email</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtRed_SocialClienteER">Usuario</label>
                                        <input type="text" id="txtRed_SocialClienteER" name="txtRed_SocialClienteER" class="form-control form-control-sm" placeholder="RED SOCIAL">
                                        <div class="error-validation" id="validarRed_SocialClienteER">Ingrese Red Social</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtDireccionClienteER">Direccion </label>
                                        <input type="text" id="txtDireccionClienteER" name="txtDireccionClienteER" class="form-control form-control-sm" placeholder="DIRECCION DE ENTREGA">
                                        <div class="error-validation" id="validarDireccionClienteER">Ingrese Direccion</div>
                                    </div>
                                    <div class="col-12 form-group">
                                        <label for="cboRED_SOCIALClienteER">RED SOCIAL</label>
                                        <select class="form-control form-control-sm" id="cboRedSocialClienteER" name="cboRedSocialClienteER">
                                            <option value="10">facebook</option>
                                            <option value="20">Instagram</option>
                                            <option value="30">twitter</option>
                                        </select>
                                        <div class="error-validation" id="validarRED_SOCIALClienteER">Seleccione Cliente</div>
                                    </div>
                                    <input type="hidden" id="txtIdClienteER" name="txtIdClienteER" value="">
                                    <input type="hidden" id="txtIdEmpresaER" name="txtIdEmpresaER" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getIdempresa());%>>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                                <button type="submit" class="btn btn-primary btn-xs">GUARDAR</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="ventanaModalManPedido" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h6 class="modal-title" id="tituloModalManCliente">PEDIDOS DEL CLIENTE</h6>
                        </div> <input type="hidden" id="txtNombreClienteERP" name="txtNombreClienteERP" class="form-control form-control-sm" placeholder="NOMBRE">
                        <input type="hidden" id="txtTelefonoClienteERP" name="txtTelefonoClienteERP" class="form-control form-control-sm" placeholder="CELULAR">
                        <input type="hidden" id="txtIdClienteERP" name="txtIdClienteERP" value="">
                        <input type="hidden" id="txtDireccionClienteERP" name="txtDireccionClienteERP" class="form-control form-control-sm" placeholder="DIRECCION DE ENTREGA">
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" class="btn btn-primary btn-xs AsignarClienteAPedido"><i class='fa fa-search'></i>BUSCAR</button>
                        </div>
                        <div class="col-12 form-group">
                            <label for="cboClienteERL">BUSCAR POR NOMBRE O TELEFONO O DIRECCION</label>
                            <select class="form-control form-control-sm cboClienteER" placeholder='Seleccione...' id="cboClienteER" name="cboClienteER">
                                <option >Telefono</option>
                                <option >Nombre</option>
                                <option >Direccion</option>  
                                <option >Pagado</option>
                                <option >No Pagado</option>
                            </select>
                            <div class="error-validation" id="validarRED_SOCIALClienteER">Seleccione Cliente</div>
                        </div>                       
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-bordered " id="tableClienteModal">
                                        <thead class="bg-primary">
                                            <tr class="text-white">
                                                <th>FECHA</th>
                                                <th>TOTAL</th>
                                                <th>DESCRIPCION</th>   
                                                <th>ESTADO</th>
                                                <th>LITROS</th>                                                   
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyPedido">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="modalCargandoCliente" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
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
            <!-- main content area end -->
            <!-- footer area start-->
            <jsp:include page="../../footer.jsp"/>
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
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/scripts.js"></script>

        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/utilities/lib-utilities.js"></script>

        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/view/jquery.Pagination.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/view/sweetalert.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/cliente.js"></script>
    </body>
</html>

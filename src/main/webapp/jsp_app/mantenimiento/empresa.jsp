<%-- 
    Document   : categoria
    Created on : 19/11/2018, 09:45:41 PM
    Author     : JCode
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
                                    <h5 class="card-title">EMPRESA</h5>
                                    <input type="hidden" id="nameFormUsuario" value="frmusuario">
                                    <input type="hidden" id="nameFormEmpresa" value="FrmEmpresa">
                                    <input type="hidden" id="actionEmpresa" name="action" value="paginarEmpresa">
                                    <input type="hidden" id="numberPageEmpresa" name="numberPageEmpresa" value="1">
                                    <input type="hidden" id="actionUsuario" name="action" value="paginarUsuario">
                                    <input type="hidden" id="numberPageUsuario" name="numberPageUsuario" value="1">
                                    <form id="FrmEmpresa">
                                        <div class="row mt-3">
                                            <div class="form-group col-md-9 col-12">
                                                <input type="text" name="txtNombreEmpresa" id="txtNombreEmpresa" class="form-control form-control-sm" placeholder="NOMBRE">
                                                <input type="hidden" id="txtCboCategoriaEmpresaER">
                                            </div>
                                            <div class="form-group col-md-3 col-12">
                                                <button type="submit" id="btnBuscarEmpresa" class="btn btn-primary btn-xs mr-3" data-toggle="tooltip" title="Buscar Empresa"><i class="fa fa-search" aria-hidden="true"></i> BUSCAR</button>
                                                <button type="button" id="btnAbrirNEmpresa" class="btn btn-primary btn-xs" data-toggle="tooltip" title="Agregar Empresa"><i class="fa fa-plus-square" aria-hidden="true"></i></button>
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
                                                            <th>DIRECCION</th>
                                                            <th>TELEFONO</th>
                                                            <th>IMAGEN DE FRENTE</th>
                                                            <th>LOGO EMPRESA</th>
                                                            <th style="width: 10%" colspan="3" class="text-medium-table">ACCIONES</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="tbodyEmpresa">
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
                                                            <select id="sizePageEmpresa" name="sizePageEmpresa" class="form-control form-control-sm combo-paginar" idBtnBuscar='btnBuscarEmpresa'>
                                                                <option value="10">10</option>
                                                                <option value="15">15</option>
                                                                <option value="20">20</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-10 col-sm-9 col-8">
                                                            <nav aria-label="Page navigation example">
                                                                <ul id="paginationEmpresa" class="pagination pagination-sm justify-content-end">

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
            <div id="ventanaModalManEmpresa" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form id="FrmEmpresaModal">
                            <div class="modal-header">
                                <h6 class="modal-title" id="tituloModalManEmpresa"></h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-12 form-group">
                                        <label for="txtNombreEmpresaER">NOMBRE</label>
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
                                        <input type="text" id="txtImagenFrenteEmpresaER" name="txtImagenFrenteEmpresaER" class="form-control form-control-sm" placeholder="NO TIENE">
                                        <div class="error-validation" id="validarImagenFrenteEmpresaER">Ingrese Imagen</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtImagenLogoEmpresaER">LOGO EMPRESA</label>
                                        <input type="text" id="txtImagenLogoEmpresaER" name="txtImagenLogoEmpresaER" class="form-control form-control-sm" placeholder="NO TIENE">
                                        <div class="error-validation" id="validarImagenLogoEmpresaER">Ingrese Imagen</div>
                                    </div>
                                    <div class="col-12 form-group">
                                        <label for="cboCATEGORIA_EMPRESAER">CATEGORIA DE EMPRESA</label>
                                        <select class="form-control form-control-sm cboCategoriaEmpresaER" id="cboCategoriaEmpresaER" name="cboCategoriaEmpresaER">
                                            <option >Seleccione...</option>
                                            <option >Tintoreria</option>
                                            <option >Gestoria</option>
                                            <option >Comida</option>    
                                            <option >Institucion</option>
                                        </select>
                                        <div class="error-validation" id="validarcboCategoriaEmpresaER">Seleccione Categoria</div>
                                    </div>                                       
                                    <input type="hidden" id="txtIdEmpresaER" name="txtIdEmpresaER" value="">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                                <button type="submit" class="btn btn-primary btn-xs">GUARDAR</button>
                            </div>
                        </form>
                        <div class="col-sm-12 col-12 form-group"> 
                            <form action="ProcesoArchivo" method="POST" enctype="multipart/form-data"  id="formimg" name="formimg" >
                                <label for="fichero">Imagen de Empresa</label>
                                <br><label><input type="checkbox" name="cbox1" id="cbox1" value="LogoEmpresa"> Marcar si es logo de la Empresa</label><br>

                                <input type="file" name="fichero" class="form-control form-control-sm " placeholder="IMAGEN DE EMPRESA"/><br/>
                                <div class="error-validation" id="validartxtFileER">Ingrese valor</div>
                                <input type="submit" value="Subir Imagen" name="submit" id="ImagenBotonEmpresa " class="ImagenBotonEmpresa btn btn-primary btn-xs "/>
                                <input type="hidden" id="txtIdEmpresaER" name="txtIdEmpresaER" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getIdempresa());%>>  
                                <input type="hidden" id="NombreEmpresa" name="NombreEmpresa" value=""> 
                                <input type="hidden" id="DireccionEmpresa" name="DireccionEmpresa" value=""> 
                                <input type="hidden" id="telefonoEmpresa" name="telefonoEmpresa" value="">  
                                <input type="hidden" id="ImagenFrente" name="ImagenFrente" value="10">  
                                <input type="hidden" id="LogoEmpresa" name="LogoEmpresa" value="">  
                                <input type="hidden" id="NumberPageEmpresa" name="NumberPageEmpresa" value="1">
                                <input type="hidden" id="actionEmpresa" name="action" value="">

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ventanaModalManUsuario" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h6 class="modal-title" id="tituloModalManUsuario">AGREGAR USUARIO</h6>
                        </div> 
                        <input type="hidden" id="txtNombreUsuarioER" name="txtNombreUsuarioER" class="form-control form-control-sm" placeholder="NOMBRE">
                        <input type="hidden" id="txtTelefonoUsuarioER" name="txtTelefonoUsuarioER" class="form-control form-control-sm" placeholder="CELULAR">
                        <input type="hidden" id="txtIdUsuarioER" name="txtIdUsuarioER" value="">
                        <input type="hidden" id="txtDireccionUsuarioER" name="txtDireccionUsuarioER" class="form-control form-control-sm" placeholder="DIRECCION DE ENTREGA">
                        <form id="FrmUsuario">
                            <div class="row mt-3" style="margin-left: 7px">
                                <div class="form-group col-md-9 col-12">
                                    <input type="text" name="mail" id="txtUsuario" class="form-control form-control-sm" placeholder="USUARIO">
                                </div>
                                <div class="form-group col-md-3 col-12">
                                    <button type="submit" id="btnBuscarUsuario" class="btn btn-primary btn-xs mr-3" data-toggle="tooltip" title="Buscar Usuario"><i class="fa fa-search" aria-hidden="true"></i> BUSCAR</button>
                                </div>
                            </div>
                        </form> 
                        <form id="FrmUsuarioAgregarUsuario"> 
                            <div class="row mt-3" style="margin-left: 7px">
                                <div class="form-group col-md-8 col-12" style="margin-left: 2px">
                                    <select class="form-control form-control-sm" id="cboRedSocialClienteER" name="cboRedSocialClienteER">
                                        <option>Seleccione...</option>
                                        <option value="usuario">Usuario</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="root">Root</option>
                                        <option value="cliente">Cliente</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-3 col-6" style="margin-left: px" >                                     
                                    <button type="submit"  id="btnAgregarUsuarioEmpresa" class="btn btn-primary btn-xs mr-3" data-toggle="tooltip" title="Agregar Usuario"><i class="fa fa-search" aria-hidden="true"></i> Agregar Usuario</button>
                                    <button type="button" style="margin-top: 7px" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                                </div>
                            </div>                             
                            <input type="hidden" id="idUsuarioAlmacenarEmpresa" name="idUsuarioAlmacenarEmpresa">
                            <input type="hidden" id="rolUsuarioAlmacenarEmpresa" name="rolUsuarioAlmacenarEmpresa">
                            <input type="hidden" id="mail" name="mail">
                            <input type="hidden" id="idEmpresaAlmacenarEmpresa" name="idEmpresaAlmacenarEmpresa">
                        </form> 
                        <div class="row" style="margin-top: 20px; margin-left: 7px; margin-right: 7px;">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-bordered " id="tableUsuarioModal">
                                        <thead class="bg-primary">
                                            <tr class="text-white">
                                                <th>IDUSUARIO</th>
                                                <th>USUARIO</th>
                                                <th>APELLIDO</th>   
                                                <th>TIPO</th>                                                                                               
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyUsuario">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="modalCargandoEmpresa" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
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
            <div class="modal" id="modalCargandoUsuario" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
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
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/empresa.js"></script>
    </body>
</html>

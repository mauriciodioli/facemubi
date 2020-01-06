<%-- 
    Document   : pedido
    Created on : 19/11/2018, 09:45:41 PM
    Author     : Mauricio
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js" lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/css_app/view/estilos.css" >
        <link rel="stylesheet" href="<%out.print(getServletContext().getContextPath());%>/css_app/view/spectrum.css">

        <!-- modernizr css -->
        <script src="<%out.print(getServletContext().getContextPath());%>/assets/js/vendor/modernizr-2.8.3.min.js"></script>


    </head>

    <body id="bodyPedido">
        <!--[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
        <!-- preloader area start -->
        <div id="preloader">
            <div class="loader"></div>
        </div>
        <!-- preloader area end -->
        <!-- page container area start -->
        <div class="page-container" id="page-container">
            <!-- sidebar menu area start -->
            <div class="sidebar-menu">
                <div class="sidebar-header">
                    <div class="logo" id="logo">                        
                        <a href="index"><img id="logoEmpresa" src="assets/images/icon/facemubi.png" alt="logo"></a>
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
            <div class="main-content"  >
                <!-- header area start -->
                <div class="header-area"  >
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
                                    <h5 class="card-title" id="tituloPedido">PEDIDOS</h5>
                                    <input type="hidden" id="nameFormProducto" value="FrmProducto">
                                    <input type="hidden" id="nameFormPedido" value="FrmPedidoModal">
                                    <input type="hidden" id="actionProducto" name="action" value="paginarProducto">
                                    <input type="hidden" id="actionCliente" name="action" value="paginarCliente">
                                    <input type="hidden" id="actionPedido" name="action" value="addPedido">
                                    <input type="hidden" id="IPRemoto" name="IPRemoto" >
                                    <input type="hidden" id="IPLocal" name="IPLocal" >
                                    <input type="hidden" id="numberPageProducto" name="numberPageProducto" value="1">
                                    <input type="hidden" id="numberPagePedido" name="numberPagePedido" value="1">
                                    <input type="hidden" id="variableInicio" name="variableInicio" value="0">
                                    <input type="hidden" id="variableAltaModalPedido" name="variableAltaModalPedido" value="0">
                                    <form id="FrmProducto">
                                        <div class="row mt-3">
                                            <div class="form-group col-md-9 col-12">
                                                <input type="text" name="txtNombreProducto" id="txtNombreProducto" class="form-control form-control-sm" placeholder="NOMBRE DE PRODUCTO">
                                            </div>
                                            <div class="form-group col-md-3 col-12">
                                                <button type="submit" id="btnBuscarProducto" class="btn btn-primary btn-xs mr-3" data-toggle="tooltip" title="Buscar Producto"><i class="fa fa-search" aria-hidden="true"></i> PRODUCTOS</button>
                                                <button type="button" id="btnAbrirNPedido" class="btn btn-primary btn-xs" data-toggle="tooltip" title="btnAbrirNPedido"><i class="fa fa-search" aria-hidden="true"></i></button>

                                            </div>
                                        </div>
                                    </form>
                                    <div class="row">
                                        <div class="col"> 
                                            <div class="table-responsive" id="tbodyProducto">
                                            </div>
                                        </div>                                        
                                        <div class="col" id="idDivLista"> 
                                            <h2 type="" name="listaPedido" id="listaPedido">LISTA DE PEDIDO</h2>
                                            <button type="button" id="guardar-Pedido" class="btn btn-info btn-md guardar-Pedido" data-toggle="modal" data-target="#ventanaModalManPedido">DETALLE DE PEDIDO</button>
                                            <ul id="myList">
                                                <ol id="elemento" name="elemento">                                                                            
                                                </ol> 
                                            </ul>
                                        </div> 
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card"
                                                 style="height: 50px; margin-bottom: 0px">
                                                <div class="card-body" style="padding-top: 10px; padding-bottom: 10px; padding-left: 0px; padding-right: 0px">
                                                    <div class="row">
                                                        <div class="col-md-2 col-sm-3 col-4">
                                                            <select id="sizePageProducto" name="sizePageProducto" class="form-control form-control-sm combo-paginar" idBtnBuscar='btnBuscarProducto'>
                                                                <option value="20">20</option>
                                                                <option value="30">30</option>
                                                                <option value="40">40</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-md-10 col-sm-9 col-8">
                                                            <nav aria-label="Page navigation example">
                                                                <ul id="paginationProducto" class="pagination pagination-sm justify-content-end">

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
            <div id="ventanaModalManProducto" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form action="pedido.js" class="upload-box" method="POST" id="FrmProductoModal" name="FrmProductoModal"> 
                            <div class="modal-header">
                                <h6 class="modal-title" id="tituloModalManProducto"></h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-sm-6 col-12 form-group ">
                                        <label for="cboCategoriaProductoER">CATEGORIA</label>
                                        <select class="form-control form-control-sm" id="cboCategoriaProductoER" name="cboCategoriaProductoER">
                                        </select>
                                        <div class="error-validation" id="validarCategoriaProductoER">Seleccione Categoria</div>
                                    </div>
                                    <div class="col-12 form-group">
                                        <label for="txtNombreProductoER">PRODUCTO</label>
                                        <input type="text" id="txtNombreProductoER" name="txtNombreProductoER" class="form-control form-control-sm" placeholder="NOMBRE">
                                        <div class="error-validation" id="validarNombreProductoER">Ingrese Nombre</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtPrecioProductoER">PRECIO</label>
                                        <input type="text" id="txtPrecioProductoER" name="txtPrecioProductoER" class="form-control form-control-sm" placeholder="PRECIO">
                                        <div class="error-validation" id="validarPrecioProductoER">Ingrese Precio</div>
                                    </div>
                                    <div class="col-sm-6 col-6 form-group">
                                        <label id="ColorER" for="ColorER">ELEGIR COLOR DE PRENDAS</label>
                                        <input id="picker" type='text' class="colores" min="" />
                                        <input type='text' placeholder='Seleccione...' id='enterAColor' style="margin-left: 3px;" />
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label for="txtStockProductoER">CANTIDAD DE PRENDAS</label>
                                        <input type="text" id="txtStockProductoER" name="txtStockProductoER" class="form-control form-control-sm" placeholder="STOCK">
                                        <div class="error-validation" id="validarStockProductoER">Ingrese Stock</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <label id="txtStock_maxProductoERl" for="txtStock_maxProductoERl">STOCK MÁXIMO</label>
                                        <input type="text" id="txtStock_maxProductoER" name="txtStock_maxProductoER" class="form-control form-control-sm" placeholder="STOCK MÁXIMO">
                                        <div class="error-validation" id="validarStock_maxProductoER">Ingrese valor</div>
                                    </div>
                                    <div class="col-sm-6 col-12 form-group">
                                        <input type="hidden" id="txtStock_minProductoER" name="txtStock_minProductoER" class="form-control form-control-sm" placeholder="STOCK MÍNIMO">
                                    </div>                                  
                                    <input type="hidden" id="txtIdProductoER" name="txtIdProductoER" value="">
                                </div>                              
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                                <button type="button" id="agregaLista" name="agregaLista" data-dismiss="modal" class="btn btn-primary btn-xs">AGREGAR A LISTA</button>
                            </div>
                        </form>
                        <div class="col-sm-6 col-12 form-group"> 
                            <form action="ProcesoArchivo" method="POST" enctype="multipart/form-data"  id="formimg" name="formimg" >
                                <label for="fichero">Imagen de prenda</label>
                                <input type="file" name="fichero" class="form-control form-control-sm " placeholder="IMAGEN DE PRODUCTO"/><br/>
                                <div class="error-validation" id="validartxtFileER">Ingrese valor</div>
                                <input type="submit" value="Cargar" name="submit" id="ImagenBotonProducto " class="ImagenBotonProducto btn-primary btn-xs col-md-6"/>
                                <input type="hidden" id="txtIdEmpresaER" name="txtIdEmpresaER" value=<%out.print(((com.jcode.myapp.model.session.Usuario) request.getSession().getAttribute("usuario")).getIdempresa());%>> 
                                <input type="hidden" id="txtIdProducto" name="txtIdProducto" value="">  
                                <input type="hidden" id="NombreProducto" name="NombreProducto" value=""> 
                                <input type="hidden" id="PrecioProducto" name="PrecioProducto" value=""> 
                                <input type="hidden" id="CantidadPrendas" name="CantidadPrendas" value="">  
                                <input type="hidden" id="Stock_minProducto" name="Stock_minProducto" value="10">  
                                <input type="hidden" id="Stock_maxProducto" name="Stock_maxProducto" value="">  
                                <input type="hidden" id="idcategoria" name="idcategoria" value="">  
                                <input type="hidden" id="nombreImagen" name="nombreImagen" value="">  
                                <input type="hidden" id="NumberPageProducto" name="NumberPageProducto" value="1">
                                <input type="hidden" id="actionEmpresa" name="action" value="ImagenBotonProducto">                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ventanaModalManPedido" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content ">
                        <form  id="FrmPedidoModal"> 
                            <div class="modal-header">
                                <h6 class="modal-title" id="tituloModalManPedido"></h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body " id="modal-body"   style="margin-bottom: 0px; margin-top: 0px;">
                                <p><br> <label class="nombreEmpresa" id="nombreEmpresa" >aqui va el nombre de la empresa</label></p>
                                <label class="telefonoEmpresa" id="telefonoEmpresa" >aqui va el telefono de la empresa</label></p>
                                <br><div id="barcode"></div>
                                <input type="hidden" id="Codigopedido" name="Codigopedido" >   
                                <div class="ticket" >
                                    <div id="DivLogoEmpresa"></div>                                   
                                    <p><br><label class="nombreClienteTicket" id="nombreClienteTicket" >aqui va el nombre del cliente</label></p>
                                    <label >tel:</label>  
                                    <label class="telefonoClienteTicket" id="telefonoClienteTicket" >aqui va el teledono del cliente</label>  
                                    <br><label class="direccionClienteTicket" id="direccionClienteTicket" >aqui va la direccion del cliente</label>  
                                    <div id="datosTicket" class="datosTicket" type='text' style="margin-bottom: 0px; margin-top: 0px;">
                                        <label class="fechaR" id="fechaR" value="">aqui va a ir la fecha</label>
                                        <input class="entregaPedidoTicket" id="entregaPedidoTicket" value="ingrese fecha de entrega">  
                                        <br><label >===========================================================</label>  
                                        <br><input class="col-2 cantidadPrendasTicket" id="cantidadPrendasTicket" >  
                                        <label class="datosResumenSubTotalPedidoTicket" id="datosResumenSubTotalPedidoTicket" >L SH: RTS L/S</label>  
                                        <label class="sutTotalTicketdes" id="sutTotalTicketdes" >SUBTOTAL:---------------$</label> 
                                        <label class="sutTotalTicket" id="sutTotalTicket" >aqui va datos de la entrega</label>  
                                        <br><label >===========================================================</label>  
                                        <br><label>INV CHG:---------------$</label>
                                        <input class="invchgTicket col-3" id="invchgTicket" value="4.75">  
                                        <input type="hidden" class="total" id="total" >  
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th class="resumen"></th>
                                                <th class="precio"></th>                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="producto">INV CHG:</td>
                                                <td class="invchg"></td>
                                            </tr>
                                            <tr>
                                                <td class="producto">TOTAL</td>
                                                <td class="preciototal" id="preciototal"></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <label class="totalPiezasPedidoTicket" id="totalPiezasPedidoTicket" >aqui va datos de la entrega</label>  
                                    <input class="estadoPedidoTicket" id="estadoPedidoTicket" value="NO PAGADO"> 

                                    <p class="centrado">¡GRACIAS POR SU COMPRA!
                                        <br><label class="despuesDeGaciasTicket" id="despuesDeGaciasTicket" ></p>
                                </div>

                            </div>
                        </form>   
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                            <button type="button" id="confirmarTicket" class="btn btn-info btn-xs"  data-dismiss="modal">Confirmar</button>                           
                        </div>

                    </div>
                </div>
            </div>
            <div id="ventanaModalManCliente" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <form id="FrmClienteModal" action="cliente.js"  method="POST">
                            <div class="modal-header" >
                                <h6 class="modal-title" id="tituloModalManCliente">ASIGNAR CLIENTE AL PEDIDO</h6>
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
                                        <label for="txtDireccionClienteER">Direccion </label>
                                        <input type="text" id="txtDireccionClienteER" name="txtDireccionClienteER" class="form-control form-control-sm" placeholder="DIRECCION DE ENTREGA">
                                        <div class="error-validation" id="validarDireccionClienteER">Ingrese Direccion</div>
                                    </div>
                                    <input type="hidden" id="txtIdClienteER" name="txtIdClienteER" value="">
                                    <input type="hidden" id="numberPageCliente" name="numberPageCliente" value="1">
                                    <input type="hidden" id="numberPageEmpresa" name="numberPageEmpresa" value="1">
                                    <input type="hidden" id="nameFormCliente" value="FrmCliente">

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" data-dismiss="modal" class="btn btn-primary btn-xs AsignarClienteAPedido">ASIGNAR</button>
                            </div>
                        </form>
                        <div class="col-12 form-group">
                            <label for="cboClienteERL">BUSCAR POR NOMBRE O TELEFONO O DIRECCION</label>
                            <select class="form-control form-control-sm cboClienteER" id="cboClienteER" name="cboClienteER" > 
                                <option >Seleccione...</option>
                                <option >Telefono</option>
                                <option >Nombre</option>
                                <option >Direccion</option>                                
                            </select>
                            <div class="error-validation" id="validarcboClienteER">Seleccione Cliente</div>
                        </div>                       
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-bordered " id="tableClienteModal">
                                        <thead class="bg-primary">
                                            <tr class="text-white">
                                                <th>NOMBRE</th>
                                                <th>TELEFONO</th>
                                                <th>DIRECCION</th>                                                
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyCliente">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="ventanaModalManPedidoUsuario" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h6 class="modal-title" id="tituloModalManUsuario">SELECCIONAR PEDIDO</h6>
                        </div> 
                        <input type="hidden" id="txtNombreUsuarioPedidoER" name="txtNombreUsuarioPedidoER" class="form-control form-control-sm" placeholder="NOMBRE">
                        <input type="hidden" id="txtTelefonoUsuarioPedidoER" name="txtTelefonoUsuarioPedidoER" class="form-control form-control-sm" placeholder="CELULAR">
                        <input type="hidden" id="txtIdUsuarioPedidoER" name="txtIdUsuarioPedidoER" value="">
                        <input type="hidden" id="txtDireccionUsuarioPedidoER" name="txtDireccionUsuarioPedidoER" class="form-control form-control-sm" placeholder="DIRECCION DE ENTREGA">
                        <input type="hidden" id="txtCodigoUsuarioPedidoER" name="txtCodigoUsuarioPedidoER" value="">
                        <form id="FrmUsuarioPedido">
                            <div class="row mt-3" style="margin-left: 7px">
                                <div class="form-group col-md-9 col-12">
                                    <input type="text" name="txtNombreUsuarioPedidoERI" id="txtNombreUsuarioPedidoERI" class="form-control form-control-sm" placeholder="NOMBRE">
                                </div>
                                <div class="form-group col-md-3 col-12">
                                    <button type="button" class="btn btn-secondary btn-xs" data-dismiss="modal">CERRAR</button>
                                </div>
                                <div class="form-group col-md-3 col-12">
                                    <button type="button" id="btnBuscarUsuarioPedido" class="btn btn-primary btn-xs mr-3" data-toggle="tooltip" title="Buscar UsuarioPedido"><i class="fa fa-search" aria-hidden="true"></i> BUSCAR</button>
                                </div>
                            </div>
                        </form>                                                     
                        <input type="hidden" id="idUsuarioAlmacenarEmpresa" name="idUsuarioAlmacenarEmpresa">
                        <input type="hidden" id="rolUsuarioAlmacenarEmpresa" name="rolUsuarioAlmacenarEmpresa">
                        <input type="hidden" id="mail" name="mail">
                        <input type="hidden" id="idEmpresaAlmacenarEmpresa" name="idEmpresaAlmacenarEmpresa">                        
                        <div class="row" style="margin-top: 20px; margin-left: 7px; margin-right: 7px;">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-bordered " id="tableUsuarioPedidoModal">
                                        <thead class="bg-primary">
                                            <tr class="text-white">
                                                <th>COD</th>
                                                <th>NOMBRE</th>
                                                <th>FECHA E</th>   
                                                <th>TEL</th>
                                                <th>DIR</th>
                                                <th style="width: 10%" colspan="4" class="text-medium-table">ACCIONES</th>                                               
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyUsuarioPedido">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" id="modalCargandoProducto" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
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
            <div class="modal" id="modalCargandoPedido" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;">
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
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/utilities/lib-utilities.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/utilities/jquery-barcode.js"></script>

        <script type="text/javascript" src="<%out.print(getServletContext().getContextPath());%>/assets/js/jquery-barcode.min.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/pedido.js"></script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/utilities/spectrum.js"></script>


    </body>
</html>

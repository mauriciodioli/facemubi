$(document).ready(function () {
    accesoMenu();

    $('#guardar-Pedido').click(function () {
        addBarCode();
        addFecha();
        addDatosDelPedido();
        sumatoriaListaProductos();
    });




    $('#btnAbrirNPedido').click(function () {
        $('#actionPedido').val("paginarPedido");
        $('#modalCargandoPedido').modal('show');
        $('#ventanaModalManPedidoUsuario').modal('show');
    });

    $('#confirmarTicket').click(function () {
        $('#actionPedido').val("addPedido");
        $('#modalCargandoPedido').modal('show');
    });

    $('#FrmProducto').submit(function () {
        $('#actionProducto').val("paginarProducto");
        $('#nameFormProducto').val("FrmProducto");
        $('#numberPageProducto').val("1");
        $('#modalCargandoProducto').modal('show');
        return false;
    });

    $('#btnBuscarUsuarioPedido').click(function () {
        $('#actionPedido').val("paginarPedido");
        $('#nameFormPedido').val("FrmUsuarioPedido");
        $('#numberPagePedido').val("1");
        $('#modalCargandoPedido').modal('show');
        return false;
    });

    $('#FrmProductoModal').submit(function () {
        if (validarFormularioProducto()) {
            $('#nameFormProducto').val("FrmProductoModal");
            $('#modalCargandoProducto').modal('show');
        }
        return false;
    });

    $("#modalCargandoPedido").on('shown.bs.modal', function () {
        processAjaxPedido();
    });

    $("#modalCargandoProducto").on('shown.bs.modal', function () {
        processAjaxProducto();
    });

    $("#ventanaModalManProducto").on('hidden.bs.modal', function () {
        $("#actionProducto").val("paginarProducto");

    });

    clicTablaCliente();
    addNombreCliente();
    cboBuscarClientePor();
    addEventoCombosPaginar();
    addValicacionesCamposProducto();
    addComboCategoria();
    addListaProductos();
    removeLista();
    processAjaxEmpresa();

    $('#modalCargandoProducto').modal('show');
    //$('#ventanaModalManPedido').modal('show');
});
function abrirPedido() {
    $('#actionPedido').val("paginarPedido");
    $('#modalCargandoPedido').modal('show');
    $('#ventanaModalManPedidoUsuario').modal('show');
}

function accesoMenu() {
    var session = $('#sessionTipo').val();

    switch (session) {
        case "administrador":
//            console.log( "administrador");
            $('#menuMantenimiento').show();
            break;
        case "root":
//            console.log("root");
            $('#menuMantenimiento').show();
            break;

        default:
            $('#menuMantenimiento').hide();
            break;
    }
    colorInput();
    accesoModalProcducto();
}

function accesoModalProcducto() {
    if ($('#sessionEmpresa').val() == 1) {
//        console.log("sessionEmpresa " + $('#sessionEmpresa').val())
        $('#txtStock_maxProductoERl').hide();
        $('#txtStock_maxProductoER').hide();

    }
}

function colorInput() {
    $("#ColorER").hide();
    $("#picker").hide();
    $("#enterAColor").hide();
    if ($('#sessionEmpresa').val() == 1) {
        $("#ColorER").show();
        $("#picker").show();
        $("#enterAColor").show();
        addColores();
    }
}

function processAjaxPedido() {
//    console.log("barcode " + $('#barcode').text())

    var datosSerializadosCompletos = $('#' + $('#FrmPedidoModal').val()).serialize();
    if ($('#actionPedido').val().toLowerCase() === "paginarpedido") {
        datosSerializadosCompletos += "&nombreClienteTicket=" + $('#txtNombreUsuarioPedidoERI').text();
    } else {
        var datosSerializadosCompletos = $('#' + $('#FrmPedidoModal').val()).serialize();

        datosSerializadosCompletos += "&numberPagePedido=" + $('#numberPagePedido').val();
        datosSerializadosCompletos += "&nombreEmpresa=" + $('#nombreEmpresa').text();
        datosSerializadosCompletos += "&telefonoEmpresa=" + $('#telefonoEmpresa').text();
        datosSerializadosCompletos += "&barcode=" + $('#barcode').text();
        datosSerializadosCompletos += "&nombreClienteTicket=" + $('#nombreClienteTicket').text();
        datosSerializadosCompletos += "&telefonoClienteTicket=" + $('#telefonoClienteTicket').text();
        datosSerializadosCompletos += "&direccionClienteTicket=" + $('#direccionClienteTicket').text();
        datosSerializadosCompletos += "&fechaR=" + $('#fechaR').text();
        datosSerializadosCompletos += "&entregaPedidoTicket=" + $('#entregaPedidoTicket').val();
        datosSerializadosCompletos += "&cantidadPrendasTicket=" + $('#cantidadPrendasTicket').val();
        datosSerializadosCompletos += "&sutTotalTicket=" + $('#sutTotalTicket').text();
        datosSerializadosCompletos += "&invchgTicket=" + $('#invchgTicket').val();
        datosSerializadosCompletos += "&total=" + $('#total').val();
        datosSerializadosCompletos += "&estadoPedidoTicket=" + $('#estadoPedidoTicket').val();
    }
    datosSerializadosCompletos += "&sizePagePedido=ALL";
    datosSerializadosCompletos += "&action=" + $('#actionPedido').val();
    $.ajax({
        url: 'pedidos',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            $('#modalCargandoPedido').modal("hide");
            if ($('#actionPedido').val().toLowerCase() === "paginarpedido") {
                listarPedido(jsonResponse.BEAN_PAGINATION);
            } else {
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionPedido').val(), 'Pedido', 'a'));
                    abrirPedido();
//                    listarPedido(jsonResponse.BEAN_PAGINATION);
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }

        },
        error: function () {
            $('#modalCargandoPedido').modal("hide");
            $("#ventanaModalManPedidoUsuario").modal("hide");
            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;

}

function listarPedido(BEAN_PAGINATION) {
    /*PAGINATION*/
    //  console.log("estamos en function listarPedido(BEAN_PAGINATION) cliente.js");
    var $pagination = $('#paginationPedido');
    var datoBuscar = $('#txtNombreUsuarioPedidoERI').val();
    $('#tbodyUsuarioPedido').empty();
    $('#nameCrudPedido').html("[ " + BEAN_PAGINATION.COUNT_FILTER + " ] CANTIDAD FILTRADA");
    // console.log("BEAN_PAGINATION.COUNT_FILTER "+BEAN_PAGINATION.COUNT_FILTER);//aqui se ven los valores del json
//     
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;

        $.each(BEAN_PAGINATION.LIST, function (index, value) {
            var est = value.estado;
            console.log(value.estado + " index BEAN_PAGINATION " + value.telefonocliente + " " + datoBuscar + " nombrecliente " + value.nombrecliente);
            if (value.codigopedido == datoBuscar || value.telefonocliente === datoBuscar || value.nombrecliente == datoBuscar || value.direccioncliente == datoBuscar || est.toLowerCase() == datoBuscar || value.fecha_entrada == datoBuscar) {
//                console.log("index BEAN_PAGINATION " + index + " " + value.nombrecliente);//aqui se ven los valores del json
                fila = "<tr ";
                atributos = "";
                atributos += "idpedido='" + value.idpedido + "' ";
                atributos += "codigopedido='" + value.codigopedido + "' ";
                atributos += "nombrecliente='" + value.nombrecliente + "' ";
                atributos += "fecha_entrada='" + value.fecha_entrada + "' ";
                atributos += "telefono='" + value.telefonocliente + "' ";
                atributos += "direccion='" + value.direccioncliente + "' ";
                fila += atributos;
                fila += ">";
                fila += "<td class='align-middle cod' id='cod'>" + value.codigopedido + "</td>";
                fila += "<td class='align-middle nombre' id='nombre'>" + value.nombrecliente + "</td>";
                fila += "<td class='align-middle fecha e' id='fecha e'>" + value.fecha_entrada + "</td>";
                fila += "<td class='align-middle tel' id='tel'>" + value.telefonocliente + "</td>";
                fila += "<td class='align-middle dir' id='dir'>" + value.direccioncliente + "</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs imp-ticket1' data-toggle='modal' data-target='#ventanaModalManPedido'><i class='fa fa-print'></i></button>1</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs imp-ticket2'><i class='fa fa-print'></i></button>2</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs imp-ticket3'><i class='fa fa-print'></i></button>3</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs imp-ticket4'><i class='fa fa-print'></i></button>td</td>";

                fila += "</tr>";
                $('#tbodyUsuarioPedido').append(fila);
            }


        });
//        var defaultOptions = getDefaultOptionsPagination();
//        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePagePedido'),
//                $('#numberPagePedido'), $('#actionPedido'), 'paginarPedido',
//                $('#nameForm'), 'FrmPedido', $('#modalCargandoPedido'));
//        $pagination.twbsPagination('destroy');
//        $pagination.twbsPagination($.extend({}, defaultOptions, options));
        addEventosPedido();
//        $('#txtNombrePedido').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se encontraron resultados');
    }
}

function addEventosPedido() {
    $('.imp-ticket1').each(function () {
        $(this).click(function () {
            $('#actionPedido').val("paginarPedido");

//            $('#tituloModalManProducto').html("EDITAR PRODUCTO");
//            $('#cboCategoriaProductoER').val("-1");

            $('#ventanaModalManPedidoUsuario').modal('hide');
            window.scrollBy(100, 100); // Scroll 100px to the right
//            $('#modalCargandoPedido').modal('show');
           
//             window.print();
//            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
 

    });
   
}
function sumatoriaListaProductos() {
    var suma = 0;
    $('#elemento li').each(function (indice, elemento) {
        var y = Object($(elemento).text().toString());
//        console.log(y.split(" "));
        var valor = y.split(" ");

        suma = suma + parseFloat(valor[y.split(" ").length - 1]) * 1.0;
    });
//    console.log(suma);
    $("#sutTotalTicket").text(suma);
//    console.log("++++ " + $("#invchgTicket").val());
    $(".invchg").text("$" + $("#invchgTicket").val());
    $(".precio").text("$" + suma);
    suma = suma + parseFloat($("#invchgTicket").val());
//    console.log(suma);
    $(".preciototal").text("$" + suma);
    $("#total").val(suma);
}

function clicTablaCliente() {
    $("#tableClienteModal").click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var nombre = $(this).find('td:first').html();
        var telefono = $(".selected").find('td:gt(0)').html();
        var direccion = $(".selected").find('td:last-child').html();
        //alert($(".selected td:first").html());
        $("#txtNombreClienteER").val("");
        $("#txtTelefonoClienteER").val("");
        $("#txtDireccionClienteER").val("");
        $("#txtNombreClienteER").val(nombre);
        $("#txtTelefonoClienteER").val(telefono);
        $("#txtDireccionClienteER").val(direccion);
    });

}

function cboBuscarClientePor() {
    $('#cboClienteER').on('change', function () {
        var option = document.getElementById("cboClienteER").options;
        var x = document.getElementById("cboClienteER").selectedIndex;
        var datoCbo = option[x].text;

        var datoBuscar;
        switch (datoCbo) {
            case "Telefono":
            {
                datoBuscar = $('#txtTelefonoClienteER').val();
//                console.log(datoBuscar);
                break;
            }
            case "Nombre":
            {
                datoBuscar = $('#txtNombreClienteER').val();
//                console.log(datoBuscar);
                break;
            }
            case "Direccion":
            {
                datoBuscar = $('#txtDireccionClienteER').val();
//                console.log(datoBuscar);
                break;
            }

            default:

                break;
        }
//        console.log(datoBuscar);
        processAjaxCliente(datoBuscar)

    });

}

function processAjaxEmpresa() {
    pedirIPRemoto();
    var datosSerializadosCompletos;
    datosSerializadosCompletos = "txtNombreEmpresa";
    datosSerializadosCompletos += "&numberPageEmpresa=";
    datosSerializadosCompletos += "&sizePageEmpresa=ALL";
    datosSerializadosCompletos += "&action=paginarEmpresa";
    $.ajax({
        url: 'empresas',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            //console.log(jsonResponse.BEAN_PAGINATION.valueOf());
            listarEmpresa(jsonResponse.BEAN_PAGINATION);

        },
        error: function () {

            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}

function pedirIPRemoto() {
    var datosSerializadosCompletos;
    datosSerializadosCompletos = "&action=ipRemoto";

    $.ajax({
        url: 'empresas',
        type: 'GET',
        data: datosSerializadosCompletos,
        dataType: "text",
        success: function (Response) {
            $("#IPRemoto").val(Response);
            // ipRemotoFueraAjax();


        },
        error: function () {
            viewAlert('error', 'Error interno en el Servidor');
        }
    });

    return;
}

function listarEmpresa(BEAN_PAGINATION) {
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;
        $.each(BEAN_PAGINATION.LIST, function (index, value) {
            if ($("#IPRemoto").val() == $("#IPRemoto").val() && value.idempresa == $('#sessionEmpresa').val()) {
//                console.log(" BEAN_PAGINATION  " + value.nombreempresa);//aqui se ven los valores del json
                addNombreEmpresa(value);
                fila = " <img src='http://" + $("#IPRemoto").val() + ":8080/myapp/assets/images/icon/" + value.logoempresa + "'  style='width: 10%' > ";
                atributos = "http://" + $("#IPRemoto").val() + ":8080/myapp/assets/images/icon/" + value.logoempresa;
                //console.log(fila);
                $('#logoEmpresa').attr('src', atributos);

                $('#DivLogoEmpresa').append(fila);

            }
        });
    } else {

        viewAlert('warning', 'No se encontraron resultados');
    }
}

function processAjaxCliente(datoBuscar) {
    var datosSerializadosCompletos;
    datosSerializadosCompletos = "txtNombreCliente";
    datosSerializadosCompletos += "&numberPageCliente=";
    datosSerializadosCompletos += "&sizePageCliente=ALL";
    datosSerializadosCompletos += "&action=paginarCliente";
//console.log("datosSerializadosCompletos "+datosSerializadosCompletos);
    $.ajax({
        url: 'clientes',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
//            listarCliente(jsonResponse.BEAN_PAGINATION, datoBuscar);

            if ($('#actionCliente').val().toLowerCase() === "paginarcliente") {
                listarCliente(jsonResponse.BEAN_PAGINATION, datoBuscar);
            } else {
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionCliente').val(), 'Cliente', 'a'));
                    listarCliente(jsonResponse.BEAN_PAGINATION);
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }
//            $("#ventanaModalManCliente").modal("hide");
        },
        error: function () {
            $('#modalCargandoCliente').modal("hide");
            $("#ventanaModalManCliente").modal("hide");
            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}

function listarCliente(BEAN_PAGINATION, datoBuscar) {
    /*PAGINATION*/
    //  console.log("estamos en function listarCliente(BEAN_PAGINATION) cliente.js");
    var $pagination = $('#paginationCliente');
    $('#tbodyCliente').empty();
    $('#nameCrudCliente').html("[ " + BEAN_PAGINATION.COUNT_FILTER + " ] CANTIDAD FILTRADA");
    // console.log("BEAN_PAGINATION.COUNT_FILTER "+BEAN_PAGINATION.COUNT_FILTER);//aqui se ven los valores del json
//     
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;

        $.each(BEAN_PAGINATION.LIST, function (index, value) {
            if (value.idempresa == $('#sessionEmpresa').val()) {
                if (value.telefono == datoBuscar) {
                    //  console.log("index BEAN_PAGINATION "+index+" "+value.email);//aqui se ven los valores del json
                    fila = "<tr ";
                    atributos = "";
                    atributos += "idcliente='" + value.idcliente + "' ";
                    atributos += "nombre='" + value.nombre + "' ";
                    atributos += "telefono='" + value.telefono + "' ";
                    atributos += "direccion='" + value.direccion + "' ";
                    atributos += "redsocial='" + value.redSocial + "' ";
                    atributos += "email='" + value.correoelectronico + "' ";
                    fila += atributos;
                    fila += ">";
                    fila += "<td class='align-middle nombre' id='nombre'>" + value.nombre + "</td>";
                    fila += "<td class='align-middle telefono' id='telefono'>" + value.telefono + "</td>";
                    fila += "<td class='align-middle direccion' id='direccion'>" + value.direccion + "</td>";
                    fila += "</tr>";
                    $('#tbodyCliente').append(fila);
                }
                if (value.nombre == datoBuscar) {
                    //  console.log("index BEAN_PAGINATION "+index+" "+value.email);//aqui se ven los valores del json
                    fila = "<tr ";
                    atributos = "";
                    atributos += "idcliente='" + value.idcliente + "' ";
                    atributos += "nombre='" + value.nombre + "' ";
                    atributos += "telefono='" + value.telefono + "' ";
                    atributos += "direccion='" + value.direccion + "' ";
                    atributos += "redsocial='" + value.redSocial + "' ";
                    atributos += "email='" + value.correoelectronico + "' ";
                    fila += atributos;
                    fila += ">";
                    fila += "<td class='align-middle'>" + value.nombre + "</td>";
                    fila += "<td class='align-middle'>" + value.telefono + "</td>";
                    fila += "<td class='align-middle'>" + value.direccion + "</td>";
                    fila += "</tr>";
                    $('#tbodyCliente').append(fila);
                }
                if (value.direccion == datoBuscar) {
                    //  console.log("index BEAN_PAGINATION "+index+" "+value.email);//aqui se ven los valores del json
                    fila = "<tr ";
                    atributos = "";
                    atributos += "idcliente='" + value.idcliente + "' ";
                    atributos += "nombre='" + value.nombre + "' ";
                    atributos += "telefono='" + value.telefono + "' ";
                    atributos += "direccion='" + value.direccion + "' ";
                    atributos += "redsocial='" + value.redSocial + "' ";
                    atributos += "email='" + value.correoelectronico + "' ";
                    fila += atributos;
                    fila += ">";
                    fila += "<td class='align-middle'>" + value.nombre + "</td>";
                    fila += "<td class='align-middle'>" + value.telefono + "</td>";
                    fila += "<td class='align-middle'>" + value.direccion + "</td>";
                    fila += "</tr>";
                    $('#tbodyCliente').append(fila);
                }
            }
        });
//        var defaultOptions = getDefaultOptionsPagination();
//        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePageCliente'),
//                $('#numberPageCliente'), $('#actionCliente'), 'paginarCliente',
//                $('#nameForm'), 'FrmCliente', $('#modalCargandoCliente'));
//        $pagination.twbsPagination('destroy');
//        $pagination.twbsPagination($.extend({}, defaultOptions, options));
//        addEventosCliente();
//        $('#txtNombreCliente').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se encontraron resultados');
    }
}

function processAjaxProducto() {
    var datosSerializadosCompletos = $('#' + $('#nameFormProducto').val()).serialize();
    if ($('#nameFormProducto').val().toLowerCase() !== "frmproducto") {
        datosSerializadosCompletos += "&txtNombreProducto=" + $('#txtNombreProducto').val();
    }
    datosSerializadosCompletos += "&txtIdEmpresa=" + $('#txtIdEmpresaER').val();
    datosSerializadosCompletos += "&numberPageProducto=" + $('#numberPageProducto').val();
    datosSerializadosCompletos += "&sizePageProducto=" + $('#sizePageProducto').val();
    datosSerializadosCompletos += "&action=" + $('#actionProducto').val();
    datosSerializadosCompletos += "&ImagenBotonProducto=" + $('#ImagenBotonProducto').val();
    //console.log("estamos en processAjaxProducto() " + $('#actionProducto').val());
    $.ajax({
        url: 'productos',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            $('#modalCargandoProducto').modal("hide");
            if ($('#actionProducto').val().toLowerCase() === "paginarproducto") {
                listarProducto(jsonResponse.BEAN_PAGINATION);
            } else {
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionProducto').val(), 'Producto', 'o'));
                    listarProducto(jsonResponse.BEAN_PAGINATION);
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }
            $("#ventanaModalManPedido").modal("hide");
        },
        error: function () {
            $('#modalCargandoProducto').modal("hide");
            $("#ventanaModalManPedido").modal("hide");
            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}

function listarProducto(BEAN_PAGINATION) {

    /*PAGINATION*/
    var indice;
    var valor;
    var $pagination = $('#paginationProducto');
    $('#tbodyProducto').empty();
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;

        $.each(BEAN_PAGINATION.LIST, function (index, value, imagen) {

            if (value.idempresa == $('#sessionEmpresa').val()) {

                indice = index;
                valor = value;
                $("#IPLocal").val(value.ip);
                fila = "<tr ";
                atributos = "";
                atributos += "idproducto='" + value.idproducto + "' ";
                atributos += "nombre='" + value.nombre + "' ";
                atributos += "precio='" + value.precio + "' ";
                atributos += "stock='" + value.stock + "' ";
                atributos += "stock_min='" + value.stock_min + "' ";
                atributos += "stock_max='" + value.stock_max + "' ";
                atributos += "nombreImagen='" + value.nombreImagenBoton + "' ";
                atributos += "idcategoria='" + value.categoria.idcategoria + "' ";
                fila += atributos;
                fila += "<div class='btn-group btn-group-lg'> ";

                fila += "<td style='width: 50%' class='left align-middle'><button class='btn btn-outline-info editar-Producto'><img src='http://" + value.ip + ":8080/myapp/assets/images/icon/" + value.nombreImagenBoton + "' style='width:48px;'heigth':48px;' ><h6>" + value.nombre + "</h6></button></td>";
                fila += "</tr>";
                // fila +="</span>";
                fila += "</div>";

                $('#tbodyProducto').append(fila);

            }
        });

        var defaultOptions = getDefaultOptionsPagination();
        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePageProducto'),
                $('#numberPageProducto'), $('#actionProducto'), 'paginarProducto',
                $('#nameForm'), 'FrmProducto', $('#modalCargandoProducto'));
        $pagination.twbsPagination('destroy');
        $pagination.twbsPagination($.extend({}, defaultOptions, options));
        //validarExt();
        addEventosProducto();
        $('#txtNombreProducto').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se enconntraron resultados');
    }
}

function addEventosProducto() {
    $('.editar-Producto').each(function () {
        $(this).click(function () {
            // console.log('estamos en addEventosProducto() ----------------------- editar-Producto ');
            $('#txtIdProductoER').val($(this.parentElement.parentElement).attr('idproducto'));
            $('#txtNombreProductoER').val($(this.parentElement.parentElement).attr('nombre'));
            $('#txtPrecioProductoER').val($(this.parentElement.parentElement).attr('idproducto'));
            $('#txtStockProductoER').val($(this.parentElement.parentElement).attr('stock'));
            $('#txtStock_minProductoER').val($(this.parentElement.parentElement).attr('stock_min'));
            $('#txtStock_maxProductoER').val($(this.parentElement.parentElement).attr('stock_max'));
            $('#cboCategoriaProductoER').val($(this.parentElement.parentElement).attr('idcategoria'));
            //aqui cargo los valores a formimg
            $('#txtIdProducto').val($(this.parentElement.parentElement).attr('idproducto'));
            $('#NombreProducto').val($(this.parentElement.parentElement).attr('nombre'));
            $('#PrecioProducto').val($(this.parentElement.parentElement).attr('idproducto'));
            $('#CantidadPrendas').val($(this.parentElement.parentElement).attr('stock'));
            //  $('#Stock_minProducto').val($(this.parentElement.parentElement).attr('txtStock_minProductoER'));
            $('#Stock_maxProducto').val($(this.parentElement.parentElement).attr('stock_max'));
            $('#actionProducto').val("updateProducto");
            $('#tituloModalManProducto').html("EDITAR PRODUCTO");
            $('#cboCategoriaProductoER').val("-1");
            $('#ventanaModalManProducto').modal("show");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });

        $('#ventanaModalManCliente').modal("show");
    });


}

function validarExt() {
//    var index;
//    $('.editar-Producto').each(function () {
//        $(this).click(function () {
//            index = $(this.parentElement.parentElement).attr('idproducto');
//            console.log("validarExt  ddddddddddddddddddddddddddddddd index " + index);
//        });
//    });
//    $(document).on('change', 'input[type=file]', function (e) {
//        var archivoInput = document.getElementById('txtFileER');
////        var formData = new FormData(document.getElementById('FrmProductoModal'));
//        var archivoRuta = archivoInput.value;
//        var TmpPath = URL.createObjectURL(e.target.files[0]);
//        var extPermitidas = /(.png|.PNG |.jpg |.JPG |.gif|.GIF)$/i;
//        if (extPermitidas.exec(archivoRuta))
//        {
//            // Obtenemos la ruta temporal mediante el evento
//
//            //document.getElementById('fileForm').target = "null";
//            // document.getElementById('fileForm').action = "ProcesoArchivo";
//            //document.getElementById('fileForm').submit;
//
//            //cargamos el nombre del archivo en el campo del jsp
//            // console.log(" index estamos en validarExt() " + archivoRuta + " index+ " + index);
//            var entradaFormulario = document.getElementsByName('nombreImagen');
//            entradaFormulario.value = archivoRuta;
//            // Mostramos la ruta temporal
//            // $('#btonImagen').html(archivoRuta);
//            //hace click en el boton cargar
//
//            $('#ImagenBotonProducto').on('click', function (e) {
//                //ponemos en el boton 
//                $('#' + index).attr('src', TmpPath);
//                //cargamos el nombre del archivo para posteriormente enviar al servlet
//                $('#nombreImagen').val("");
//                $('#nombreImagen').val(entradaFormulario.value.toString());
//                console.log("nombre imagen " + TmpPath);
//                //addImagenBoton(index,TmpPath);
//            });
//        }
//    });

    // $('#txtFileER').on('click',function(e){

    //  $('#txtFileER').click();   
    //});
    //     $('input[type=file]').change(function () {

    //        var file = (this.files[0].name).toString();

//
    //      var reader = new FileReader();


    //   $('#btonImagen').text('');
    //   $('#btonImagen').text(file);


    //  reader.onload = function (e) {
    //     $('#01').attr('src', e.target.result);
    //  }
    // reader.readAsDataURL(files[0]);
    //});

    // }


}//no se usa

function addValicacionesCamposProducto() {
    $('#txtNombreProductoER').on('change', function () {
        $(this).val() === "" ? $("#validarNombreProductoER").fadeIn("slow") : $("#validarNombreProductoER").fadeOut();
    });
    $('#txtPrecioProductoER').on('change', function () {
        $(this).val() === "" ? $("#validarPrecioProductoER").fadeIn("slow") : $("#validarPrecioProductoER").fadeOut();
    });
    $('#txtStockProductoER').on('change', function () {
        $(this).val() === "" ? $("#validarStockProductoER").fadeIn("slow") : $("#validarStockProductoER").fadeOut();
    });
    $('#txtStock_minProductoER').on('change', function () {
        $(this).val() === "" ? $("#validarStock_minProductoER").fadeIn("slow") : $("#validarStock_minProductoER").fadeOut();
    });
    $('#txtStock_maxProductoER').on('change', function () {
        $(this).val() === "" ? $("#validarStock_maxProductoER").fadeIn("slow") : $("#validarStock_maxProductoER").fadeOut();
    });
    $('#cboCategoriaProductoER').on('change', function () {
        $(this).val() === "-1" ? $("#validarCategoriaProductoER").fadeIn("slow") : $("#validarCategoriaProductoER").fadeOut();
    });
}

function validarFormularioProducto() {
    if ($('#txtNombreProductoER').val() === "") {
        $("#validarNombreProductoER").fadeIn("slow");
        return false;
    } else {
        $("#validarNombreProductoER").fadeOut();
    }
    if ($('#txtPrecioProductoER').val() === "") {
        $("#validarPrecioProductoER").fadeIn("slow");
        return false;
    } else {
        $("#validarPrecioProductoER").fadeOut();
    }
    if ($('#txtStockProductoER').val() === "") {
        $("#validarStockProductoER").fadeIn("slow");
        return false;
    } else {
        $("#validarStockProductoER").fadeOut();
    }
    if ($('#txtStock_minProductoER').val() === "") {
        $("#validarStock_minProductoER").fadeIn("slow");
        return false;
    } else {
        $("#validarStock_minProductoER").fadeOut();
    }
    if ($('#txtStock_maxProductoER').val() === "") {
        $("#validarStock_maxProductoER").fadeIn("slow");
        return false;
    } else {
        $("#validarStock_maxProductoER").fadeOut();
    }
    if ($('#cboCategoriaProductoER').val() === "-1") {
        $("#validarCategoriaProductoER").fadeIn("slow");
        return false;
    } else {
        $("#validarCategoriaProductoER").fadeOut();
    }
    return true;
}

function printContent() {

    var restorepage = document.getElementById("bodyPedido").innerHTML;

    var printcontent = document.getElementById("modal-body").innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    CierraTicket();
    document.body.innerHTML = restorepage;

}

function CierraTicket() {
    $("#ventanaModalManPedido").modal('hide');//ocultamos el modal
//    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
//    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
}

function addNombreEmpresa(value) {
    $("#nombreEmpresa").empty();
    $("#nombreEmpresa").text(value.nombreempresa);
    $("#despuesDeGaciasTicket").text("Lavanderia " + value.nombreempresa);
    $("#telefonoEmpresa").text("tel:" + value.telefonoempresa);

}

function addNombreCliente() {
    $(".AsignarClienteAPedido").click(function () {
        $("#nombreClienteTicket").empty();
        $("#nombreClienteTicket").text($("#txtNombreClienteER").val());
        $("#telefonoClienteTicket").text($("#txtTelefonoClienteER").val());
        $("#direccionClienteTicket").text($("#txtDireccionClienteER").val());
        $("#txtNombreUsuarioPedidoERI").val($("#txtNombreClienteER").val());
//        console.log("ddddddddddddddd "+$("#nombreClienteTicket").val());
    });
}

function addFechaEntrega() {
    $("#entregaPedidoTicket").val("Entrega dia y hora: " + $("#entregaPedidoTicket").val());
    // console.log($("#entregaPedidoTicket").val());
}

function addDatosDelPedido() {

    $("#cantidadPrendasTicket").val("12");

    $(".resumen").text("SUBTOTAL        ");

    $("#totalPiezasPedidoTicket").text("[total pc] 12");
    $("#estadoPedidoTicket").val("*" + $("#estadoPedidoTicket").val());
    addFechaEntrega();

}

function addFecha() {

    var hora = new Date();
    var hrs = hora.getHours();
    var min = hora.getMinutes();
    var seg = hora.getSeconds();
    var mseg = hora.getMilliseconds();
    var hoy = new Date();
    var m = new Array();
    var d = new Array()
    var an = hoy.getYear();
    m[0] = "Enero";
    m[1] = "Febrero";
    m[2] = "Marzo";
    m[3] = "Abril";
    m[4] = "Mayo";
    m[5] = "Junio";
    m[6] = "Julio";
    m[7] = "Agosto";
    m[8] = "Septiembre";
    m[9] = "Octubre";
    m[10] = "Noviembre";
    m[11] = "Diciembre";
//        document.write("Son las " + hrs + ":" + min + " (");
//        document.write(hoy.getDate());
//        document.write(" de ");
//        document.write(m[hoy.getMonth()]);
//        document.write(")");
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = (day) + "-" + (month) + "-" + now.getFullYear() + " " + " " + hrs + ":" + min + ":" + seg;
    $("#fechaR").empty();
    $("#fechaR").text(today);
//    console.log(today);
}

function addBarCode() {
    var hora = new Date();
    var hrs = hora.getHours();
    var min = hora.getMinutes();
    var seg = hora.getSeconds();
    var mseg = hora.getMilliseconds();
    var semilla = min + "" + seg + "" + mseg; // semilla para el codigo de barras
    $(function () {
        $("#barcode").barcode(semilla, // Valor del codigo de barras
                "code11", // tipo (cadena)
                {barWidth: 2, barHeight: 30});

    });
    $("#Codigopedido").val(semilla);
    $("#txtCodigoUsuarioPedidoER").val(semilla);

//    console.log(semilla + " " + $("#Codigopedido").val())
}

function addImagenBoton() {
//    // Check for the various File API support.
//    if (window.File && window.FileReader && window.FileList && window.Blob) {
//        // Great success! All the File APIs are supported.
//    } else {
//        alert('The File APIs are not fully supported in this browser.');
//    }
//    function handleFileSelect(evt) {
//        var files = evt.target.files; // FileList object
//
//        // Loop through the FileList and render image files as thumbnails.
//        for (var i = 0, f; f = files[i]; i++) {
//
//            // Only process image files.
//            if (!f.type.match('image.*')) {
//                continue;
//            }
//
//            var reader = new FileReader();
//
//            // Closure to capture the file information.
//            reader.onload = (function (theFile) {
//                return function (e) {
//                    // Render thumbnail.
//                    var span = document.createElement('span');
//                    span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                        '" title="', escape(theFile.name), '"/>'].join('');
//                    document.getElementById('formimg').insertBefore(span, null);
//                };
//            })(f);
//
//            // Read in the image file as a data URL.
//            reader.readAsDataURL(f);
//        }
//    }
////
//    document.getElementById('formimg').addEventListener('change', handleFileSelect, false);
//    var formData = new FormData();
//    formData.append(index, document.getElementById('formimg').addEventListener('change', handleFileSelect, false));
////                 console.log("---------------------------- "+formData.values('upload-box').);
////               for (var i = 0; i < formData.values('upload-box').length; i++) {
////  var item = formData.values('upload-box')[i];  // No es necesario llamar a myNodeList.item(i) en JavaScript
////  console.log("---------------------------- "+item);
////}
//    //cargarArchivo();
//    // iniciar el ajax
//    $.ajax({
//
//        url: 'productos',
//
//        // el metodo para enviar los datos es POST
//        type: "POST",
//        ansync: true,
//        // colocamos la variable formData para el envio de la imagen
//        data: formData,
//
//        contentType: "multipart/form-data",
//
//        processData: false,
//
//        beforeSend: function ()
//        {
//
//        },
//
//        success: function (data)
//        {
//            alert("file has been uploaded");
//        }
//
//
//    });

}// no se usa

function addComboCategoria() {
    var datosSerializadosCompletos;
    datosSerializadosCompletos = "txtNombreCategoria=";
    datosSerializadosCompletos += "&numberPageCategoria=";
    datosSerializadosCompletos += "&sizePageCategoria=ALL";
    datosSerializadosCompletos += "&action=paginarCategoria";
    $('#cboCategoriaProductoER').empty();
    $.ajax({
        url: 'categorias',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            $('#cboCategoriaProductoER').append("<option value='-1'>Seleccione...</option>");
            $(jsonResponse.BEAN_PAGINATION.LIST).each(function (index, value) {
//                console.log("idemp "+value.idempresa+"  "+$('#sessionEmpresa').val())
                if (value.idempresa == $('#sessionEmpresa').val()) {
                    $('#cboCategoriaProductoER').append("<option value='" + value.idcategoria + "'>" + value.nombre + "</option>");
                }
            });
        },
        error: function () {
            console.log("error interno al cargar categorias");
        }
    });
    return false;
}

function addListaProductos() {
    var fila = "";
    $('#agregaLista').click(function () {
        fila = "<li class='elementoagregado' id='" + $('#txtIdProductoER').val() + "' >";
        var atributos = "";
        atributos += $('#txtNombreProductoER').val();
        atributos += "  ";
        atributos += $('#txtStockProductoER').val();
        atributos += "  ";
        atributos += $('#enterAColor').val();
        atributos += "  ";
        atributos += $('#cboCategoriaProductoER').val();
        atributos += "  Precio: ";
        atributos += $('#txtPrecioProductoER').val() * $('#txtStockProductoER').val();
        fila += atributos;
        fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-ProductoLista' id='eliminar-ProductoLista'><i class='fa fa-trash'></i></button></td>";

        fila += "</li>"
        $('#elemento').append(fila);

    });

}

function removeLista() {
    $('#txtIdProductoER').val($(this.parentElement).attr('txtIdProductoER'));
    $('.col').on('click', '.eliminar-ProductoLista', function () {
        var item = document.getElementById($(this.parentElement).attr('id'));   // Get the <ul> element with id="myList"
        // console.log("list " + item);
        item.parentNode.removeChild(item);
    });
}

function addColores() {
    $(".colores").spectrum({
        preferredFormat: "name",
        color: "#ea9999",
        showPaletteOnly: true,
        showPalette: true,
        allowEmpty: true,
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ],
        change: function (color) {
            $('body').css("background-color", color.toHexString());
            elegircolor(color.toHexString());
            $("#picker").spectrum("hide");
        }
    });
}

function elegircolor(numeroHEXcolor) {
    var nombreT = numeroHEXcolor;
    // console.log(nombreT.toUpperCase());
    switch (nombreT.toUpperCase()) {
        case"#000000":
            nombreT = "NEGRO";
            break;
        case"#444444":
            nombreT = "GRIS OSCURO";
            break;
        case"#666666":
            nombreT = "GRIS";
            break;
        case"#999999":
            nombreT = "GRIS OSCURO";
            break;
        case"#CCCCCC":
            nombreT = "GAINS BORO";
            break;
        case"#EEEEEE":
            nombreT = "GRIS CLARO";
            break;
        case"#F3F3F3":
            nombreT = "GRIS CLARO";
            break;
        case"#FFFFFF":
            nombreT = "BLANCO";
            break;
        case"#660000":
            nombreT = "ROJO OSCURO";
            break;
        case"#990000":
            nombreT = "	GRANATE	";
            break;
        case"#CC0000":
            nombreT = "	ROJO OSCURO	";
            break;
        case"#E06666":
            nombreT = "	ROJO CLARO	";
            break;
        case"#EA9999":
            nombreT = "	ROJO PALIDO	";
            break;
        case"#F4CCCC":
            nombreT = "	ROJO OCRE	";
            break;
        case"#FF0000":
            nombreT = "	ROJO	";
            break;
        case"RED":
            nombreT = "	ROJO	";
            break;
        case"#783F04":
            nombreT = "	MARRON OSCURO	";
            break;
        case"#B45F06":
            nombreT = "	MARRON  	";
            break;
        case"#E69138":
            nombreT = "	MARRON CLARO	";
            break;
        case"#F6B26B":
            nombreT = "	MARRON	";
            break;
        case"#F9CB9C":
            nombreT = "	ROJO NARANJA	";
            break;
        case"#FCE5CD":
            nombreT = "	LIGERO NARANJA	";
            break;
        case"#FF9900":
            nombreT = "	NARANJA	";
            break;
        case"#7F6000":
            nombreT = "	MARRON CAFÉ	";
            break;
        case"#BF9000":
            nombreT = "	BORGONIA	";
            break;
        case"#F1C232":
            nombreT = "	NARANJA	";
            break;
        case"#FFD966":
            nombreT = "	AMARILLO OSCURO	";
            break;
        case"#FFE599":
            nombreT = "	AMARILLO CLARO	";
            break;
        case"#FFF2CC":
            nombreT = "	CREMA	";
            break;
        case"#FFFF00":
            nombreT = "	AMARILLO	";
            break;
        case"#274E13":
            nombreT = "	VERDE OSUCURO	";
            break;
        case"#38761D":
            nombreT = "	VERDE OLIVA	";
            break;
        case"#6AA84F":
            nombreT = "	VERDE OPACO	";
            break;
        case"#93C47D":
            nombreT = "	VERDE CLARO	";
            break;
        case"#B6D7A8":
            nombreT = "	VERDE AGUA	";
            break;
        case"#D9EAD3":
            nombreT = "	VERDE PASTEL	";
            break;
        case"#00FF00":
            nombreT = "	VERDE	";
            break;
        case"#0C343D":
            nombreT = "AZUL PRUSIA";
            break;
        case"#134F5C":
            nombreT = "	AZUL SULFAN	";
            break;
        case"#45818E":
            nombreT = "	AZUL DEMIN	";
            break;
        case"#76A5AF":
            nombreT = "	CIAN OSCURO	";
            break;
        case"#A2C4C9":
            nombreT = "	CERULEO	";
            break;
        case"#D0E0E3":
            nombreT = "	CELESTE NUBE	";
            break;
        case"#00FFFF":
            nombreT = "	CIAN  	";
            break;
        case"#073763":
            nombreT = "	AZUL OSCURO	";
            break;
        case"#0B5394":
            nombreT = "	AZUL PIZARRA	";
            break;
        case"#3D85C6":
            nombreT = "AZUL PIZARRA MEDIO	";
            break;
        case"#6FA8DC":
            nombreT = "	CELESTE OSCURO	";
            break;
        case"#9FC5E8":
            nombreT = "	CELESTE	";
            break;
        case"#CFE2F3":
            nombreT = "	CELESTE PASTEL	";
            break;
        case"#0000FF":
            nombreT = "	AZUL	";
            break;
        case"#20124D":
            nombreT = "	TURQU	";
            break;
        case"#351C75":
            nombreT = "	INDIGO	";
            break;
        case"#674EA7":
            nombreT = "	PURPURA	";
            break;
        case"#8E7CC3":
            nombreT = "	VIOLETA CLARO	";
            break;
        case"#B4A7D6":
            nombreT = "	MAGENTA	";
            break;
        case"#D9D2E9":
            nombreT = "	VIOLETA PALIDO	";
            break;
        case"#9900FF":
            nombreT = "	VIOLETA	";
            break;
        case"#4C1130":
            nombreT = "	BORDO OSCURO	";
            break;
        case"#741B47":
            nombreT = "	BORDO  	";
            break;
        case"#A64D79":
            nombreT = "	AMATISTA	";
            break;
        case"#C27BA0":
            nombreT = "	ORQUIDEA	";
            break;
        case"#D5A6BD":
            nombreT = "	FRAMBUESA	";
            break;
        case"#EAD1DC":
            nombreT = "	LILA	";
            break;
        case"#FF00FF":
            nombreT = "	FUCSIA	";
            break;
    }
    $('#enterAColor').val(nombreT);

}
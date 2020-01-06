$(document).ready(function () {
    accesoMenu();
    /*se ejecuta todo lo qu hay aqui luego del html*/
    $('#btnAbrirNCliente').click(function () {
        $('#txtRed_SocialClienteER').val("");
        $('#txtNombreClienteER').val("");
        $('#txtTelefonoClienteER').val("");
        $('#txtDireccionClienteER').val("");
        $('#txtemailClienteER').val("");
        $('#cboRedSocialClienteER').append("<option value='-1'>Seleccione...</option>");
        $('#cboRedSocialClienteER').val("-1");
        $('.error-validation').fadeOut();
        $('#actionCliente').val("addCliente");
        $('#tituloModalManCliente').html("REGISTRAR CLIENTE");
        $('#ventanaModalManCliente').modal('show');

    });

    $('#FrmCliente').submit(function () {
        $('#actionCliente').val("paginarCliente");
        $('#nameFormCliente').val("FrmCliente");
        $('#numberPageCliente').val("1");
        $('#modalCargandoCliente').modal('show');
        return false;
    });

    $('#FrmClienteModal').submit(function () {
        if (validarFormularioCliente()) {
            $('#nameFormCliente').val("FrmClienteModal");
            $('#modalCargandoCliente').modal('show');
        }
        return false;
    });

    $("#modalCargandoCliente").on('shown.bs.modal', function () {
        processAjaxCliente();
    });

    $("#ventanaModalManCliente").on('hidden.bs.modal', function () {
        $("#actionCliente").val("paginarCliente");
    });


    $("#ventanaModalManPedido").on('shown.bs.modal', function () {       
        $('#cboClienteER').append("<option value='-1'>Seleccione...</option>");
        $("#cboClienteER").val("-1");
        $("#ventanaModalManCliente").modal("show");
    });



    addEventoCombosPaginar();
    addValicacionesCamposCliente();
    cboBuscarClientePor();
    processAjaxEmpresa();
    $('#modalCargandoCliente').modal('show');

});

function accesoMenu(){    
     var session = $('#sessionTipo').val();
        
    switch (session) {
        case "administrador":
            console.log( "administrador");
            $('#menuMantenimiento').show();
            break;
        case "root":
            console.log("root");
            $('#menuMantenimiento').show();
            break;     

        default:
            $('#menuMantenimiento').hide();
            break;
    }
    
}

function processAjaxCliente() {
    var datosSerializadosCompletos = $('#' + $('#nameFormCliente').val()).serialize();

    if ($('#nameFormCliente').val().toLowerCase() !== "frmcliente") {
        datosSerializadosCompletos += "&txtNombreCliente=" + $('#txtNombreCliente').val();
    }
    datosSerializadosCompletos += "&txtIdEmpresa=" + $('#txtIdEmpresaER').val();
    datosSerializadosCompletos += "&numberPageCliente=" + $('#numberPageCliente').val();
    datosSerializadosCompletos += "&sizePageCliente=" + $('#sizePageCliente').val();
    datosSerializadosCompletos += "&action=" + $('#actionCliente').val();
    $.ajax({
        url: 'clientes',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
//            console.log("----------------5555"+jsonResponse); //aqui se muestra el json y se ve que tengo el id
            $('#modalCargandoCliente').modal("hide");
            if ($('#actionCliente').val().toLowerCase() === "paginarcliente") {
                listarCliente(jsonResponse.BEAN_PAGINATION);
            } else {
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionCliente').val(), 'Cliente', 'a'));
                    listarCliente(jsonResponse.BEAN_PAGINATION);
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }
            $("#ventanaModalManCliente").modal("hide");
        },
        error: function () {
            $('#modalCargandoCliente').modal("hide");
            $("#ventanaModalManCliente").modal("hide");
            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}

function listarCliente(BEAN_PAGINATION) {
    /*PAGINATION*/
    //  console.log("estamos en function listarCliente(BEAN_PAGINATION) cliente.js");
    var $pagination = $('#paginationCliente');
    $('#tbodyCliente').empty();
    //$('#nameCrudCategoria').html("[ "+BEAN_PAGINATION.COUNT_FILTER+" ] CANTIDAD FILTRADA");
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;
        $.each(BEAN_PAGINATION.LIST, function (index, value) {
            // console.log("index "+index+" "+value.email);//aqui se ven los valores del json
            if (value.idempresa == $('#sessionEmpresa').val()) {
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
                fila += "<td class='align-middle'>" + value.redSocial + "</td>";
                fila += "<td class='align-middle'>" + value.correoelectronico + "</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-Cliente'><i class='fa fa-edit'></i></button></td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-Cliente'><i class='fa fa-trash'></i></button></td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs ver-Pedidos'><i class='fa fa-search'></i></button></td>";

                fila += "</tr>";
                $('#tbodyCliente').append(fila);
            }
        });
        var defaultOptions = getDefaultOptionsPagination();
        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePageCliente'),
                $('#numberPageCliente'), $('#actionCliente'), 'paginarCliente',
                $('#nameForm'), 'FrmCliente', $('#modalCargandoCliente'));
        $pagination.twbsPagination('destroy');
        $pagination.twbsPagination($.extend({}, defaultOptions, options));
        addEventosCliente();
        $('#txtNombreCliente').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se encontraron resultados');
    }
}

function addEventosCliente() {
    $('.editar-Cliente').each(function () {
        $(this).click(function () {
            $('#txtIdClienteER').val($(this.parentElement.parentElement).attr('idcliente'));
            $('#txtNombreClienteER').val($(this.parentElement.parentElement).attr('nombre'));
            $('#txtTelefonoClienteER').val($(this.parentElement.parentElement).attr('telefono'));
            $('#txtDireccionClienteER').val($(this.parentElement.parentElement).attr('direccion'));
            $('#txtRed_SocialClienteER').val($(this.parentElement.parentElement).attr('redsocial'));
            $('#txtemailClienteER').val($(this.parentElement.parentElement).attr('email'));
            $('#actionCliente').val("updateCliente");
            $('#tituloModalManCliente').html("EDITAR CLIENTE");
            $('#ventanaModalManCliente').modal("show");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
    $('.eliminar-Cliente').each(function () {
        $(this).click(function () {

            $('#txtIdClienteER').val($(this.parentElement.parentElement).attr('idcliente'));
            viewAlertDelete("Cliente");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
    $('.ver-Pedidos').each(function () {
        $(this).click(function () {
            $("#ventanaModalManPedido").modal("show");
            $('#txtIdClienteERP').val($(this.parentElement.parentElement).attr('idcliente'));
            $("#txtNombreClienteERP").val($(this.parentElement.parentElement).attr('nombre'));
            $("#txtTelefonoClienteERP").val($(this.parentElement.parentElement).attr('telefono'));
            $("#txtDireccionClienteERP").val($(this.parentElement.parentElement).attr('direccion'));
            $('#ventanaModalManCliente').modal("hide");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
}

function addValicacionesCamposCliente() {//aqui valida los campos si estan vacios, muestra error de vacio que es fadeIn y fadeOut
    $('#txtNombreClienteER').on('change', function () {
        $(this).val() === "" ? $("#validarNombreClienteER").fadeIn("slow") : $("#validarNombreClienteER").fadeOut();

        $('#txtTelefonoClienteER').on('change', function () {
            $(this).val() === "" ? $("#validarTelefonoClienteER").fadeIn("slow") : $("#validarTelefonoClienteER").fadeOut();
        });
        $('#txtRed_SocialER').on('change', function () {
            $(this).val() === "" ? $("#validarRed_SocialClienteER").fadeIn("slow") : $("#validarRed_SocialClienteER").fadeOut();
        });
        $('#txtDireccionClienteER').on('change', function () {
            $(this).val() === "" ? $("#validarDireccionClienteER").fadeIn("slow") : $("#validarDireccionClienteER").fadeOut();
        });
        $('#txtemailClienteER').on('change', function () {
            $(this).val() === "" ? $("#validaremailClienteER").fadeIn("slow") : $("#validaremailClienteER").fadeOut();
        });
    });
}

function validarFormularioCliente() {
    if ($('#txtNombreClienteER').val() === "") {
        $("#validarNombreClienteER").fadeIn("slow");
        return false;
    } else {
        $("#validarNombreClienteER").fadeOut();
    }
    return true;
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
                datoBuscar = $('#txtTelefonoClienteERP').val();
//                console.log(datoBuscar);
                break;
            }
            case "Nombre":
            {
                datoBuscar = $('#txtNombreClienteERP').val();
//                console.log(datoBuscar);
                break;
            }
            case "Direccion":
            {
                datoBuscar = $('#txtDireccionClienteERP').val();
//                console.log(datoBuscar);
                break;
            }
            case "Pagado":
            {
                datoBuscar = "pagado";
//                console.log(datoBuscar);
                break;
            }
            case "No Pagado":
            {
                datoBuscar = "no pagado";
//                console.log(datoBuscar);
                break;
            }

            default:

                break;
        }
//        console.log(datoBuscar);
        processAjaxPedido(datoBuscar)

    });

}

function processAjaxPedido(datoBuscar) {
    var datosSerializadosCompletos;
    datosSerializadosCompletos = "nombreClienteTicket";
    datosSerializadosCompletos += "&numberPagePedido=";
    datosSerializadosCompletos += "&sizePagePedido=ALL";
    datosSerializadosCompletos += "&action=paginarPedido";
//console.log("datosSerializadosCompletos "+datosSerializadosCompletos);
    $.ajax({
        url: 'pedidos',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
//            console.log("............ volvio"+datoBuscar);
            listarPedido(jsonResponse.BEAN_PAGINATION, datoBuscar);

//            if ($('#actionPedido').val().toLowerCase() === "paginarpedido") {
//                listarCliente(jsonResponse.BEAN_PAGINATION, datoBuscar);
//            } else {
//                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
//                    viewAlert('success', getMessageServerTransaction($('#actionPedido').val(), 'Pedido', 'a'));
//                    listarCliente(jsonResponse.BEAN_PAGINATION);
//                } else {
//                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
//                }
//            }
//            $("#ventanaModalManCliente").modal("hide");
        },
        error: function () {
//            $('#modalCargandoCliente').modal("hide");
//            $("#ventanaModalManCliente").modal("hide");
//            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}

function listarPedido(BEAN_PAGINATION, datoBuscar) {
    /*PAGINATION*/
    //  console.log("estamos en function listarPedido(BEAN_PAGINATION) cliente.js");
    var $pagination = $('#paginationPedido');
    $('#tbodyPedido').empty();
    $('#nameCrudPedido').html("[ " + BEAN_PAGINATION.COUNT_FILTER + " ] CANTIDAD FILTRADA");
    // console.log("BEAN_PAGINATION.COUNT_FILTER "+BEAN_PAGINATION.COUNT_FILTER);//aqui se ven los valores del json
//     
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;

        $.each(BEAN_PAGINATION.LIST, function (index, value) {
            var est = value.estado;
            console.log(value.estado + " index BEAN_PAGINATION " + index + " " + datoBuscar.toLowerCase());
            if (value.telefonocliente == datoBuscar || value.nombrecliente == datoBuscar || value.direccioncliente == datoBuscar || est.toLowerCase() == datoBuscar) {
                console.log("index BEAN_PAGINATION " + index + " " + value.nombrecliente);//aqui se ven los valores del json
                fila = "<tr ";
                atributos = "";
                atributos += "idcliente='" + value.idpedido + "' ";
                atributos += "nombre='" + value.fecha_entrada + "' ";
                atributos += "telefono='" + value.totalpedido + "' ";
                atributos += "direccion='" + value.descripcion + "' ";
                atributos += "redsocial='" + value.estado + "' ";
                atributos += "email='" + value.litrosdepedido + "' ";
                fila += atributos;
                fila += ">";
                fila += "<td class='align-middle nombre' id='nombre'>" + value.fecha_entrada + "</td>";
                fila += "<td class='align-middle telefono' id='telefono'>" + value.totalpedido + "</td>";
                fila += "<td class='align-middle direccion' id='direccion'>" + value.descripcion + "</td>";
                fila += "<td class='align-middle nombre' id='nombre'>" + value.estado + "</td>";
                fila += "<td class='align-middle telefono' id='telefono'>" + value.litrosdepedido + "</td>";
                fila += "</tr>";
                $('#tbodyPedido').append(fila);
            }


        });
//        var defaultOptions = getDefaultOptionsPagination();
//        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePagePedido'),
//                $('#numberPagePedido'), $('#actionPedido'), 'paginarPedido',
//                $('#nameForm'), 'FrmPedido', $('#modalCargandoPedido'));
//        $pagination.twbsPagination('destroy');
//        $pagination.twbsPagination($.extend({}, defaultOptions, options));
//        addEventosPedido();
//        $('#txtNombrePedido').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se encontraron resultados');
    }
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
//            $('#modalCargandoCliente').modal("hide");
//            if ($('#actionCliente').val().toLowerCase() === "paginarcliente") {
//                listarCliente(jsonResponse.BEAN_PAGINATION);
//            } else {
//                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
//                    viewAlert('success', getMessageServerTransaction($('#actionCliente').val(), 'Cliente', 'a'));
//                    listarCliente(jsonResponse.BEAN_PAGINATION);
//                } else {
//                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
//                }
//            }
//            $("#ventanaModalManCliente").modal("hide");
        },
        error: function () {
//            $('#modalCargandoEmpresa').modal("hide");
//            $("#ventanaModalManEmpresa").modal("hide");
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
//              console.log("IP REMOTO "+$("#IPRemoto").val());
            
            if ($("#IPRemoto").val() == $("#IPRemoto").val() && value.idempresa == $('#sessionEmpresa').val()) {
//                   console.log(" BEAN_PAGINATION  " + $("#IPRemoto").val()+" value.idempresa "+value.idempresa+" sessionEmpresa "+$('#sessionEmpresa').val());//aqui se ven los valores del json
//                addNombreEmpresa(value);
                fila = " <img src='http://" + $("#IPRemoto").val() + ":8080/myapp/assets/images/icon/" + value.logoempresa + "'  style='width: 10%' > ";
                atributos = "http://" + $("#IPRemoto").val() + ":8080/myapp/assets/images/icon/" + value.logoempresa;
//                console.log(fila);
                $('#logoEmpresa').attr('src', atributos);

                $('#DivLogoEmpresa').append(fila);

            }
        });
    } else {

        viewAlert('warning', 'No se encontraron resultados');
    }
}
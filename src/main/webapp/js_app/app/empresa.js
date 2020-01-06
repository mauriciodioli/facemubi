$(document).ready(function () {
    $('#btnAbrirNEmpresa').click(function () {
        $('#txtIdEmpresaER').val("");
        $('#txtNombreEmpresaER').val("");
        $('#txtDireccionEmpresaER').val("");
        $('#txtTelefonoEmpresaER').val("");
        $('#txtImagenFrenteEmpresaER').val("");
        $('#txtImagenLogoEmpresaER').val("");
        $('.error-validation').fadeOut();
        $('#actionEmpresa').val("addEmpresa");
        $('#tituloModalManEmpresa').html("REGISTRAR EMPRESA");
        $('#ventanaModalManEmpresa').modal('show');
    });

    $('#FrmEmpresa').submit(function () {
        $('#actionEmpresa').val("paginarEmpresa");
        $('#nameFormEmpresa').val("FrmEmpresa");
        $('#numberPageEmpresa').val("1");
        $('#modalCargandoEmpresa').modal('show');
        return false;
    });
    $('#FrmUsuario').submit(function () {
        $('#actionUsuario').val("paginarUsuario");
        $('#nameFormUsuario').val("FrmUsuario");
        $('#numberPageUsuario').val("1");
        $('#modalCargandoUsuario').modal('show');
        return false;
    });
    $('#FrmEmpresaModal').submit(function () {
        //console.log("primero FrmEmpresaModal submituuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        if (validarFormularioEmpresa()) {
            $('#nameFormEmpresa').val("FrmEmpresaModal");
            $('#modalCargandoEmpresa').modal('show');
        }
        return false;
    });
    $('#FrmUsuarioAgregarUsuario').submit(function () {
        $('#actionUsuario').val("updateUsuario");
        $('#nameFormUsuario').val("FrmUsuarioAgregarUsuario");
        $('#numberPageEmpresa').val("1");
        $('#modalCargandoUsuario').modal('show');
        return false;
    });
    $("#modalCargandoEmpresa").on('shown.bs.modal', function () {
        // console.log("submituuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        processAjaxEmpresa();
    });
    $("#modalCargandoUsuario").on('shown.bs.modal', function () {
        // console.log("submituuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        processAjaxUsuario();
    });

    $("#ventanaModalManEmpresa").on('hidden.bs.modal', function () {
        $("#actionEmpresa").val("paginarEmpresa");
    });



    addEventoCombosPaginar();
    addValicacionesCamposEmpresa();
    cboRolTipoUsuario();
    cboCategoriaEmpresa();
    clicTablaUsuario();
    processAjaxImagenEmpresa();
    pedirIPRemoto();

    $('#modalCargandoEmpresa').modal('show');

});

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
            viewAlert('error', 'Error en 1 interno en el Servidor');
        }
    });

    return;
}
function cboCategoriaEmpresa() {
    $('#cboCategoriaEmpresaER').on('change', function () {
        var option = document.getElementById("cboCategoriaEmpresaER").options;
        var x = document.getElementById("cboCategoriaEmpresaER").selectedIndex;
        var datoCbo = option[x].text;
       $('#txtCboCategoriaEmpresaER').val(datoCbo);
    });

}
function processAjaxEmpresa() {
    var datosSerializadosCompletos = $('#' + $('#nameFormEmpresa').val()).serialize();
    if ($('#nameFormEmpresa').val().toLowerCase() !== "frmempresa") {
        datosSerializadosCompletos += "&txtNombreEmpresa=" + $('#txtNombreEmpresa').val();
    }
    datosSerializadosCompletos += "&txtCboCategoriaEmpresaER=" + $('#txtCboCategoriaEmpresaER').val();
    datosSerializadosCompletos += "&numberPageEmpresa=" + $('#numberPageEmpresa').val();
    datosSerializadosCompletos += "&sizePageEmpresa=" + $('#sizePageEmpresa').val();
    datosSerializadosCompletos += "&action=" + $('#actionEmpresa').val();
    $.ajax({
        url: 'empresas',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            $('#modalCargandoEmpresa').modal("hide");
            if ($('#actionEmpresa').val().toLowerCase() === "paginarempresa") {
                listarEmpresa(jsonResponse.BEAN_PAGINATION);
            } else {
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionEmpresa').val(), 'Empresa', 'o'));
                    listarEmpresa(jsonResponse.BEAN_PAGINATION);
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }
            $("#ventanaModalManPedido").modal("hide");
        },
        error: function () {
            $('#modalCargandoEmpresa').modal("hide");
            $("#ventanaModalManPedido").modal("hide");
            viewAlert('error', 'Error en 2 interno en el Servidor');
        }
    });
    return false;
}

function listarEmpresa(BEAN_PAGINATION) {
    /*PAGINATION*/
    var $pagination = $('#paginationEmpresa');
    $('#tbodyEmpresa').empty();
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;
        $.each(BEAN_PAGINATION.LIST, function (index, value) {
            if (value.idempresa == $("#sessionEmpresa").val()) {
//                console.log(value.idempresa + " " + value.nombreempresa)
                fila = "<tr ";
                atributos = "";
                atributos += "idempresa='" + value.idempresa + "' ";
                atributos += "nombreempresa='" + value.nombreempresa + "' ";
                atributos += "direccionempresa='" + value.direccionempresa + "' ";
                atributos += "telefonoempresa='" + value.telefonoempresa + "' ";
                atributos += "imagenfrente='" + value.imagenfrente + "' ";
                atributos += "logoempresa='" + value.logoempresa + "' ";
                //atributos += "idcategoria='" + value.categoria.idcategoria + "' ";
                fila += atributos;
                fila += ">";
                fila += "<td class='align-middle'>" + value.nombreempresa + "</td>";
                fila += "<td class='align-middle'>" + value.direccionempresa + "</td>";
                fila += "<td class='align-middle'>" + value.telefonoempresa + "</td>";
                fila += "<td class='align-middle'>" + value.imagenfrente + "</td>";
                fila += "<td class='align-middle'>" + value.logoempresa + "</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-Empresa'><i class='fa fa-edit'></i></button></td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-Empresa'><i class='fa fa-trash'></i></button></td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs agregar-Usuario'><i class='fa fa-user'></i></button></td>";
                fila += "</tr>";
                $('#tbodyEmpresa').append(fila);
            }
        });
        var defaultOptions = getDefaultOptionsPagination();
        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePageEmpresa'),
                $('#numberPageEmpresa'), $('#actionEmpresa'), 'paginarEmpresa',
                $('#nameForm'), 'FrmEmpresa', $('#modalCargandoEmpresa'));
        $pagination.twbsPagination('destroy');
        $pagination.twbsPagination($.extend({}, defaultOptions, options));
        addEventosEmpresa();
        $('#txtNombreEmpresa').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se enconntraron resultados');
    }
}

function addEventosEmpresa() {
    $('.editar-Empresa').each(function () {
        $(this).click(function () {
            $('#txtIdEmpresaER').val($(this.parentElement.parentElement).attr('idempresa'));
            $('#txtNombreEmpresaER').val($(this.parentElement.parentElement).attr('nombreempresa'));
            $('#txtDireccionEmpresaER').val($(this.parentElement.parentElement).attr('direccionempresa'));
            $('#txtTelefonoEmpresaER').val($(this.parentElement.parentElement).attr('telefonoempresa'));
            $('#txtImagenFrenteEmpresaER').val($(this.parentElement.parentElement).attr('imagenfrente'));
            $('#txtImagenLogoEmpresaER').val($(this.parentElement.parentElement).attr('logoempresa'));
            // $('#cboCategoriaEmpresaER').val($(this.parentElement.parentElement).attr('idcategoria'));
            //aqui cargo los valores a formimg
            $('#txtIdEmpresa').val($(this.parentElement.parentElement).attr('idempresa'));
            $('#NombreEmpresa').val($(this.parentElement.parentElement).attr('nombreempresa'));
            $('#DireccionEmpresa').val($(this.parentElement.parentElement).attr('direccionempresa'));
            $('#telefonoEmpresa').val($(this.parentElement.parentElement).attr('telefonoempresa'));
            $('#ImagenFrente').val($(this.parentElement.parentElement).attr('imagenfrente'));
            $('#LogoEmpresa').val($(this.parentElement.parentElement).attr('logoempresa'));
            $('#actionEmpresa').val("updateEmpresa");
            $('#tituloModalManEmpresa').html("EDITAR EMPRESA");
            $('#ventanaModalManEmpresa').modal("show");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";

        });
    });
    $('.eliminar-Empresa').each(function () {
        $(this).click(function () {
            $('#txtIdEmpresaER').val($(this.parentElement.parentElement).attr('idempresa'));
            viewAlertDelete("Empresa");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
    $('.agregar-Usuario').each(function () {
        $(this).click(function () {
            $('#actionUsuario').val("updateUsuario");
            $('#idEmpresaAlmacenarEmpresa').val($(this.parentElement.parentElement).attr('idempresa'));
            $('#tituloModalManUsuario').html("AGREGAR EMPRESA A USUARIO Y SU ROL");
            $('#ventanaModalManUsuario').modal("show");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
}

function processAjaxUsuario() {
    var datosSerializadosCompletos = $('#' + $('#nameFormUsuario').val()).serialize();
    if ($('#nameFormUsuario').val().toLowerCase() !== "frmusuario") {
        console.log("entra " + $('#idUsuarioAlmacenarEmpresa').val());
        datosSerializadosCompletos += "&mail=" + $('#mail').val();
        datosSerializadosCompletos += "&idempresa=" + $('#idEmpresaAlmacenarEmpresa').val();//agregar seleccion de combo
        datosSerializadosCompletos += "&idusuario=" + $('#idUsuarioAlmacenarEmpresa').val();
        datosSerializadosCompletos += "&txtTipoUsuarioER=" + $('#rolUsuarioAlmacenarEmpresa').val();
    }
//    datosSerializadosCompletos = "&mail=";
    datosSerializadosCompletos += "&numberPageUsuario=";
    datosSerializadosCompletos += "&sizePageUsuario=ALL";
    datosSerializadosCompletos += "&action=" + $('#actionUsuario').val();
//console.log("datosSerializadosCompletos "+datosSerializadosCompletos);
    $.ajax({
        url: 'registracion',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
//            listarCliente(jsonResponse.BEAN_PAGINATION, datoBuscar);
            $('#modalCargandoUsuario').modal("hide");
            if ($('#actionUsuario').val().toLowerCase() === "paginarusuario") {
                listarUsuario(jsonResponse.BEAN_PAGINATION);
            } else {
                $('#ventanaModalManUsuario').modal("hide");
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionUsuario').val(), 'Usuario', 'a'));
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }
//            $("#ventanaModalManCliente").modal("hide");
        },
        error: function () {
            
            $('#modalCargandoUsuario').modal("hide");
            $("#ventanaModalManUsuario").modal("hide");
            viewAlert('error', 'Error en 3 interno en el Servidor');
        }
    });
    return false;
}

function listarUsuario(BEAN_PAGINATION) {
    /*PAGINATION*/
    //  console.log("estamos en function listarCliente(BEAN_PAGINATION) cliente.js");
    var $pagination = $('#paginationUsuario');
    $('#tbodyUsuario').empty();
    $('#nameCrudUsuario').html("[ " + BEAN_PAGINATION.COUNT_FILTER + " ] CANTIDAD FILTRADA");
//     console.log("BEAN_PAGINATION.COUNT_FILTER "+BEAN_PAGINATION.COUNT_FILTER);//aqui se ven los valores del json
//     
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;
        $.each(BEAN_PAGINATION.LIST, function (index, value) {
//            console.log("value "+value.user);
//            if (value.telefono == datoBuscar) {
            //  console.log("index BEAN_PAGINATION "+index+" "+value.email);//aqui se ven los valores del json
            fila = "<tr ";
            atributos = "";
            atributos += "idusuario='" + value.idusuario + "' ";
            atributos += "nombreusuario='" + value.nombreusuario + "' ";
            atributos += "usuario='" + value.user + "' ";
            atributos += "apellidousuario='" + value.apellidoUsuario + "' ";
            atributos += "tipo='" + value.tipo + "' ";
            fila += atributos;
            fila += ">";
            fila += "<td class='align-middle direccion' id='idusuario'>" + value.idusuario + "</td>";
            fila += "<td class='align-middle usuario' id='usuario'>" + value.user + "</td>";
            fila += "<td class='align-middle apellidousuario' id='apellidousuario'>" + value.apellidoUsuario + "</td>";
            fila += "<td class='align-middle tipo' id='tipo'>" + value.tipo + "</td>";
            fila += "</tr>";
            $('#tbodyUsuario').append(fila);
//            }

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

function addValicacionesCamposEmpresa() {
    $('#txtNombreEmpresaER').on('change', function () {
        $(this).val() === "" ? $("#validarNombreEmpresaER").fadeIn("slow") : $("#validarNombreEmpresaER").fadeOut();
    });
    $('#txtPrecioEmpresaER').on('change', function () {
        $(this).val() === "" ? $("#validarPrecioEmpresaER").fadeIn("slow") : $("#validarPrecioEmpresaER").fadeOut();
    });
    $('#txtStockEmpresaER').on('change', function () {
        $(this).val() === "" ? $("#validarStockEmpresaER").fadeIn("slow") : $("#validarStockEmpresaER").fadeOut();
    });
    $('#txtStock_minEmpresaER').on('change', function () {
        $(this).val() === "" ? $("#validarStock_minEmpresaER").fadeIn("slow") : $("#validarStock_minEmpresaER").fadeOut();
    });
    $('#txtStock_maxEmpresaER').on('change', function () {
        $(this).val() === "" ? $("#validarStock_maxEmpresaER").fadeIn("slow") : $("#validarStock_maxEmpresaER").fadeOut();
    });
//    $('#cboCategoriaEmpresaER').on('change', function () {
//        $(this).val() === "-1" ? $("#validarCategoriaEmpresaER").fadeIn("slow") : $("#validarCategoriaEmpresaER").fadeOut();
//    });
}

function validarFormularioEmpresa() {
    if ($('#txtNombreEmpresaER').val() === "") {
        $("#validarNombreEmpresaER").fadeIn("slow");
        return false;
    } else {
        $("#validarNombreEmpresaER").fadeOut();
    }
    if ($('#txtPrecioEmpresaER').val() === "") {
        $("#validarPrecioEmpresaER").fadeIn("slow");
        return false;
    } else {
        $("#validarPrecioEmpresaER").fadeOut();
    }
    if ($('#txtStockEmpresaER').val() === "") {
        $("#validarStockEmpresaER").fadeIn("slow");
        return false;
    } else {
        $("#validarStockEmpresaER").fadeOut();
    }
    if ($('#txtStock_minEmpresaER').val() === "") {
        $("#validarStock_minEmpresaER").fadeIn("slow");
        return false;
    } else {
        $("#validarStock_minEmpresaER").fadeOut();
    }
    if ($('#txtStock_maxEmpresaER').val() === "") {
        $("#validarStock_maxEmpresaER").fadeIn("slow");
        return false;
    } else {
        $("#validarStock_maxEmpresaER").fadeOut();
    }
//    if ($('#cboCategoriaEmpresaER').val() === "-1") {
//        $("#validarCategoriaEmpresaER").fadeIn("slow");
//        return false;
//    } else {
//        $("#validarCategoriaEmpresaER").fadeOut();
//    }
    return true;
}

function cboRolTipoUsuario() {
    $('#cboRedSocialClienteER').on('change', function () {
        var option = document.getElementById("cboRedSocialClienteER").options;
        var x = document.getElementById("cboRedSocialClienteER").selectedIndex;
        var datoCbo = option[x].text;
        $('#rolUsuarioAlmacenarEmpresa').val(datoCbo);
//        console.log($('#rolUsuarioAlmacenarEmpresa').val());
    });

}

function clicTablaUsuario() {
    $("#tableUsuarioModal").click(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
        var idusuario = $(this).find('td:first').html();
        var usuario = $(".selected").find('td:gt(0)').html();
        //alert($(".selected td:first").html());
        $("#idUsuarioAlmacenarEmpresa").val("");
        $("#idUsuarioAlmacenarEmpresa").val(idusuario);
        $("#mail").val("");
        $("#mail").val(usuario);
//        console.log($("#mail").val() + " " + $("#idUsuarioAlmacenarEmpresa").val());
    });
}

function processAjaxImagenEmpresa() {
   
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
            mostrarImagen(jsonResponse.BEAN_PAGINATION);
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
            $('#modalCargandoEmpresa').modal("hide");
            $("#ventanaModalManEmpresa").modal("hide");
            viewAlert('error', 'Error en 4 interno en el Servidor');
        }
    });
    return false;
}

function mostrarImagen(BEAN_PAGINATION) {
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




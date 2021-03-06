$(document).ready(function () {

    $('#btnAbrirNCategoria').click(function () {
        $('#txtIdCategoriaER').val("");
        $('#txtNombreCategoriaER').val("");
        $('#txtIdEmpresaER').val($('#sessionEmpresa').val());
        $('.error-validation').fadeOut();
        $('#actionCategoria').val("addCategoria");
        $('#tituloModalManCategoria').html("REGISTRAR CATEGORIA");
        $('#ventanaModalManCategoria').modal('show');
    });

    $('#FrmCategoria').submit(function () {
        $('#actionCategoria').val("paginarCategoria");
        $('#nameFormCategoria').val("FrmCategoria");
        $('#numberPageCategoryia').val("1");
        $('#modalCargandoCategoria').modal('show');
        return false;
    });

    $('#FrmCategoriaModal').submit(function () {
        if (validarFormularioCategoria()) {
            $('#nameFormCategoria').val("FrmCategoriaModal");
            $('#modalCargandoCategoria').modal('show');
        }
        return false;
    });

    $("#modalCargandoCategoria").on('shown.bs.modal', function () {
        processAjaxCategoria();
    });

    $("#ventanaModalManCategoria").on('hidden.bs.modal', function () {
        $("#actionCategoria").val("paginarCategoria");
    });

    addEventoCombosPaginar();
    addValicacionesCamposCategoria();
    processAjaxEmpresa();
    $('#modalCargandoCategoria').modal('show');

});

function processAjaxCategoria() {
   
    var datosSerializadosCompletos = $('#' + $('#nameFormCategoria').val()).serialize();
    if ($('#nameFormCategoria').val().toLowerCase() !== "frmcategoria") {
        datosSerializadosCompletos += "&txtNombreCategoria=" + $('#txtNombreCategoria').val();
    }
    datosSerializadosCompletos += "&txtIdEmpresaER=" + $('#txtIdEmpresaER').val();
    datosSerializadosCompletos += "&numberPageCategoria=" + $('#numberPageCategoria').val();
    datosSerializadosCompletos += "&sizePageCategoria=" + $('#sizePageCategoria').val();
    datosSerializadosCompletos += "&action=" + $('#actionCategoria').val();
    $.ajax({
        url: 'categorias',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            $('#modalCargandoCategoria').modal("hide");
            if ($('#actionCategoria').val().toLowerCase() === "paginarcategoria") {
                listarCategoria(jsonResponse.BEAN_PAGINATION);
            } else {
                if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                    viewAlert('success', getMessageServerTransaction($('#actionCategoria').val(), 'Categoria', 'a'));
                    listarCategoria(jsonResponse.BEAN_PAGINATION);
                } else {
                    viewAlert('warning', jsonResponse.MESSAGE_SERVER);
                }
            }
            $("#ventanaModalManCategoria").modal("hide");
        },
        error: function () {
            $('#modalCargandoCategoria').modal("hide");
            $("#ventanaModalManCategoria").modal("hide");
            viewAlert('error', 'Erroe interno en el Servidor');
        }
    });
    return false;
}

function listarCategoria(BEAN_PAGINATION) {
    /*PAGINATION*/
    var $pagination = $('#paginationCategoria');
    $('#tbodyCategoria').empty();
    if (BEAN_PAGINATION.COUNT_FILTER > 0) {
        var fila;
        var atributos;
        $.each(BEAN_PAGINATION.LIST, function (index, value) {
//             console.log(value.nombre+" "+value.idempresa+" idempresa " + $('#sessionEmpresa').val())
            if (value.idempresa == $('#sessionEmpresa').val()) {
                fila = "<tr ";
                atributos = "";
                atributos += "idcategoria='" + value.idcategoria + "' ";
                atributos += "nombre='" + value.nombre + "' ";
                fila += atributos;
                fila += ">";
                fila += "<td class='align-middle'>" + value.nombre + "</td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-Categoria'><i class='fa fa-edit'></i></button></td>";
                fila += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-Categoria'><i class='fa fa-trash'></i></button></td>";
                fila += "</tr>";
                $('#tbodyCategoria').append(fila);
            }
        });
        var defaultOptions = getDefaultOptionsPagination();
        var options = getOptionsPagination(BEAN_PAGINATION.COUNT_FILTER, $('#sizePageCategoria'),
                $('#numberPageCategoria'), $('#actionCategoria'), 'paginarCategoria',
                $('#nameForm'), 'FrmCategoria', $('#modalCargandoCategoria'));
        $pagination.twbsPagination('destroy');
        $pagination.twbsPagination($.extend({}, defaultOptions, options));
        addEventosCategoria();
        $('#txtNombreCategoria').focus();
    } else {
        $pagination.twbsPagination('destroy');
        viewAlert('warning', 'No se enconntraron resultados');
    }
}

function addEventosCategoria() {
    $('.editar-Categoria').each(function () {
        $(this).click(function () {
            $('#txtIdCategoriaER').val($(this.parentElement.parentElement).attr('idcategoria'));
            $('#txtNombreCategoriaER').val($(this.parentElement.parentElement).attr('nombre'));
            $('#actionCategoria').val("updateCategoria");
            $('#tituloModalManCategoria').html("EDITAR CATEGORIA");
            $('#ventanaModalManCategoria').modal("show");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
    $('.eliminar-Categoria').each(function () {
        $(this).click(function () {
            $('#txtIdCategoriaER').val($(this.parentElement.parentElement).attr('idcategoria'));
            viewAlertDelete("Categoria");
            document.getElementsByTagName("body")[0].style.paddingRight = "0";
        });
    });
}

function addValicacionesCamposCategoria() {
    $('#txtNombreCategoriaER').on('change', function () {
        $(this).val() === "" ? $("#validarNombreCategoriaER").fadeIn("slow") : $("#validarNombreCategoriaER").fadeOut();
    });
}

function validarFormularioCategoria() {
    if ($('#txtNombreCategoriaER').val() === "") {
        $("#validarNombreCategoriaER").fadeIn("slow");
        return false;
    } else {
        $("#validarNombreCategoriaER").fadeOut();
    }
    return true;
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



$(document).ready(function () {
    accesoMenu();
    processAjaxEmpresa();
});
function  processAjaxLogin() {


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

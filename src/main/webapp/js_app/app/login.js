$(document).ready(function () {

    $("#FrmLogin").submit(function () {
        if (validarFormularioLogin()) {
            $('#modalCargandoLogin').modal("show");
        }
        return false;
    });

    $("#modalCargandoLogin").on('shown.bs.modal', function (e) {
        processAjaxLogin();
    });

    addValidacionesFormularioLogin();
//    checkLoginState();
});

function processAjaxLogin() {
    var datosSerializadosCompletos = $('#FrmLogin').serialize();
    datosSerializadosCompletos += "&txtNombreUsuarioER="+$("#txtUsuario").val();
    datosSerializadosCompletos += "&txtApellidoUsuarioER=";
    datosSerializadosCompletos += "&mail="+$("#txtUsuario").val();
    datosSerializadosCompletos += "&txtContraseñaER="+$("#txtPass").val();
    datosSerializadosCompletos += "&txtTipoUsuarioER=";
    datosSerializadosCompletos += "&numberPageUsuario=1";
    datosSerializadosCompletos += "&sizePageUsuario=ALL";
    datosSerializadosCompletos += "&action=addUsuario";
    $.ajax({
        url: 'session',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {            
            $('#modalCargandoLogin').modal("hide");            
            if (jsonResponse.RESPUESTA_SERVER.toLowerCase() === "ok") {
                console.log("retorna ok ");
                $(location).attr('href', 'index');
                
            } else {
                viewAlert('warning', jsonResponse.RESPUESTA_SERVER);
            }
        },
        error: function () {
            $('#modalCargandoLogin').modal("hide");
            viewAlert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}

function addValidacionesFormularioLogin() {
    $('#txtUsuario').on('change', function () {
        (this.value === "") ? $("#validarUsuario").fadeIn("slow") : $("#validarUsuario").fadeOut();
    });
    $('#txtPass').on('change', function () {
        (this.value === "") ? $("#validarPass").fadeIn("slow") : $("#validarPass").fadeOut();
    });
}

function validarFormularioLogin() {
    if ($('#txtUsuario').val() === "") {
        $("#validarUsuario").fadeIn("slow");
        $('#txtUsuario').focus();
        return false;
    } else {
        $("#validarUsuario").fadeOut();
    }
    if ($('#txtPass').val() === "") {
        $('#txtPass').focus();
        $("#validarPass").fadeIn("slow");
        return false;
    } else {
        $("#validarPass").fadeOut();
    }
    return true;
}

//  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
//    console.log('statusChangeCallback');
//    console.log(response);                   // The current login status of the person.
//    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
//      testAPI();  
//    } else {                                 // Not logged into your webpage or we are unable to tell.
//      document.getElementById('status').innerHTML = 'Please log ' +
//        'into this webpage.';
//    }
//  }
//  function checkLoginState() {               // Called when a person is finished with the Login Button.
//    FB.getLoginStatus(function(response) {   // See the onlogin handler
//      statusChangeCallback(response);
//    });
//  }
//  window.fbAsyncInit = function() {
//    FB.init({
//      appId      : '423024761703339',
//      cookie     : true,                     // Enable cookies to allow the server to access the session.
//      xfbml      : true,                     // Parse social plugins on this webpage.
//      version    : 'v5.0'           // Use this Graph API version for this call.
//    });
//
//
//    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
//      statusChangeCallback(response);        // Returns the login status.
//    });
//  };
//
//  
//  (function(d, s, id) {                      // Load the SDK asynchronously
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) return;
//    js = d.createElement(s); js.id = id;
//    js.src = "//connect.facebook.net/es_ES/all.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));
//
// 
//  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//    console.log('Welcome!  Fetching your information.... ');
//    FB.api('/me', function(response) {
//      console.log('Successful login for: ' + response.name);
//      document.getElementById('status').innerHTML =
//        'Thanks for logging in, ' + response.name + '!';
//    });
//  }
function checkLoginState() {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '423024761703339',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v5.0'
        });
        FB.getLoginStatus(function (response) {
            var muestra = statusChangeCallback(response);
            console.log("seria estatus " + muestra);
        });
//        FB.ui({
//            method: 'share',
//            href: 'https://developers.facebook.com/docs/'
//        }, function (response) {
//
//
//        });

        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {

                    console.log('Good to see you, ' + response.name.toLowerCase().replace(" ","") + '.');                    
                    processAjaxRegristroUsuario(response);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email'});
    };
//
//    $.ajax({
//        url: '//connect.facebook.net/es_ES/all.js',
//        dataType: 'script',
//        cache: true,
//        success: function () {
//            alert('Facebook listo');
//            FB.init({
//                appId: '423024761703339 ',
//                cookie: true, // enable cookies to allow the server to access the session
//                autoLogAppEvents : true,
//                xfbml: true, // parse social plugins on this page
//                version: 'v5.0' // use version 2.2
//                       
//
//            });
//            FB.Event.subscribe('auth.authResponseChange', function (response) {
//                if (response && response.status == 'connected') {
//                    alert('Usuario conectado');
//                    FB.api('/me', function (response) {
//                        alert('Nombre: ' + data.name);
//                    });
//                }
//            });
//        }
//    });

}
function processAjaxRegristroUsuario(response) {
//console.log("processAjaxRegristroUsuario paso 00000000000000");  
    var palabra=response.name.toLowerCase().replace(" ","");   //elimina espacio en blanco trim() solo quita espacios de los extremos 
    var datosSerializadosCompletos = "&txtNombreUsuarioER=" + palabra;
    datosSerializadosCompletos += "&txtApellidoUsuarioER=";
    datosSerializadosCompletos += "&mail=" + palabra;
    datosSerializadosCompletos += "&txtContraseñaER="+palabra;
    datosSerializadosCompletos += "&txtTipoUsuarioER=";
    

    datosSerializadosCompletos += "&numberPageUsuario=1";
    datosSerializadosCompletos += "&sizePageUsuario=ALL";
    datosSerializadosCompletos += "&action=addUsuario";
    $.ajax({
        url: 'registracion',
        type: 'POST',
        data: datosSerializadosCompletos,
        dataType: 'json',
        success: function (jsonResponse) {
            if (jsonResponse.MESSAGE_SERVER.toLowerCase() === "ok") {
                iniciasession(response);
                //viewAlert('success', getMessageServerTransaction($('#actionUsuario').val(), 'Usuario', 'o'));
            }
        },
        error: function () {

            alert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}
function  iniciasession(response) {
    
    $("#txtUsuario").val(response.name.toLowerCase().replace(" ",""));
    $("#txtUsuario").val(response.name.toLowerCase().replace(" ",""));
    $("#txtPass").val(response.name.toLowerCase().replace(" ",""));   
    $("#txtPass").val(response.name.toLowerCase().replace(" ",""));   
    $( "#form_submit" ).click();   
    console.log("response.name de vuelta "+response.name.toLowerCase().replace(" ",""));
}

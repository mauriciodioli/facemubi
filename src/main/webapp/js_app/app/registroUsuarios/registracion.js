$(document).ready(function () {

//    enviaremail();
    $('#FrmRegistroUsuario').submit(function () {        
        validarCampos();
        return false;
    });

});

function validarCampos() {
    var valor = document.getElementById("mail").value;
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        // alert("La dirección de email " + valor + " es correcta!.");
    } else {
        alert("La dirección de email es incorrecta!.");
    }
    var espacios = false;
    var cont = 0;
    var p1 = document.getElementById("txtContraseñaER").value;
    var p2 = document.getElementById("contraseñaRepetida").value;
    if (p1.length >= 6) {
        while (!espacios && (cont < p1.length)) {
            if (p1.charAt(cont) == " ")
                espacios = true;
            cont++;
        }

        if (espacios) {
            alert("La contraseña no puede contener espacios en blanco");
            return false;
        }
        if (p1.length == 0 || p2.length == 0) {
            alert("Los campos de la password no pueden quedar vacios");
            return false;
        }
        if (p1 != p2) {
            alert("Las passwords deben de coincidir");
            return false;
        } else {
//        alert("Todo esta correcto");
            processAjaxRegristroUsuario();
            //menviaremail();
            return true;
        }
    } else {
        alert("la contraseña debe contener como minimo 6 caracteres pero contiene " + p1.length);
    }
}

function enviaremail() {
    emailjs.init("user_GJxacNK8ytdKea3soizOl");

    const vue = new Vue({
        el: '#app',
        data() {
            return {
                from_name: '',
                from_email: '',
                message: '',
                subject: '',

            }
        },
        methods: {
            enviar() {
                let data = {
                    from_name: this.from_name,
                    from_email: this.from_email,
                    message: this.message,
                    subject: this.subject,
                };

                emailjs.send("mauriciodioli", "confirmacioncuenta", data)
                        .then(function (response) {
                            if (response.text === 'OK') {
                                alert('El correo se ha enviado de forma exitosa');
                            }
                            console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                        }, function (err) {
                            alert('Ocurrió un problema al enviar el correo');
                            console.log("FAILED. error=", err);
                        });
            }
        }
    });

}//no se usa

function processAjaxRegristroUsuario() {
//console.log("processAjaxRegristroUsuario paso 00000000000000");
    var datosSerializadosCompletos = $('#' + $('#FrmRegistroUsuario').val()).serialize();
    
    datosSerializadosCompletos += "&txtNombreUsuarioER=" + $('#txtNombreUsuarioER').val();    
    datosSerializadosCompletos += "&txtApellidoUsuarioER=" + $('#txtApellidoUsuarioER').val();    
    datosSerializadosCompletos += "&mail=" + $('#mail').val();
    datosSerializadosCompletos += "&txtContraseñaER=" + $('#txtContraseñaER').val();
    datosSerializadosCompletos += "&txtTipoUsuarioER=" + $('#txtTipoUsuarioER').val();
  
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
                viewAlert('success', getMessageServerTransaction($('#actionUsuario').val(), 'Usuario', 'o'));
            }
        },
        error: function () {

            alert('error', 'Error interno en el Servidor');
        }
    });
    return false;
}
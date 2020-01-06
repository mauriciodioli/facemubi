<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
            <title>
                EmailJS!
            </title>
        </meta>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        </link>
    </head>
    <body>
        <div id="app" style="padding-top: 8rem;">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 form-group">
                        <label>
                            Nombre:
                        </label>
                        <input class="form-control" type="text" v-model="from_name">
                        </input>
                    </div>
                    <div class="col-sm-6 col-sm-offset-3 form-group">
                        <label>
                            Asunto:
                        </label>
                        <input class="form-control" type="text" v-model="subject">
                        </input>
                    </div>
                    <div class="col-sm-6 col-sm-offset-3 form-group">
                        <label>
                            Correo:
                        </label>
                        <input class="form-control" type="email" v-model="from_email">
                        </input>
                    </div>
                    <div class="col-sm-6 col-sm-offset-3 form-group">
                        <label>
                            Mensaje:
                        </label>
                        <textarea class="form-control" v-model="message">
                        </textarea>
                    </div>
                    <div class="col-sm-6 col-sm-offset-3 text-center">
                        <button @click="Registrar" class="btn btn-success">
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"></script>
        <script src="https://cdn.emailjs.com/dist/email.min.js" type="text/javascript"></script>
        <script>
            (function(){
                emailjs.init("user_GJxacNK8ytdKea3soizOl");
             })();
            const vue = new Vue({
                el: '#app',
                data(){
                    return {
                        from_name: '',
                        from_email: '',
                        message: '',
                        subject: '',
                    }
                },
                methods: {
                    Registrar(){
                        let data = {
                            from_name: this.from_name,
                            from_email: this.from_email,
                            message: this.message,
                            subject: this.subject,
                        };
                        
                        emailjs.send("mauriciodioli","confirmacioncuenta", data)
                        .then(function(response) {
                            if(response.text === 'OK'){
                                alert('El correo se ha enviado de forma exitosa');
                            }
                           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                        }, function(err) {
                            alert('Ocurri� un problema al enviar el correo');
                           console.log("FAILED. error=", err);
                        });
                    }
                }
            });
        </script>
        <script src="<%out.print(getServletContext().getContextPath());%>/js_app/app/registroUsuarios/registracion.js"></script>
   
    </body>
</html>
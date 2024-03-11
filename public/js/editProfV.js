window.addEventListener('load', () => {
    /* Inputs - Búsqueda por id */
    let mail = document.querySelector("input#mailUser");
    let nombre = document.querySelector("input#nombreUser");
    let apellido = document.querySelector("input#apellidoUser");
    let password = document.querySelector("input#password");
    let telefono = document.querySelector("input#telefonoUser");

    /* Cajas de error - Búsqueda por clase */
    var mailError = document.querySelector("div.mailError");
    var nombreError = document.querySelector("div.nombreError");
    var apellidoError = document.querySelector("div.apellidoError");
    var passwordError = document.querySelector("div.passwordError");
    var telefonoError = document.querySelector("div.telefonoError");



    /* Validación de Mail */
    mail.addEventListener('blur', () => {

        mailError.innerHTML = "";

        let mailIngresado = mail.value;

        /* Check por si está vacío */
        if(mailIngresado == ""){
            mailError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {
            
            /* Check por si contiene elementos específicos de formato de mail: "@" y ".com" */
            if(mailIngresado.includes("@") && mailIngresado.includes(".com")){

                /* Salida correcta */

            } else {
                mailError.innerHTML = "<h5>• No es un formato de mail válido.</h5>";
            }
        }
    });


    nombre.addEventListener('blur', () => {
        /* Validación de nombre */

        nombreError.innerHTML = "";

        let nombreIngresado = nombre.value;
        
        /* Check por si está vacío */
        if(nombreIngresado == ""){
            nombreError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Salida correcta */

        }
    });


    apellido.addEventListener('blur', () => {
        /* Validación de apellido */

        apellidoError.innerHTML = "";

        let apellidoIngresado = apellido.value;
        
        /* Check por si está vacío */
        if(apellidoIngresado == ""){
            apellidoError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Salida correcta */

        }
    });


    telefono.addEventListener('blur', () => {
        /* Validación de telefono */

        telefonoError.innerHTML = "";

        let telefonoIngresado = telefono.value;
        
        /* Check por si está vacío */
        if(telefonoIngresado == ""){
            telefonoError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Salida correcta */

        }
    });




    /* ------- CAMBIO DE CONTRASEÑA ------- */


    password.addEventListener('blur', () => {
        /* Validación de password */

        passwordError.innerHTML = "";

        let passwordIngresado = password.value;
        
        /* Check por si está vacío */
        if(passwordIngresado == ""){
            passwordError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Check por si es muy corta la contraseña */
            if(passwordIngresado.length >= 8){

                /* Check por si es muy larga la contraseña */
                if(passwordIngresado.length <= 16) {

                    /* Salida correcta */

                } else {
                    passwordError.innerHTML = "<h5>• La contraseña no debe tener mas de 16 caracteres.</h5>";
                }
            } else {
                passwordError.innerHTML = "<h5>• La contraseña no debe tener menos de 8 caracteres.</h5>";
            }
        }
    });


    confirmacion.addEventListener('blur', () => {
        /* Validación de confirmacion */

        confirmacionError.innerHTML = "";

        let confirmacionIngresado = confirmacion.value;
        
        /* Check por si está vacío */
        if(confirmacionIngresado == ""){
            confirmacionError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Check por si la contraseña y la confirmación coinciden */
            if(password.value != confirmacionIngresado){
                confirmacionError.innerHTML = "<h5>• La confirmación no coincide con la contraseña.</h5>";
            } else {

                /* Salida correcta */

            }
        }
    });

})

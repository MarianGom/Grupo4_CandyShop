window.addEventListener('load', () => {
    let mail = document.querySelector("input#mailUser");
    let nombre = document.querySelector("input#nombreUser");
    let apellido = document.querySelector("input#apellidoUser");
    let password = document.querySelector("input#password");
    let confirmacion = document.querySelector("input#confirmPassword");

    /* Cajas de error */
    var mailError = document.querySelector("div.mailError");
    var nombreError = document.querySelector("div.nombreError");
    var apellidoError = document.querySelector("div.apellidoError");
    var passwordError = document.querySelector("div.passwordError");
    var confirmacionError = document.querySelector("div.confirmacionError");

    

    mail.addEventListener('blur', () => {
        /* Validación de formato Mail */

        mailError.innerHTML = "";

        let mailIngresado = mail.value;

        if(mailIngresado == ""){
            mailError.innerHTML = "<h5>• El campo está vacío</h5>";
        } else {
            if(mailIngresado.includes(".com") && mailIngresado.includes(".com")){

                console.log("Mail correcto");

            } else {
                mailError.innerHTML = "<h5>• No es un formato de mail válido</h5>";
            }
        }
    });


    nombre.addEventListener('blur', () => {
        /* Validación de nombre */

        nombreError.innerHTML = "";

        let nombreIngresado = nombre.value;
        
        if(nombreIngresado == ""){
            nombreError.innerHTML = "<h5>• El campo está vacío</h5>";
        } else {
            console.log(nombreIngresado);
        }
    });


    apellido.addEventListener('blur', () => {
        /* Validación de apellido */

        apellidoError.innerHTML = "";

        let apellidoIngresado = apellido.value;
        
        if(apellidoIngresado == ""){
            apellidoError.innerHTML = "<h5>• El campo está vacío</h5>";
        } else {
            console.log(apellidoIngresado);
        }
    });


    password.addEventListener('blur', () => {
        /* Validación de password */

        passwordError.innerHTML = "";

        let passwordIngresado = password.value;
        
        if(passwordIngresado == ""){
            passwordError.innerHTML = "<h5>• El campo está vacío</h5>";
        } else {
            console.log(passwordIngresado);
        }
    });


    confirmacion.addEventListener('blur', () => {
        /* Validación de confirmacion */

        confirmacionError.innerHTML = "";

        let confirmacionIngresado = confirmacion.value;
        
        if(confirmacionIngresado == ""){
            confirmacionError.innerHTML = "<h5>• El campo está vacío</h5>";
        } else {
            if(password.value != confirmacionIngresado){
                confirmacionError.innerHTML = "<h5>• La confirmación no coincide con la contraseña</h5>";
            } else {
                console.log(confirmacionIngresado);
            }
        }
    });

} )
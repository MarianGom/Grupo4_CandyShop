window.addEventListener('load', () => {
    /* Inputs - Búsqueda por id */
    let mail = document.querySelector("input#email");
    let password = document.querySelector("input#password");

    /* Cajas de error - Búsqueda por clase */
    var mailError = document.querySelector("div.mailError");
    var passwordError = document.querySelector("div.passwordError");



    /* Validación de Mail */
    mail.addEventListener('blur', () => {

        mailError.innerHTML = "";

        let mailIngresado = mail.value;

        /* Check por si está vacío */
        if(mailIngresado == ""){
            mailError.innerHTML = "<h5>• El campo está vacío</h5>";
        } else {
            
            /* Check por si contiene elementos específicos de formato de mail: "@" y ".com" */
            if(mailIngresado.includes("@") && mailIngresado.includes(".com")){

                /* Salida correcta */

            } else {
                mailError.innerHTML = "<h5>• No es un formato de mail válido</h5>";
            }
        }
    });


    /* Validación de password */
    password.addEventListener('blur', () => {

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
});
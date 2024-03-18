window.addEventListener('load', () => {
    /* Inputs - Búsqueda por id */
    let oldPassword = document.querySelector("input#oldPassword");
    let newPassword = document.querySelector("input#newPassword");
    let confirmacion = document.querySelector("input#confirmPassword");

    /* Cajas de error - Búsqueda por clase */
    var oldPasswordError = document.querySelector("div.oldPasswordError");
    var newPasswordError = document.querySelector("div.newPasswordError");
    var confirmacionError = document.querySelector("div.confirmacionError");



    /* ------- CAMBIO DE CONTRASEÑA ------- */

    oldPassword.addEventListener('blur', () => {
        /* Validación de password vieja */

        oldPasswordError.innerHTML = "";

        let oldPasswordIngresado = oldPassword.value;
        
        /* Check por si está vacío */
        if(oldPasswordIngresado == ""){
            oldPasswordError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Check por si es muy corta la contraseña */
            if(oldPasswordIngresado.length >= 8){

                /* Check por si es muy larga la contraseña */
                if(oldPasswordIngresado.length <= 16) {

                    /* Salida correcta */

                } else {
                    oldPasswordError.innerHTML = "<h5>• La contraseña no debe superar los 16 caracteres.</h5>";
                }
            } else {
                oldPasswordError.innerHTML = "<h5>• La contraseña no debe tener menos de 8 caracteres.</h5>";
            }
        }
    });

    newPassword.addEventListener('blur', () => {
        /* Validación de password nueva */

        newPasswordError.innerHTML = "";

        let newPasswordIngresado = newPassword.value;
        
        /* Check por si está vacío */
        if(newPasswordIngresado == ""){
            newPasswordError.innerHTML = "<h5>• El campo está vacío.</h5>";
        } else {

            /* Check por si es muy corta la contraseña */
            if(newPasswordIngresado.length >= 8){

                /* Check por si es muy larga la contraseña */
                if(newPasswordIngresado.length <= 16) {

                    /* Salida correcta */

                } else {
                    newPasswordError.innerHTML = "<h5>• La contraseña no debe superar los 16 caracteres.</h5>";
                }
            } else {
                newPasswordError.innerHTML = "<h5>• La contraseña no debe tener menos de 8 caracteres.</h5>";
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

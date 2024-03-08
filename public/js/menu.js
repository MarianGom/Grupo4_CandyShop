
function opencloseMenu(){
    let menu = document.getElementById("menu-opciones");
    if (menu.style.display != "flex"){
        menu.style.display = "flex";
    }else {
        menu.style.display = "none";
    }
};

function resizeMenu(){
    let menu = document.getElementById("menu-opciones");
    let vwidth = window.innerWidth;
    if (vwidth >= 576){
        menu.style.display = "flex";
    }
    if (vwidth < 576){
        menu.style.display = "none";
    }
}

function lookPassword(){
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        x.innerHTML = "<i class='bi bi-eye'></i>"
    } else {
        x.type = "password";
        x.innerHTML = "<i class='bi bi-eye-slash'></i>"
    }
}

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
    if (vwidth >= 700){
        menu.style.display = "flex";
    }
    if (vwidth < 700){
        menu.style.display = "none";
    }
}
function changeBanner(value){
    let banner = document.getElementById("banner");
    let btn1 = document.getElementById("btn-banner1");
    let btn2 = document.getElementById("btn-banner2");
    let btn3 = document.getElementById("btn-banner3");

    if(value == 1){
        banner.style.backgroundImage = 'url("/img/banner/Candy.png")';
        btn1.setAttribute("class", "bannerBtn-activo");
        btn2.setAttribute("class", "bannerBtn");
        btn3.setAttribute("class", "bannerBtn");
    }
    if(value == 2){
        banner.style.backgroundImage = 'url("/img/banner/Candy2.png")';
        btn1.setAttribute("class", "bannerBtn");
        btn2.setAttribute("class", "bannerBtn-activo");
        btn3.setAttribute("class", "bannerBtn");
    } 
    if(value == 3){
        banner.style.backgroundImage = 'url("/img/banner/Candy3.png")';
        btn1.setAttribute("class", "bannerBtn");
        btn2.setAttribute("class", "bannerBtn");
        btn3.setAttribute("class", "bannerBtn-activo");
    }
}
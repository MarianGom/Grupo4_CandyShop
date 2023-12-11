const path = require("path");

const mainProduct = path.resolve(__dirname, '../views/productos/productoDetail.ejs');
const carrito = path.resolve(__dirname, '../views/productos/productCart.ejs');
const mainController = {
  index: (req, res, next) => {
    res.render("home", {});
  },

  info: (req, res, next) => {
    res.render("nosotros", {});
  },

  productos:(req, res, next) => {
    res.render(mainProduct , {});
  },
  carrito:(req, res, next) => {
    res.render(carrito , {});
  },  
};

module.exports = mainController;



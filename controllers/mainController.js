const path = require("path");

const mainController = {
  index: (req, res, next) => {
    res.render("home", {});
  },

  info: (req, res, next) => {
    res.render("nosotros", {});
  },
  
};

module.exports = mainController;



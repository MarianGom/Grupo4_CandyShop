function userOnMiddleware(req, res, next) {

    console.log("Pase por el UserOn");

    let isOn = false

    next();

}

module.exports = userOnMiddleware;
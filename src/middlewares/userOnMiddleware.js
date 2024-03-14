function userOnMiddleware(req, res, next) {
    res.locals.isOn = false;

    if(req.session.usuario){
        res.locals.isOn = true;
        res.locals.usuario = req.session.usuario;
    }

    next();
}

module.exports = userOnMiddleware;
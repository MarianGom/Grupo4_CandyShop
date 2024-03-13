function authMiddleware(req, res, next) {
    if (!req.session.usuario) {
        return res.render('/user/login')
    }
    next();
}

module.exports = authMiddleware;
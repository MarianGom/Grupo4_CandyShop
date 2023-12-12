var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/listadoProductos', productsRouter);
app.use('/login', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

















/*const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

/* RUTAS */

/* Home */
/* app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/home.html'));
}); */

/* Nosotros -> Mariana */
/* app.get('/nosotros', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/nosotros.html'));
}); */

/* Productos -> Rita */
/* app.get('/productos', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/productoDetail.html'));
}); */

/* Carrito -> RooM*/
/* app.get('/carrito', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
}); */

/* Registro -> Luciana */
/* app.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/register.html'));
}); */

/* Login -> Luciana */
/* app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/login.html'));
}); */


/* Para el 3er sprint 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;






/* SERVER UP 
const PORT = 4000;
const linkcito = 'http://127.0.0.1:' + PORT;
app.listen(PORT, () =>
    console.log('¡Up!\nListo para usar en ', linkcito)
);
*/
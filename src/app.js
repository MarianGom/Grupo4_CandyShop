var createError = require('http-errors');
var express = require('express');
var path = require('path');
const methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const userOnMiddleware = require('./middlewares/userOnMiddleware');


var mainRouter = require('./routes/main');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var apiUsersRouter = require('./routes/api/users');
var apiProductsRouter = require('./routes/api/products');

var app = express();


app.use(session({
    secret: 'El queso', 
    idioma: 'esp',
    resave: false,
    saveUninitialized: false
}));

app.use(userOnMiddleware);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // permite capturar informacion que se envia desde un formulario en req.body
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/', mainRouter);
app.use('/productos', productsRouter);
app.use('/user', usersRouter);
app.use('/api', apiUsersRouter);
app.use('/api', apiProductsRouter);


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



/* SERVER */
const PORT = 4000;
const linkcito = 'http://127.0.0.1:' + PORT;
app.listen(PORT, () =>
    console.log('¡Up!\nListo para usar en ', linkcito)
);


module.exports = app;

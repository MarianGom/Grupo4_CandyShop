const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

/* RUTAS */

/* Home */
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

/* Landing -> Mariana */
app.get('/nosotros', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/nosotros.html'));
});

/* Productos -> Rita */
app.get('/productos', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

/* Carrito -> RooM*/
app.get('/carrito', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});

/* Registro -> Luciana */
app.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

/* Login -> Luciana */
app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/login.html'));
});


/* SERVER UP */
const PORT = 3000;
const linkcito = 'http://127.0.0.1:' + PORT;
app.listen(PORT, () =>
    console.log('¡Up!\nListo para usar en ', linkcito)
);

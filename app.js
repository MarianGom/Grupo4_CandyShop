
const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));


/* RUTAS */

/* Landing -> Mariana */
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

/* Productos -> Rita */
app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '/views/productDetail.html'));
});

/* Carrito -> RooM*/
app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '/views/productCart.html'));
});

/* Registro -> Luciana */
app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '/views/register.html'));
});

/* Login -> Rocio */
app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '/views/login.html'));
});



/* SERVER UP */
const PORT = 3000;
const linkcito = 'http://127.0.0.1:' + PORT;
app.listen(PORT, () =>
    console.log('¡Up!\n Listo para usar en ', linkcito)
);
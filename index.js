const mongoose = require('mongoose'); // importar la conexion a la base de datos
require('./config/db');

const express = require('express');// importar express
const exphbs = require('express-handlebars'); // importar handlebars
const path = require('path');
const router = require('./routes'); // importamos el archivo de routes que habiamos creado
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');

require('dotenv').config({path : 'variables.env'});

const app = express(); // declarar la variable del servidor

// habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// validacion de campos 
app.use(expressValidator());

app.engine('handlebars', 
    exphbs.engine({
        defaultLayout : 'layout',
        helpers : require('./helpers/handlebars')
    })
) // configuracion de handlebars
app.set('view engine', 'handlebars'); // asignamos nuestra plantilla engine

app.use(express.static(path.join(__dirname, 'public'))); // static files

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key : process.env.KEY,
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : process.env.DATABASE
    })
}));

// alertar 
app.use(flash());

// crear el middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
})

app.use('/', router()); // marcamos la ruta principal

app.listen(process.env.PUERTO); // puerto por el cual va a estar el servidor

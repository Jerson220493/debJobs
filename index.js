const express = require('express');// importar express
const exphbs = require('express-handlebars'); // importar handlebars
const path = require('path');
const router = require('./routes'); // importamos el archivo de routes que habiamos creado

const app = express(); // declarar la variable del servidor

app.engine('handlebars', 
    exphbs.engine({
        defaultLayout : 'layout'
    })
) // configuracion de handlebars
app.set('view engine', 'handlebars'); // asignamos nuestra plantilla engine

app.use(express.static(path.join(__dirname, 'public'))); // static files

app.use('/', router()); // marcamos la ruta principal

app.listen(5000); // puerto por el cual va a estar el servidor

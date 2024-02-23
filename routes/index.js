const express = require('express'); // importamos express
const router = express.Router(); // guardamos en la constante router la funcionalidad de Router de la clase express
const homeController = require('../controllers/homeController')

module.exports = () =>{
    router.get('/', homeController.mostrarTrabajos)

    return router;
}

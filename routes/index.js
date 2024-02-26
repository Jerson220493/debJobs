const express = require('express'); // importamos express
const router = express.Router(); // guardamos en la constante router la funcionalidad de Router de la clase express
const homeController = require('../controllers/homeController')
const vacantesController = require('../controllers/vacantesController')

module.exports = () =>{
    router.get('/', homeController.mostrarTrabajos)

    // crear vacantes
    router.get('/vacantes/nueva', 
        vacantesController.formularioNuevaVacante
    )
    router.post('/vacantes/nueva',
        vacantesController.agregarVacante
    )

    // mostrar vacantes en singular
    router.get('/vacantes/:url', vacantesController.mostrarVacante)

    return router;

}



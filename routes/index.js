const express = require('express'); // importamos express
const router = express.Router(); // guardamos en la constante router la funcionalidad de Router de la clase express
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');

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

    // editar vacante
    router.get('/vacantes/editar/:url', vacantesController.formEditarVacante);
    router.post('/vacantes/editar/:url', vacantesController.editarVacante);

    // crear cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', 
        usuariosController.validarRegistro,
        usuariosController.crearUsuario
    );

    // autenticar usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion)

    return router;

}



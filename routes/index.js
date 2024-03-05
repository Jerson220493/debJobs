const express = require('express'); // importamos express
const router = express.Router(); // guardamos en la constante router la funcionalidad de Router de la clase express
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = () =>{
    router.get('/', homeController.mostrarTrabajos)

    // crear vacantes
    router.get('/vacantes/nueva', 
        authController.verificarUsuario,
        vacantesController.formularioNuevaVacante
    )
    router.post('/vacantes/nueva',
        authController.verificarUsuario,
        vacantesController.validarVacante,
        vacantesController.agregarVacante
    )

    // mostrar vacantes en singular
    router.get('/vacantes/:url', vacantesController.mostrarVacante)

    // editar vacante
    router.get('/vacantes/editar/:url', 
        authController.verificarUsuario,
        vacantesController.formEditarVacante
    );
    router.post('/vacantes/editar/:url', 
        authController.verificarUsuario, 
        vacantesController.validarVacante,
        vacantesController.editarVacante
    );

    // crear cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', 
        usuariosController.validarRegistro,
        usuariosController.crearUsuario
    );

    // autenticar usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    // cerrar sesion
    router.get('/cerrar-sesion',
        authController.verificarUsuario,  
        authController.cerrarSesion 
    )


    // panel de administracion
    router.get('/administracion', 
        authController.verificarUsuario,
        authController.mostrarPanel
    );

    // editar perfil
    router.get('/editar-perfil', 
        authController.verificarUsuario,
        usuariosController.formEditarPerfil
    )

    router.post('/editar-perfil',
        authController.verificarUsuario,
        authController.validarPerfil,
        usuariosController.editarPerfil
    )

    return router;

}



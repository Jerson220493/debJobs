const { mongoose } = require("mongoose")

const Usuarios = mongoose.model('Usuarios');

exports.formCrearCuenta = (req, res, next) => {

    res.render('crear-cuenta', {
        nombrePagina : 'Crea tu cuenta en devjobs',
        tagline : 'Comienza a publicar tus vacantes, solo debes crear una cuenta'
    })
}

exports.validarRegistro = (req, res, next) =>{

    // sanitizar los campos
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    // validar
    req.checkBody('nombre', 'El Nombre es obligatorio').notEmpty();
    req.checkBody('email', 'El Email debe ser valido').isEmail();
    req.checkBody('password', 'El password no puede ir vacío').notEmpty();
    req.checkBody('confirmar', 'El confirmar password no puede ir vacío').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    const errores = req.validationErrors();

    if(errores){
        // si hay errores
    }

    // si la validacion es correcta
    next();

}


exports.crearUsuario = async(req, res, next) => {
    // crear el usuario
    const usuario = new Usuarios(req.body);
    
    const nuevoUsuario = await usuario.save();

    if (!nuevoUsuario) return next();

    res.redirect('/iniciar-session');

}

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
        req.flash('error', errores.map(error => error.msg));
        res.render('crear-cuenta', {
            nombrePagina : 'Crea tu cuenta en devjobs',
            tagline : 'Comienza a publicar tus vacantes, solo debes crear una cuenta',
            mensajes : req.flash(),
        })
        return;
    }

    // si la validacion es correcta
    next();

}


exports.crearUsuario = async(req, res, next) => {
    // crear el usuario
    const usuario = new Usuarios(req.body);
    try {
        await usuario.save();
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error)
        res.redirect('/crear-cuenta')
    }

}

exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina : 'Iniciar Sesión devjobs'
    })
}

// form editar el perfil
exports.formEditarPerfil = (req, res) => {
    res.render('editar-perfil', {
        nombrePagina : 'Edita tu perfil en devjobs',
        usuario : req.user.toObject()
    })
}

// Guardar cambios al editar el perfil
exports.editarPerfil = async(req, res, next) => {
    const usuarioActualizado  = {
        nombre : req.body.nombre,
        email : req.body.email
    } 
    if (req.body.password) {
        usuarioActualizado.password = req.body.password;
    }

    try {
        await Usuarios.findOneAndUpdate({_id : req.user._id}, usuarioActualizado , {
            new : true,
            runValidatos : true
        });

        req.flash('correcto', 'Datos guardados correctamente')
        res.redirect('/administracion')
    } catch (error) {
        
    }




}

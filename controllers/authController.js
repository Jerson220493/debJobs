const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect : '/administracion',
    failureRedirect : '/iniciar-sesion',
    failureFlash : true,
    badRequestMessage : 'Ambos campos son obligatorios'
})

// Revisar si el usuario esta autenticado 
exports.verificarUsuario = (req, res, next) => {
    // revisar el usuario
    if (req.isAuthenticated()) {
        return next();
    }

    // caso contrario vamos a redireccionar
    res.redirect('/iniciar-sesion')
}


exports.mostrarPanel = (req, res) => {
    res.render('administracion', {
        nombrePagina : 'Panel de administración',
        tagline : 'Crea y Administra tus vacantes desde aquí'
    })
}

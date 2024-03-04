const passport = require('passport');
const {  mongoose } = require("mongoose");
const Vacante = mongoose.model('Vacante');

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


exports.mostrarPanel = async (req, res) => {
    
    // consutlar el usuario autenticado
    const vacantes = await Vacante.find({autor : req.user._id}).lean();;
    console.log(vacantes);
    res.render('administracion', {
        nombrePagina : 'Panel de administración',
        tagline : 'Crea y Administra tus vacantes desde aquí',
        cerrarSesion : true,
        nombre : req.user.nombre,
        vacantes
    })
}

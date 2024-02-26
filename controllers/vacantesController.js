const {  mongoose } = require("mongoose");

// const Vacante = require('../models/Vacantes');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) =>{
    res.render('nueva-vacante', {
        nombrePagina : 'Nueva Vacante',
        tagline : 'Llena el formulario y publica tu vacante'
    })
}

// agregar las vacantes a la base de datos
exports.agregarVacante = async(req, res) => {
    const vacante = new Vacante(req.body);

    // crear arreglo de habilidades
    vacante.skills = req.body.skills.split(',');

    // almacenar en la base de datos
    const nuevaVacante = await vacante.save();

    res.redirect(`/vacantes/${nuevaVacante.url}`);
}


// muestra una vacante
exports.mostrarVacante = async(req, res, next) => {
    const vacante = await Vacante.findOne({ url : req.params.url}).lean();

    // si no hay resultados
    if (!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina : vacante.titulo,
        barra : true
    })
}

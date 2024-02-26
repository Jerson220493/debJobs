const {  mongoose } = require("mongoose");
// const Vacante = require('../models/Vacantes');
const Vacante = mongoose.model('Vacante');

exports.mostrarTrabajos = async(req, res, next) => {

    const vacantes = await Vacante.find().lean();

    if (!vacantes) return next();

    console.log(vacantes);

    res.render('home', {
        nombrePagina : 'debJobs',
        tagline : 'Encuentra y publica trabajos para desarrolladores web',
        barra : true,
        botton : true,
        vacantes
    })
}

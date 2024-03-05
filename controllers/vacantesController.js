const {  mongoose } = require("mongoose");

// const Vacante = require('../models/Vacantes');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) =>{
    res.render('nueva-vacante', {
        nombrePagina : 'Nueva Vacante',
        tagline : 'Llena el formulario y publica tu vacante',
        cerrarSesion : true,
        nombre : req.user.nombre,
    })
}

// agregar las vacantes a la base de datos
exports.agregarVacante = async(req, res) => {
    const vacante = new Vacante(req.body);

    vacante.autor = req.user._id;

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

exports.formEditarVacante = async(req, res, next) => {
    const vacante = await Vacante.findOne({ url : req.params.url}).lean();

    if (!vacante) return next();

    res.render('editar-vacante', {
        vacante,
        nombrePagina : `Editar - ${vacante.titulo}`,
        cerrarSesion : true,
        nombre : req.user.nombre,
    })

}

exports.editarVacante = async(req, res, next) => {
    const vacanteActualizada  = req.body;

    vacanteActualizada.skills = req.body.skills.split(',');

    const vacante = await Vacante.findOneAndUpdate({url : req.params.url}, vacanteActualizada , {
        new : true,
        runValidatos : true
    })

    res.redirect(`/vacantes/${vacante.url}`)
}


// validar y sanitizar los campos de las nuevas vacantes
exports.validarVacante = (req, res, next) => {
    // sanitizar los cmapos
    req.sanitizeBody('titulo').escape();
    req.sanitizeBody('empresa').escape();
    req.sanitizeBody('ubicacion').escape();
    req.sanitizeBody('salario').escape();
    req.sanitizeBody('contrato').escape();
    req.sanitizeBody('skills').escape();

    // validar
    req.checkBody('titulo', 'Agrega un titulo a la vacante').notEmpty();
    req.checkBody('empresa', 'Agrega una empresa').notEmpty();
    req.checkBody('ubicacion', 'Agrega una ubicacion').notEmpty();
    req.checkBody('contrato', 'Selecciona un tipo de contrato').notEmpty();
    req.checkBody('skills', 'Agrega al menos una habilidad').notEmpty();

    const errores = req.validationErrors();

    if (errores) {
        //Recargar la vista con los errores
        req.flash('error', errores.map(error => error.msg));
        res.render('nueva-vacante', {
            nombrePagina : 'Nueva Vacante',
            tagline : 'Llena el formulario y publica tu vacante',
            cerrarSesion : true,
            nombre : req.user.nombre,
            mensajes : req.flash()
        })
        return
    }

    // en caso de no existir errores
    next();

}
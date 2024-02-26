exports.formularioNuevaVacante = (req, res) =>{
    res.render('nueva-vacante', {
        nombrePagina : 'Nueva Vacante',
        tegLinea : 'Llena el formulario y publica tu vacante'
    })
}

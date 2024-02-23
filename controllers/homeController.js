
exports.mostrarTrabajos = (req, res) => {
    res.render('home', {
        nombrePagina : 'debJobs',
        tagline : 'Encuentra y publica trabajos para desarrolladores web',
        barra : true,
        botton : true
    })
}

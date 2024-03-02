const mongoose = require('mongoose'); // importamos la conexion 
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt'); // importar bcrypt para la encriptacion de passwords

const usuariosSchema = new mongoose.Schema({
    email :{ 
        type : String,
        unique : true,
        lowercase : true,
        trim : true
    },
    nombre : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    },
    token : String,
    expira : Date
});

// metodo para hashear los passwords
usuariosSchema.pre('save', async function (next){
    // si el password ya esta hasheado no hacer nada
    if (!this.isModified('password')) {
        return next();
    }
    // si no esta hasheado
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    next();
})

// envia alerta si un usuario ya esta registrado
usuariosSchema.post('save', function(error, doc, next){ console.log(error);
    if (error.name === 'MongoServerError' && error.code === 11000 ) {
        next('Ese correo ya esta registrado');
    }else{
        next(error)
    }
})

// autenticar usuarios
usuariosSchema.methods = {
    compararPassword : function(password){
        return bcrypt.compareSync(password, this.password)
    }
}

module.exports = mongoose.model('Usuarios', usuariosSchema);


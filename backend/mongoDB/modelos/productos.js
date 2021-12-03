const Mongoose  = require("mongoose");


    let productos = new Mongoose.Schema({
            nombre: String,
            stock: Number,
            claves: [String],
            precio: Number
    })

    module.exports = Mongoose.model('productos', productos)
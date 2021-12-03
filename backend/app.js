const express = require("express")

const app = express()

require("./mongoDB/baseD")

const productosMongo = require('./mongoDB/modelos/productos')

const port = 4000

const cors = require('cors')
const productos = require("./mongoDB/modelos/productos")
const { findOneAndUpdate } = require("./mongoDB/modelos/productos")

const corsOptions = {

    origin : "http://localhost:4200"

}

app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))

app.use (express.json())

app.post("/productos", (req, res ) => {


let productos  = new productosMongo({
    nombre: req.body.nombre,
    stock : req.body.stock,
    claves: req.body.claves,
    precio: req.body.precio
    
}) // Otro metodo de guardado//
productos.save((err, doc) => {
    if (err) {
        res.send(undefined)
    } else {
        res.send(doc)
    }
})
/*.save().then((_) => {
    console.log("Guardado");
    res.send(true)
}).catch((e)=> {
      console.log(e);
      res.send("error") 

})  */


})

app.get('/productos2', (req, res) => {

productosMongo.find().then((datos) => res.send(datos)).catch((_) => res.send("error"))


})

app.get('/productos3', (req, res) => {

   

   /* productosMongo.findOne({

        $and: [
            {
                productos: req.query.productos
            },
        ]
    }).then((dato) => res.send(dato)).catch(res.send(false)) */
      
           


   productosMongo.find().then((dato) => res.send(dato)).catch((_) => console.log("no funcionoxs"))
        console.log("Funciona")
   
})


app.put('/claves', (req, res) => { 

        productosMongo.findOneAndUpdate(
            
            {
               nombre: req.body.nombre 
            },
            {
                $push:{
                        claves: req.body.claves
                },
            },
            {
                returnOriginal: false
            },
            (err, doc) => {
                        if(err)     {
                            console.log("No Funciono");
                                res.send(err)
                        } else {
                            console.log("Funciono");
                            res.send(doc)
                        }
            }
        )


})

app.put('/borradoClaves', (req, res) => {

    productosMongo.findOneAndUpdate(
        {
            nombre: req.body.nombre
        },
        {
            $set: {
                claves: req.body.claves
            }
            
        },
        {
            returnOriginal: false
        },
        (err, doc) => {

            if (err) {
                console.log("No funciona-B/Claves");
                res.send(err)
            } else {

                console.log("Funciono B/Claves");
                res.send(doc)

            }


        }
            
    )


})

app.delete("/borrarProducto/:id", (req, res) => {

let variable = req.params.id
productosMongo.findOneAndRemove({
    _id: variable
}).then((dato) => res.send(true)).catch((_) => res.send(false))

})



app.listen(port,() => {

    console.log("El Puerto " + port + " se puede utilizar");


}) 



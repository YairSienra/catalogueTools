const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/baseD')
.then(_ => console.log("Me conecte a tu base de datos"))
.catch((e)=> console.log(e))


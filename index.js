'use strict'

var mongoose =  require('mongoose'); //intermediadio de la base de datos
var app = require('./app');
var port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;//quitar el aviso que sale por consola

mongoose.connect('mongodb://localhost:27017/bd_array',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("La conexión de la base de datos bd_array se está ejecutándose correctamente");
        app.listen(port,function(){
            console.log("Servidor del API REST de bd_array escuchando en hhtp://localhost:"+port)
        })
    }
})

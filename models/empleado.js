'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = Schema({
    nombre: { type: String, required: true, max: 100 },    
    myarray: {
        type: [{           
            point: { type: Number },
        }],        
    },  
})

module.exports = mongoose.model('Empleado', EmpleadoSchema);
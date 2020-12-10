'use strict'
var express = require('express');
var empleadoController = require('../controllers/empleado');
var mdAuth = require('../middleware/authenticated');
var api = express.Router();


api.post('/empleado', empleadoController.saveEmpleado);
api.get('/empleado/:id', empleadoController.getEmpleado);

api.get('/gets-array', empleadoController.getsArray);
api.get('/get-item-array', empleadoController.getItemArray);
api.post('/add-item-array', empleadoController.addItemArray);
api.put('/update-item-array', empleadoController.updateItemArray);
api.delete('/delete-item-array', empleadoController.deleteItemArray);






module.exports = api;
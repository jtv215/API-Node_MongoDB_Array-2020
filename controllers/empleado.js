'user strict'

var Empleado = require('../models/empleado');
var ObjectID = require('mongodb').ObjectID;

function saveEmpleado(req, res) {
    var empleado = new Empleado();
    var params = req.body;
    empleado.nombre = params.nombre;

    empleado.save((err, empleadoStored) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el empleado',
                error: err
            });

        } else {
            if (!empleadoStored) {
                res.status(404).send({
                    message: 'No se ha registrado el usuario empleado',
                    error: empleadoStored,
                });

            } else {
                res.status(200).send({ empleado: empleadoStored });

            }

        }
    });
}



/***Métodos para add,update,delelte, get, gets de un arrays */

function addItemArray(req, res) {
    var params = req.body;
    var empleadoId = params.empleadoId;
    var point = params.point;

    Empleado.findOneAndUpdate({ "_id": empleadoId },
        {
            $push: {
                "myarray": { "_id": new ObjectID, "point": point }
            }
        }, (err, itemStored) => {
            if (err) {
                res.status(500).send({ message: 'Error al guardar un item del array' });
            } else {
                if (!itemStored) {
                    res.status(404).send({ message: 'No se ha añadido el item en el array' });
                } else {
                    res.status(200).send({ empleado: itemStored });

                }
            }
        });
}

function getsArray(req, res) {
    var params = req.body;
    var empleadoId = params.empleadoId;
    var arrayId = params.arrayId;

    var query = Empleado.find({ _id: empleadoId }).select('myarray');

    query.exec(function (err, arrays) {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor al eliminar el item del array' });
        } else {
            if (!arrays) {
                res.status(404).send({ message: 'No se ha borrado el item del array' });
            } else {
                res.status(200).send({ myarray: arrays });
            }
        }
    });
}

function getItemArray(req, res) {
    var params = req.body;
    var empleadoId = params.empleadoId;
    var arrayId = params.arrayId;

    Empleado.find({ _id: empleadoId },
        {
            "myarray": {
                $elemMatch: { "_id": arrayId }
            }
        }, (err, itemArray) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor al eliminar el item del array' });
            } else {
                if (!itemArray) {
                    res.status(404).send({ message: 'No se ha borrado el item del array' });
                } else {
                    res.status(200).send({ empleado: itemArray });
                }
            }
        });
}

function updateItemArray(req, res) {
    var params = req.body;
    var empleadoId = params.empleadoId;
    var arrayId = params.arrayId;
    var point = params.point;

    Empleado.findOneAndUpdate({ _id: empleadoId, "myarray._id": arrayId },
        {
            $set: {
                "myarray.$.point": point
            }
        }, (err, itemUpdate) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor al editar el item del array' });
            } else {
                if (!itemUpdate) {
                    res.status(404).send({ message: 'No se ha actualizado el item del array' });
                } else {
                    res.status(200).send({ empleado: itemUpdate });
                }
            }
        });
}


function deleteItemArray(req, res) {
    var params = req.body;
    var empleadoId = params.empleadoId;
    var arrayId = params.arrayId;

    Empleado.findByIdAndUpdate({ _id: empleadoId },
        {
            $pull: {
                "myarray": { _id: arrayId }
            }
        }, (err, itemRemove) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor al eliminar el item del array' });
            } else {
                if (!itemRemove) {
                    res.status(404).send({ message: 'No se ha borrado el item del array' });
                } else {
                    res.status(200).send({ empleado: itemRemove });
                }
            }
        });
}


/************  Métodos para empleados*/
function getEmpleado(req, res) {
    var empleadoId = req.params.id;

    Empleado.findById(empleadoId, (err, empleado) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!empleado) {
                res.status(404).send({ message: 'El nombre empleado no existe.' });
            } else {
                res.status(200).send({ empleado: empleado });
            }
        }
    });
}

function getEmpleados(req, res) {

    Empleado.find({}).sort('nombre').exec(function (err, empleados) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!empleados) {
                res.status(404).send({ message: 'No hay nombres de empleados' });
            } else {
                res.status(200).send({ empleados: empleados });
            }
        }
    });
}

function updateEmpleado(req, res) {
    var empleadoId = req.params.id;
    var update = req.body;

    Empleado.findByIdAndUpdate(empleadoId, update, (err, empleadoEUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al modificar el empleado' });
        } else {
            if (!empleadoEUpdated) {
                res.status(404).send({ message: 'El empleado no se ha sido actualizado' });
            } else {
                res.status(200).send({ empleado: empleadoEUpdated });
            }
        }
    });
}

function deleteEmpleado(req, res) {
    var empleadoId = req.params.id;

    Empleado.findByIdAndRemove(empleadoId, (err, empleadoRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el empleado' });
        } else {
            if (!empleadoRemoved) {
                res.status(404).send({ message: 'El empleado no ha sido eliminado' });
            } else {
                res.status(200).send({ empleado: empleadoRemoved });

            }
        }
    });

}



module.exports = {
    saveEmpleado,
    addItemArray,
    getsArray,
    getItemArray,
    updateItemArray,
    deleteItemArray,
    getEmpleado,
    getEmpleados,
    updateEmpleado,
    deleteEmpleado,


};
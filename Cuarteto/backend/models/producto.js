const mongoose = require('mongoose');

var ProductoSchema = mongoose.Schema({
    codigo: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String,
    marca: String,
    modelo: String
}, { versionKey: false });

module.exports = mongoose.model('Producto', ProductoSchema, 'productos');

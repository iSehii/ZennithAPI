const { Schema, model } = require('mongoose');

const bancosSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    ubicacion: { type: String, required: true },
    bateria: { type: Number, required: true },
    disponible: { type: Boolean, required: true},
    token: { type: String, requierd: false },
    usuario: {type: String, required: false, allowNull: true },
});

const Bancos = model('Bancos', bancosSchema);

module.exports = Bancos;

// models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    fn: {type: Date, required: true},
    genero: {type: String, required: true},
    rol: {type: Number, required: true,},
    foto: {type: String, required: true}
});

const User = model('User', userSchema);

module.exports = User;

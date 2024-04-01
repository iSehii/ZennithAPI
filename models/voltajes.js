const mongoose = require('mongoose');
const Lectura = new mongoose.Schema({
    voltage: {
        type: Number,
        required: false
    },
    correo: {
        type: String,
        required: false
    },
    porcentaje: {
        type: Number,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const VoltageReading = mongoose.model('Voltaje', Lectura);

module.exports = VoltageReading;

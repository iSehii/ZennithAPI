// models/Arduino.js
const { Schema, model } = require('mongoose');

const ArduinoSchema = new Schema({
    prueba: { type: String, required: true },
});

const Arduino = model('Arduino', ArduinoSchema);

module.exports = Arduino;

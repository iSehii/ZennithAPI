const arduino = require('../models/arduino');

const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

exports.arduino = async (req, res) => {
    try {
        const { prueba } = req.body;
        console.log('Se entro en la URL por POST, dato recibido: " '+prueba+' "');
        const newArduino = new arduino({ prueba });
        await newArduino.save();

        return res.status(200).json({ prueba: "Inicio exitoso" });
    } catch (error) {
        return res.status(500).json({ prueba: error.prueba });
    }
};

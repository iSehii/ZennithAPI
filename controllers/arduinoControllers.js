const arduino = require('../models/arduino');

const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

exports.arduino = async (req, res) => {
    try {
        const { message } = req.body;
        const newArduino = new arduino({ message });
        await newArduino.save();

        return res.status(200).json({ message: "Inicio exitoso" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

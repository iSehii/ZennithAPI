// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');

const express = require('express');
const router = express.Router();
router.use(express.json());

exports.registro = async (req, res) => {
    try {
        const { correo, password, nombre, apellidos, fn, genero  } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        // Crear un nuevo usuario
        if (correo != "" && password != "" && nombre != "" && apellidos != "" && fn != "" && genero != 'Seleccionar') {
            const newUser = new User({ correo, password, nombre, apellidos, fn, genero });
            await newUser.save();
        } else {
            return res.status(500).json({ message: 'No puedes dejar vacíos los campos' });
        }

        return res.status(201).json({ message: 'Usuario registrado exitosamente con: '+ correo+ " y " + password });
    } catch (error) {
        const { correo, password, } = req.body;
        return res.status(500).json({ message: error.message + correo + " y " + password });
    }
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const user = await User.findOne({ correo });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Crear token de sesión
        const token = jwt.sign({ userId: user._id }, 'tu_secreto_secreto');

        // Guardar el token de sesión en la base de datos
        const newSession = new Session({ userId: user._id, token });
        await newSession.save();

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

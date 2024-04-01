// controllers/authController.js
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const Users = require('../models/user');
const express = require('express');
const router = express.Router();
router.use(express.json());
const foto = "foto.png";
const rol = 3;
exports.registro = async (req, res) => {
    try {
        const { correo, password, nombre, apellidos, fn, genero  } = req.body;
        const existingUser = await Users.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        if (correo != "" && password != "" && nombre != "" && apellidos != "" && fn != "") {
            const newUser = new Users({ correo, password, nombre, apellidos, fn, genero, rol, foto });
            await newUser.save();
        } else {
            return res.status(500).json({ message: 'No puedes dejar vacíos los campos' });
        }

        return res.status(201).json({logueado: "1", message: "Registrado exitosamente", correo: correo, nombre: nombre, apellidos: apellidos, fn: fn, rol: rol, foto: foto});
    } catch (error) {
        const { correo, password, } = req.body;
        return res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const user = await Users.findOne({ correo });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const nombre = user.nombre;
        const apellidos = user.apellidos;
        const fn = user.fn;
        const genero = user.genero
        const rol = user.rol;
        const foto = user.foto;

        const token = jwt.sign({ userId: user._id }, 'tu_secreto_secreto');

        const newSession = new Session({ userId: user._id, token });
        await newSession.save();

        return res.status(200).json({ logueado: "1", genero: genero, correo: correo, nombre: nombre, apellidos: apellidos, fn: fn, rol: rol, foto: foto });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

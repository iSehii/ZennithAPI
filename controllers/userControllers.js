const User = require('../models/user');
const express = require('express');
const router = express.Router();
router.use(express.json());



exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
}
exports.getUserByCorreo = async (req, res) => {
    try {
        const usuario = await User.findOne({ correo: req.params.correo });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateUserByCorreo = async (req, res) => {
    try {
        const usuario = await User.findOneAndUpdate({ correo: req.params.correo }, req.body, { new: true });
        console.log(req.body);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const userFound = await User.findOne({ correo: req.params.correo });
        return res.status(200).json({ message: "Editado exitosamente", correo: userFound.correo, nombre: userFound.nombre, apellidos: userFound.apellidos, fn: userFound.fn, rol: userFound.rol, foto: userFound.foto, genero: userFound.genero });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteUserByCorreo = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ correo: req.params.correo });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

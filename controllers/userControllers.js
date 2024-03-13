const User = require('../models/user');

exports.getUserByCorreo = async (req, res) => {
    try {
        const user = await User.findOne({ correo: req.params.correo });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateUserByCorreo = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ correo: req.params.correo }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: 'Usuario actualizado correctamente' });
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

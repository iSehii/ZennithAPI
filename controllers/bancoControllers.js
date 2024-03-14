const Banco = require('../models/bancos');

exports.crearBanco = async (req, res) => {
    try {
        const { nombre, ubicacion, bateria, disponible } = req.body;
        const bancoExistente = await Banco.findOne({ nombre });
        if (bancoExistente) {
            return res.status(400).json({ message: 'El banco ya existe' });
        }
        if (nombre != "" && ubicacion != "" && bateria != "" && disponible != null) {
            const nuevoBanco = new Banco({ nombre, ubicacion, bateria, disponible });
            await nuevoBanco.save();
        } else {
            return res.status(500).json({ message: 'No puedes dejar vacíos los campos' });
        }
        return res.status(201).json({ message: "Banco creado exitosamente" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

exports.obtenerBanco = async (req, res) => {
    try {
        const bancos = await Banco.findOne({ nombre: req.params.nombre });
        if (!bancos) {
            return res.status(404).json({ message: 'Banco no encontrado'+nombre });
        }
        return res.status(200).json(bancos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.actualizarBanco = async (req, res) => {
    try {
        const bancos = await Banco.findOneAndUpdate({ nombre: req.params.nombre }, req.body, { new: true });
        if (!bancos) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }
        return res.status(200).json({ message: 'Banco actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.borrarBanco = async (req, res) => {
    try {
        const bancos = await Banco.findOneAndDelete({ nombre: req.params.nombre });
        if (!bancos) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }
        return res.status(200).json({ message: 'Banco eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const Banco = require('../models/bancos');
const User = require('../models/user');
const voltajeModel = require('../models/voltajes');
exports.crearBanco = async (req, res) => {
    try {
        const { nombre, ubicacion, bateria, disponible } = req.body;
        const bancoExistente = await Banco.findOne({ nombre });
        if (bancoExistente) {
            return res.status(400).json({ message: 'El banco ya existe' });
        }

            const nuevoBanco = new Banco({ nombre, ubicacion, bateria, disponible });
            await nuevoBanco.save();
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
exports.usarBanco = async (req,res) => {
    try {
        const bancos = await Banco.findOneAndUpdate({ nombre: req.params.nombre }, req.body, { new: true });
        if (!bancos) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }
        return res.status(200).json({ message: 'Banco utilizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.DejarBanco = async (req, res) => {
    try {
        const bancoss = await Banco.findOne({ nombre: req.params.nombre });
        if (!bancoss) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }
        if (bancoss.token == req.body.token) {

            const bancos = await Banco.findOneAndUpdate({ nombre: req.params.nombre }, req.body, { new: true });
            if (!bancos) {
                return res.status(404).json({ message: 'Banco no encontrado' });
            }
            var token = Math.random().toString(36).substr(2, 5);
            const tokens = await Banco.findOneAndUpdate(
                { nombre: req.params.nombre },
                { $set: { token: token } }, 
                { new: true, useFindAndModify: false } 
                );
                
                return res.status(200).json({ message: 'Banco dejado correctamente' });
            } else {
                return res.status(200).json({message: 'Token incorrecto'});
            } 
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
}
exports.obtenerVoltaje = async (req, res) => {
    try {
        const voltaje = await voltajeModel.find({}, { _id: 0, __v: 0 }).sort({ timestamp: -1 }).limit(10); // Obtener los últimos 10 registros, por ejemplo
        res.json(voltaje);
        console.log(voltaje);
    } catch (error) {
        console.error('Error al obtener los datos de voltaje:', error);
        res.status(500).send('Error interno del servidor');
    }
}
var seUsaPrimeroCount = 0;
var disponibleCount = 0;
exports.actualizarBanco = async (req, res) => {
    try {
        console.log(req.body);
        var nombre;
        if (req.body.arduino == true) {
            const bancos = await Banco.findOneAndUpdate({ nombre: req.params.nombre }, req.body, { new: true });
            const Usuario = await User.findOne({ correo: bancos.usuario });
            if (!bancos) {
                return res.status(404).json({ message: 'Banco no encontrado' });
            }
            if (bancos.usuario != null) {
                var seUsaToken = "si";
                nombre = Usuario.nombre;
                if (seUsaPrimeroCount == 0) {
                    var seUsaPrimero = false;
                    seUsaPrimeroCount = 1;
                } else {
                    var seUsaPrimero = true;
                }
                try {
                    const { voltaje } = req.body;
                    if (voltaje < 2.1 || voltaje > 4.2) {
                        console.log('El voltaje está fuera del rango permitido');
                    }
                    
                    const lectura = new voltajeModel({ voltage: voltaje, correo: bancos.usuario, porcentaje: bancos.bateria });
                    await lectura.save();

                } catch (error) {
                    console.error('Error al guardar los datos de voltaje:', error);
                }
            
                return res.status(200).json({ message: 'Banco actualizado correctamente', token: bancos.token, seUsaPrimero: seUsaPrimero, bateria: req.body.bateria, nombre: Usuario.nombre, seUsaToken: seUsaToken });
            } else {
                if (disponibleCount == 0) {
                    var disponible = false;
                    disponibleCount = 1;
                } else {
                    var disponible = true;
                }
                var seUsaToken = "no";
                seUsaPrimeroCount = 0;
                return res.status(200).json({bateria: req.body.bateria, token: bancos.token, seUsaToken: seUsaToken, disponible});
            }
            console.log(Usuario);
        }
        if (!bancos) {
            return res.status(404).json({ message: 'Banco no encontrado' });
        }
        return res.status(200).json({ message: 'Banco actualizado correctamente' });
    } catch (error) {
        console.log(error);
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

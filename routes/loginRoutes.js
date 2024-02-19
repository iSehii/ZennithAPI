const express = require('express');
const router = express.Router();

// Middleware para analizar el cuerpo de la solicitud como JSON
router.use(express.json());

router.post('/', (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { username, password } = req.body;

    // Aquí podrías agregar la lógica para autenticar al usuario
    // Por ahora, simplemente mostraremos los datos recibidos y enviaremos una respuesta de ejemplo
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);

    // Enviar una respuesta de ejemplo
    return res.json({ message: '¡Inicio de sesión exitoso!', username: username });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { obtenerBanco, actualizarBanco, borrarBanco, crearBanco } = require('../controllers/bancoControllers');

router.use(express.json());
router.post('/registro', crearBanco);
router.get('/:nombre', obtenerBanco);
router.put('/:nombre', actualizarBanco);
router.delete('/:nombre', borrarBanco);

module.exports = router;

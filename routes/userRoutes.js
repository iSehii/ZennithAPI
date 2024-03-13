const express = require('express');
const router = express.Router();
const { getUserByCorreo, deleteUserByCorreo, updateUserByCorreo } = require('../controllers/userControllers');

router.get('/:correo', getUserByCorreo);
router.delete('/:correo', deleteUserByCorreo);
router.put('/:correo', updateUserByCorreo);

module.exports = router;
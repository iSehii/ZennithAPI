const express = require('express');
const router = express.Router();
const { getUserByCorreo, deleteUserByCorreo, updateUserByCorreo, getUsers } = require('../controllers/userControllers');

router.get('/:correo', getUserByCorreo);
router.get('/', getUsers);
router.delete('/:correo', deleteUserByCorreo);
router.put('/:correo', updateUserByCorreo);

module.exports = router;
const express = require('express');
const router = express.Router();
const { login, registro } = require('../controllers/authControllers');

router.get('/login', login);
router.get('/registro', registro);

module.exports = router;

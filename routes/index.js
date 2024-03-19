const express = require('express');
const router = express.Router();
router.use(express.json());

    router.use('/users', require('./userRoutes'));
    router.use('/auth', require('./authRoutes'));
    router.use('/arduino', require('./arduinoRoutes'));
    router.use('/docs', require('./swaggerRoutes'));
    router.use('/bancos', require('./bancoRoutets'));
    module.exports = router;
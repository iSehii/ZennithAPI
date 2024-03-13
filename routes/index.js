const express = require('express');
const router = express.Router();

    router.use('/users', require('./userRoutes'));
    router.use('/auth', require('./authRoutes'));
    router.use('/arduino', require('./arduinoRoutes'));
    router.use('/docs', require('./swaggerRoutes'));
    module.exports = router;
const express = require('express');
const router = express.Router();

    router.use('/users', require('./userRoutes'));
    router.use('/products', require('./productRoutes'));
    router.use('/auth', require('./authRoutes'));
    router.use('/arduino', require('./arduinoRoutes'));

    module.exports = router;
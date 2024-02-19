const express = require('express');
const router = express.Router();

    router.use('/users', require('./userRoutes'));
    router.use('/products', require('./productRoutes'));
    router.use('/auth', require('./authRoutes'));

    module.exports = router;
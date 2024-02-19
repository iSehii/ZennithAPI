const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    return res.send('Ruta a login');
});

module.exports = router;
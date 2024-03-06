const express = require('express');
const router = express.Router();
const { arduino } = require('../controllers/arduinoControllers');

router.use(express.json());
router.post('/', arduino);

module.exports = router;

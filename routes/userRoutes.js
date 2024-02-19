const express = require('express');
const router = express.Router();
const { index } = require('../controllers/userControllers');

router.get('/', index);

module.exports = router;
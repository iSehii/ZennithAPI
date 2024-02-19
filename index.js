const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.use('/api', require('./routes/index'))
app.listen(port, () => {
  console.log(`Ejecutando en: http://localhost:${port}`);
});
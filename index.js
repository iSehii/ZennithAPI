const express = require('express');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes');
const port = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.use('/api', require('./routes/index'))

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Zennith:cVPt5FkBXKt9FXA6@utvt.fuicefd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, () => {
  console.log(`Ejecutando en: http://localhost:${port}`);
});
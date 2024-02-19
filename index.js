const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const port = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.use('/api', require('./routes/index'))

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://Zennith:cVPt5FkBXKt9FXA6@utvt.fuicefd.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a MongoDB.');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

// Middlewares
app.use(express.json());

app.listen(port, () => {
  console.log(`Ejecutando en: http://localhost:${port}`);
});
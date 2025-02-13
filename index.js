const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const port = process.env.PORT || 3005;
const app = express();
app.use(cors());
app.use('/api', require('./routes/index'))
app.use(morgan('dev'));

mongoose.connect('mongodb+srv://Zennith:Proyecto@utvt.zuwt3.mongodb.net/?retryWrites=true&w=majority&appName=utvt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión exitosa a MongoDB.');
});

app.use(bodyParser.json());
app.use(express.json());

app.listen(port, () => {
  console.log(`Ejecutando en: http://localhost:${port}`);
});
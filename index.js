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
//mongodb+srv://Zennith:cVPt5FkBXKt9FXA6@utvt.fuicefd.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://zenit:orNjLnazwg3mE4Yp@zennit.p35k7as.mongodb.net/Final?retryWrites=true&w=majority&appName=Zennit', {
//mongoose.connect('mongodb://localhost:27017/prueba2', {  
useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a MongoDB.');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

app.use(bodyParser.json());
app.use(express.json());

app.listen(port, () => {
  console.log(`Ejecutando en: http://localhost:${port}`);
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB', err));

app.use('/api/auth', authRoutes);

app.listen(3000, '0.0.0.0', () => console.log('Servidor corriendo en puerto 3000'));


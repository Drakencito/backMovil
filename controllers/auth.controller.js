const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};


const register = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });
  
      // Crear nuevo usuario
      const newUser = new User({ email, password });
      await newUser.save();
  
      // Crear token JWT
      const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      res.status(201).json({ token, user: { id: newUser._id, email: newUser.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };
  
  module.exports = { login, register };

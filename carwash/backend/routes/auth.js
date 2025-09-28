const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Register
router.post('/register', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Check incoming data
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'Please provide username, email and password' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists with this email' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, role: role || 'customer' });
    await user.save();

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ message: 'Login successful', token, user: { id: user._id, username: user.username, email: user.email, role: user.role }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

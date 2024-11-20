const express = require('express');
const router = express.Router();
const User = require('../models/User.model'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Add this line
const verifyToken = require('../middleware/authMiddleware'); // Add this line

// /auth/signup request: { username, password, email, campus, course, image }, response: { user }
router.post('/signup', async (req, res, next) => {
  const { username, password, email, campus, course, image } = req.body;

  if (!username || !password || !email) {
    res
      .status(400)
      .json({ message: 'Please provide a username, email, and a password' });
    return;
  }

  if (password.length < 7) {
    res
      .status(400)
      .json({ message: 'Password must be at least 8 characters long' });
    return;
  }

  try {
    const salt = bcrypt.genSaltSync();
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      password: hashPass,
      email,
      campus,
      course,
      image,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

// /auth/login request: { username, password }, response: auth token
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ message: 'Please provide both username and password' });
    return;
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      // Generate a token
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
        expiresIn: '1h',
      });

      res.json({ user, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

// /auth/verify request: { token }, response: { user }
router.get('/verify', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ user });
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

module.exports = router;

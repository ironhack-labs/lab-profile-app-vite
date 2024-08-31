const express = require('express');
const User = require('../models/User.model');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.put('/users', (req, res, next) => {
  const { image } = req.body;

  const username = req.payload.username;

  User.findOneAndUpdate({ username }, { image }, { new: true })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => next(err));
});

router.get('/users', (req, res, next) => {
  const username = req.payload.username;

  // Check the users collection if a user with the same username exists
  User.findOne({ username })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: 'User not found.' });
        return;
      }

      res.status(200).json(foundUser);
    })
    .catch((err) => next(err));
});

router.post('/upload', (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ imageUrl: req.file.path });
});
module.exports = router;

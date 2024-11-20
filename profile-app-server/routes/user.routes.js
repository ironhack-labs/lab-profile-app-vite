const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const verifyToken = require('../middleware/authMiddleware');

// PUT	/api/users	{, image }	Updated user object
router.put('/users', verifyToken, async (req, res, next) => {
  const { image } = req.body;

  if (!image) {
    res.status(400).json({ message: 'Please provide an image' });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

// GET	/api/users		Current user object
router.get('/users', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    console.warn(error);
    next(error);
  }
});
// POST	/api/upload	form-data with the image file	Image URL
router.post('/upload', verifyToken, async (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  try {
    res.status(200).json({ imageUrl: req.file.path });
  } catch (error) {
    console.warn(error);
    next(error);
  }
});

module.exports = router;

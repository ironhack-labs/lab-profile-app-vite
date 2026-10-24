const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// The README uses both `/api/users` and `/api/user`, so we accept both
const USER_PATHS = ["/users", "/user"];

// GET /api/users - Returns the current (logged in) user
router.get(USER_PATHS, isAuthenticated, (req, res, next) => {
  User.findById(req.payload._id)
    .select("-password")
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => next(err));
});

// PUT /api/users - Updates the current user (image, username, campus, course)
router.put(USER_PATHS, isAuthenticated, (req, res, next) => {
  // Only pick the fields we allow to be edited (never the password here)
  const updates = {};
  ["image", "username", "campus", "course"].forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  User.findByIdAndUpdate(req.payload._id, updates, {
    new: true,
    runValidators: true,
  })
    .select("-password")
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((err) => {
      if (err.name === "ValidationError" || err.code === 11000) {
        res.status(400).json({ message: err.message });
        return;
      }
      next(err);
    });
});

// POST /api/upload - Uploads an image to Cloudinary and returns its URL
// The client must send form-data with the file under the "image" key
router.post(
  "/upload",
  isAuthenticated,
  fileUploader.single("image"),
  (req, res, next) => {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded!" });
      return;
    }
    res.status(200).json({ image: req.file.path });
  }
);

module.exports = router;

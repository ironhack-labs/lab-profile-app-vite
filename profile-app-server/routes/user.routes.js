const express = require("express");
const router = express.Router();
const fileUploader = require("../middleware/cloudinary.middleware");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// 1. Ruta para subir la imagen a Cloudinary[cite: 10]
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

// 2. Ruta para obtener el usuario actual (/api/user)
router.get("/user", isAuthenticated, (req, res, next) => {
  User.findById(req.payload._id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

// 3. Ruta para editar la información del usuario (/api/user)
router.put("/user", isAuthenticated, (req, res, next) => {
  const { username, campus, course, image } = req.body;
  const userId = req.payload._id;

  User.findByIdAndUpdate(
    userId,
    { username, campus, course, image },
    { new: true },
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => next(err));
});

// (Opcional si lo usabas antes) Ruta para actualizar solo la imagen
router.put("/users/image", isAuthenticated, (req, res, next) => {
  const { image } = req.body;
  User.findByIdAndUpdate(req.payload._id, { image }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((err) => next(err));
});

module.exports = router;

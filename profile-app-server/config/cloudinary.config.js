// ℹ️ Configures Cloudinary + multer so routes can accept image uploads
// https://www.npmjs.com/package/multer-storage-cloudinary
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile-app",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

module.exports = multer({ storage });

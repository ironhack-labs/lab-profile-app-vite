const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    campus: {
      type: String,
      required: [true, 'Campus is required.'],
      enum: [
        "Madrid",
        "Barcelona",
        "Miami",
        "Paris",
        "Berlin",
        "Amsterdam",
        "México",
        "Sao Paulo",
        "Lisbon",
        "Remote"
      ]
    },
    course: {
      type: String,
      required: [true, 'Course is required.'],
      enum: ["Web Dev", "UX/UI", "Data Analytics", "Cyber Security"]
    },
    image: {
      type: String,
      default: "" 
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

Model = User;
module.exports = User;
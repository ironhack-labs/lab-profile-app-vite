const { Schema, model } = require("mongoose");

const CAMPUSES = [
  "Madrid",
  "Barcelona",
  "Miami",
  "Paris",
  "Berlin",
  "Amsterdam",
  "México",
  "Sao Paulo",
  "Lisbon",
  "Remote",
];

const COURSES = ["Web Dev", "UX/UI", "Data Analytics", "Cyber Security"];

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    campus: {
      type: String,
      enum: CAMPUSES,
    },
    course: {
      type: String,
      enum: COURSES,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
module.exports.CAMPUSES = CAMPUSES;
module.exports.COURSES = COURSES;

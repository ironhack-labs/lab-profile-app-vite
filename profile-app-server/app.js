// ℹ️ Gets access to environment variables/settings
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const express = require("express");
const app = express();

// ℹ️ This function runs most pieces of middleware (including CORS and express.json)
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

// ❗ To handle errors
require("./error-handling")(app);

module.exports = app;

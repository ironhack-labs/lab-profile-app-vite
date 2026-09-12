const express = require("express");
const cors = require("cors");
const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Añade los puertos de tu frontend
  }),
);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

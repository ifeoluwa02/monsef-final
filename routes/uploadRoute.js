const express = require("express");
const route = express.Router();
const uploadMiddleware = require("../middleware/upload");
const { Image: imageDB } = require("../middleware/db");

// Get Request
route.get("/", async (req, res) => {
  try {
    const data = await imageDB.find({}).sort({ createdAt: -1 });
    res.render("gallery", {
      results: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = route;

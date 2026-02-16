const express = require("express");
const routes = express.Router();
const uploadMiddleware = require("../middleware/upload");
const { Image: imageDB } = require("../middleware/db");
const cloudinary = require("../cloudinary");

// Get Request
routes.get("/", (req, res) => {
  res.render("admin");
});

routes.post("/", uploadMiddleware.single("myFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    
    const image = new imageDB({
      imageFileName: result.url
    });

    await image.save();
    res.redirect("/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: err.message
    });
  }
});

module.exports = routes;

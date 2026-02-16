const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection Successful");
  } catch (err) {
    console.log("Connection Failed:", err.message);
    process.exit(1);
  }
};

const uploadsSchema = new mongoose.Schema({
  imageFileName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model("image", uploadsSchema);

module.exports = { Image, connectDB };



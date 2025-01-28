const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  fileName: String,
  fileData: Buffer,
  isDeleted: { type: Boolean, default: false },
  userId: mongoose.Schema.Types.ObjectId,
  shortUrl: String,
  fileType: String,
});

module.exports = mongoose.model("file", FileSchema);

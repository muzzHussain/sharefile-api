const express = require("express");
const multer = require("multer");
const shortId = require("shortid");
const File = require("../models/File");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/allFiles", auth, async (req, res) => {
  const files = await File.find({ isDeleted: false });
  res.send(files);
});

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  console.log("req -> ", req.file);
  const file = new File({
    fileName: req.file.originalname,
    fileData: req.file.buffer,
    userId: req.user.id,
    fileType: req.file.mimetype,
  });
  await file.save();
  res.send("File uploaded successfully");
});

router.delete("/delete/:id", auth, async (req, res) => {
  const file = await File.findOne({ _id: req.params.id, userId: req.user.id });
  if (!file) return res.status(404).send("File not found.");

  file.isDeleted = true;
  await file.save();
  res.send("File deleted successfully");
});

router.post("/share", auth, async (req, res) => {
  const { fileId } = req.body;
  try {
    const file = await File.findOne({ _id: fileId });
    if (!file) return res.status(404).send("File not found.");

    const longUrl = `${req.protocol}://${req.get("host")}/api/file/${fileId}`;

    const response = await fetch(process.env.TINY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TINYURL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl }),
    });

    if (!response.ok) {
      console.error("Error from URL shortener:", await response.text());
      return res.status(500).send("Failed to generate short URL.");
    }

    const data = await response.json();
    file.shortUrl = data.data.tiny_url;
    await file.save();

    res.send({ shortUrl: file.shortUrl });
  } catch (error) {
    console.error("Error in /share route:", error.message);
    res.status(500).send("Internal server error.");
  }
});

router.get("/file/:shortId", async (req, res) => {
  const shortUrl = `${req.protocol}://${req.get("host")}/file/${
    req.params.shortId
  }`;
  const file = await File.findOne({
    _id: req.params.shortId,
  });

  console.log("file -> ", file);

  if (!file || file.isDeleted) return res.status(404).send("File not found");

  res.set("Content-Disposition", `inline; filename="${file.fileName}"`);
  res.contentType(file.fileType);
  res.send(file.fileData);
});

router.get("/download/:id", async (req, res) => {
  const file = await File.findOne({ _id: req.params.id });
  if (!file || file.isDeleted) return res.status(404).send("File not found.");

  res.set("Content-Disposition", `attachment; filename=${file.fileName}`);
  res.send(file.fileData);
});

module.exports = router;

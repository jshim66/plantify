import express = require('express')
const multer = require("multer");

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req, res) => {
    res.send('Api Root')
})

router.get('/health', (req, res) => {
    res.send('Api Health')
})

router.post('/identify', upload.single("image"), (req, res) => {
  // Here you would handle the image upload and plant identification logic
  console.log("Received image");
  console.log(req.file);
  res.status(200).json({
    success: true,
    result: {
      commonName: "Monstera",
      scientificName: "Monstera deliciosa",
      confidence: 0.95
    }
  });
})

module.exports = router
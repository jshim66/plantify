import express = require("express")
const multer = require("multer");
const { identifyPlant } = require("../clients/plantIDClient");

const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req, res) => {
    res.send('Api Root')
})

router.get('/health', (req, res) => {
    res.send('Api Health')
})

function getMockPlantResult() {
  return {
    commonName: "Monstera",
    scientificName: "Monstera deliciosa",
    confidence: 0.5
  };
}


router.post("/identify", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const useMockPlantId = process.env.USE_MOCK_PLANT_ID === "true";

    if (useMockPlantId){
      console.log("Using mock plant result");

      return res.status(200).json({
        success: true,
        result: getMockPlantResult()
      });
    }
    
    const rawResult = await identifyPlant(req.file.buffer);

    console.log("Plant.id raw response:", rawResult);

    const suggestion = rawResult?.result?.classification?.suggestions?.[0];

    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: "No plant suggestions returned"
      });
    }

    const commonName =
      suggestion.details?.common_names?.[0] ||
      suggestion.name ||
      "Unknown Plant";

    const scientificName = suggestion.name || "Unknown";
    const confidence = suggestion.probability || 0;

    return res.status(200).json({
      success: true,
      result: {
        commonName,
        scientificName,
        confidence
      }
    });
  } catch (error) {
    console.error("Error in /identify route:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to identify plant"
    });
  }
});

module.exports = router
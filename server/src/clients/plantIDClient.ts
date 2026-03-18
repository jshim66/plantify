const PLANT_ID_URL = "https://api.plant.id/v3/identification";

async function identifyPlant(fileBuffer: Buffer) {
  const apiKey = process.env.PLANT_ID_API_KEY;

  if (!apiKey) {
    throw new Error("Missing PLANT_ID_API_KEY");
  }

  const base64Image = fileBuffer.toString("base64");

  const response = await fetch(
    `${PLANT_ID_URL}?details=common_names`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": apiKey
      },
      body: JSON.stringify({
        images: [base64Image]
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Plant.id error: ${response.status} ${errorText}`);
  }

  return response.json();
}

module.exports = { identifyPlant };
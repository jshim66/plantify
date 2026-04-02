require("dotenv").config();
const app = require("./app");

const PORT = 4000;

console.log("Plant API loaded: ", !!process.env.PLANT_ID_API_KEY);
console.log("Mock mode: ", process.env.USE_MOCK_PLANT_ID)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
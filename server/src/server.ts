const app = require("./app");
require("dotenv").config();

const PORT = 4000;

console.log("Plant API loaded: ", !!process.env.PLANT_ID_API_KEY);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
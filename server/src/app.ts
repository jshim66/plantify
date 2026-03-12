import Express = require("express");
const app = Express();

app.get("/", (req, res) => {
    console.log("hi")
    res.send("sup")
})

app.listen(4000);
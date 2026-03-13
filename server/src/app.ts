import Express = require("express");
const app = Express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    console.log("hi")
    res.send("sup")
})

const healthRoutes = require('./routes/health_routes');

app.use('/api', healthRoutes);

app.listen(4000);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weatherRoute = require("./routes/weather");
const apiLimiter = require("./middlewares/rate-limit");
const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use("/api/weather", apiLimiter, weatherRoute);

 app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
module.exports = app;

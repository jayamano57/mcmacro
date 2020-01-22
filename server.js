const express = require("express");
const scraperControllers = require("./controllers/scraper");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`This is running on port: ${port}`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/scraper", scraperControllers.getScrape);

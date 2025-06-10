const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.route("/").get((req, res) => {
  res.send("Hello World");
});

db.authenticate()
  .then(() => {
    console.log("DB connection has been established successfully.");
    return db.sync();
  })
  .then(() => {
    console.log("DB synchronized and tables created, start server.");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to DB");
    console.error(err);
  });

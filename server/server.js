require("dotenv").config()
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const errorHandler = require("./handlers/errors")
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.use("/api/auth", authRoutes)

app.use((req, res, next) => {
  let err = new Error("THIS IS FAILING IN THE MAIN FRAME")
  err.status = 404;
  next(err)
});

app.use(errorHandler)

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`)
})

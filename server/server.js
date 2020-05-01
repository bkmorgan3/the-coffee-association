const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.post("/api/signup", (req, res) => {
  res.status(200).send({})
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`)
})

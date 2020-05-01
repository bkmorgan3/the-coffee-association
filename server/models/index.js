require("dotenv").config()
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, (err) => {
  console.log(`"bitchin! ${err}`)
})

module.exports.User = require("./user")
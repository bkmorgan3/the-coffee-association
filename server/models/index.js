const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, (err) => {
  if (err) {
    console.error(`"ERRROR! ${err}`)
  }
})

module.exports.User = require("./user")
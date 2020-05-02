const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImgUrl: {
    type: String
  },
  cafes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cafe"
  }]
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next()
    }
    let hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;
    return next()
  } catch (err) {
    return next(err)
  }
});

userSchema.methods.comparePassword = async function (candidatePW, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePW, this.password)
    return isMatch;
  } catch (err) {
    return next(err)
  }
}

const User = mongoose.model("User", userSchema)
module.exports = User
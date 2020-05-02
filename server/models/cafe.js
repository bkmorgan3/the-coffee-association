const mongoose = require("mongoose");
const User = require("./user");

const cafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50
  },
  photo: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
  {
    timestamps: true
  })

cafeSchema.pre('remove', async function (next) {
  try {
    let user = await User.findById(this.user);
    user.cafe.remove(this.id);
    await user.save()
  } catch (err) {
    return next(err)
  }
})

const Cafe = mongoose.model("Cafe", cafeSchema);
module.exports = Cafe;
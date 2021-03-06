const db = require("../models");
const jwt = require("jsonwebtoken")

exports.signin = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    })
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET
      )
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: 'Invalid login credentials.'
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Something went wrong on sign In"
    })
  }
}

exports.signup = async function (req, res, next) {
  console.log("RDB", req.body)
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    },
      process.env.SECRET
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch (err) {
    if (err.code === 11000) {
      err.message = "There was a problem, try signing up again."
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}
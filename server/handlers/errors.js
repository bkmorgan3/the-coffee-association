const errorHandler = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Something went wrong inside the error handler function.  Check errors.js bro!"
    }
  })
}

module.exports = errorHandler
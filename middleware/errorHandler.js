const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  return res.status(errStatus).json({
    status: errStatus,
    message: errMsg,
  });
};

module.exports = errorHandler;

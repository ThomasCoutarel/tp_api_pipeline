const sendSuccess = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendError = (res, error, statusCode = 500) => {
  console.error('Error:', error.message);
  res.status(statusCode).json({
    success: false,
    error: error.message,
    timestamp: new Date().toISOString()
  });
};

module.exports = { sendSuccess, sendError };
const { sendError } = require('./responseFormatter');

const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);
  
  if (err.response?.status === 503) {
    return sendError(res, new Error('FastAPI indisponible'), 503);
  }
  
  sendError(res, err, 500);
};

module.exports = errorHandler;
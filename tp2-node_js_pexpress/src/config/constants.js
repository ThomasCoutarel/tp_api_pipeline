require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  FASTAPI_URL: process.env.FASTAPI_URL || 'http://localhost:8000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_VERSION: 'v1'
};
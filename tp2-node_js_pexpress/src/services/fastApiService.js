const axios = require('axios');
const { FASTAPI_URL } = require('../config/constants');

class FastApiService {
  static async getPipelineData() {
    try {
      const response = await axios.get(`${FASTAPI_URL}/pipeline`);
      return response.data;
    } catch (error) {
      throw new Error(`FastAPI Error: ${error.message}`);
    }
  }
}

module.exports = FastApiService;
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Express REST API',
    timestamp: new Date().toISOString()
  });
});

// API Docs
app.get('/api/docs', (req, res) => {
  res.json({
    version: '1.0.0',
    endpoints: [
      'GET /api/v1/users',
      'GET /api/v1/users/:id',
      'GET /api/v1/phones',
      'GET /api/v1/phones/:id',
      'GET /api/v1/ibans',
      'GET /api/v1/ibans/:id',
      'GET /api/v1/credit-cards',
      'GET /api/v1/credit-cards/:id',
      'GET /api/v1/names',
      'GET /api/v1/names/:id',
      'GET /api/v1/pets',
      'GET /api/v1/pets/:id',
      'GET /api/v1/quotes',
      'GET /api/v1/quotes/:id',
      'GET /api/v1/jokes',
      'GET /api/v1/jokes/:id',
      'GET /api/v1/data'
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    path: req.path
  });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
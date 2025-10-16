const express = require('express');
const controllers = require('../controllers');
const { API_VERSION } = require('../config/constants');

const router = express.Router();

// ==================== USERS ====================
router.get(`/api/${API_VERSION}/users`, controllers.getUser);
router.get(`/api/${API_VERSION}/users/:id`, controllers.getUserById);

// ==================== PHONES ====================
router.get(`/api/${API_VERSION}/phones`, controllers.getPhone);
router.get(`/api/${API_VERSION}/phones/:id`, controllers.getPhoneById);

// ==================== IBANS ====================
router.get(`/api/${API_VERSION}/ibans`, controllers.getIban);
router.get(`/api/${API_VERSION}/ibans/:id`, controllers.getIbanById);

// ==================== CREDIT CARDS ====================
router.get(`/api/${API_VERSION}/credit-cards`, controllers.getCreditCard);
router.get(`/api/${API_VERSION}/credit-cards/:id`, controllers.getCreditCardById);

// ==================== NAMES ====================
router.get(`/api/${API_VERSION}/names`, controllers.getName);
router.get(`/api/${API_VERSION}/names/:id`, controllers.getNameById);

// ==================== PETS ====================
router.get(`/api/${API_VERSION}/pets`, controllers.getPet);
router.get(`/api/${API_VERSION}/pets/:id`, controllers.getPetById);

// ==================== QUOTES ====================
router.get(`/api/${API_VERSION}/quotes`, controllers.getQuote);
router.get(`/api/${API_VERSION}/quotes/:id`, controllers.getQuoteById);

// ==================== JOKES ====================
router.get(`/api/${API_VERSION}/jokes`, controllers.getJoke);
router.get(`/api/${API_VERSION}/jokes/:id`, controllers.getJokeById);

// ==================== AGGREGATED DATA ====================
router.get(`/api/${API_VERSION}/data`, controllers.getAllData);

module.exports = router;
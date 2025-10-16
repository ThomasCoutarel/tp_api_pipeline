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

router.get(`/api/${API_VERSION}/dark-data`, controllers.getDarkData);
router.get(`/api/${API_VERSION}/dark-data/fingerprint`, controllers.getDigitalFingerprint);
router.get(`/api/${API_VERSION}/dark-data/risk-score`, controllers.getRiskScore);
router.get(`/api/${API_VERSION}/dark-data/profile-completeness`, controllers.getProfileCompleteness);
router.get(`/api/${API_VERSION}/dark-data/geolocation-mismatch`, controllers.getGeolocationMismatch);

module.exports = router;
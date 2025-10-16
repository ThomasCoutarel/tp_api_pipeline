const FastApiService = require('../services/fastApiService');
const { 
  normalizeUser, 
  normalizePhone, 
  normalizeIban, 
  normalizeCreditCard, 
  normalizeName, 
  normalizePet, 
  normalizeQuote, 
  normalizeJoke 
} = require('../utils/helpers');
const { sendSuccess, sendError } = require('../middlewares/responseFormatter');

// ==================== USERS ====================
exports.getUser = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedUser = normalizeUser(pipelineData.user);
    sendSuccess(res, normalizedUser);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedUser = normalizeUser(pipelineData.user);
    normalizedUser.id = req.params.id;
    sendSuccess(res, normalizedUser);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== PHONES ====================
exports.getPhone = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedPhone = normalizePhone(pipelineData.phone_number);
    sendSuccess(res, normalizedPhone);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getPhoneById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedPhone = normalizePhone(pipelineData.phone_number);
    normalizedPhone.id = req.params.id;
    sendSuccess(res, normalizedPhone);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== IBANS ====================
exports.getIban = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedIban = normalizeIban(pipelineData.iban);
    sendSuccess(res, normalizedIban);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getIbanById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedIban = normalizeIban(pipelineData.iban);
    normalizedIban.id = req.params.id;
    sendSuccess(res, normalizedIban);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== CREDIT CARDS ====================
exports.getCreditCard = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedCard = normalizeCreditCard(pipelineData.credit_card);
    sendSuccess(res, normalizedCard);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getCreditCardById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedCard = normalizeCreditCard(pipelineData.credit_card);
    normalizedCard.id = req.params.id;
    sendSuccess(res, normalizedCard);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== NAMES ====================
exports.getName = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedName = normalizeName(pipelineData.random_name);
    sendSuccess(res, normalizedName);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getNameById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedName = normalizeName(pipelineData.random_name);
    normalizedName.id = req.params.id;
    sendSuccess(res, normalizedName);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== PETS ====================
exports.getPet = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedPet = normalizePet(pipelineData.pet);
    sendSuccess(res, normalizedPet);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getPetById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedPet = normalizePet(pipelineData.pet);
    normalizedPet.id = req.params.id;
    sendSuccess(res, normalizedPet);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== QUOTES ====================
exports.getQuote = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedQuote = normalizeQuote(pipelineData.quote);
    sendSuccess(res, normalizedQuote);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getQuoteById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedQuote = normalizeQuote(pipelineData.quote);
    normalizedQuote.id = req.params.id;
    sendSuccess(res, normalizedQuote);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== JOKES ====================
exports.getJoke = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedJoke = normalizeJoke(pipelineData.joke);
    sendSuccess(res, normalizedJoke);
  } catch (error) {
    sendError(res, error, 503);
  }
};

exports.getJokeById = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    const normalizedJoke = normalizeJoke(pipelineData.joke);
    normalizedJoke.id = req.params.id;
    sendSuccess(res, normalizedJoke);
  } catch (error) {
    sendError(res, error, 503);
  }
};

// ==================== AGGREGATED DATA ====================
exports.getAllData = async (req, res, next) => {
  try {
    const pipelineData = await FastApiService.getPipelineData();
    
    sendSuccess(res, {
      user: normalizeUser(pipelineData.user),
      phone: normalizePhone(pipelineData.phone_number),
      iban: normalizeIban(pipelineData.iban),
      creditCard: normalizeCreditCard(pipelineData.credit_card),
      name: normalizeName(pipelineData.random_name),
      pet: normalizePet(pipelineData.pet),
      quote: normalizeQuote(pipelineData.quote),
      joke: normalizeJoke(pipelineData.joke)
    });
  } catch (error) {
    sendError(res, error, 503);
  }
};
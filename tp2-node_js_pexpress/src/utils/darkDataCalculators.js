const crypto = require('crypto');

/**
 * 1️⃣ DARK DATA : Digital Fingerprint
 * Hash unique basé sur les données personnelles
 * Utile pour : détection de fraude, tracking anonyme
 */
const calculateDigitalFingerprint = (pipelineData) => {
  const fingerprintData = `${pipelineData.user.email}${pipelineData.phone_number}${pipelineData.iban}${pipelineData.user.gender}`;
  const hash = crypto.createHash('sha256').update(fingerprintData).digest('hex');
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'digital_fingerprint',
    hash: hash.substring(0, 16),
    fullHash: hash,
    createdAt: new Date().toISOString(),
    description: 'Empreinte digitale anonymisée basée sur données personnelles'
  };
};

/**
 * 2️⃣ DARK DATA : Risk Score
 * Score de risque (0-100) basé sur plusieurs facteurs
 * Utile pour : évaluation du risque, détection fraude
 */
const calculateRiskScore = (pipelineData) => {
  let score = 0;
  let factors = [];

  // Facteur 1 : Carte non vérifiée
  if (!pipelineData.credit_card.card_number.startsWith('4')) {
    score += 5;
    factors.push('Type de carte inhabituel');
  }

  // Facteur 2 : Numéro de téléphone non vérifié
  if (!pipelineData.user.email.includes('@')) {
    score += 15;
    factors.push('Email invalide');
  }

  // Facteur 3 : IBAN non actif ou suspect
  if (!pipelineData.iban.includes('FR')) {
    score += 10;
    factors.push('IBAN hors zone FR');
  }

  // Facteur 4 : Pays de localisation vs IBAN
  if (!pipelineData.user.location.includes('India') && pipelineData.iban.startsWith('FR')) {
    score += 20;
    factors.push('Localisation ≠ Pays bancaire');
  }

  // Facteur 5 : CVV trop court
  if (pipelineData.credit_card.cvv.length < 3) {
    score += 15;
    factors.push('CVV invalide');
  }

  // Facteur 6 : Carte proches de l'expiration (dans 3 mois)
  const [month, year] = pipelineData.credit_card.expiration_date.split('/');
  const currentDate = new Date();
  const cardExpiry = new Date(parseInt(year), parseInt(month) - 1);
  const monthsDiff = (cardExpiry.getFullYear() - currentDate.getFullYear()) * 12 + (cardExpiry.getMonth() - currentDate.getMonth());
  
  if (monthsDiff < 3) {
    score += 10;
    factors.push('Carte bientôt expirée');
  }

  // Plafonnage du score à 100
  score = Math.min(score, 100);

  // Déterminer le niveau de risque
  let riskLevel = 'LOW';
  if (score > 50) riskLevel = 'HIGH';
  else if (score > 30) riskLevel = 'MEDIUM';

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'risk_score',
    score,
    riskLevel,
    factors,
    createdAt: new Date().toISOString(),
    description: 'Score de risque de fraude (0-100)'
  };
};

/**
 * 3️⃣ DARK DATA : Profile Completeness
 * Pourcentage de complétude du profil utilisateur
 * Utile pour : évaluer la qualité des données, onboarding
 */
const calculateProfileCompleteness = (pipelineData) => {
  const checks = {
    hasValidEmail: !!pipelineData.user.email && pipelineData.user.email.includes('@'),
    hasPhoneNumber: !!pipelineData.phone_number && pipelineData.phone_number.length > 5,
    hasIBAN: !!pipelineData.iban && pipelineData.iban.length > 10,
    hasValidCreditCard: !!pipelineData.credit_card.card_number && pipelineData.credit_card.card_number.length >= 13,
    hasValidCVV: !!pipelineData.credit_card.cvv && pipelineData.credit_card.cvv.length === 3,
    hasExpirationDate: !!pipelineData.credit_card.expiration_date,
    hasValidLocation: !!pipelineData.user.location && pipelineData.user.location.length > 3,
    hasPicture: !!pipelineData.user.picture && pipelineData.user.picture.startsWith('http'),
    hasGender: !!pipelineData.user.gender,
    hasName: !!pipelineData.user.name && pipelineData.user.name.length > 2
  };

  const completedFields = Object.values(checks).filter(v => v).length;
  const totalFields = Object.keys(checks).length;
  const percentage = Math.round((completedFields / totalFields) * 100);

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'profile_completeness',
    percentage,
    completedFields,
    totalFields,
    details: checks,
    createdAt: new Date().toISOString(),
    description: 'Pourcentage de complétude du profil utilisateur'
  };
};

/**
 * 4️⃣ DARK DATA : Geolocation Mismatch
 * Détecte les anomalies de localisation
 * Utile pour : détection fraude, vérification KYC
 */
const calculateGeolocationMismatch = (pipelineData) => {
  const phoneCountry = pipelineData.phone_number.includes('+33') ? 'FR' : 'OTHER';
  const ibanCountry = pipelineData.iban.substring(0, 2);
  const userLocation = pipelineData.user.location;

  const mismatches = [];
  let suspicionScore = 0;

  // Vérifier correspondance téléphone/IBAN
  if (phoneCountry !== ibanCountry && phoneCountry !== 'OTHER') {
    mismatches.push(`Téléphone (${phoneCountry}) ≠ IBAN (${ibanCountry})`);
    suspicionScore += 30;
  }

  // Vérifier correspondance localisation/IBAN
  if (!userLocation.toLowerCase().includes('india') && ibanCountry === 'FR') {
    mismatches.push(`Localisation (${userLocation}) ≠ IBAN (${ibanCountry})`);
    suspicionScore += 40;
  }

  // Vérifier correspondance localisation/téléphone
  if (!userLocation.toLowerCase().includes('france') && phoneCountry === 'FR') {
    mismatches.push(`Localisation (${userLocation}) ≠ Téléphone (${phoneCountry})`);
    suspicionScore += 25;
  }

  const isSuspicious = suspicionScore > 30;

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: 'geolocation_mismatch',
    isSuspicious,
    suspicionScore: Math.min(suspicionScore, 100),
    mismatches,
    phoneCountry,
    ibanCountry,
    userLocation,
    createdAt: new Date().toISOString(),
    description: 'Détecte les anomalies de localisation géographique'
  };
};

module.exports = {
  calculateDigitalFingerprint,
  calculateRiskScore,
  calculateProfileCompleteness,
  calculateGeolocationMismatch
};
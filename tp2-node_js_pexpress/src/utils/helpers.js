const generateId = () => Math.random().toString(36).substr(2, 9);

const normalizeUser = (user) => ({
  id: generateId(),
  ...user,
  createdAt: new Date().toISOString()
});

const normalizePhone = (phone) => ({
  id: generateId(),
  number: phone,
  country: 'FR',
  type: 'mobile',
  isVerified: false,
  createdAt: new Date().toISOString()
});

const normalizeIban = (iban) => ({
  id: generateId(),
  iban,
  country: 'FR',
  currency: 'EUR',
  isActive: true,
  createdAt: new Date().toISOString()
});

const normalizeCreditCard = (card) => ({
  id: generateId(),
  cardNumber: card.card_number,
  cardType: card.card_type,
  expirationDate: card.expiration_date,
  cvv: card.cvv,
  isActive: true,
  lastUsed: null,
  createdAt: new Date().toISOString()
});

const normalizeName = (name) => ({
  id: generateId(),
  name,
  type: 'firstname',
  language: 'en',
  createdAt: new Date().toISOString()
});

const normalizePet = (pet) => ({
  id: generateId(),
  type: pet,
  name: null,
  age: null,
  color: null,
  createdAt: new Date().toISOString()
});

const normalizeQuote = (quote) => ({
  id: generateId(),
  content: quote.content,
  author: quote.author,
  category: 'motivational',
  likes: 0,
  createdAt: new Date().toISOString()
});

const normalizeJoke = (joke) => ({
  id: generateId(),
  content: joke.content,
  type: joke.type,
  rating: 0,
  createdAt: new Date().toISOString()
});

module.exports = {
  generateId,
  normalizeUser,
  normalizePhone,
  normalizeIban,
  normalizeCreditCard,
  normalizeName,
  normalizePet,
  normalizeQuote,
  normalizeJoke
};
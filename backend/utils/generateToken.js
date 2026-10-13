const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) for user authentication
 * @param {string} id - User MongoDB ObjectId
 * @param {string} role - User role ('customer' or 'admin')
 * @returns {string} Signed JWT token string
 */
const generateToken = (id, role = 'customer') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'fallback_secret_for_development',
    { expiresIn: '30d' }
  );
};

module.exports = generateToken;

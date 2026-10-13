/**
 * Admin Middleware
 * Restricts access exclusively to users with role === 'admin'.
 * Must be executed AFTER the protect auth middleware.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};

module.exports = { admin };

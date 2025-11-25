const jwt = require('jsonwebtoken');
const { Counselor, User } = require('../models');

// Middleware to authenticate JWT and attach user + role
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    if (decoded.role === 'admin' || decoded.role === 'counselor') {
      user = await Counselor.findByPk(decoded.id);
    } else if (decoded.role === 'patient') {
      user = await User.findByPk(decoded.id);
    } else {
      return res.status(401).json({ message: 'Invalid role in token' });
    }

    if (!user) return res.status(401).json({ message: 'Invalid token: user not found' });

    // Attach plain object for safety
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};


// Middleware to authorize based on roles
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };

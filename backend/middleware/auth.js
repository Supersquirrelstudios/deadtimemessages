const jwt = require('jsonwebtoken');

// Middleware to verify a JWT and attach the user ID to the request
module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  // Expect bearer tokens in the form 'Bearer <token>'
  const token = authHeader ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ msg: 'No authentication token, authorization denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

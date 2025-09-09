// backend/api/index.js
const app = require('../server');

// Vercel Node functions expect a handler (req, res) =>
module.exports = (req, res) => {
  return app(req, res);
};

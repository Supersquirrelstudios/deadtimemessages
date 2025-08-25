const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Placeholder login route (should implement proper authentication)
router.post('/login', async (req, res) => {
  // TODO: authenticate user using email/password and generate JWT
  res.json({ token: 'fake-token', message: 'Login route not implemented' });
});

module.exports = router;
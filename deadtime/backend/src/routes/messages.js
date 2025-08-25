const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');

// Create a new message
router.post('/', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Retrieve messages for a given user
router.get('/user/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ user: req.params.userId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing message
router.put('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(message);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
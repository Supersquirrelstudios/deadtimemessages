const router = require('express').Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Create
router.post('/', auth, async (req, res) => {
  try {
    const { recipients, subject, body, videoUrl, audioUrl, triggerInDays } = req.body || {};
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ msg: 'At least one recipient email is required' });
    }
    const msg = await Message.create({
      user: req.userId,
      recipients,
      subject: subject || '',
      body: body || '',
      videoUrl: videoUrl || '',
      audioUrl: audioUrl || '',
      triggerInDays: Number(triggerInDays || 0),
    });
    res.status(201).json(msg);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server error' });
  }
});

// List my messages
router.get('/', auth, async (req, res) => {
  try {
    const list = await Message.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

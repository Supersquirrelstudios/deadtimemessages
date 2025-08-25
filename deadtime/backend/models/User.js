const mongoose = require('mongoose');

// Basic user model. In a real application you should store a password hash,
// validate emails, and enforce unique constraints via indexes.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
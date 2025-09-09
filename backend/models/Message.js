const mongoose = require('mongoose');

// Schema for messages stored by users
const MessageSchema = new mongoose.Schema({
  // The user who created the message
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // List of recipient email addresses
  recipients: [
    {
      type: String,
      required: true,
    },
  ],
  // Optional subject line
  subject: {
    type: String,
  },
  // Plain text body of the message
  body: {
    type: String,
  },
  // Optional URLs pointing to uploaded video/audio files
  videoUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  // Number of days of inactivity before the message is sent
  triggerInDays: {
    type: Number,
    default: 30,
  },
  // Timestamp of the last time the user interacted with the app
  lastAccessAt: {
    type: Date,
    default: Date.now,
  },
  // Timestamp when the message was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Timestamp when the message was actually sent
  sentAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Message', MessageSchema);

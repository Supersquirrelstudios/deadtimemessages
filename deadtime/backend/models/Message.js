const mongoose = require('mongoose');

// Message schema stores metadata about scheduled messages. The actual
// media files should be stored in an object store such as AWS S3.
const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipients: [
    {
      name: { type: String },
      email: { type: String },
    },
  ],
  messageType: { type: String, enum: ['Video', 'Audio', 'Text'], required: true },
  contentUrl: { type: String }, // URL to the media file stored off-site
  textContent: { type: String },
  inactivityDays: { type: Number, default: 30 },
  status: {
    type: String,
    enum: ['Draft', 'Scheduled', 'Sent'],
    default: 'Draft',
  },
  createdAt: { type: Date, default: Date.now },
  scheduledAt: { type: Date },
  sentAt: { type: Date },
});

module.exports = mongoose.model('Message', messageSchema);
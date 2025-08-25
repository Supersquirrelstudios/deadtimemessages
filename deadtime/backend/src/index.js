const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/users');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check route
app.get('/', (req, res) => {
  res.send('DeadTime API is running');
});

// register API routes
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// connect to database and start server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
  });
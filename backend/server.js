// backend/server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();

// Basic middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// IMPORTANT: no app.listen() here — Vercel will handle requests
module.exports = app;

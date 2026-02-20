require('dotenv').config();
const express = require('express');
const pool = require('./db');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * 🟢 Liveness Probe
 * Indicates container is alive
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * 🟡 Readiness Probe
 * Checks database connectivity
 */
app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ready' });
  } catch (err) {
    console.error('❌ Readiness DB error:', err.message);
    res.status(500).json({
      status: 'not ready',
      error: err.message
    });
  }
});

/**
 * 🔵 Application Routes
 */
app.use('/api/users', userRoutes);

/**
 * 🚀 Start Server
 */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
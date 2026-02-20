require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔥 Liveness probe
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 🔥 Readiness probe (DB check)
const pool = require('./db');
app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ready' });
  } catch (err) {
    res.status(500).json({ status: 'not ready' });
  }
});

// routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
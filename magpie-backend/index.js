import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(helmet());
app.use(express.json());

// CORS: allow frontend origin via env var FRONTEND_ORIGIN or allow all in DEV
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: FRONTEND_ORIGIN }));

// Basic rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX || '60', 10),
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

const MAGPIE_API_KEY = process.env.MAGPIE_API_KEY;
const MAGPIE_BASE_URL = process.env.MAGPIE_BASE_URL || 'https://api.magpie.im';

app.post('/api/checkout-session', async (req, res) => {
  try {
    const payload = req.body;
    const response = await fetch(`${MAGPIE_BASE_URL}/v1/checkout/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAGPIE_API_KEY}`,
        'X-Magpie-Version': '2024-01-01'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/payment-status/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const response = await fetch(`${MAGPIE_BASE_URL}/v1/checkout/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAGPIE_API_KEY}`,
        'X-Magpie-Version': '2024-01-01'
      }
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Magpie backend listening on port ${PORT}`);
});

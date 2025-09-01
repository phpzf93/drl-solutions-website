import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

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
const MAGPIE_WEBHOOK_SECRET = process.env.MAGPIE_WEBHOOK_SECRET || null;

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

// Don't crash the process if MAGPIE_API_KEY is missing; instead respond with 503 for API calls.
const HAS_API_KEY = Boolean(MAGPIE_API_KEY);
if (!HAS_API_KEY) {
  log('warning: MAGPIE_API_KEY not configured; API endpoints will return 503 until set');
}

// Ensure CORS preflight requests are handled early
app.options('*', cors());

// Middleware: require API key for /api/* endpoints that perform sensitive actions
app.use('/api', (req, res, next) => {
  // Allow health and webhook to proceed even if key missing (webhook may use secret)
  if (req.path === '/health') return next();
  if (!HAS_API_KEY) {
    return res.status(503).json({ error: 'service_unavailable', message: 'MAGPIE_API_KEY not configured' });
  }
  next();
});

app.post('/api/checkout-session', async (req, res) => {
  try {
  const payload = req.body;
  const correlation = req.headers['x-request-id'] || `req_${Date.now()}`;
  log('checkout-session request', correlation, payload);

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
  log('checkout-session response', correlation, response.status, data);
  res.status(response.status).json(data);
  } catch (error) {
  log('checkout-session error', error);
  res.status(500).json({ error: 'internal_server_error' });
  }
});

app.get('/api/payment-status/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const correlation = req.headers['x-request-id'] || `req_${Date.now()}`;
    log('payment-status request', correlation, sessionId);

    const response = await fetch(`${MAGPIE_BASE_URL}/v1/checkout/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAGPIE_API_KEY}`,
        'X-Magpie-Version': '2024-01-01'
      }
    });
    const data = await response.json();
    log('payment-status response', correlation, response.status, data);
    res.status(response.status).json(data);
  } catch (error) {
    log('payment-status error', error);
    res.status(500).json({ error: 'internal_server_error' });
  }
});

// Webhook endpoint to receive events from Magpie
import crypto from 'crypto';

app.post('/api/webhook', express.raw({ type: '*/*' }), (req, res) => {
  try {
    const signature = req.headers['x-magpie-signature'] || '';
    const payload = req.body;

    if (!MAGPIE_WEBHOOK_SECRET) {
      log('webhook received but no MAGPIE_WEBHOOK_SECRET configured');
      return res.status(400).send('webhook_secret_not_configured');
    }

    // Compute HMAC SHA256 and compare
    const hmac = crypto.createHmac('sha256', MAGPIE_WEBHOOK_SECRET);
    hmac.update(payload);
    const expected = `sha256=${hmac.digest('hex')}`;

    if (!signature || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      log('webhook signature mismatch', { expected, signature });
      return res.status(401).send('invalid_signature');
    }

    const event = JSON.parse(payload.toString('utf8'));
    log('webhook event', event.type || 'unknown', event.id || 'no-id');

    // Minimal processing — in production you'd enqueue or process accordingly
    // For now, acknowledge and return 200
    res.status(200).json({ received: true });
  } catch (err) {
    log('webhook handler error', err);
    res.status(500).send('webhook_error');
  }
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', node_env: process.env.NODE_ENV || 'development', version: '1.0.0' }));

const PORT = process.env.PORT || 3001;
// Global error handlers to ensure crashes are logged to stdout/stderr
process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection', { reason, promise });
});
process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  // allow process to exit after logging; platform will restart if configured
  setTimeout(() => process.exit(1), 1000);
});

app.listen(PORT, () => {
  log('Magpie backend listening', { port: PORT, node_env: process.env.NODE_ENV || 'development', hasApiKey: HAS_API_KEY });
});

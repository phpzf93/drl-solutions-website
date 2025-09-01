#!/usr/bin/env node
// Simple webhook tester for magpie-backend
// Usage:
//   MAGPIE_WEBHOOK_SECRET=shhh node tests/webhook-test.js https://drl-solutions-website.onrender.com/api/webhook
// or
//   node tests/webhook-test.js <secret> <url>

const crypto = require('crypto');

async function main() {
  const secret = process.env.MAGPIE_WEBHOOK_SECRET || process.argv[2];
  const url = process.argv[3] || process.argv[2];
  if (!secret || !url) {
    console.error('Usage: MAGPIE_WEBHOOK_SECRET=... node webhook-test.js <webhookUrl>');
    process.exit(2);
  }

  const event = {
    id: 'local-test-' + Date.now(),
    type: 'checkout.session.completed',
    data: { sessionId: 'sess_test_123', amount: 1000 }
  };
  const body = JSON.stringify(event);
  const signature = crypto.createHmac('sha256', secret).update(body).digest('hex');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Magpie-Signature': signature
      },
      body
    });
    const text = await res.text();
    console.log('status:', res.status);
    console.log('response headers:', Object.fromEntries(res.headers.entries()));
    console.log('body:', text);
  } catch (err) {
    console.error('request failed:', err);
  }
}

main();

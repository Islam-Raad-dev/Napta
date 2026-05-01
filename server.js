/**
 * Napta - API Proxy Server
 *
 * هذا الخادم يعمل كـ proxy آمن بين المتصفح وخدمات الـ AI الخارجية.
 * المفاتيح تُقرأ هنا فقط (server-side) ولا تُرسَل أبداً للمتصفح.
 *
 * تشغيل: node server.js
 * Port:  3001
 */

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── تحميل .env يدوياً (بدون مكتبة خارجية) ──────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const envPath = resolve(__dirname, '.env');
    const lines = readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env غير موجود — نعتمد على متغيرات البيئة الحقيقية (production)
  }
}
loadEnv();

// ── قراءة المفاتيح (بدون VITE_ prefix — لا تصل للمتصفح) ──────────────────
const GEMINI_API_KEY      = process.env.GEMINI_API_KEY?.trim();
const OPENROUTER_API_KEY  = process.env.OPENROUTER_API_KEY?.trim();

if (!GEMINI_API_KEY && !OPENROUTER_API_KEY) {
  console.error('[Napta Server] ⚠️  لم يتم العثور على أي مفاتيح API في .env');
  console.error('[Napta Server]    يجب تعريف GEMINI_API_KEY أو OPENROUTER_API_KEY');
}

// ── إعداد Express ────────────────────────────────────────────────────────────
const app  = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json({ limit: '20mb' })); // لاستيعاب الصور كـ base64

// ── صحة الخادم ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    gemini:     !!GEMINI_API_KEY,
    openrouter: !!OPENROUTER_API_KEY,
  });
});

// ── Proxy: Google Gemini Direct ──────────────────────────────────────────────
app.post('/api/gemini', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(503).json({ error: 'GEMINI_API_KEY غير مضبوط في الخادم' });
  }

  const { model, body: requestBody } = req.body;
  if (!model || !requestBody) {
    return res.status(400).json({ error: 'model و body مطلوبان' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const upstream = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(requestBody),
      signal:  AbortSignal.timeout(30_000),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json(data);
    }
    return res.json(data);
  } catch (err) {
    console.error('[Napta Server] Gemini error:', err.message);
    return res.status(502).json({ error: err.message });
  }
});

// ── Proxy: OpenRouter ────────────────────────────────────────────────────────
app.post('/api/openrouter', async (req, res) => {
  if (!OPENROUTER_API_KEY) {
    return res.status(503).json({ error: 'OPENROUTER_API_KEY غير مضبوط في الخادم' });
  }

  const { body: requestBody } = req.body;
  if (!requestBody) {
    return res.status(400).json({ error: 'body مطلوب' });
  }

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  'https://napta.app',
        'X-Title':       'Nabta AI',
      },
      body:   JSON.stringify(requestBody),
      signal: AbortSignal.timeout(30_000),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return res.status(upstream.status).json(data);
    }
    return res.json(data);
  } catch (err) {
    console.error('[Napta Server] OpenRouter error:', err.message);
    return res.status(502).json({ error: err.message });
  }
});

// ── تشغيل ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 Napta API Proxy يعمل على http://localhost:${PORT}`);
  console.log(`   Gemini API Key:     ${GEMINI_API_KEY     ? '✅ متوفر' : '❌ غير موجود'}`);
  console.log(`   OpenRouter API Key: ${OPENROUTER_API_KEY ? '✅ متوفر' : '❌ غير موجود'}\n`);
});

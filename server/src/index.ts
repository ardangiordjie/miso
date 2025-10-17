import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'cookie-session';
import fetch from 'node-fetch';

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(
  session({
    name: 'miso.sid',
    keys: [process.env.SESSION_SECRET || 'dev-session-secret'],
    httpOnly: true,
    sameSite: 'lax',
  })
);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

// Google OAuth - start
app.get('/auth/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4000/auth/google/callback';
  if (!clientId) return res.status(500).json({ message: 'Missing GOOGLE_CLIENT_ID' });

  const scope = [
    'https://www.googleapis.com/auth/business.manage',
    'openid',
    'email',
    'profile',
  ].join(' ');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope,
    access_type: 'offline',
    prompt: 'consent',
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(400).send('Missing code');

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4000/auth/google/callback';
  if (!clientId || !clientSecret) return res.status(500).send('Missing Google client credentials');

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: String(clientId),
        client_secret: String(clientSecret),
        redirect_uri: String(redirectUri),
        grant_type: 'authorization_code',
      }),
    });

    const tokens = (await tokenRes.json()) as any;
    if (!tokenRes.ok) {
      return res.status(500).json({ message: 'Token exchange failed', error: tokens });
    }

    // @ts-expect-error cookie-session typings are loose here
    req.session.googleTokens = tokens;

    const frontOrigin = allowedOrigins[0] || 'http://localhost:3000';
    const redirect = new URL(frontOrigin);
    redirect.searchParams.set('connected', 'google');
    res.redirect(redirect.toString());
  } catch (err) {
    res.status(500).json({ message: 'Google callback error', error: String(err) });
  }
});
// Google OAuth - end

app.get('/auth/instagram', (_req, res) => {
  res.status(501).json({ message: 'Instagram OAuth not implemented yet. Configure FB_APP_ID/SECRET and redirect.' });
});

app.get('/auth/tiktok', (_req, res) => {
  res.status(501).json({ message: 'TikTok OAuth not implemented yet. Configure TIKTOK_CLIENT_ID/SECRET and redirect.' });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`miso server listening on http://localhost:${port}`);
});



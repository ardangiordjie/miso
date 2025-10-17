# miso
 
## Project overview

Miso is a prototype to help food reviewers/influencers draft once and post everywhere. It aims to streamline photo posting, captions, and cross‑platform distribution. The idea enters the “graveyard” primarily due to platform limitations: user‑generated reviews/photos on Google Maps and Yelp cannot be posted via public APIs. While Instagram and TikTok support programmatic publishing (with the right accounts and app permissions), the reviewer‑centric value proposition relies heavily on Google/Yelp, which blocks full automation.

## Built with

- Figma Make
- Cursor
- Vite, React, TypeScript
- Radix UI / Shadcn components
- Express (Node) backend

Design credits and references: see `src/Attributions.md`.

## Why I made this project

As a food influencer myself, I wanted a faster way to share a single food post across multiple platforms without repetitive copy/paste and reformatting. The goal was to reduce friction for creators: upload once, write one caption, and distribute everywhere while preserving each platform’s best practices (ratios, captions, tags).

## What I've tried

- Built a compact React UI for composing posts, selecting platforms, and managing connections.
- Prototyped an Express backend to handle OAuth securely and act as a posting broker.
- Implemented Google OAuth scaffolding and explored the Business Profile API to assess feasibility for reviewer posts.
- Validated platform constraints:
  - Google Maps/Yelp: no API for public user reviews/photos.
  - Instagram/TikTok: feasible via official creator/business APIs, with proper scopes and account types.
- Added deep-link strategy (Google/Yelp) to open “Write a review” pages quickly when full automation isn’t available.

## Future development

- Double down on platforms with official creator posting APIs:
  - Instagram: complete media container creation, publishing, and status polling.
  - TikTok: integrate Content Posting API for photo/video uploads.
- Reviewer helpers for Google/Yelp:
  - Place lookup (Google Places/Yelp Business Search), generate one-click deep links.
  - Export packs: resized images, tailored captions, hashtag sets.
- Creator tooling: scheduling, cross-post caption variants, aspect-ratio auto-cropping, analytics, UTM/link management.
- Harden OAuth: complete flows, encrypted token storage, refresh handling, retries, observability.

## Running the code

- Install frontend deps: `npm i`
- Start frontend: `npm run dev`

Copy env examples before running:

```
cp env.example .env
cp server/env.example server/.env
```

## Backend setup (OAuth scaffold)

This repo includes a minimal Express backend under `server/` with placeholder OAuth routes for Google (Google Business Profile), Instagram (via Facebook), and TikTok. Use it to run OAuth and store tokens.

### 1) Install backend deps

```bash
cd server && npm install
```

### 2) Create env files

Create `server/.env` (or copy from `server/env.example`) with:

```
PORT=4000
CORS_ORIGIN=http://localhost:3000

# Google (Google Business Profile API)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback

# Facebook/Instagram (Instagram Graph API)
FB_APP_ID=
FB_APP_SECRET=
FB_REDIRECT_URI=http://localhost:4000/auth/instagram/callback

# TikTok for Business
TIKTOK_CLIENT_ID=
TIKTOK_CLIENT_SECRET=
TIKTOK_REDIRECT_URI=http://localhost:4000/auth/tiktok/callback
```

Create a root `.env` (or copy from `env.example`) with:

```
VITE_API_BASE=http://localhost:4000
```

### 3) Run backend

```bash
npm run dev --prefix server
```

### 4) Run frontend

```bash
npm run dev
```

---

## How to get client IDs/secrets

### Google (Google Business Profile API)
- Go to Google Cloud Console (`https://console.cloud.google.com/`).
- Create a project or select an existing one.
- APIs & Services → OAuth consent screen: configure app, add scopes related to Business Profile.
- APIs & Services → Credentials → Create Credentials → OAuth client ID.
  - Application type: Web application
  - Authorized redirect URI: `http://localhost:4000/auth/google/callback`
- Enable the “Business Profile API” in “Library”.
- Copy `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.

### Instagram (Instagram Graph API via Facebook)
- Go to Meta for Developers (`https://developers.facebook.com/`).
- Create an App → Set type to “Business”.
- Add products: “Facebook Login” and “Instagram Graph API”.
- Facebook Login → Settings → Valid OAuth Redirect URIs:
  - `http://localhost:4000/auth/instagram/callback`
- Add permissions: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`, `business_management`.
- Under App → Settings → Basic: copy `App ID` and create an `App Secret`.
- Link an Instagram Business/Creator account to a Facebook Page in Business settings.
- Use `FB_APP_ID`, `FB_APP_SECRET`.

### TikTok for Business (Content Posting API)
- Go to TikTok for Developers (`https://developers.tiktok.com/`).
- Create an app; request “Content Posting API” scopes/permissions.
- Set OAuth redirect URI: `http://localhost:4000/auth/tiktok/callback`.
- Copy `TIKTOK_CLIENT_ID`, `TIKTOK_CLIENT_SECRET`.
 
---
  

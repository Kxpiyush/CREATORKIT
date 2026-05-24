# All-in-One Creator Toolkit Deployment

This app is frontend-only. There is no backend, no database, no job queue, no server-side upload, and no cloud file storage.

## Vercel Hosting

This project is configured for Vercel using Nitro's Vercel preset.

Vercel dashboard settings:

- Framework preset: Other
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave empty/default

The build creates Vercel Build Output in `.vercel/output`.

The app shell may be served by Vercel Functions because this is a TanStack Start app, but media processing still happens only in the user's browser. Files are never uploaded for processing.

## Privacy Model

Files are processed on the user's device:

- Image tools use Canvas.
- Video/audio tools use a browser-based media engine.
- Audio browser features can use Web Audio APIs.
- Downloads are generated as Blob URLs in browser memory.

Files are never uploaded to your server because there is no server.

## Monetization

Use ads and affiliate links:

- Google AdSense display units in the existing ad placeholders.
- Affiliate links to creator gear, hosting, editing tools, stock media, microphones, cameras, and courses.

Before applying for AdSense, add:

- Privacy Policy
- Terms
- Contact
- About
- A few original help pages explaining the tools

## Limits

Because processing happens in the browser, users pay the compute cost on their own device. Keep copy honest:

- Large files may be slow.
- Mobile browsers may struggle with big videos.
- First video/audio processing may prepare a local browser media engine.

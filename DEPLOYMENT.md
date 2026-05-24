# All-in-One Creator Toolkit Deployment

This app is frontend-only. There is no backend, no database, no job queue, no server-side upload, and no cloud file storage.

## Hosting

Use any static frontend host:

- Vercel
- Netlify
- Cloudflare Pages

Build command:

```bash
npm install
npm run build
```

Deploy output:

```text
dist
```

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

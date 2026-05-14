# Razorpay AI Playbook Hub

This is the HTML consumer for the Markdown playbook. It is regenerated from the same source on every build, so the version it serves matches whatever the root `INDEX.md` is currently at.

The source of truth stays at the repository root: `README.md`, `foundation/`, `prologue/`, `appendices/`, `belts/`, `manifest.yml`, and `slugs.yml`.

`hub/scripts/generate-docs.mjs` reads those files and generates Starlight-shaped Markdown under `hub/src/content/docs/` before `dev` and `build`. Do not edit generated files; edit the root Markdown instead.

## Run locally

```sh
npm install
npm run dev
```

The dev server defaults to `http://127.0.0.1:4321/`.

## Build

```sh
npm run build
npm run preview
```

The static site is emitted to `hub/dist/`.

## Deployment

Deployment is local-build-first unless a private host is approved. Any static host that can serve `hub/dist/` works: Vercel, Netlify, Cloudflare Pages, or an internal static-hosting path.

Recommended build settings:

- install command: `npm install`
- build command: `npm run build`
- output directory: `dist`
- project root: `hub`


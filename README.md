# Apollo Aesthetics

Frontend-only ecommerce funnel for **Apollo Aesthetics** featuring **Dermato Care Kojic Acid 2% Face Serum**.

For a beginner-friendly setup and Vercel deployment walkthrough, read [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Routes

- `/` landing page
- `/checkout` address capture
- `/payment` demo payment
- `/success` confirmation

## Product Images

All active website images are served from:

- `public/product-media`

If you want to replace the product visuals later, update the files in that folder only.

Current mapped files:

- `hero-campaign.png`
- `front-showcase.png`
- `back-showcase.png`
- `dropper-editorial.png`
- `source-front.png`
- `source-back.png`

These filenames are already wired into the storefront config in:

- `src/data/product.ts`

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Checks

```bash
npm run lint
npm run build
```

## Notes

- This version is frontend only.
- Checkout state is persisted in `localStorage`.
- The structure is ready for future Supabase auth and backend integration.
- Vercel uses `npm run build`, which is already configured for this project.
# apolloAesthetics

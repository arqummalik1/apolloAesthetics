# Apollo Aesthetics Setup Guide

This guide is written for beginners. Follow it step by step to run the project locally, change product images, edit content, and deploy it to Vercel.

## 1. What This Project Is

This project is a **frontend-only Next.js ecommerce website** for:

- Brand: Apollo Aesthetics
- Product brand: Dermato Care
- Product: Kojic Acid 2%

It already includes:

- landing page
- product gallery
- cart drawer
- address form
- demo payment page
- success page

## 2. Before You Start

Install these tools on your computer:

- Node.js 20 or newer
- npm
- Git
- VS Code or another code editor

Quick check:

```bash
node -v
npm -v
git --version
```

If Node is not version 20+, install the latest LTS version from [https://nodejs.org](https://nodejs.org).

## 3. Open the Project

Open a terminal inside this project folder:

```bash
cd "/Users/arqummalik/Software Development/vibe code/ApolloAesthetics"
```

Install dependencies:

```bash
npm install
```

Start the project:

```bash
npm run dev
```

Then open:

- [http://localhost:3000](http://localhost:3000)

## 4. Main Files You Will Edit

Most beginner changes happen in these files:

- `src/data/product.ts`
- `public/product-media`
- `src/app/globals.css`

What each one does:

- `src/data/product.ts`
  - product name
  - price
  - product description
  - gallery image list
  - FAQ content
  - benefit cards
- `public/product-media`
  - all product images used on the website
- `src/app/globals.css`
  - colors
  - overall visual style

## 5. How To Change Product Images

All active product images are stored in:

- `public/product-media`

Current active files:

- `hero-campaign.png`
- `front-showcase.png`
- `back-showcase.png`
- `dropper-editorial.png`
- `source-front.png`
- `source-back.png`

### Easiest method

If you want to replace the images without changing code:

1. Create your new product images.
2. Keep the exact same filenames.
3. Replace the old files inside `public/product-media`.
4. Refresh the website.

That is the simplest option.

### If you want to add new image names

If your filenames are different, also update:

- `src/data/product.ts`

Inside that file, the image objects are defined near the top. Update the filenames there.

## 6. Image Tips For Best Results

Use:

- PNG or JPG
- clear background or clean studio background
- high resolution
- same aspect ratio when possible

Recommended style:

- clean skincare product photography
- bright lighting
- premium/mockup style
- bottle clearly visible

## 7. How To Change Product Text, Price, and Details

Open:

- `src/data/product.ts`

You can change:

- product price
- product title
- short description
- detailed description
- ingredients
- FAQ text
- trust points

Example:

```ts
price: 1199,
name: "Kojic Acid 2%",
form: "Face Serum",
```

## 8. How To Change Website Colors

Open:

- `src/app/globals.css`

Main colors are defined at the top inside `:root`.

Example:

```css
--navy-700: #17273f;
--gold-500: #d6b880;
```

You can change these color values to match another product or brand theme.

## 9. Environment Variables

This project does not need environment variables for the current frontend-only version.

There is an `.env.example` file for future Supabase support:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

You can ignore them for now.

## 10. Important Checks Before Going Live

Run these commands:

```bash
npm run lint
npm run build
```

If both commands pass, the project is ready for deployment.

## 11. How To Deploy To Vercel

The easiest beginner method is GitHub + Vercel.

### Step 1: Create a GitHub repository

If this project is not already in Git:

```bash
git init
git add .
git commit -m "Initial Apollo Aesthetics storefront"
```

Create a new repository on GitHub, then connect it:

```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Step 2: Import into Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel will detect it as a Next.js app automatically

### Step 3: Check Vercel settings

Use these defaults:

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave empty

No environment variables are required right now.

### Step 4: Deploy

Click **Deploy**.

After deployment finishes, Vercel will give you a live URL.

## 12. How To Update The Live Site Later

When you want to change the site later:

1. Edit the code or images locally.
2. Test with `npm run dev`.
3. Run:

```bash
npm run lint
npm run build
```

4. Commit and push:

```bash
git add .
git commit -m "Update product content"
git push
```

5. Vercel will automatically redeploy.

## 13. If The Site Does Not Update

Check these common issues:

- image filename is wrong
- file was added outside `public/product-media`
- code was changed but not pushed to GitHub
- Vercel build failed because `npm run build` was not checked locally first

## 14. Future Upgrade Ideas

Later, this project can be extended with:

- Supabase login
- Google login
- real order storage
- real payment gateway
- admin dashboard
- order history

## 15. Final Beginner Checklist

Before deployment, make sure:

- images are inside `public/product-media`
- text is updated in `src/data/product.ts`
- local site works on `localhost:3000`
- `npm run lint` passes
- `npm run build` passes
- code is pushed to GitHub
- project is imported into Vercel

# Anton Suryana Landing Page

Landing page kampanye Anton Suryana untuk Desa Cibening, dibangun dengan Next.js App Router.

## Run Locally

1. Install dependencies:
   `npm install`
2. Jalankan development server:
   `npm run dev`
3. Buka:
   `http://localhost:3000`

## Scripts

- `npm run dev` menjalankan Next.js development server.
- `npm run build` membuat production build.
- `npm run start` menjalankan production server setelah build.
- `npm run lint` menjalankan TypeScript check.
- `npm run optimize:images` mengompres gambar dari `src/assets/images` ke WebP di `public/assets/content/images`.

## SEO

Metadata halaman ada di `app/layout.tsx`. Untuk production, set environment variable `NEXT_PUBLIC_SITE_URL` agar Open Graph dan Twitter image memakai URL domain asli.

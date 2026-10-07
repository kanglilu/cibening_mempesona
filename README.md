# Anton Suryana - Kepala Desa Cibening

Website profil Anton Suryana, Kepala Desa Cibening (Kec. Setu, Kab. Bekasi), dibangun dengan Next.js App Router.

## Halaman

| Route | Isi | Sumber data |
| --- | --- | --- |
| `/` | Beranda: profil, visi, misi, ringkasan program, galeri, formulir pelayanan, kontak | `src/data.ts` (statis) |
| `/program` | 8 program kerja beserta videonya | `src/data.ts` (statis) |
| `/loker` | Daftar lowongan kerja untuk warga | Supabase |
| `/loker/[slug]` | Detail satu lowongan | Supabase |
| `/api/aspirasi` | Penerima kiriman Formulir Pelayanan | Google Apps Script → Google Sheets |

## Run Locally

1. Install dependencies:
   `npm install`
2. Salin `.env.example` menjadi `.env.local`, lalu isi nilainya.
3. Jalankan development server:
   `npm run dev`
4. Buka:
   `http://localhost:3100`

## Scripts

- `npm run dev` menjalankan Next.js development server.
- `npm run build` membuat production build.
- `npm run start` menjalankan production server setelah build.
- `npm run lint` menjalankan TypeScript check.
- `npm run optimize:images` mengompres gambar dari `src/assets/images` ke WebP di `public/assets/content/images`.

## Environment Variables

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `ASPIRASI_WEBHOOK_URL` | ya | URL Google Apps Script Web App penerima Formulir Pelayanan. Endpoint `/api/aspirasi` menolak semua kiriman selama variabel ini kosong. |
| `SUPABASE_URL` | untuk `/loker` | URL project Supabase. Kalau kosong, halaman loker tetap tampil tapi isinya kosong. |
| `SUPABASE_ANON_KEY` | untuk `/loker` | Anon/publishable key Supabase. |

Semuanya harus diset juga di Environment Variables hosting (Vercel) untuk production.

## Setup Supabase (halaman Loker)

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, tempel seluruh isi [`supabase/schema.sql`](supabase/schema.sql), lalu **Run**. Script-nya aman dijalankan berulang.
3. Buka **Project Settings → API**, salin **Project URL** ke `SUPABASE_URL` dan **anon key** ke `SUPABASE_ANON_KEY` di `.env.local`, lalu restart dev server.
4. Tambah atau ubah lowongan lewat **Table Editor → `loker`**. Set kolom `status` ke `terbit` supaya tampil di website.

### Kenapa key-nya tanpa prefix NEXT_PUBLIC_

Seluruh query loker dijalankan dari server component, tidak ada yang berjalan di browser.
Karena itu key-nya disimpan sebagai variabel server biasa: tidak ikut terkirim ke pengunjung,
dan nilainya dibaca saat runtime sehingga mengubahnya di Vercel tidak mengharuskan rebuild
(berbeda dengan `NEXT_PUBLIC_*` yang di-inline saat build).

Lapis pengaman utamanya tetap **Row Level Security**: policy di `schema.sql` hanya mengizinkan
`select` untuk baris berstatus `terbit`. Baris `draft` dan `arsip` tidak pernah keluar dari
database, dan tidak ada policy insert/update/delete sehingga perubahan data hanya bisa lewat
`service_role` key di sisi server.

**Jangan pernah menaruh `service_role` key di variabel berawalan `NEXT_PUBLIC_`** — variabel itu
ikut ter-bundle ke JavaScript yang dikirim ke pengunjung.

### Catatan

- Halaman loker memakai ISR dengan `revalidate = 300`, jadi lowongan baru muncul paling lama 5 menit setelah diubah di Supabase, tanpa perlu deploy ulang.
- Lowongan yang `tanggal_tutup`-nya sudah lewat otomatis hilang dari daftar.

## Backoffice (`/admin`)

Panel pengurus untuk memposting lowongan dan menindaklanjuti pelamar.

### Setup sekali di awal

1. Jalankan [`supabase/admin.sql`](supabase/admin.sql) di SQL Editor (butuh `schema.sql` lebih dulu).
2. Jalankan [`supabase/storage.sql`](supabase/storage.sql) untuk bucket gambar. Kalau gagal karena izin, buat manual: **Storage → New bucket**, nama `loker`, centang **Public**.
3. **Authentication → Users → Add user**: isi email + password, centang **Auto Confirm User**.
4. Buka `admin.sql`, ganti `ganti@email.com` dengan email tadi, jalankan baris `insert into public.admin ...`.
5. **Authentication → Sign In / Providers → Email**: matikan **Allow new users to sign up**.

Setelah itu masuk lewat `/admin/login`.

### Cara kerja izinnya

Aplikasi **tidak memakai `service_role` key sama sekali**. Admin login lewat Supabase Auth, sesinya
disimpan di cookie, dan setiap query dijalankan memakai JWT milik admin itu. Yang menentukan boleh
atau tidak adalah RLS di database:

| Siapa | Lowongan | Pelamar |
| --- | --- | --- |
| Pengunjung | baca yang `terbit` saja | hanya boleh mengirim, tidak bisa membaca |
| Admin terdaftar | baca/tulis/hapus semua | baca, ubah status, hapus |
| Login tapi tidak terdaftar di tabel `admin` | sama seperti pengunjung | sama seperti pengunjung |

Punya akun Supabase **tidak** otomatis jadi admin — barisnya harus ada di tabel `public.admin`.
Karena tidak ada kunci sakti, satu key yang bocor tidak membuka seluruh database, dan setiap akses
terikat pada identitas orangnya.

`middleware.ts` hanya berjalan di `/admin/*`, tugasnya menyegarkan token sesi (Server Component
tidak boleh menulis cookie, jadi tanpa ini admin akan terlempar keluar saat token kedaluwarsa).

## Formulir Pelayanan

`app/api/aspirasi/route.ts` memvalidasi setiap kiriman di server sebelum diteruskan ke Google Sheets: wilayah dan kategori harus cocok dengan daftar di `src/aspirasi.ts`, nomor WhatsApp harus format `08xxx`, isi pesan 20–2000 karakter. Ada juga honeypot dan rate limit 3 kiriman per IP per jam. Rate limit disimpan di memori proses, jadi bersifat pertahanan lapis pertama, bukan kuota ketat.

Nama internal masih memakai kata "aspirasi" (route, file, anchor `#aspirasi`) walaupun label yang tampil sudah "Pelayanan", supaya tautan lama dan integrasi Apps Script yang sudah jalan tidak putus.

## SEO

Metadata global ada di `app/layout.tsx`; tiap route punya metadata sendiri. Untuk production, set environment variable `NEXT_PUBLIC_SITE_URL` agar Open Graph dan Twitter image memakai URL domain asli.

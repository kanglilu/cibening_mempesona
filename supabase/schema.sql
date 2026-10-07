-- ============================================================
-- Skema tabel lowongan kerja (loker) untuk website Desa Cibening.
--
-- Cara pakai: buka Supabase > SQL Editor > tempel seluruh isi file
-- ini > Run. Aman dijalankan ulang (pakai IF NOT EXISTS / DROP IF EXISTS).
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.loker (
  id               uuid primary key default gen_random_uuid(),

  -- dipakai sebagai URL: /loker/<slug>
  slug             text        not null unique,

  -- Hanya posisi yang wajib. Pengumuman lowongan di lapangan sering tidak
  -- menyebut perusahaan, lokasi pasti, upah, atau rincian apa pun; memaksa
  -- diisi justru membuat lowongan tidak bisa diumumkan sama sekali.
  posisi           text        not null,
  perusahaan       text,
  lokasi           text,

  -- Penuh Waktu | Paruh Waktu | Harian | Kontrak | Magang | Tidak disebutkan
  tipe             text        default 'Tidak disebutkan',

  -- teks bebas, mis. "Rp3.000.000 - Rp4.000.000 / bulan". Kosongkan bila tidak disebut.
  gaji             text,

  deskripsi        text,
  syarat           text[]      not null default '{}',

  kontak_nama      text,
  kontak_whatsapp  text,                -- format lokal, mis. 081234567890
  sumber           text,                -- dari mana info lowongan ini didapat

  tanggal_tutup    date,                -- kosong = tanpa batas waktu

  -- draft = belum tampil, terbit = tampil di website, arsip = disimpan tapi tidak tampil
  status           text        not null default 'draft',

  dibuat_pada      timestamptz not null default now(),
  diperbarui_pada  timestamptz not null default now(),

  constraint loker_status_valid
    check (status in ('draft', 'terbit', 'arsip')),
  constraint loker_tipe_valid
    check (tipe is null or tipe in ('Penuh Waktu', 'Paruh Waktu', 'Harian', 'Kontrak', 'Magang', 'Tidak disebutkan')),
  constraint loker_slug_format
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- Ditambahkan belakangan, jadi pakai ALTER supaya tabel yang sudah terlanjur
-- dibuat ikut menyesuaikan saat script dijalankan ulang.
alter table public.loker add column if not exists gambar_url text;

-- Melonggarkan kolom yang dulu wajib. Lihat alasannya di komentar atas.
alter table public.loker alter column perusahaan drop not null;
alter table public.loker alter column lokasi     drop not null;
alter table public.loker alter column deskripsi  drop not null;
alter table public.loker alter column tipe       drop not null;
alter table public.loker alter column tipe       set default 'Tidak disebutkan';

alter table public.loker drop constraint if exists loker_tipe_valid;
alter table public.loker add constraint loker_tipe_valid
  check (tipe is null or tipe in ('Penuh Waktu', 'Paruh Waktu', 'Harian', 'Kontrak', 'Magang', 'Tidak disebutkan'));

create index if not exists loker_status_idx on public.loker (status);
create index if not exists loker_tanggal_tutup_idx on public.loker (tanggal_tutup);

-- ------------------------------------------------------------
-- diperbarui_pada otomatis ikut berubah setiap baris di-update
-- ------------------------------------------------------------
create or replace function public.set_diperbarui_pada()
returns trigger
language plpgsql
as $$
begin
  new.diperbarui_pada = now();
  return new;
end;
$$;

drop trigger if exists loker_set_diperbarui_pada on public.loker;
create trigger loker_set_diperbarui_pada
  before update on public.loker
  for each row execute function public.set_diperbarui_pada();

-- ------------------------------------------------------------
-- Row Level Security
--
-- Kunci keamanannya di sini: anon key dipakai di browser dan bisa
-- dibaca siapa pun, jadi RLS yang menentukan apa yang boleh terlihat.
-- Pengunjung hanya boleh MEMBACA baris berstatus 'terbit'.
-- Draft dan arsip tidak pernah terkirim ke browser.
-- Tulis/ubah/hapus tidak diberi policy sama sekali, jadi hanya bisa
-- lewat service_role key (dipakai nanti oleh backoffice di sisi server).
-- ------------------------------------------------------------
alter table public.loker enable row level security;

drop policy if exists "loker terbit boleh dibaca publik" on public.loker;
create policy "loker terbit boleh dibaca publik"
  on public.loker
  for select
  to anon, authenticated
  using (status = 'terbit');

-- ------------------------------------------------------------
-- Contoh data untuk mencoba tampilan. Hapus kalau sudah tidak perlu.
-- ------------------------------------------------------------
insert into public.loker
  (slug, posisi, perusahaan, lokasi, tipe, gaji, deskripsi, syarat, kontak_nama, kontak_whatsapp, sumber, tanggal_tutup, status)
values
  (
    'operator-produksi-cibening',
    'Operator Produksi',
    'PT Contoh Sejahtera',
    'Kawasan Industri MM2100, Cikarang Barat',
    'Penuh Waktu',
    'Rp4.900.000 - Rp5.400.000 / bulan',
    'Dibutuhkan operator produksi untuk shift pagi dan malam. Penempatan di kawasan industri, tersedia antar jemput dari Desa Cibening.',
    array['Pendidikan minimal SMA/SMK sederajat', 'Usia maksimal 27 tahun', 'Bersedia kerja sistem shift', 'Domisili Kecamatan Setu diutamakan'],
    'Posko Informasi Desa',
    '081234567890',
    'Informasi dari HRD perusahaan',
    current_date + 30,
    'terbit'
  )
on conflict (slug) do nothing;


-- ============================================================
-- Tabel lamaran: warga yang mendaftar lewat form di halaman loker.
--
-- Isinya data identitas warga, jadi aturan aksesnya berbeda dari
-- tabel loker: publik boleh MENGIRIM, tapi tidak boleh MEMBACA.
-- ============================================================

create table if not exists public.lamaran (
  id             uuid primary key default gen_random_uuid(),

  loker_id       uuid        not null references public.loker(id) on delete cascade,

  nama           text        not null,
  wilayah        text        not null,
  whatsapp       text        not null,

  -- baru = belum disentuh admin, lalu diproses / selesai / batal
  status         text        not null default 'baru',
  catatan_admin  text,

  dibuat_pada    timestamptz not null default now(),

  constraint lamaran_status_valid
    check (status in ('baru', 'diproses', 'selesai', 'batal')),
  constraint lamaran_whatsapp_format
    check (whatsapp ~ '^08[0-9]{8,11}$'),
  constraint lamaran_nama_terisi
    check (char_length(trim(nama)) between 2 and 100)
);

create index if not exists lamaran_loker_idx on public.lamaran (loker_id);
create index if not exists lamaran_status_idx on public.lamaran (status);
create index if not exists lamaran_dibuat_idx on public.lamaran (dibuat_pada desc);

-- Satu nomor WhatsApp hanya sekali per lowongan. Mencegah kiriman dobel
-- karena tombol diklik dua kali, dan menjaga daftar di backoffice tetap bersih.
create unique index if not exists lamaran_unik_per_loker
  on public.lamaran (loker_id, whatsapp);

-- ------------------------------------------------------------
-- Row Level Security untuk lamaran
--
-- PENTING: sengaja TIDAK ada policy SELECT. Tanpa policy select, tidak ada
-- satu pun baris yang bisa dibaca memakai anon key, sehingga nama, wilayah,
-- dan nomor WhatsApp warga tidak bisa diambil orang luar. Backoffice nanti
-- membacanya lewat service_role key di sisi server.
--
-- Policy insert dibatasi: status wajib 'baru' (pelamar tidak bisa menandai
-- lamarannya sendiri sudah diproses), catatan_admin wajib kosong, dan
-- lowongan yang dilamar harus benar-benar berstatus 'terbit'.
-- ------------------------------------------------------------
alter table public.lamaran enable row level security;

drop policy if exists "publik boleh mengirim lamaran" on public.lamaran;
create policy "publik boleh mengirim lamaran"
  on public.lamaran
  for insert
  to anon, authenticated
  with check (
    status = 'baru'
    and catatan_admin is null
    and exists (
      -- lamaran.loker_id ditulis lengkap supaya tidak rancu dengan kolom milik l
      select 1 from public.loker l
      where l.id = lamaran.loker_id
        and l.status = 'terbit'
    )
  );

-- Pengalaman kerja pelamar, opsional. Ditambahkan belakangan sebagai bahan
-- pertimbangan admin saat menindaklanjuti, bukan syarat untuk mendaftar.
alter table public.lamaran add column if not exists pengalaman text;

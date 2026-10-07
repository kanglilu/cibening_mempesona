-- ============================================================
-- Akses backoffice (admin) untuk website Desa Cibening.
--
-- Jalankan SETELAH schema.sql, di Supabase > SQL Editor.
-- Aman dijalankan berulang.
--
-- Prinsipnya: aplikasi TIDAK memakai service_role key sama sekali.
-- Admin login memakai Supabase Auth, lalu RLS di bawah ini yang
-- menentukan datanya boleh diapakan. Jadi setiap akses terikat pada
-- identitas orangnya, bukan pada satu kunci sakti.
-- ============================================================

-- ------------------------------------------------------------
-- Daftar siapa saja yang berstatus admin.
--
-- Punya akun Supabase saja TIDAK cukup. Barisnya harus ada di sini.
-- Jadi walaupun pendaftaran publik tidak sengaja aktif, akun baru
-- tetap tidak bisa melihat apa pun.
-- ------------------------------------------------------------
create table if not exists public.admin (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  email        text,
  dibuat_pada  timestamptz not null default now()
);

alter table public.admin enable row level security;

-- ------------------------------------------------------------
-- Helper is_admin().
--
-- SECURITY DEFINER supaya fungsi ini boleh membaca tabel admin tanpa
-- terjerat RLS tabel itu sendiri (kalau tidak, policy yang memanggil
-- dirinya sendiri akan rekursif tanpa henti).
-- search_path dikunci ke public agar tidak bisa dibajak lewat schema lain.
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin a where a.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
-- anon biasanya sudah dapat execute lewat default privilege Supabase, jadi
-- dicabut terpisah. Bukan lubang keamanan (untuk anon fungsinya mengembalikan
-- false), hanya supaya izinnya sesuai niat.
revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "admin boleh melihat daftar admin" on public.admin;
create policy "admin boleh melihat daftar admin"
  on public.admin for select to authenticated
  using (public.is_admin());

-- ------------------------------------------------------------
-- Admin boleh mengelola lowongan sepenuhnya.
--
-- Policy bersifat permissive dan di-OR dengan policy publik yang sudah
-- ada, jadi pengunjung tetap hanya melihat baris 'terbit', sementara
-- admin melihat draft dan arsip juga.
-- ------------------------------------------------------------
drop policy if exists "admin kelola loker" on public.loker;
create policy "admin kelola loker"
  on public.loker for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ------------------------------------------------------------
-- Admin boleh membaca dan menindaklanjuti lamaran warga.
-- Publik tetap tidak punya policy select sama sekali di tabel ini.
-- ------------------------------------------------------------
drop policy if exists "admin baca lamaran" on public.lamaran;
create policy "admin baca lamaran"
  on public.lamaran for select to authenticated
  using (public.is_admin());

drop policy if exists "admin ubah lamaran" on public.lamaran;
create policy "admin ubah lamaran"
  on public.lamaran for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admin hapus lamaran" on public.lamaran;
create policy "admin hapus lamaran"
  on public.lamaran for delete to authenticated
  using (public.is_admin());

-- ============================================================
-- MENDAFTARKAN ADMIN PERTAMA
--
-- 1. Dashboard Supabase > Authentication > Users > Add user
--    Isi email + password, centang "Auto Confirm User".
-- 2. Ganti alamat email di bawah, lalu jalankan baris ini.
-- 3. Authentication > Sign In / Providers > Email:
--    matikan "Allow new users to sign up" supaya tidak ada
--    pendaftaran publik.
-- ============================================================
insert into public.admin (user_id, email)
select id, email from auth.users
where email = 'ganti@email.com'
on conflict (user_id) do nothing;

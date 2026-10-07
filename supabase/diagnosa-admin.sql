-- ============================================================
-- Diagnosa kenapa tidak bisa masuk backoffice.
-- Tempel di Supabase > SQL Editor, lalu Run. Hanya membaca, tidak mengubah apa pun.
--
-- Cara membaca hasilnya:
--   email_terkonfirmasi = false  -> user belum di-confirm, login SELALU gagal.
--                                   Perbaiki: Authentication > Users > klik user >
--                                   Confirm user. Atau hapus lalu buat ulang dengan
--                                   centang "Auto Confirm User".
--   terdaftar_admin     = false  -> password benar pun akan ditolak backoffice.
--                                   Perbaiki: jalankan blok di bagian bawah file ini.
--   keduanya true                -> berarti yang salah passwordnya. Reset lewat
--                                   Authentication > Users > klik user > Reset password.
-- ============================================================

select
  u.email,
  u.id                                as user_id,
  (u.email_confirmed_at is not null)  as email_terkonfirmasi,
  (a.user_id is not null)             as terdaftar_admin,
  u.created_at
from auth.users u
left join public.admin a on a.user_id = u.id
order by u.created_at;

-- ------------------------------------------------------------
-- Kalau terdaftar_admin = false, jalankan blok ini.
-- Tidak perlu mengetik email: semua user yang ada dijadikan admin.
-- Aman karena pendaftaran publik sudah dimatikan, jadi satu-satunya user
-- adalah yang Anda buat sendiri di dashboard.
-- ------------------------------------------------------------
-- insert into public.admin (user_id, email)
-- select id, email from auth.users
-- on conflict (user_id) do nothing;
--
-- select * from public.admin;

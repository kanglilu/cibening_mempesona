-- ============================================================
-- Penyimpanan gambar lowongan (Supabase Storage).
--
-- Dipisah dari schema.sql karena menyentuh schema `storage`.
-- Kalau bagian ini gagal karena izin, bucket bisa dibuat manual lewat
-- Dashboard > Storage > New bucket, nama "loker", centang Public.
--
-- Jalankan SETELAH admin.sql (butuh fungsi public.is_admin()).
-- ============================================================

insert into storage.buckets (id, name, public)
values ('loker', 'loker', true)
on conflict (id) do nothing;

-- Gambar lowongan memang untuk dilihat umum.
drop policy if exists "publik baca gambar loker" on storage.objects;
create policy "publik baca gambar loker"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'loker');

-- Hanya admin yang boleh menaruh dan menghapus berkas.
drop policy if exists "admin unggah gambar loker" on storage.objects;
create policy "admin unggah gambar loker"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'loker' and public.is_admin());

drop policy if exists "admin ubah gambar loker" on storage.objects;
create policy "admin ubah gambar loker"
  on storage.objects for update to authenticated
  using (bucket_id = 'loker' and public.is_admin())
  with check (bucket_id = 'loker' and public.is_admin());

drop policy if exists "admin hapus gambar loker" on storage.objects;
create policy "admin hapus gambar loker"
  on storage.objects for delete to authenticated
  using (bucket_id = 'loker' and public.is_admin());

# Panduan Testing Mock Data LMS

## Ringkasan Perubahan

### File yang Dibuat/Diubah

#### 1. **File Baru: Mock Data Terpusat**
- `src/mocks/academicMock.js` - Sumber data terpusat untuk seluruh aplikasi

#### 2. **File Baru: Service Master Data**
- `src/services/masterDataService.js` - Service untuk mata pelajaran, kelas, jadwal mengajar

#### 3. **Service yang Diupdate**
- `src/services/authService.js` - Updated untuk menggunakan mock data terpusat
- `src/services/materiService.js` - Implementasi validasi teaching assignment
- `src/services/tugasService.js` - Implementasi validasi teaching assignment  
- `src/services/nilaiService.js` - Implementasi validasi teaching assignment
- `src/services/absensiService.js` - Implementasi validasi teaching assignment

#### 4. **Halaman yang Diupdate**
- `src/pages/guru/Materi.jsx` - Menggunakan masterDataService, dropdown kelas dinamis

---

## Akun Login Mock

### 1. Admin
```
Email: admin@test.local
Password: password
ID: 1
Name: Admin Sekolah
Role: admin
```

**Hak Akses:**
- Melihat dan mengelola SEMUA data
- Akses ke semua mata pelajaran, kelas, guru, siswa
- Lihat laporan guru dan siswa

### 2. Guru (Budi Santoso)
```
Email: guru@test.local
Password: password
ID: 2
Name: Budi Santoso
Role: guru
```

**Teaching Assignment:**
- Pemrograman Web di XII RPL 1
- Basis Data di XII RPL 1

**Hak Akses:**
- HANYA melihat dan mengelola mata pelajaran & kelas sesuai teaching assignment
- Tidak bisa membuat materi/tugas untuk mapel/kelas lain
- Tidak bisa input nilai/absensi untuk kelas yang tidak diajar

### 3. Siswa (Ahmad Fauzi)
```
Email: siswa@test.local
Password: password
ID: 4
Name: Ahmad Fauzi
Role: siswa
Kelas: XII RPL 1 (kelas_id: 1)
```

**Hak Akses:**
- HANYA melihat data untuk kelasnya sendiri (XII RPL 1)
- Melihat materi dan tugas kelas XII RPL 1
- Melihat nilai dan absensi miliknya sendiri
- Tidak bisa melihat data kelas lain

---

## Skenario Testing

### Test 1: Login Admin

**Langkah:**
1. Buka aplikasi dan login dengan `admin@test.local` / `password`
2. Cek dashboard - harus menampilkan statistik semua data
3. Buka menu Users - harus melihat semua user (admin, guru, siswa)
4. Buka menu Jurusan - harus melihat RPL, TKJ, MM
5. Buka menu Kelas - harus melihat semua kelas
6. Buka menu Mata Pelajaran - harus melihat semua mapel
7. Buka menu Jadwal - harus melihat teaching assignments semua guru

**Expected Result:**
✅ Admin dapat melihat dan mengakses SEMUA data tanpa batasan

---

### Test 2: Login Guru - Happy Path

**Langkah:**
1. Logout dari admin, login dengan `guru@test.local` / `password`
2. Buka menu **Materi**
3. Perhatikan dropdown "Mata Pelajaran" - harus HANYA berisi:
   - Pemrograman Web
   - Basis Data
4. Klik "+ Upload Materi"
5. Pilih "Pemrograman Web" di dropdown Mata Pelajaran
6. Perhatikan dropdown "Kelas" - harus HANYA berisi:
   - XII RPL 1
7. Isi form dan upload materi

**Expected Result:**
✅ Guru Budi hanya melihat mata pelajaran yang dia ajar
✅ Setelah pilih mata pelajaran, dropdown kelas otomatis filter sesuai teaching assignment
✅ Materi berhasil dibuat

---

### Test 3: Login Guru - Negative Test (Validasi)

**Langkah:**
1. Login sebagai guru (`guru@test.local`)
2. Buka browser console/dev tools
3. Coba buat materi dengan kode:

```javascript
const formData = new FormData();
formData.append('judul', 'Test Materi Ilegal');
formData.append('deskripsi', 'Mencoba akses kelas yang tidak diajar');
formData.append('mata_pelajaran_id', 3); // Algoritma - BUKAN mapel Pak Budi
formData.append('kelas_id', 2); // XII RPL 2 - BUKAN kelas Pak Budi
formData.append('file', new Blob(['test']));

// Panggil service
import materiService from './services/materiService';
materiService.createMateri(formData);
```

**Expected Result:**
❌ Harus muncul error: **"403 - Anda tidak mengajar Algoritma di kelas XII RPL 2"**
✅ Materi TIDAK boleh dibuat

---

### Test 4: Login Guru - Nilai & Absensi

**Langkah:**
1. Login sebagai guru (`guru@test.local`)
2. Buka menu **Nilai**
3. Pilih Mata Pelajaran: Pemrograman Web
4. Pilih Kelas: XII RPL 1
5. Pilih Jenis: Tugas
6. Klik "Input Nilai"
7. Isi nilai untuk beberapa siswa, simpan

**Expected Result:**
✅ Berhasil input nilai
✅ Data nilai tersimpan dengan guru_id = 2

**Negative Test:**
- Jika coba input nilai untuk mapel/kelas lain → Error 403

---

### Test 5: Login Siswa - Materi & Tugas

**Langkah:**
1. Logout, login dengan `siswa@test.local` / `password`
2. Buka menu **Materi**
3. Perhatikan daftar materi yang tampil

**Expected Result:**
✅ Siswa Ahmad hanya melihat materi untuk kelas XII RPL 1
✅ Tidak melihat materi kelas XII RPL 2, XI RPL 1, atau kelas lain

**Testing Detail:**
- Materi yang tampil: judul "Pengenalan Pemrograman Web" dan "Database MySQL"
- Materi yang TIDAK tampil: "Algoritma Sorting" (ini untuk XII RPL 2)

---

### Test 6: Login Siswa - Nilai

**Langkah:**
1. Login sebagai siswa (`siswa@test.local`)
2. Buka menu **Nilai**
3. Lihat daftar nilai

**Expected Result:**
✅ Ahmad hanya melihat nilainya sendiri
✅ Tidak melihat nilai siswa lain (Dewi, Budi, Siti, Eko)
✅ Tampil nilai:
   - Pemrograman Web (Tugas): 85
   - Basis Data (Tugas): 90
   - Pemrograman Web (UTS): 88

---

### Test 7: Login Siswa - Absensi

**Langkah:**
1. Login sebagai siswa (`siswa@test.local`)
2. Buka menu **Absensi**
3. Lihat summary absensi

**Expected Result:**
✅ Ahmad hanya melihat absensinya sendiri
✅ Summary menampilkan:
   - Hadir: 2x
   - Sakit: 1x
   - Total: 3x
   - Persentase Hadir: 67%

---

## Validasi Utama yang Harus Dipastikan

### ✅ Checkpoint 1: Guru Budi Santoso
- [ ] Dropdown Mata Pelajaran hanya berisi: Pemrograman Web, Basis Data
- [ ] Setelah pilih Pemrograman Web, dropdown Kelas hanya berisi: XII RPL 1
- [ ] Tidak bisa membuat materi untuk Algoritma (bukan mapelnya)
- [ ] Tidak bisa membuat materi untuk XII RPL 2 (bukan kelasnya)
- [ ] Error 403 muncul jika coba akses kombinasi mapel+kelas yang salah

### ✅ Checkpoint 2: Siswa Ahmad Fauzi
- [ ] Hanya melihat materi kelas XII RPL 1
- [ ] Hanya melihat tugas kelas XII RPL 1
- [ ] Hanya melihat nilai miliknya sendiri (siswa_id: 4)
- [ ] Hanya melihat absensi miliknya sendiri
- [ ] Tidak melihat data siswa lain atau kelas lain

### ✅ Checkpoint 3: Admin
- [ ] Dapat melihat SEMUA mata pelajaran
- [ ] Dapat melihat SEMUA kelas
- [ ] Dapat melihat SEMUA guru dan siswa
- [ ] Tidak ada batasan akses

---

## Data Mock yang Tersedia

### Jurusan
1. RPL - Rekayasa Perangkat Lunak
2. TKJ - Teknik Komputer dan Jaringan
3. MM - Multimedia

### Kelas
1. XII RPL 1
2. XII RPL 2
3. XI RPL 1
4. X TKJ 1
5. XI TKJ 1
6. XII MM 1

### Mata Pelajaran
1. Pemrograman Web
2. Basis Data
3. Algoritma
4. Jaringan Komputer
5. Desain Grafis
6. Matematika
7. Bahasa Indonesia

### Teaching Assignments
**Budi Santoso (ID: 2)**
- Pemrograman Web → XII RPL 1
- Basis Data → XII RPL 1

**Siti Rahayu (ID: 3)**
- Algoritma → XII RPL 2
- Matematika → XII RPL 2
- Matematika → XI RPL 1

**Dedi Kurniawan (ID: 10)**
- Jaringan Komputer → X TKJ 1
- Jaringan Komputer → XI TKJ 1
- Desain Grafis → XII MM 1

---

## Troubleshooting

### Error: "Mata pelajaran tidak ada di dropdown"
**Solusi:** Pastikan guru sudah login. Service secara otomatis filter berdasarkan teaching assignment.

### Error: "Tidak bisa pilih kelas"
**Solusi:** Pilih mata pelajaran dulu. Dropdown kelas akan dinamis berdasarkan mapel yang dipilih.

### Error: "403 - Guru tidak mengajar..."
**Expected behavior!** Ini artinya validasi bekerja dengan benar.

---

## Cara Menjalankan Aplikasi

```bash
# Frontend
cd lms-frontend
npm install
npm run dev

# Buka browser
http://localhost:5173
```

---

## Next Steps untuk Production

Saat siap integrasi dengan backend:

1. **Ubah `MOCK_MODE` di authService.js** dari `true` ke `false`
2. **Backend API harus menyediakan endpoint:**
   - `GET /api/guru/teaching-assignments` - List mapel & kelas yang diajar guru login
   - `GET /api/materi` dengan filter role otomatis di backend
   - `POST /api/materi` dengan validasi teaching assignment di backend
   - Dan endpoint lainnya sesuai kebutuhan

3. **Validasi di Backend (WAJIB!):**
   - Jangan hanya mengandalkan validasi frontend
   - Backend HARUS validasi teaching assignment sebelum create/update
   - Backend HARUS filter data berdasarkan role (guru/siswa)

---

## Kesimpulan

Mock data ini sudah realistis dan siap untuk demo/testing. Role-based access control sudah diterapkan dengan benar:

- ✅ Admin = Full Access
- ✅ Guru = Limited to Teaching Assignments
- ✅ Siswa = Limited to Their Class

Validasi teaching assignment mencegah guru mengakses mapel/kelas yang bukan miliknya.

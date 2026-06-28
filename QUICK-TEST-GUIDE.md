# 🚀 Quick Test Guide - LMS Frontend

## Cara Cepat Test Aplikasi

### 1️⃣ Start Development Server

```bash
cd lms-frontend
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3000**

---

### 2️⃣ Ubah Role User untuk Testing

Edit file: `lms-frontend/src/context/AuthContext.jsx`

Cari baris 28-33, ubah sesuai role yang ingin ditest:

#### **Test sebagai Admin:**
```javascript
const mockUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@test.local',
  role: 'admin'
};
```

#### **Test sebagai Guru:**
```javascript
const mockUser = {
  id: 2,
  name: 'Budi Santoso',
  email: 'guru@test.local',
  role: 'guru'
};
```

#### **Test sebagai Siswa:**
```javascript
const mockUser = {
  id: 4,
  name: 'Ahmad Fauzi',
  email: 'siswa@test.local',
  role: 'siswa'
};
```

---

### 3️⃣ Test Features per Role

## 👨‍💼 **Admin** (`/admin`)

**Menu yang tersedia:**
- ✅ Dashboard
- ✅ Kelola User
- ✅ Jurusan
- ✅ Kelas
- ✅ Mata Pelajaran
- ✅ Jadwal

**Test ini:**
1. Buka Users → Klik "Tambah User"
2. Isi form → Simpan (akan berhasil dengan mock)
3. Edit user → Ubah data
4. Delete user → Konfirmasi hapus
5. Coba search user
6. Ulangi untuk Jurusan, Kelas, Mata Pelajaran, Jadwal

---

## 👨‍🏫 **Guru** (`/guru`)

**Menu yang tersedia:**
- ✅ Dashboard
- ✅ Materi
- ✅ Tugas
- ✅ Nilai
- ✅ Absensi

### **Test Materi:**
1. Klik "Upload Materi"
2. Isi judul, deskripsi
3. Upload file (drag & drop atau klik)
4. Simpan → Lihat materi muncul di list
5. Edit materi → Ubah judul
6. Delete materi → Konfirmasi
7. Download materi → Alert akan muncul

### **Test Tugas:**
1. Klik "Buat Tugas"
2. Isi judul, deskripsi, deadline
3. Upload file soal (optional)
4. Simpan → Lihat tugas di list
5. Perhatikan badge deadline (warna berubah jika dekat)
6. Edit tugas
7. Delete tugas

### **Test Nilai:**
1. Pilih Kelas, Mata Pelajaran, Jenis Nilai
2. Lihat daftar siswa muncul
3. Input nilai (0-100) untuk setiap siswa
4. Perhatikan warna nilai berubah otomatis
5. Isi keterangan (optional)
6. Klik "Simpan Semua"

### **Test Absensi:**
1. Pilih Kelas, Mata Pelajaran, Tanggal (default hari ini)
2. Lihat daftar siswa
3. Klik tombol H / S / I / A untuk setiap siswa
4. Atau gunakan "Semua Hadir" untuk cepat
5. Isi keterangan untuk yang tidak hadir
6. Lihat summary counter update otomatis
7. Klik "Simpan Absensi"

---

## 👨‍🎓 **Siswa** (`/siswa`)

**Menu yang tersedia:**
- ✅ Dashboard
- ✅ Materi
- ✅ Tugas
- ✅ Nilai
- ✅ Absensi

### **Test Materi:**
1. Lihat list materi tersedia
2. Coba search materi
3. Filter by mata pelajaran
4. Klik "Download" → Alert muncul
5. Perhatikan info file (nama, ukuran, tanggal)

### **Test Tugas:**
1. **Tab Aktif:** Lihat tugas yang belum dikumpulkan
   - Perhatikan countdown deadline
   - Badge warna (hijau = aman, kuning = dekat, merah = urgent)
   - Klik "Kumpulkan"
   - Upload file tugas
   - Isi catatan (optional)
   - Submit → Tugas pindah ke tab "Sudah Dikumpulkan"

2. **Tab Sudah Dikumpulkan:** 
   - Lihat tugas yang sudah disubmit
   - Cek tanggal pengumpulan
   - Jika sudah dinilai, nilai akan tampil

3. **Tab Terlambat:**
   - Lihat tugas yang deadline-nya sudah lewat
   - Tombol "Terlambat" disabled

### **Test Nilai:**
1. Lihat summary cards:
   - Rata-rata nilai
   - Nilai tertinggi
   - Nilai terendah
   - Total nilai
2. Scroll ke bawah → Lihat nilai per mata pelajaran
3. Perhatikan badge grade (A, B, C, D)
4. Filter by mata pelajaran
5. Lihat breakdown nilai (Tugas, UTS, UAS)

### **Test Absensi:**
1. Lihat summary cards:
   - Total pertemuan
   - Hadir (dengan persentase)
   - Sakit
   - Izin
   - Alpha
2. **Warning muncul jika persentase < 80%**
3. Filter by bulan dan mata pelajaran
4. Scroll ke bawah → Lihat riwayat absensi
5. Perhatikan icon dan badge sesuai status
6. Lihat keterangan (jika ada)

---

## 🎨 Visual Indicators

### **Badge Colors:**
- 🟢 **Hijau (Success):** Hadir, Nilai A, Status Aktif
- 🔵 **Biru (Info):** Izin, Nilai B, Informasi
- 🟡 **Kuning (Warning):** Sakit, Nilai C, Deadline Dekat
- 🔴 **Merah (Danger):** Alpha, Nilai D, Deadline Lewat/Urgent

### **Nilai Grading:**
- **A (85-100):** Hijau - Sangat Baik
- **B (70-84):** Biru - Baik
- **C (60-69):** Kuning - Cukup
- **D (<60):** Merah - Kurang

### **Deadline Status:**
- **> 3 hari:** Badge hijau "Aktif"
- **1-3 hari:** Badge kuning "X hari lagi"
- **< 1 hari:** Badge merah "Deadline hari ini!"
- **Sudah lewat:** Badge merah "Ditutup"

---

## 🔍 Things to Notice

### **Loading States:**
- Spinner saat load data
- "Menyimpan..." saat submit
- Disabled buttons saat proses

### **Empty States:**
- Icon + message jika belum ada data
- Call-to-action button (misalnya "Buat Tugas")

### **Responsive Design:**
- Coba resize browser
- Sidebar jadi hamburger menu di mobile
- Grid cards jadi 1 kolom di mobile
- Table bisa scroll horizontal

### **Validations:**
- Form wajib diisi (required)
- File type validation
- File size validation (max 10MB)
- Nilai harus 0-100
- Tanggal harus dipilih

---

## ⚡ Quick Tips

1. **Data hilang saat refresh?** 
   - Normal! Ini mock data in-memory
   - Data akan reset setiap refresh

2. **File upload tidak real upload?**
   - Benar! Ini simulasi
   - Akan berfungsi real setelah backend ready

3. **Download hanya alert?**
   - Benar! Mock only
   - Backend akan handle real download

4. **Ingin test role lain?**
   - Edit `AuthContext.jsx` (ubah role)
   - Save → Auto reload
   - Login otomatis dengan role baru

5. **Error muncul?**
   - Check console (F12)
   - Biasanya typo atau import missing
   - Restart dev server jika perlu

---

## 🐛 Common Issues

### **Blank screen?**
- Check console untuk error
- Pastikan `npm run dev` running
- Cek port 3000 tidak bentrok

### **Styling broken?**
- Pastikan Tailwind CSS loaded
- Check `index.css` imported
- Restart dev server

### **Route not found?**
- Check `routes/index.jsx`
- Pastikan path sesuai role
- Default redirect ke `/login`

---

## 📞 Need Help?

Check documentation:
- `README.md` - Project overview
- `FRONTEND-COMPLETE.md` - Complete documentation
- `CHECKLIST.md` - Development progress

---

**Happy Testing!** 🎉

**Last Updated:** Jumat, 26 Juni 2026

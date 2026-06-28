# ✅ Halaman Tugas Submissions - SELESAI!

## 📅 Tanggal: 28 Juni 2026

---

## 🎯 **Halaman: Tugas Submissions**

**URL:** `/guru/tugas/:tugasId/submissions`

**Fungsi:** Guru melihat daftar pengumpulan tugas siswa dan memberi nilai

---

## 📊 **Fitur Utama**

### **1. ✅ Header & Info Tugas**
```
┌──────────────────────────────────────────────┐
│ [← Kembali]                                  │
│                                              │
│ Project CRUD dengan React                   │
│ Pemrograman Web • XII RPL 1 • Deadline: ... │
└──────────────────────────────────────────────┘
```

### **2. ✅ Statistik Cards**
```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│  Total   │Terkumpul │ Dinilai  │Terlambat │Blm Submit│
│   30     │    28    │    25    │    3     │    2     │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

### **3. ✅ Filter Tabs**
```
[Semua (30)] [Sudah Submit (28)] [Sudah Dinilai (25)] [Terlambat (3)] [Belum Submit (2)]
```

### **4. ✅ Tabel Submissions**
```
┌────┬─────────┬──────────────┬──────────────┬─────────────┬───────┬─────────────┐
│ No │   NIS   │  Nama Siswa  │ Waktu Submit │   Status    │ Nilai │    Aksi     │
├────┼─────────┼──────────────┼──────────────┼─────────────┼───────┼─────────────┤
│ 1  │ 2024001 │ Ahmad Rifai  │ 28 Jun 07:30 │ Sudah Dinilai│  85  │[Download][Lihat]│
│ 2  │ 2024002 │ Siti Aisyah  │ 29 Jun 08:15 │ Terlambat   │  -   │[Download][Nilai]│
│ 3  │ 2024003 │ Budi Santoso │ 28 Jun 09:00 │ Belum Dinilai│  -   │[Download][Nilai]│
│ 4  │ 2024004 │ Ani Wijaya   │      -       │ Belum Submit │  -   │     -       │
└────┴─────────┴──────────────┴──────────────┴─────────────┴───────┴─────────────┘
```

### **5. ✅ Modal Beri Nilai**
```
┌─────────────────────────────────────────┐
│ Beri Nilai                              │
├─────────────────────────────────────────┤
│ Nama Siswa: Ahmad Rifai                 │
│ NIS: 2024001                            │
│ Waktu Submit: 28 Juni 2026, 07:30      │
│ [Terlambat Badge]                       │
│                                         │
│ File Submission:                        │
│ project-crud.zip       [Download]       │
│                                         │
│ Nilai (0-100): [85]                     │
│                                         │
│ Feedback:                               │
│ ┌─────────────────────────────────────┐ │
│ │ Bagus! CRUD sudah berfungsi dengan  │ │
│ │ baik. Tampilan UI juga menarik.     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│              [Batal] [Simpan Nilai]     │
└─────────────────────────────────────────┘
```

---

## 🔄 **Alur Penggunaan**

### **Scenario 1: Guru Memberi Nilai**

1. Guru buka halaman Tugas → Klik "Lihat" pada tugas "Project CRUD"
2. Masuk ke halaman submissions
3. Melihat statistik:
   - Total siswa: 30
   - Sudah submit: 28
   - Sudah dinilai: 25
   - Terlambat: 3
   - Belum submit: 2
4. Filter: Klik "Belum Dinilai (3)" → Hanya muncul 3 siswa yang belum dinilai
5. Klik "Beri Nilai" pada siswa pertama
6. Modal muncul:
   - Lihat info siswa
   - Download file submission
   - Input nilai (0-100)
   - Tulis feedback
7. Klik "Simpan Nilai"
8. Status berubah → "Sudah Dinilai"
9. Nilai muncul di kolom Nilai

### **Scenario 2: Guru Lihat Nilai yang Sudah Diberikan**

1. Filter: Klik "Sudah Dinilai (25)"
2. Klik "Lihat Nilai" pada siswa yang sudah dinilai
3. Modal muncul (read-only):
   - Nilai yang diberikan: 85
   - Feedback yang diberikan: "Bagus! ..."
4. Klik "Tutup"

### **Scenario 3: Download File Submission**

1. Klik "Download" pada row siswa
2. File submission otomatis terdownload
3. Guru bisa buka dan cek hasil pekerjaan siswa

---

## 🎨 **Status & Badge**

### **Status Submission:**

1. **Belum Submit** → Badge merah
   - Siswa belum upload file
   - Tidak ada tombol Download/Nilai

2. **Belum Dinilai** → Badge biru (Info)
   - Siswa sudah submit tapi belum dinilai
   - Tombol: [Download] [Beri Nilai]

3. **Terlambat** → Badge kuning (Warning)
   - Submit setelah deadline
   - Tombol: [Download] [Beri Nilai]

4. **Sudah Dinilai** → Badge hijau (Success)
   - Sudah dinilai oleh guru
   - Tombol: [Download] [Lihat Nilai]

### **Warna Nilai:**

- ✅ **85-100** → Hijau (Sangat Baik)
- ✅ **70-84** → Biru (Baik)
- ⚠️ **60-69** → Kuning (Cukup)
- ❌ **<60** → Merah (Kurang)

---

## 📝 **Data Structure**

### **Submission Object:**
```javascript
{
  id: 1,
  tugas_id: 1,
  siswa_id: 1,
  siswa_nama: "Ahmad Rifai",
  siswa_nis: "2024001",
  file_name: "project-crud.zip",
  file_size: 2048576, // bytes
  submitted_at: "2026-06-28T07:30:00",
  is_late: false,
  status: "graded", // not_submitted, submitted, graded
  nilai: 85,
  feedback: "Bagus! CRUD sudah berfungsi dengan baik.",
}
```

---

## 🔧 **API Endpoints yang Digunakan**

### **1. GET /api/guru/tugas/:tugasId**
**Response:**
```json
{
  "data": {
    "id": 1,
    "judul": "Project CRUD dengan React",
    "mata_pelajaran": { "id": 1, "nama": "Pemrograman Web" },
    "kelas": { "id": 1, "nama": "XII RPL 1" },
    "deadline": "2026-06-30T23:59:59",
    "max_score": 100
  }
}
```

### **2. GET /api/guru/tugas/:tugasId/submissions**
**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "siswa_id": 1,
      "siswa_nama": "Ahmad Rifai",
      "siswa_nis": "2024001",
      "file_name": "project-crud.zip",
      "submitted_at": "2026-06-28T07:30:00",
      "is_late": false,
      "status": "graded",
      "nilai": 85,
      "feedback": "Bagus!"
    }
  ]
}
```

### **3. POST /api/guru/submissions/:submissionId/grade**
**Request:**
```json
{
  "nilai": 85,
  "feedback": "Bagus! CRUD sudah berfungsi dengan baik."
}
```

**Response:**
```json
{
  "message": "Nilai berhasil disimpan"
}
```

### **4. GET /api/guru/submissions/:submissionId/download**
**Response:** File download

---

## ✅ **Fitur Lengkap**

### **UI/UX:**
- ✅ Responsive design
- ✅ Statistics cards dengan warna berbeda
- ✅ Filter tabs dengan counter
- ✅ Table dengan hover effect
- ✅ Status badges dengan warna
- ✅ Modal dengan form nilai
- ✅ Loading states

### **Functionality:**
- ✅ Load tugas detail
- ✅ Load submissions list
- ✅ Filter by status (semua, submitted, graded, late, not submitted)
- ✅ Download submission file
- ✅ Beri nilai dengan feedback
- ✅ View nilai yang sudah diberikan
- ✅ Calculate statistics
- ✅ Format date & time
- ✅ Nilai color coding

### **Validation:**
- ✅ Nilai harus 0-100 (sesuai max_score tugas)
- ✅ Feedback optional
- ✅ Cannot edit nilai yang sudah diberikan (read-only modal)

---

## 🎯 **Benefits**

### **Untuk Guru:**
1. ✅ **One-Stop View** - Semua submissions dalam 1 halaman
2. ✅ **Quick Stats** - Langsung tahu berapa yang sudah/belum submit
3. ✅ **Easy Filter** - Filter berdasarkan status dengan 1 klik
4. ✅ **Fast Grading** - Beri nilai langsung dari tabel
5. ✅ **Feedback System** - Bisa kasih feedback personal ke siswa

### **Untuk Siswa (nanti):**
1. ✅ Siswa bisa lihat nilai dan feedback dari guru
2. ✅ Tahu status submission (sudah dinilai/belum)
3. ✅ Tahu apakah terlambat atau tidak

---

## 🚀 **Next Steps**

### **Backend (To-Do):**
- ⏳ Create API endpoints
- ⏳ File storage untuk submissions
- ⏳ Validasi: Cek apakah guru berhak akses tugas ini
- ⏳ Notification: Notif ke siswa saat nilai diberikan

### **Frontend:**
- ✅ TugasSubmissions.jsx - Complete
- ✅ Route added
- ⏳ Connect ke API backend
- ⏳ Error handling
- ⏳ Toast notification instead of alert

### **Nice to Have:**
- ⏳ Bulk grading (beri nilai banyak siswa sekaligus)
- ⏳ Export to Excel (download nilai dalam Excel)
- ⏳ Preview file submission (untuk PDF/image)
- ⏳ Comment thread (diskusi dengan siswa)

---

## 📋 **Summary**

**Halaman TugasSubmissions sudah selesai dibuat!** 🎉

Guru sekarang bisa:
1. ✅ Lihat semua submissions siswa untuk 1 tugas
2. ✅ Filter berdasarkan status
3. ✅ Download file submission siswa
4. ✅ Beri nilai (0-100) dengan feedback
5. ✅ Lihat nilai yang sudah diberikan

**Route:** `/guru/tugas/:tugasId/submissions` sudah ditambahkan ke routing system.

Tinggal **backend API** siap, sistem submissions sudah bisa digunakan! 🚀

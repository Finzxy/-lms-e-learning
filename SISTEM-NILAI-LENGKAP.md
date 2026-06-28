# 📊 Sistem Nilai Lengkap - LMS E-Learning

## 🎯 **Konsep: Dual System (Opsi 1)**

Sistem menggunakan **2 halaman** dengan fungsi berbeda tapi saling melengkapi:

---

## 1️⃣ **Tugas Submissions** - Nilai Per Tugas

**URL:** `/guru/tugas/:tugasId/submissions`

### **Fungsi:**
- Memberi nilai untuk **1 tugas spesifik**
- Track siapa yang sudah/belum submit
- Download & review file submission
- Beri nilai + feedback personal

### **Karakteristik:**
- ✅ **Per Tugas** - Fokus pada 1 tugas tertentu
- ✅ **Ada File Submission** - Siswa upload file
- ✅ **Personal Feedback** - Bisa kasih komentar per siswa
- ✅ **Track Status** - Submitted, Graded, Late, Not Submitted
- ✅ **Download File** - Review pekerjaan siswa

### **Contoh Use Case:**

**Tugas:** "Project CRUD dengan React"

```
┌────┬──────────────┬──────────────┬─────────────┬───────┬──────────────┐
│ No │ Nama Siswa   │ Waktu Submit │   Status    │ Nilai │     Aksi     │
├────┼──────────────┼──────────────┼─────────────┼───────┼──────────────┤
│ 1  │ Ahmad Rifai  │ 28 Jun 07:30 │Sudah Dinilai│  85   │ Download, Lihat│
│ 2  │ Siti Aisyah  │ 29 Jun 08:15 │ Terlambat   │  90   │ Download, Lihat│
│ 3  │ Budi Santoso │ 28 Jun 09:00 │Belum Dinilai│   -   │ Download, Nilai│
│ 4  │ Ani Wijaya   │      -       │Belum Submit │   -   │       -       │
└────┴──────────────┴──────────────┴─────────────┴───────┴──────────────┘

Feedback untuk Ahmad: "Bagus! CRUD sudah berfungsi dengan baik. UI menarik."
```

**Output:**
- Nilai tersimpan per tugas per siswa
- Data ini akan digunakan untuk kalkulasi **Nilai Tugas** di sistem nilai

---

## 2️⃣ **Input Nilai** - Nilai Komprehensif

**URL:** `/guru/nilai`

### **Fungsi:**
- Input **semua jenis nilai** untuk rapor
- Nilai UTS, UAS, Praktikum, dll
- Input nilai **semua siswa sekaligus** (bulk input)
- Untuk nilai formal/resmi

### **Karakteristik:**
- ✅ **Multi Jenis Nilai** - Tugas, UTS, UAS, Praktikum, Harian
- ✅ **Bulk Input** - Semua siswa dalam 1 tabel
- ✅ **Tanpa File** - Input nilai manual (untuk ujian/test)
- ✅ **Keterangan** - Bisa kasih catatan per jenis nilai
- ✅ **Untuk Rapor** - Nilai resmi untuk transkrip

### **Jenis Nilai yang Bisa Diinput:**

1. **Nilai Tugas** - Rata-rata dari semua tugas yang sudah dinilai
2. **Nilai UTS** - Ujian Tengah Semester
3. **Nilai UAS** - Ujian Akhir Semester
4. **Nilai Praktikum** - Untuk mata pelajaran praktik
5. **Nilai Harian** - Quiz, kuis harian
6. **Nilai Akhir** - Kalkulasi otomatis dari semua komponen

### **Contoh Use Case:**

**Kelas:** XII RPL 1  
**Mata Pelajaran:** Pemrograman Web  
**Jenis Nilai:** UTS  
**Keterangan:** UTS Semester Ganjil 2026

```
┌────┬──────────────┬───────┬──────────────────┐
│ No │ Nama Siswa   │ Nilai │   Keterangan     │
├────┼──────────────┼───────┼──────────────────┤
│ 1  │ Ahmad Rifai  │  85   │ UTS Ganjil 2026  │
│ 2  │ Siti Aisyah  │  90   │ UTS Ganjil 2026  │
│ 3  │ Budi Santoso │  75   │ UTS Ganjil 2026  │
│ 4  │ Ani Wijaya   │  80   │ UTS Ganjil 2026  │
└────┴──────────────┴───────┴──────────────────┘

[Simpan Semua Nilai]
```

**Output:**
- Nilai UTS tersimpan untuk semua siswa
- Data ini akan digunakan untuk kalkulasi **Nilai Akhir**

---

## 🔄 **Alur Lengkap: Dari Tugas ke Nilai Akhir**

### **Semester Ganjil - Mata Pelajaran: Pemrograman Web**

### **📝 Step 1: Guru Buat Tugas**
```
Tugas 1: "HTML & CSS Dasar"     → Max Score: 100
Tugas 2: "JavaScript DOM"       → Max Score: 100
Tugas 3: "Project CRUD React"   → Max Score: 100
```

### **👨‍🎓 Step 2: Siswa Kerjakan & Submit**
```
Ahmad Rifai:
├─ Tugas 1: Submit file "html-css.zip" → 28 Juni
├─ Tugas 2: Submit file "javascript-dom.zip" → 5 Juli
└─ Tugas 3: Submit file "project-crud.zip" → 15 Juli
```

### **✅ Step 3: Guru Kasih Nilai Per Tugas**

**Di `/guru/tugas/1/submissions`:**
```
Tugas 1: "HTML & CSS Dasar"
├─ Ahmad Rifai: 85 (Feedback: "Layout rapi, semantik HTML bagus")
├─ Siti Aisyah: 90 (Feedback: "Sempurna! Responsive design bagus")
└─ Budi Santoso: 75 (Feedback: "CSS masih perlu diperbaiki")
```

**Di `/guru/tugas/2/submissions`:**
```
Tugas 2: "JavaScript DOM"
├─ Ahmad Rifai: 80
├─ Siti Aisyah: 88
└─ Budi Santoso: 70
```

**Di `/guru/tugas/3/submissions`:**
```
Tugas 3: "Project CRUD React"
├─ Ahmad Rifai: 82
├─ Siti Aisyah: 92
└─ Budi Santoso: 78
```

### **📊 Step 4: Sistem Auto-Calculate Nilai Tugas**

**Backend menghitung rata-rata:**
```
Ahmad Rifai:
Nilai Tugas = (85 + 80 + 82) / 3 = 82.3

Siti Aisyah:
Nilai Tugas = (90 + 88 + 92) / 3 = 90.0

Budi Santoso:
Nilai Tugas = (75 + 70 + 78) / 3 = 74.3
```

### **📝 Step 5: Guru Input Nilai UTS**

**Di `/guru/nilai`:**
```
Kelas: XII RPL 1
Mata Pelajaran: Pemrograman Web
Jenis: UTS

┌──────────────┬───────┐
│ Ahmad Rifai  │  85   │
│ Siti Aisyah  │  88   │
│ Budi Santoso │  75   │
└──────────────┴───────┘
```

### **📝 Step 6: Guru Input Nilai UAS**

**Di `/guru/nilai`:**
```
Kelas: XII RPL 1
Mata Pelajaran: Pemrograman Web
Jenis: UAS

┌──────────────┬───────┐
│ Ahmad Rifai  │  88   │
│ Siti Aisyah  │  92   │
│ Budi Santoso │  78   │
└──────────────┴───────┘
```

### **📝 Step 7: Guru Input Nilai Praktikum**

**Di `/guru/nilai`:**
```
Kelas: XII RPL 1
Mata Pelajaran: Pemrograman Web
Jenis: Praktikum

┌──────────────┬───────┐
│ Ahmad Rifai  │  85   │
│ Siti Aisyah  │  90   │
│ Budi Santoso │  80   │
└──────────────┴───────┘
```

### **🎯 Step 8: Sistem Auto-Calculate Nilai Akhir**

**Formula (bisa dikonfigurasi):**
```
Nilai Akhir = (Tugas × 20%) + (UTS × 25%) + (UAS × 35%) + (Praktikum × 20%)
```

**Kalkulasi Ahmad Rifai:**
```
Tugas:     82.3 × 20% = 16.46
UTS:       85.0 × 25% = 21.25
UAS:       88.0 × 35% = 30.80
Praktikum: 85.0 × 20% = 17.00
─────────────────────────────
Nilai Akhir:           85.51 ≈ 86 (B)
```

**Kalkulasi Siti Aisyah:**
```
Tugas:     90.0 × 20% = 18.00
UTS:       88.0 × 25% = 22.00
UAS:       92.0 × 35% = 32.20
Praktikum: 90.0 × 20% = 18.00
─────────────────────────────
Nilai Akhir:           90.20 ≈ 90 (A)
```

**Kalkulasi Budi Santoso:**
```
Tugas:     74.3 × 20% = 14.86
UTS:       75.0 × 25% = 18.75
UAS:       78.0 × 35% = 27.30
Praktikum: 80.0 × 20% = 16.00
─────────────────────────────
Nilai Akhir:           76.91 ≈ 77 (B)
```

### **📜 Step 9: Generate Rapor/Transkrip**

**Rapor Ahmad Rifai - Pemrograman Web:**
```
┌────────────┬────────┐
│ Komponen   │  Nilai │
├────────────┼────────┤
│ Tugas      │   82   │
│ UTS        │   85   │
│ UAS        │   88   │
│ Praktikum  │   85   │
├────────────┼────────┤
│ Nilai Akhir│   86   │
│ Predikat   │    B   │
└────────────┴────────┘
```

---

## 💾 **Database Structure**

### **Tabel: submissions**
```sql
id, tugas_id, siswa_id, file_name, submitted_at, is_late, 
nilai, feedback, status, created_at
```

**Contoh Data:**
```
1, 1, 1, "html-css.zip", "2026-06-28 07:30", false, 85, "Layout rapi", "graded"
2, 1, 2, "html-css.zip", "2026-06-28 08:00", false, 90, "Sempurna", "graded"
```

### **Tabel: nilai**
```sql
id, siswa_id, mata_pelajaran_id, kelas_id, jenis, nilai, 
keterangan, semester, tahun_ajaran, created_at
```

**Contoh Data:**
```
1, 1, 1, 1, "tugas", 82.3, "Auto-calc", "Ganjil", "2026/2027"
2, 1, 1, 1, "uts", 85, "UTS Ganjil", "Ganjil", "2026/2027"
3, 1, 1, 1, "uas", 88, "UAS Ganjil", "Ganjil", "2026/2027"
4, 1, 1, 1, "praktikum", 85, "", "Ganjil", "2026/2027"
5, 1, 1, 1, "akhir", 86, "Auto-calc", "Ganjil", "2026/2027"
```

---

## 🎯 **Benefit Opsi 1 (Dual System)**

### **✅ Advantages:**

1. **Tracking Detail**
   - Guru tahu nilai per tugas per siswa
   - Bisa lihat siapa yang terlambat
   - Ada feedback personal per tugas

2. **Fleksibel**
   - Nilai tugas auto-calculated dari submissions
   - Nilai UTS/UAS input manual
   - Bisa adjust bobot per komponen

3. **Transparency**
   - Siswa tahu nilai detail per tugas
   - Siswa bisa lihat feedback guru
   - Clear breakdown nilai akhir

4. **Audit Trail**
   - Semua nilai tercatat
   - Ada history file submission
   - Ada timestamp kapan dinilai

5. **Scalable**
   - Mudah tambah jenis nilai baru
   - Bisa custom formula per mata pelajaran
   - Support multiple semester

### **📊 Comparison:**

| Feature | Tugas Submissions | Input Nilai |
|---------|------------------|-------------|
| Focus | 1 tugas spesifik | Semua siswa 1 kelas |
| File | Ada (submission) | Tidak ada |
| Feedback | Personal, detail | Keterangan umum |
| Input Type | Per siswa | Bulk (semua siswa) |
| Auto Calculate | Per tugas | Nilai Akhir |
| Use For | Tugas harian | UTS/UAS/Rapor |

---

## 🚀 **Implementation Checklist**

### **Frontend:**
- ✅ TugasSubmissions.jsx - Beri nilai per tugas
- ✅ Nilai.jsx - Input nilai komprehensif
- ⏳ Integration dengan API backend
- ⏳ Auto-calculate display nilai tugas
- ⏳ Auto-calculate display nilai akhir

### **Backend:**
- ⏳ API: Grade submission (POST /submissions/:id/grade)
- ⏳ API: Bulk input nilai (POST /guru/nilai)
- ⏳ Auto-calculate nilai tugas (dari submissions)
- ⏳ Auto-calculate nilai akhir (dari semua komponen)
- ⏳ Configure formula per mata pelajaran

### **Siswa View:**
- ⏳ Lihat nilai per tugas + feedback
- ⏳ Lihat breakdown nilai (Tugas/UTS/UAS)
- ⏳ Lihat nilai akhir + predikat
- ⏳ Download transkrip/rapor

---

## 📝 **Summary**

**Opsi 1 = Best Practice untuk LMS!** ✅

### **2 Halaman dengan Fungsi Berbeda:**

1. **Tugas Submissions** → Nilai detail per tugas (dengan file & feedback)
2. **Input Nilai** → Nilai formal untuk rapor (UTS/UAS/Praktikum)

### **Flow:**
```
Tugas Submit → Guru Nilai → Auto-calc Nilai Tugas
                    ↓
              Input UTS/UAS
                    ↓
            Auto-calc Nilai Akhir
                    ↓
                 Rapor
```

**Sistem nilai lengkap, fleksibel, dan transparan!** 🎉

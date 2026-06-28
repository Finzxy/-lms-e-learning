# ✅ Sistem Authorization Guru - SELESAI!

## 📅 Tanggal: 28 Juni 2026

---

## 🎉 **Summary: Semua Halaman Guru Sudah Di-Update!**

Semua halaman guru (Materi, Tugas, Nilai, Absensi) sekarang menggunakan **sistem authorization berbasis jadwal mengajar**.

---

## 📊 **Konsep Authorization**

```
┌─────────────────────────────────────────────────────┐
│ ADMIN: Buat Jadwal Mengajar                        │
│ ├─ Guru: Pak Budi                                  │
│ ├─ Mata Pelajaran: Pemrograman Web                 │
│ ├─ Kelas: XII RPL 1                                │
│ └─ Hari: Senin 07:00 - 08:30                       │
└─────────────────────────────────────────────────────┘
                       ↓
         Data Jadwal = Sumber Izin
                       ↓
┌─────────────────────────────────────────────────────┐
│ GURU (Pak Budi): Hanya Bisa Akses                  │
│ ✅ Pemrograman Web + XII RPL 1                     │
│ ❌ Matematika (bukan mapel yang diajar)            │
│ ❌ X TKJ 1 (bukan kelas yang diajar)               │
└─────────────────────────────────────────────────────┘
```

---

## ✅ **1. HALAMAN MATERI**

### **Fitur yang Ditambahkan:**

#### **A. Dropdown Filter di Action Bar**
```jsx
<select>Semua Mata Pelajaran</select>  // Hanya mapel yang diajar
<select>Semua Kelas</select>           // Hanya kelas yang diajar
<Button>Upload Materi</Button>
```

#### **B. Dropdown di Form Modal**
```jsx
<Input label="Judul Materi" />
<Textarea label="Deskripsi" />
<Select label="Mata Pelajaran" />  // Hanya mapel yang diajar ⭐
<Select label="Kelas" />            // Hanya kelas yang diajar ⭐
<FileUpload label="File Materi" />
```

### **Contoh Use Case:**
**Pak Budi mengajar:**
- Pemrograman Web → XII RPL 1, XII RPL 2
- Database → XI RPL 1

**Dropdown Pak Budi muncul:**
- Mata Pelajaran: Pemrograman Web, Database
- Kelas: XII RPL 1, XII RPL 2, XI RPL 1

**Pak Budi bisa upload materi:**
- ✅ PWEB untuk XII RPL 1
- ✅ PWEB untuk XII RPL 2
- ✅ Database untuk XI RPL 1
- ❌ Matematika (tidak muncul di dropdown)
- ❌ PWEB untuk X TKJ 1 (tidak muncul di dropdown)

---

## ✅ **2. HALAMAN TUGAS**

### **Fitur yang Ditambahkan:**

#### **A. Dropdown Filter di Action Bar**
```jsx
<Input icon={Search} />
<select>Semua Mata Pelajaran</select>  // Hanya mapel yang diajar
<select>Semua Kelas</select>           // Hanya kelas yang diajar
<select>Semua Status</select>          // Aktif/Ditutup
<Button>Buat Tugas</Button>
```

#### **B. Dropdown di Form Modal**
```jsx
<Input label="Judul Tugas" />
<Textarea label="Deskripsi" />
<Select label="Mata Pelajaran" />   // Hanya mapel yang diajar ⭐
<Select label="Kelas" />             // Hanya kelas yang diajar ⭐
<Input type="datetime-local" label="Deadline" />
<Input type="number" label="Nilai Maksimal" />
<FileUpload label="File Lampiran" />
```

### **Contoh Use Case:**
**Pak Budi bisa buat tugas:**
- ✅ "Project CRUD" untuk PWEB → XII RPL 1
- ✅ "Project CRUD" untuk PWEB → XII RPL 2
- ✅ "Normalisasi Database" untuk Database → XI RPL 1
- ❌ Tugas Matematika (tidak muncul di dropdown)

---

## ✅ **3. HALAMAN NILAI**

### **Fitur yang Ditambahkan:**

#### **Dropdown Filter**
```jsx
<select>Pilih Kelas</select>             // Hanya kelas yang diajar ⭐
<select>Pilih Mata Pelajaran</select>    // Hanya mapel yang diajar ⭐
<select>Pilih Jenis Nilai</select>       // Tugas/UTS/UAS
```

Setelah pilih filter, muncul **tabel input nilai** untuk semua siswa di kelas tersebut.

### **Contoh Use Case:**
**Pak Budi input nilai UTS:**
1. Pilih Kelas: **XII RPL 1** (dari dropdown yang hanya muncul kelas yang diajar)
2. Pilih Mata Pelajaran: **Pemrograman Web** (dari dropdown yang hanya muncul mapel yang diajar)
3. Pilih Jenis: **UTS**
4. Muncul tabel 30 siswa XII RPL 1
5. Input nilai untuk setiap siswa (0-100)
6. Klik "Simpan Semua"

**Pak Budi TIDAK bisa:**
- ❌ Input nilai untuk X TKJ 1 (tidak muncul di dropdown)
- ❌ Input nilai Matematika (tidak muncul di dropdown)

---

## ✅ **4. HALAMAN ABSENSI**

### **Fitur yang Ditambahkan:**

#### **Dropdown Filter**
```jsx
<select>Pilih Kelas</select>             // Hanya kelas yang diajar ⭐
<select>Pilih Mata Pelajaran</select>    // Hanya mapel yang diajar ⭐
<Input type="date" label="Tanggal" />    // Default: hari ini
```

Setelah pilih filter, muncul **tabel absensi** dengan button H/S/I/A untuk setiap siswa.

### **Contoh Use Case:**
**Pak Budi catat absensi hari ini:**
1. Pilih Kelas: **XII RPL 1** (dari dropdown yang hanya muncul kelas yang diajar)
2. Pilih Mata Pelajaran: **Pemrograman Web** (dari dropdown yang hanya muncul mapel yang diajar)
3. Tanggal: **28 Juni 2026** (otomatis hari ini)
4. Muncul tabel 30 siswa XII RPL 1
5. Klik button status untuk setiap siswa:
   - **H** = Hadir ✅
   - **S** = Sakit 🏥
   - **I** = Izin 📝
   - **A** = Alpha ❌
6. Klik "Simpan Absensi"

**Summary otomatis muncul:**
- Hadir: 28
- Sakit: 1
- Izin: 1
- Alpha: 0

**Pak Budi TIDAK bisa:**
- ❌ Catat absensi untuk X TKJ 1 (tidak muncul di dropdown)
- ❌ Catat absensi Matematika (tidak muncul di dropdown)

---

## 🔄 **Konsistensi di Semua Halaman**

Semua halaman guru (Materi, Tugas, Nilai, Absensi) menggunakan **state & logic yang sama**:

```jsx
// State
const [allowedMapel, setAllowedMapel] = useState([]);
const [allowedKelas, setAllowedKelas] = useState([]);

// Fetch dari API
const loadAllowedData = async () => {
  // TODO: Replace dengan actual API endpoint
  // const response = await api.get('/guru/mapel-kelas');
  
  // Saat ini pakai mock data
  const mockData = {
    mata_pelajaran: [
      { id: 1, nama: 'Pemrograman Web', kode: 'PWEB' },
      { id: 2, nama: 'Database', kode: 'DB' },
    ],
    kelas: [
      { id: 1, nama: 'XII RPL 1' },
      { id: 2, nama: 'XII RPL 2' },
      { id: 3, nama: 'XI RPL 1' },
    ],
  };
  
  setAllowedMapel(mockData.mata_pelajaran);
  setAllowedKelas(mockData.kelas);
};

// Dropdown
<select>
  <option value="">Pilih Mata Pelajaran</option>
  {allowedMapel.map(mapel => (
    <option key={mapel.id} value={mapel.id}>
      {mapel.nama} ({mapel.kode})
    </option>
  ))}
</select>
```

---

## 📋 **Checklist Status**

### **Frontend**
- ✅ Materi.jsx - Dropdown filter + form modal
- ✅ Tugas.jsx - Dropdown filter + form modal
- ✅ Nilai.jsx - Dropdown filter
- ✅ Absensi.jsx - Dropdown filter
- ✅ Mock data untuk testing
- ⏳ Connect ke API backend (setelah backend ready)

### **Backend (To-Do)**
- ⏳ Create API: `GET /api/guru/mapel-kelas`
- ⏳ Middleware: `GuruAuthorization`
- ⏳ Validasi di `MateriController`
- ⏳ Validasi di `TugasController`
- ⏳ Validasi di `NilaiController`
- ⏳ Validasi di `AbsensiController`

---

## 🚀 **Next Steps**

### **1. Backend Development**

#### **A. Create API Endpoint**
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/guru/mapel-kelas', [GuruController::class, 'getMapelKelas']);
});
```

```php
// GuruController.php
public function getMapelKelas() {
    $guru_id = auth()->user()->id;
    $tahun_ajaran = getTahunAjaranAktif(); // Helper function
    
    $data = DB::table('jadwal_mengajar as jm')
        ->where('jm.guru_id', $guru_id)
        ->where('jm.tahun_ajaran', $tahun_ajaran)
        ->join('mata_pelajaran as mp', 'jm.mata_pelajaran_id', '=', 'mp.id')
        ->join('kelas as k', 'jm.kelas_id', '=', 'k.id')
        ->select('mp.id as mp_id', 'mp.nama as mp_nama', 'mp.kode as mp_kode',
                 'k.id as k_id', 'k.nama as k_nama')
        ->get();
    
    // Group by mata_pelajaran dan kelas
    $mata_pelajaran = collect();
    $kelas = collect();
    
    foreach ($data as $row) {
        if (!$mata_pelajaran->contains('id', $row->mp_id)) {
            $mata_pelajaran->push([
                'id' => $row->mp_id,
                'nama' => $row->mp_nama,
                'kode' => $row->mp_kode,
            ]);
        }
        
        if (!$kelas->contains('id', $row->k_id)) {
            $kelas->push([
                'id' => $row->k_id,
                'nama' => $row->k_nama,
            ]);
        }
    }
    
    return response()->json([
        'mata_pelajaran' => $mata_pelajaran->values(),
        'kelas' => $kelas->values(),
    ]);
}
```

#### **B. Create Middleware Authorization**
```php
// app/Http/Middleware/GuruAuthorization.php
public function handle($request, Closure $next) {
    $guru_id = auth()->user()->id;
    $mata_pelajaran_id = $request->input('mata_pelajaran_id') ?? $request->route('mata_pelajaran_id');
    $kelas_id = $request->input('kelas_id') ?? $request->route('kelas_id');
    
    $authorized = DB::table('jadwal_mengajar')
        ->where('guru_id', $guru_id)
        ->where('mata_pelajaran_id', $mata_pelajaran_id)
        ->where('kelas_id', $kelas_id)
        ->where('tahun_ajaran', getTahunAjaranAktif())
        ->exists();
    
    if (!$authorized) {
        return response()->json([
            'message' => 'Anda tidak memiliki izin untuk mengakses mata pelajaran ini di kelas ini'
        ], 403);
    }
    
    return $next($request);
}
```

#### **C. Apply Middleware ke Routes**
```php
// routes/api.php
Route::middleware(['auth:sanctum', 'guru.authorization'])->group(function () {
    Route::post('/guru/materi', [MateriController::class, 'store']);
    Route::post('/guru/tugas', [TugasController::class, 'store']);
    Route::post('/guru/nilai', [NilaiController::class, 'store']);
    Route::post('/guru/absensi', [AbsensiController::class, 'store']);
});
```

### **2. Frontend Integration**

Replace mock data dengan API call:

```jsx
const loadAllowedData = async () => {
  try {
    const response = await api.get('/guru/mapel-kelas');
    setAllowedMapel(response.data.mata_pelajaran);
    setAllowedKelas(response.data.kelas);
  } catch (error) {
    console.error('Error loading allowed data:', error);
    alert('Gagal memuat data mata pelajaran dan kelas');
  }
};
```

### **3. Testing**

#### **Test Scenario 1: Pak Budi**
**Jadwal Mengajar:**
- Pemrograman Web → XII RPL 1, XII RPL 2
- Database → XI RPL 1

**Test:**
1. Login sebagai Pak Budi
2. Buka halaman Materi
3. Cek dropdown hanya muncul:
   - Mata Pelajaran: Pemrograman Web, Database
   - Kelas: XII RPL 1, XII RPL 2, XI RPL 1
4. Upload materi PWEB untuk XII RPL 1 → ✅ Success
5. Coba paksa upload ke X TKJ 1 via API → ❌ 403 Forbidden

#### **Test Scenario 2: Bu Ani**
**Jadwal Mengajar:**
- Bahasa Indonesia → X RPL 1, X RPL 2

**Test:**
1. Login sebagai Bu Ani
2. Buka halaman Tugas
3. Cek dropdown hanya muncul:
   - Mata Pelajaran: Bahasa Indonesia
   - Kelas: X RPL 1, X RPL 2
4. Buat tugas Bahasa Indonesia untuk X RPL 1 → ✅ Success

---

## 🎯 **Manfaat Sistem Ini**

### **1. Security**
- ✅ Guru tidak bisa akses data yang bukan haknya
- ✅ Backend validasi setiap request
- ✅ Frontend UI sudah membatasi pilihan

### **2. User Experience**
- ✅ Dropdown hanya muncul data yang relevan
- ✅ Guru tidak bingung dengan banyak pilihan
- ✅ UI lebih clean dan fokus

### **3. Maintainability**
- ✅ Admin kontrol penuh dari jadwal
- ✅ Perubahan jadwal otomatis update dropdown guru
- ✅ Tidak perlu manage permission manual

### **4. Consistency**
- ✅ Semua halaman guru pakai konsep yang sama
- ✅ Code reusable (loadAllowedData function)
- ✅ Easy to scale ke fitur baru

---

## 📚 **Dokumentasi Terkait**

- [AUTHORIZATION-SYSTEM.md](./AUTHORIZATION-SYSTEM.md) - Konsep lengkap sistem authorization
- [MATERI-UPDATE-LOG.md](./MATERI-UPDATE-LOG.md) - Detail update halaman Materi

---

## ✅ **Conclusion**

**Frontend authorization untuk role Guru sudah SELESAI 100%!** 🎉

Semua halaman (Materi, Tugas, Nilai, Absensi) sudah menggunakan dropdown filter yang hanya menampilkan:
- Mata Pelajaran yang guru ajar
- Kelas yang guru ajar

Tinggal tunggu **backend API** selesai, lalu connect dan **sistem authorization siap digunakan**! 🚀

# 🔐 Sistem Otorisasi & Relasi Guru-Mapel-Kelas

## Konsep Dasar

Sistem E-Learning ini menggunakan **Authorization berbasis Jadwal Mengajar**:
- Admin mengatur jadwal mengajar → menetapkan relasi Guru-MapelKelas
- Guru **HANYA** bisa akses data sesuai jadwal mengajarnya
- Tidak ada akses bebas ke semua mata pelajaran/kelas

---

## 📊 Alur Sistem

### 1. **Admin Mengatur Jadwal** (Sumber Izin)

Admin membuat jadwal di `/admin/jadwal`:

```
┌─────────────────────────────────────────┐
│ JADWAL MENGAJAR                         │
├─────────────────────────────────────────┤
│ Guru           : Pak Budi Santoso       │
│ Mata Pelajaran : Pemrograman Web (PWEB) │
│ Kelas          : XII RPL 1              │
│ Hari           : Senin                  │
│ Jam            : 07:00 - 08:30          │
│ Ruangan        : Lab.1                  │
│ Semester       : Ganjil                 │
└─────────────────────────────────────────┘
```

**Ini adalah sumber data izin!** Setelah jadwal dibuat, sistem otomatis tahu:
- Pak Budi **boleh** mengajar PWEB di XII RPL 1

---

### 2. **Backend: Relasi Database**

#### **Tabel: jadwal_mengajar**
```sql
CREATE TABLE jadwal_mengajar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    guru_id INT NOT NULL,
    mata_pelajaran_id INT NOT NULL,
    kelas_id INT NOT NULL,
    hari ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'),
    jam_mulai TIME,
    jam_selesai TIME,
    ruangan VARCHAR(50),
    semester ENUM('Ganjil','Genap'),
    tahun_ajaran VARCHAR(20),
    
    FOREIGN KEY (guru_id) REFERENCES users(id),
    FOREIGN KEY (mata_pelajaran_id) REFERENCES mata_pelajaran(id),
    FOREIGN KEY (kelas_id) REFERENCES kelas(id)
);
```

#### **Query: Ambil Mapel & Kelas Guru**
```php
// Backend API: GET /api/guru/mapel-kelas
// Mengembalikan daftar mapel & kelas yang boleh diakses guru

SELECT DISTINCT 
    mp.id as mata_pelajaran_id,
    mp.nama as mata_pelajaran_nama,
    mp.kode as mata_pelajaran_kode,
    k.id as kelas_id,
    k.nama as kelas_nama
FROM jadwal_mengajar jm
JOIN mata_pelajaran mp ON jm.mata_pelajaran_id = mp.id
JOIN kelas k ON jm.kelas_id = k.id
WHERE jm.guru_id = :guru_id
  AND jm.tahun_ajaran = :tahun_ajaran_aktif
ORDER BY mp.nama, k.nama;
```

**Response Example:**
```json
{
  "data": {
    "mata_pelajaran": [
      { "id": 1, "nama": "Pemrograman Web", "kode": "PWEB" },
      { "id": 2, "nama": "Database", "kode": "DB" }
    ],
    "kelas": [
      { "id": 1, "nama": "XII RPL 1" },
      { "id": 2, "nama": "XII RPL 2" },
      { "id": 3, "nama": "XI RPL 1" }
    ],
    "kombinasi": [
      { "mata_pelajaran_id": 1, "kelas_id": 1 },
      { "mata_pelajaran_id": 1, "kelas_id": 2 },
      { "mata_pelajaran_id": 2, "kelas_id": 3 }
    ]
  }
}
```

---

### 3. **Frontend: Dropdown Filter Guru**

#### **Halaman Materi**
```jsx
// /guru/materi
const Materi = () => {
  const [allowedMapel, setAllowedMapel] = useState([]);
  const [allowedKelas, setAllowedKelas] = useState([]);
  
  useEffect(() => {
    // Fetch HANYA mapel & kelas yang diizinkan
    const fetchAllowedData = async () => {
      const response = await api.get('/guru/mapel-kelas');
      setAllowedMapel(response.data.mata_pelajaran);
      setAllowedKelas(response.data.kelas);
    };
    fetchAllowedData();
  }, []);

  return (
    <div>
      {/* Dropdown Mata Pelajaran */}
      <select>
        <option value="">Pilih Mata Pelajaran</option>
        {allowedMapel.map(mapel => (
          <option key={mapel.id} value={mapel.id}>
            {mapel.nama}
          </option>
        ))}
      </select>

      {/* Dropdown Kelas */}
      <select>
        <option value="">Pilih Kelas</option>
        {allowedKelas.map(kelas => (
          <option key={kelas.id} value={kelas.id}>
            {kelas.nama}
          </option>
        ))}
      </select>
    </div>
  );
};
```

#### **Halaman Tugas, Nilai, Absensi**
Menggunakan **logic yang sama** untuk dropdown filter.

---

### 4. **Backend: Validasi Authorization**

Setiap kali Guru melakukan aksi (upload materi, buat tugas, input nilai), backend harus **cek izin**:

#### **Middleware: GuruAuthorization**
```php
// Check apakah guru berhak mengakses mata_pelajaran + kelas ini
function checkGuruAuthorization($guru_id, $mata_pelajaran_id, $kelas_id) {
    $jadwal = DB::table('jadwal_mengajar')
        ->where('guru_id', $guru_id)
        ->where('mata_pelajaran_id', $mata_pelajaran_id)
        ->where('kelas_id', $kelas_id)
        ->where('tahun_ajaran', getTahunAjaranAktif())
        ->exists();
    
    if (!$jadwal) {
        throw new UnauthorizedException(
            'Anda tidak memiliki izin untuk mengakses mata pelajaran ini di kelas ini'
        );
    }
    
    return true;
}
```

#### **Contoh Penggunaan di API**

**Upload Materi:**
```php
// POST /api/guru/materi
public function store(Request $request) {
    $guru_id = auth()->user()->id;
    
    // Validasi izin
    checkGuruAuthorization(
        $guru_id,
        $request->mata_pelajaran_id,
        $request->kelas_id
    );
    
    // Jika lolos, lanjut create materi
    Materi::create([
        'guru_id' => $guru_id,
        'mata_pelajaran_id' => $request->mata_pelajaran_id,
        'kelas_id' => $request->kelas_id,
        'judul' => $request->judul,
        // ...
    ]);
}
```

**Buat Tugas:**
```php
// POST /api/guru/tugas
public function store(Request $request) {
    $guru_id = auth()->user()->id;
    
    checkGuruAuthorization(
        $guru_id,
        $request->mata_pelajaran_id,
        $request->kelas_id
    );
    
    Tugas::create([...]);
}
```

**Input Nilai:**
```php
// POST /api/guru/nilai
public function store(Request $request) {
    $guru_id = auth()->user()->id;
    
    checkGuruAuthorization(
        $guru_id,
        $request->mata_pelajaran_id,
        $request->kelas_id
    );
    
    Nilai::create([...]);
}
```

**Absensi:**
```php
// POST /api/guru/absensi
public function store(Request $request) {
    $guru_id = auth()->user()->id;
    
    checkGuruAuthorization(
        $guru_id,
        $request->mata_pelajaran_id,
        $request->kelas_id
    );
    
    Absensi::create([...]);
}
```

---

## 🎯 Contoh Skenario

### **Pak Budi (Guru)**

**Jadwal Mengajar Pak Budi:**
- Pemrograman Web → XII RPL 1, XII RPL 2
- Database → XI RPL 1

#### ✅ **Yang BISA dilakukan Pak Budi:**

**Di halaman Materi:**
- Upload materi PWEB untuk XII RPL 1 ✅
- Upload materi PWEB untuk XII RPL 2 ✅
- Upload materi Database untuk XI RPL 1 ✅

**Di halaman Tugas:**
- Buat tugas PWEB untuk XII RPL 1 ✅
- Buat tugas Database untuk XI RPL 1 ✅

**Di halaman Nilai:**
- Input nilai PWEB untuk siswa di XII RPL 1 ✅
- Input nilai Database untuk siswa di XI RPL 1 ✅

#### ❌ **Yang TIDAK BISA dilakukan Pak Budi:**

- Upload materi Matematika (bukan mapel yang diajar) ❌
- Upload materi PWEB untuk X TKJ 1 (bukan kelas yang diajar) ❌
- Input nilai Bahasa Inggris ❌
- Absensi kelas XI RPL 2 untuk PWEB ❌

**Jika dicoba paksa via API:**
```json
{
  "error": "Unauthorized",
  "message": "Anda tidak memiliki izin untuk mengakses mata pelajaran ini di kelas ini"
}
```

---

## 🔧 Implementasi Step-by-Step

### **Phase 1: Backend Setup**

1. ✅ **Tabel jadwal_mengajar sudah ada** (dari fitur Jadwal Admin)
2. Create API endpoint: `GET /api/guru/mapel-kelas`
3. Create middleware: `GuruAuthorization`
4. Tambahkan validasi di semua endpoint Guru:
   - `/api/guru/materi/*`
   - `/api/guru/tugas/*`
   - `/api/guru/nilai/*`
   - `/api/guru/absensi/*`

### **Phase 2: Frontend Update**

1. Create service: `guruAuthService.js`
   ```js
   // Fetch allowed mapel & kelas
   export const getAllowedMapelKelas = async () => {
     const response = await api.get('/guru/mapel-kelas');
     return response.data;
   };
   ```

2. Update halaman Guru:
   - ✅ `/guru/materi` - sudah ada, perlu update dropdown
   - `/guru/tugas` - update dropdown
   - `/guru/nilai` - update dropdown
   - `/guru/absensi` - update dropdown

3. Ganti hard-coded dropdown dengan data dari API

### **Phase 3: Testing**

1. **Test Authorization:**
   - Login sebagai Pak Budi
   - Cek dropdown hanya muncul mapel/kelas yang sesuai jadwal
   - Coba upload materi ke kelas yang tidak diajar (harus error)

2. **Test dari Admin:**
   - Admin ubah jadwal Pak Budi
   - Logout-login Pak Budi
   - Dropdown harus update otomatis

---

## 📋 Checklist Implementasi

### **Backend (Laravel)**
- [ ] API: `GET /api/guru/mapel-kelas` - Get allowed mapel & kelas
- [ ] Middleware: `GuruAuthorization` 
- [ ] Validasi di `MateriController`
- [ ] Validasi di `TugasController`
- [ ] Validasi di `NilaiController`
- [ ] Validasi di `AbsensiController`

### **Frontend (React)**
- [ ] Service: `guruAuthService.js`
- [ ] Update `Materi.jsx` - Dynamic dropdown
- [ ] Create `Tugas.jsx` - Dynamic dropdown
- [ ] Create `Nilai.jsx` - Dynamic dropdown
- [ ] Create `Absensi.jsx` - Dynamic dropdown
- [ ] Error handling untuk unauthorized

### **Testing**
- [ ] Test dropdown hanya muncul data yang sesuai jadwal
- [ ] Test API validation (coba akses tidak diizinkan)
- [ ] Test perubahan jadwal oleh Admin
- [ ] Test multiple guru dengan jadwal berbeda

---

## 🎓 Manfaat Sistem Ini

1. ✅ **Security**: Guru tidak bisa akses data yang bukan haknya
2. ✅ **Simplicity**: UI guru jadi lebih simpel (tidak bingung banyak pilihan)
3. ✅ **Maintainability**: Admin kontrol penuh dari jadwal
4. ✅ **Scalability**: Mudah tambah guru/mapel/kelas baru
5. ✅ **Audit Trail**: Semua aksi guru tercatat dengan relasi jadwal

---

## 🚀 Next Steps

1. **Implementasi Backend Authorization** terlebih dahulu
2. **Test API** dengan Postman/Thunder Client
3. **Update Frontend** setelah API siap
4. **Create halaman Tugas, Nilai, Absensi** dengan authorization yang sama

Apakah perlu saya buatkan:
1. Backend API controller & middleware?
2. Frontend service untuk fetch allowed data?
3. Update halaman Materi dengan dropdown dynamic?

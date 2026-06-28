# 🔄 Update Log: Halaman Materi Guru

## Tanggal Update
28 Juni 2026

## Perubahan yang Dilakukan

### ✅ 1. **Tambah State untuk Authorization**
```jsx
// Allowed data from jadwal (authorization)
const [allowedMapel, setAllowedMapel] = useState([]);
const [allowedKelas, setAllowedKelas] = useState([]);
```

### ✅ 2. **Fetch Data Mata Pelajaran & Kelas yang Diizinkan**
```jsx
const loadAllowedData = async () => {
  // TODO: Replace with actual API endpoint
  // const response = await api.get('/guru/mapel-kelas');
  
  // Mock data - will be replaced with API call
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
```

**Note:** Saat ini menggunakan mock data. Nanti akan diganti dengan API call ke backend.

### ✅ 3. **Dropdown Filter di Action Bar**

**Sebelum:**
```jsx
<div className="flex gap-2">
  <Button variant="secondary" icon={Filter}>Reset Filter</Button>
  <Button icon={Plus}>Upload Materi</Button>
</div>
```

**Sesudah:**
```jsx
<div className="flex gap-2">
  {/* Dropdown Mata Pelajaran */}
  <select value={filterMapel} onChange={(e) => setFilterMapel(e.target.value)}>
    <option value="">Semua Mata Pelajaran</option>
    {allowedMapel.map((mapel) => (
      <option key={mapel.id} value={mapel.id}>{mapel.nama}</option>
    ))}
  </select>

  {/* Dropdown Kelas */}
  <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)}>
    <option value="">Semua Kelas</option>
    {allowedKelas.map((kelas) => (
      <option key={kelas.id} value={kelas.id}>{kelas.nama}</option>
    ))}
  </select>

  <Button icon={Plus}>Upload Materi</Button>
</div>
```

### ✅ 4. **Dropdown di Form Modal**

**Ditambahkan:**
```jsx
{/* Mata Pelajaran */}
<div>
  <label>Mata Pelajaran <span className="text-red-500">*</span></label>
  <select name="mata_pelajaran_id" value={formData.mata_pelajaran_id} required>
    <option value="">Pilih Mata Pelajaran</option>
    {allowedMapel.map((mapel) => (
      <option key={mapel.id} value={mapel.id}>
        {mapel.nama} ({mapel.kode})
      </option>
    ))}
  </select>
</div>

{/* Kelas */}
<div>
  <label>Kelas <span className="text-red-500">*</span></label>
  <select name="kelas_id" value={formData.kelas_id} required>
    <option value="">Pilih Kelas</option>
    {allowedKelas.map((kelas) => (
      <option key={kelas.id} value={kelas.id}>
        {kelas.nama}
      </option>
    ))}
  </select>
</div>
```

---

## 🎯 Manfaat Perubahan

### **1. Authorization Berbasis Jadwal**
- ✅ Guru hanya melihat mata pelajaran & kelas yang mereka ajar
- ✅ Tidak bisa upload materi ke kelas yang bukan tanggung jawabnya
- ✅ UI lebih clean (tidak ada pilihan yang tidak relevan)

### **2. User Experience Lebih Baik**
- ✅ Dropdown lebih intuitif daripada tombol "Reset Filter"
- ✅ Filter langsung terlihat di action bar
- ✅ Guru tidak bingung memilih dari banyak pilihan

### **3. Konsisten dengan Konsep Sistem**
- ✅ Admin mengatur jadwal → Guru dapat izin akses
- ✅ Semua halaman guru (Materi, Tugas, Nilai, Absensi) akan pakai konsep yang sama

---

## 📋 Next Steps

### **Backend (Priority)**
1. **Create API endpoint:** `GET /api/guru/mapel-kelas`
   ```php
   public function getMapelKelas() {
       $guru_id = auth()->user()->id;
       
       $data = DB::table('jadwal_mengajar')
           ->where('guru_id', $guru_id)
           ->join('mata_pelajaran', 'jadwal_mengajar.mata_pelajaran_id', '=', 'mata_pelajaran.id')
           ->join('kelas', 'jadwal_mengajar.kelas_id', '=', 'kelas.id')
           ->select('mata_pelajaran.*', 'kelas.*')
           ->distinct()
           ->get();
       
       return response()->json([
           'mata_pelajaran' => [...],
           'kelas' => [...]
       ]);
   }
   ```

2. **Update API untuk validasi authorization**
   - POST /api/guru/materi → Cek apakah guru berhak upload ke mapel+kelas ini
   - PUT /api/guru/materi/:id → Cek izin
   - DELETE /api/guru/materi/:id → Cek izin

### **Frontend**
1. **Replace mock data dengan API call:**
   ```jsx
   const loadAllowedData = async () => {
     const response = await api.get('/guru/mapel-kelas');
     setAllowedMapel(response.data.mata_pelajaran);
     setAllowedKelas(response.data.kelas);
   };
   ```

2. **Error handling untuk unauthorized:**
   ```jsx
   try {
     await materiService.createMateri(data);
   } catch (error) {
     if (error.response?.status === 403) {
       alert('Anda tidak memiliki izin untuk mengakses mata pelajaran/kelas ini');
     }
   }
   ```

### **Create Halaman Lain dengan Konsep yang Sama**
- [ ] `/guru/tugas` - Buat & kelola tugas
- [ ] `/guru/nilai` - Input nilai siswa
- [ ] `/guru/absensi` - Catat kehadiran siswa

Semua halaman akan menggunakan dropdown filter yang sama seperti Materi.

---

## 🧪 Testing Checklist

### **Manual Testing**
- [ ] Login sebagai Guru (Pak Budi)
- [ ] Buka halaman Materi
- [ ] Cek dropdown filter hanya muncul:
  - Pemrograman Web, Database (bukan Matematika, Bahasa Inggris)
  - XII RPL 1, XII RPL 2, XI RPL 1 (bukan X TKJ 1, dll)
- [ ] Klik "Upload Materi"
- [ ] Cek dropdown form juga hanya muncul mapel & kelas yang sama
- [ ] Coba upload materi
- [ ] Coba edit materi
- [ ] Coba hapus materi

### **API Testing (Nanti setelah backend ready)**
- [ ] Test endpoint `/guru/mapel-kelas` return data yang benar
- [ ] Test upload materi dengan mapel/kelas yang diizinkan → Success
- [ ] Test upload materi dengan mapel/kelas yang TIDAK diizinkan → 403 Forbidden
- [ ] Test dengan guru lain (berbeda jadwal) → Data berbeda

---

## 📝 Notes

1. **Mock Data:** Saat ini masih menggunakan mock data. Setelah backend API siap, tinggal uncomment baris API call dan hapus mock data.

2. **Consistent Styling:** Dropdown menggunakan style yang sama dengan halaman Admin (Jadwal, Jurusan) untuk konsistensi UI.

3. **Validation:** Form sudah ada required validation. Backend juga harus ada validation tambahan untuk authorization.

4. **Scalability:** Konsep ini mudah di-scale ke halaman guru lainnya (Tugas, Nilai, Absensi).

---

## ✅ Summary

**Yang sudah dilakukan:**
- ✅ Tambah dropdown filter Mata Pelajaran & Kelas di Action Bar
- ✅ Tambah dropdown Mata Pelajaran & Kelas di Form Modal
- ✅ Fetch data dari state (siap untuk API integration)
- ✅ UI konsisten dengan halaman Admin

**Yang masih perlu:**
- ⏳ Backend API `/guru/mapel-kelas`
- ⏳ Backend validation untuk authorization
- ⏳ Replace mock data dengan API call
- ⏳ Create halaman Tugas, Nilai, Absensi dengan konsep yang sama

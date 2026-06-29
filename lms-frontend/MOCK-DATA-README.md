# Mock Data System - LMS Frontend

## Arsitektur Mock Data Terpusat

Sistem mock data ini dirancang untuk mensimulasikan backend API dengan aturan bisnis yang realistis, khususnya **Role-Based Access Control (RBAC)** dan **Teaching Assignment Validation** untuk guru.

---

## File Structure

```
src/
├── mocks/
│   └── academicMock.js          # ⭐ Sumber data terpusat
├── services/
│   ├── authService.js           # Authentication dengan mock users
│   ├── masterDataService.js     # Service untuk mata pelajaran, kelas, jadwal
│   ├── materiService.js         # CRUD materi dengan validasi
│   ├── tugasService.js          # CRUD tugas dengan validasi
│   ├── nilaiService.js          # Input/view nilai dengan validasi
│   └── absensiService.js        # Input/view absensi dengan validasi
```

---

## Core Concepts

### 1. Teaching Assignments (Jadwal Mengajar)

Ini adalah **SUMBER KEBENARAN** untuk authorization guru.

```javascript
// Contoh teaching assignment Pak Budi
{
  id: 1,
  guru_id: 2,              // Budi Santoso
  mata_pelajaran_id: 1,    // Pemrograman Web
  kelas_id: 1,             // XII RPL 1
  hari: 'Senin',
  jam_mulai: '07:00',
  jam_selesai: '09:00'
}
```

**Aturan:**
- Guru HANYA bisa mengajar di kombinasi `guru_id + mata_pelajaran_id + kelas_id` yang ada di teaching assignments
- Validasi dilakukan di level service saat create/update materi/tugas/nilai/absensi

### 2. Role-Based Data Filtering

#### Admin
```javascript
// Admin melihat SEMUA data
const filtered = allData;
```

#### Guru
```javascript
// Guru hanya melihat data yang dia buat/ajar
const filtered = allData.filter(item => item.guru_id === currentUser.id);
```

#### Siswa
```javascript
// Siswa hanya melihat data kelasnya
const filtered = allData.filter(item => item.kelas_id === currentUser.kelas_id);

// Atau data miliknya sendiri
const filtered = allData.filter(item => item.siswa_id === currentUser.id);
```

---

## Helper Functions

### `getCurrentUser()`
Mendapatkan user yang sedang login dari localStorage token.

```javascript
const currentUser = getCurrentUser();
// Returns: { id, name, email, role, kelas_id, nis, token }
```

### `validateTeacherAssignment(guruId, mataPelajaranId, kelasId)`
Validasi apakah guru mengajar kombinasi mapel+kelas tertentu.

```javascript
try {
  validateTeacherAssignment(2, 1, 1); // ✅ Valid - Pak Budi mengajar PW di XII RPL 1
  validateTeacherAssignment(2, 3, 2); // ❌ Throw Error 403
} catch (error) {
  console.error(error.message); 
  // "Anda tidak mengajar Algoritma di kelas XII RPL 2"
}
```

### `getAllowedMapelForGuru(guruId)`
Mendapatkan daftar mata pelajaran yang diajar guru.

```javascript
const mapel = getAllowedMapelForGuru(2);
// Returns: [
//   { id: 1, nama: 'Pemrograman Web', kode: 'PW' },
//   { id: 2, nama: 'Basis Data', kode: 'BD' }
// ]
```

### `getAllowedKelasForGuru(guruId, mataPelajaranId)`
Mendapatkan daftar kelas untuk mata pelajaran tertentu.

```javascript
const kelas = getAllowedKelasForGuru(2, 1); // Pak Budi, Pemrograman Web
// Returns: [
//   { id: 1, nama: 'XII RPL 1', tingkat: 12, ... }
// ]
```

### `getStudentClassData(siswaId)`
Mendapatkan data kelas siswa.

```javascript
const kelasData = getStudentClassData(4); // Ahmad Fauzi
// Returns: { id: 1, nama: 'XII RPL 1', tingkat: 12, jurusan_id: 1, ... }
```

---

## Data Relationships

### Materi / Tugas
```javascript
{
  id: 1,
  judul: 'Pengenalan Pemrograman Web',
  guru_id: 2,              // WHO created
  mata_pelajaran_id: 1,    // WHAT subject
  kelas_id: 1,             // FOR WHOM (which class)
  // ... other fields
}
```

### Nilai
```javascript
{
  id: 1,
  siswa_id: 4,             // TO WHOM (which student)
  guru_id: 2,              // BY WHOM (which teacher)
  mata_pelajaran_id: 1,    // WHAT subject
  kelas_id: 1,             // IN WHICH class
  jenis: 'tugas',          // TYPE (tugas/uts/uas)
  nilai: 85,               // SCORE
  // ... other fields
}
```

### Absensi
```javascript
{
  id: 1,
  siswa_id: 4,             // WHO
  guru_id: 2,              // RECORDED BY
  mata_pelajaran_id: 1,    // IN WHICH subject
  kelas_id: 1,             // IN WHICH class
  tanggal: '2024-02-15',   // WHEN
  status: 'hadir',         // STATUS (hadir/sakit/izin/alpha)
  // ... other fields
}
```

---

## Service Pattern

### Read Operations (GET)

```javascript
// Pattern untuk getAllXxx
export const getAllMateri = async (params = {}) => {
  await mockDelay(500);
  
  const currentUser = getCurrentUser();
  let filtered = [...mockMateri];
  
  // Filter by role
  if (currentUser) {
    if (currentUser.role === 'guru') {
      filtered = filtered.filter(m => m.guru_id === currentUser.id);
    } else if (currentUser.role === 'siswa') {
      filtered = filtered.filter(m => m.kelas_id === currentUser.kelas_id);
    }
    // Admin sees all
  }
  
  // Apply additional filters (search, mata_pelajaran_id, kelas_id, etc)
  // ...
  
  // Enrich with related data
  const enriched = filtered.map(enrichMateri);
  
  return { data: enriched, total: enriched.length };
};
```

### Write Operations (POST/PUT)

```javascript
// Pattern untuk createXxx
export const createMateri = async (formData) => {
  await mockDelay(800);
  
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'guru') {
    throw { status: 403, message: 'Hanya guru yang dapat membuat materi' };
  }
  
  const mataPelajaranId = parseInt(formData.get('mata_pelajaran_id'));
  const kelasId = parseInt(formData.get('kelas_id'));
  
  // ⭐ VALIDASI TEACHING ASSIGNMENT
  validateTeacherAssignment(currentUser.id, mataPelajaranId, kelasId);
  
  // Create new record with guru_id, mata_pelajaran_id, kelas_id
  const newMateri = {
    id: mockMateri.length + 1,
    guru_id: currentUser.id,    // ⭐ Set dari current user
    mata_pelajaran_id: mataPelajaranId,
    kelas_id: kelasId,
    // ... other fields
  };
  
  mockMateri.push(newMateri);
  return { data: enrichMateri(newMateri), message: 'Materi berhasil ditambahkan' };
};
```

---

## Usage in Components

### Load Data dengan Filter Otomatis

```javascript
// Guru Component
useEffect(() => {
  const loadData = async () => {
    // Service otomatis filter berdasarkan role
    const response = await materiService.getAllMateri();
    setMateri(response.data); // Guru hanya dapat data miliknya
  };
  loadData();
}, []);
```

### Load Master Data (Mata Pelajaran & Kelas)

```javascript
import masterDataService from '../services/masterDataService';

// Load mata pelajaran (auto-filtered untuk guru)
const mapelResponse = await masterDataService.getAllMataPelajaran();
setMapel(mapelResponse.data); // Guru hanya dapat mapel yang diajar

// Load kelas untuk mata pelajaran tertentu
const kelasResponse = await masterDataService.getAllKelas(mataPelajaranId);
setKelas(kelasResponse.data); // Guru hanya dapat kelas untuk mapel tersebut
```

### Create dengan Validasi Otomatis

```javascript
// Form submit
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('judul', data.judul);
  formData.append('mata_pelajaran_id', data.mata_pelajaran_id);
  formData.append('kelas_id', data.kelas_id);
  // ... other fields
  
  try {
    // Validasi otomatis di service
    await materiService.createMateri(formData);
    alert('Berhasil!');
  } catch (error) {
    // Jika guru coba akses mapel/kelas yang tidak diajar
    // Error: "403 - Anda tidak mengajar mata pelajaran ini di kelas ini"
    alert(error.message);
  }
};
```

---

## Mock Data Contents

### Users
- **1 Admin**: Admin Sekolah
- **3 Guru**: Budi Santoso, Siti Rahayu, Dedi Kurniawan
- **6 Siswa**: Ahmad Fauzi, Dewi Lestari, Budi Setiawan, Siti Aminah, Eko Prasetyo, Rina Kusuma

### Jurusan (3)
- RPL, TKJ, MM

### Kelas (6)
- XII RPL 1, XII RPL 2, XI RPL 1, X TKJ 1, XI TKJ 1, XII MM 1

### Mata Pelajaran (7)
- Pemrograman Web, Basis Data, Algoritma, Jaringan Komputer, Desain Grafis, Matematika, Bahasa Indonesia

### Teaching Assignments (8)
- Budi: PW & BD di XII RPL 1
- Siti: Algoritma & Matematika di XII RPL 2, Matematika di XI RPL 1
- Dedi: Jaringan Komputer di X/XI TKJ 1, Desain Grafis di XII MM 1

### Materi (4)
- 2 materi dari Pak Budi untuk XII RPL 1
- 1 materi dari Bu Siti untuk XII RPL 2
- 1 materi dari Bu Siti untuk XII RPL 2

### Tugas (3)
- 2 tugas dari Pak Budi untuk XII RPL 1
- 1 tugas dari Bu Siti untuk XII RPL 2 (closed)

### Nilai (6)
- Nilai untuk Ahmad Fauzi, Dewi Lestari, Budi Setiawan, Rina Kusuma

### Absensi (7)
- Absensi untuk Ahmad Fauzi, Dewi Lestari, Budi Setiawan, Rina Kusuma

---

## Extending Mock Data

### Menambah Guru Baru

1. Tambah user di `users` array:
```javascript
{
  id: 11,
  name: 'Andi Wijaya',
  email: 'andi@test.local',
  password: 'password',
  role: 'guru',
  token: 'mock-guru-token-xxxxx',
}
```

2. Tambah teaching assignments:
```javascript
{
  id: 9,
  guru_id: 11,
  mata_pelajaran_id: 7,  // Bahasa Indonesia
  kelas_id: 3,           // XI RPL 1
  hari: 'Kamis',
  jam_mulai: '08:00',
  jam_selesai: '10:00'
}
```

3. Guru baru sudah bisa login dan hanya melihat data sesuai teaching assignmentnya!

### Menambah Siswa Baru

```javascript
{
  id: 11,
  name: 'Lia Permata',
  email: 'lia@test.local',
  password: 'password',
  role: 'siswa',
  kelas_id: 1,    // ⭐ PENTING: Set kelas_id
  nis: '12351',
  token: 'mock-siswa-token-xxxxx',
}
```

Siswa otomatis hanya melihat data untuk `kelas_id: 1`.

---

## Migration ke Backend Real

Saat backend sudah siap:

1. **Set `MOCK_MODE = false`** di `authService.js`

2. **Backend harus implementasi:**
   - Teaching assignment validation
   - Role-based filtering di query
   - Return data dengan struktur sama

3. **Frontend tinggal uncomment** bagian API call:
```javascript
// Uncomment ini
const response = await api.get('/materi', { params });
return response.data;

// Comment/hapus bagian mock
// await mockDelay(500);
// const filtered = ...
```

---

## Testing

Lihat file **`MOCK-DATA-TESTING-GUIDE.md`** untuk panduan lengkap testing scenario.

---

## Best Practices

1. ✅ **SELALU gunakan helper functions** untuk validasi
2. ✅ **JANGAN hardcode** guru_id, kelas_id, dll di service
3. ✅ **GUNAKAN getCurrentUser()** untuk mendapatkan data user login
4. ✅ **VALIDASI di service**, bukan hanya di component
5. ✅ **THROW error** dengan status code dan message yang jelas
6. ✅ **ENRICH data** dengan relasi (mata_pelajaran, kelas, guru, siswa objects)

---

## Troubleshooting

### Q: Dropdown mata pelajaran kosong untuk guru?
**A:** Pastikan teaching assignments sudah diset untuk guru tersebut.

### Q: Error "validateTeacherAssignment is not defined"?
**A:** Import dari `../mocks/academicMock.js`

### Q: Siswa melihat data kelas lain?
**A:** Pastikan filter `kelas_id === currentUser.kelas_id` sudah diterapkan di service.

---

**Happy Coding! 🚀**

/**
 * Mock Data Terpusat untuk LMS
 * Sumber data untuk seluruh aplikasi
 */

// ============= ROLES =============
export const roles = ['admin', 'guru', 'siswa'];

// ============= JURUSAN =============
export const jurusan = [
  { id: 1, nama: 'Rekayasa Perangkat Lunak', kode: 'RPL' },
  { id: 2, nama: 'Teknik Komputer dan Jaringan', kode: 'TKJ' },
  { id: 3, nama: 'Multimedia', kode: 'MM' },
];

// ============= KELAS =============
export const kelas = [
  { id: 1, nama: 'XII RPL 1', tingkat: 12, jurusan_id: 1, jurusan: jurusan[0] },
  { id: 2, nama: 'XII RPL 2', tingkat: 12, jurusan_id: 1, jurusan: jurusan[0] },
  { id: 3, nama: 'XI RPL 1', tingkat: 11, jurusan_id: 1, jurusan: jurusan[0] },
  { id: 4, nama: 'X TKJ 1', tingkat: 10, jurusan_id: 2, jurusan: jurusan[1] },
  { id: 5, nama: 'XI TKJ 1', tingkat: 11, jurusan_id: 2, jurusan: jurusan[1] },
  { id: 6, nama: 'XII MM 1', tingkat: 12, jurusan_id: 3, jurusan: jurusan[2] },
];

// ============= MATA PELAJARAN =============
export const mataPelajaran = [
  { id: 1, nama: 'Pemrograman Web', kode: 'PW' },
  { id: 2, nama: 'Basis Data', kode: 'BD' },
  { id: 3, nama: 'Algoritma', kode: 'ALG' },
  { id: 4, nama: 'Jaringan Komputer', kode: 'JK' },
  { id: 5, nama: 'Desain Grafis', kode: 'DG' },
  { id: 6, nama: 'Matematika', kode: 'MAT' },
  { id: 7, nama: 'Bahasa Indonesia', kode: 'BI' },
];

// ============= USERS =============
export const users = [
  {
    id: 1,
    name: 'Admin Sekolah',
    email: 'admin@test.local',
    password: 'password',
    role: 'admin',
    token: 'mock-admin-token-12345',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    email: 'guru@test.local',
    password: 'password',
    role: 'guru',
    token: 'mock-guru-token-67890',
  },
  {
    id: 3,
    name: 'Siti Rahayu',
    email: 'siti@test.local',
    password: 'password',
    role: 'guru',
    token: 'mock-guru-token-11122',
  },
  {
    id: 4,
    name: 'Ahmad Fauzi',
    email: 'siswa@test.local',
    password: 'password',
    role: 'siswa',
    kelas_id: 1,
    nis: '12345',
    token: 'mock-siswa-token-11111',
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    email: 'dewi@test.local',
    password: 'password',
    role: 'siswa',
    kelas_id: 1,
    nis: '12346',
    token: 'mock-siswa-token-22222',
  },
  {
    id: 6,
    name: 'Budi Setiawan',
    email: 'budi.siswa@test.local',
    password: 'password',
    role: 'siswa',
    kelas_id: 1,
    nis: '12347',
    token: 'mock-siswa-token-33333',
  },
  {
    id: 7,
    name: 'Siti Aminah',
    email: 'siti.siswa@test.local',
    password: 'password',
    role: 'siswa',
    kelas_id: 1,
    nis: '12348',
    token: 'mock-siswa-token-44444',
  },
  {
    id: 8,
    name: 'Eko Prasetyo',
    email: 'eko@test.local',
    password: 'password',
    role: 'siswa',
    kelas_id: 1,
    nis: '12349',
    token: 'mock-siswa-token-55555',
  },
  {
    id: 9,
    name: 'Rina Kusuma',
    email: 'rina@test.local',
    password: 'password',
    role: 'siswa',
    kelas_id: 2,
    nis: '12350',
    token: 'mock-siswa-token-66666',
  },
  {
    id: 10,
    name: 'Dedi Kurniawan',
    email: 'dedi@test.local',
    password: 'password',
    role: 'guru',
    token: 'mock-guru-token-33344',
  },
];

// ============= TEACHING ASSIGNMENTS (Jadwal Mengajar) =============
// INI ADALAH SUMBER KEBENARAN UNTUK IZIN GURU
export const teachingAssignments = [
  // Budi Santoso (guru_id: 2)
  { id: 1, guru_id: 2, mata_pelajaran_id: 1, kelas_id: 1, hari: 'Senin', jam_mulai: '07:00', jam_selesai: '09:00' },
  { id: 2, guru_id: 2, mata_pelajaran_id: 2, kelas_id: 1, hari: 'Selasa', jam_mulai: '09:00', jam_selesai: '11:00' },
  
  // Siti Rahayu (guru_id: 3)
  { id: 3, guru_id: 3, mata_pelajaran_id: 3, kelas_id: 2, hari: 'Rabu', jam_mulai: '07:00', jam_selesai: '09:00' },
  { id: 4, guru_id: 3, mata_pelajaran_id: 6, kelas_id: 2, hari: 'Kamis', jam_mulai: '10:00', jam_selesai: '12:00' },
  { id: 5, guru_id: 3, mata_pelajaran_id: 6, kelas_id: 3, hari: 'Jumat', jam_mulai: '07:00', jam_selesai: '09:00' },
  
  // Dedi Kurniawan (guru_id: 10)
  { id: 6, guru_id: 10, mata_pelajaran_id: 4, kelas_id: 4, hari: 'Senin', jam_mulai: '10:00', jam_selesai: '12:00' },
  { id: 7, guru_id: 10, mata_pelajaran_id: 4, kelas_id: 5, hari: 'Selasa', jam_mulai: '13:00', jam_selesai: '15:00' },
  { id: 8, guru_id: 10, mata_pelajaran_id: 5, kelas_id: 6, hari: 'Rabu', jam_mulai: '13:00', jam_selesai: '15:00' },
];

// ============= MATERI =============
export const materi = [
  {
    id: 1,
    judul: 'Pengenalan Pemrograman Web',
    deskripsi: 'Materi dasar tentang HTML, CSS, dan JavaScript',
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    file_name: 'pemrograman-web-intro.pdf',
    file_size: 2048576,
    file_url: '/files/materi/pemrograman-web-intro.pdf',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
  },
  {
    id: 2,
    judul: 'Database MySQL',
    deskripsi: 'Panduan lengkap penggunaan MySQL untuk aplikasi web',
    guru_id: 2,
    mata_pelajaran_id: 2,
    kelas_id: 1,
    file_name: 'mysql-guide.pdf',
    file_size: 3145728,
    file_url: '/files/materi/mysql-guide.pdf',
    created_at: '2024-01-16T10:30:00Z',
    updated_at: '2024-01-16T10:30:00Z',
  },
  {
    id: 3,
    judul: 'Algoritma Sorting',
    deskripsi: 'Penjelasan berbagai algoritma sorting: Bubble, Quick, Merge Sort',
    guru_id: 3,
    mata_pelajaran_id: 3,
    kelas_id: 2,
    file_name: 'sorting-algorithms.pdf',
    file_size: 1572864,
    file_url: '/files/materi/sorting-algorithms.pdf',
    created_at: '2024-01-17T13:00:00Z',
    updated_at: '2024-01-17T13:00:00Z',
  },
  {
    id: 4,
    judul: 'Matematika Diskrit',
    deskripsi: 'Konsep dasar matematika diskrit untuk pemrograman',
    guru_id: 3,
    mata_pelajaran_id: 6,
    kelas_id: 2,
    file_name: 'matematika-diskrit.pdf',
    file_size: 2500000,
    file_url: '/files/materi/matematika-diskrit.pdf',
    created_at: '2024-01-18T08:00:00Z',
    updated_at: '2024-01-18T08:00:00Z',
  },
];

// ============= TUGAS =============
export const tugas = [
  {
    id: 1,
    judul: 'Membuat Website Portfolio',
    deskripsi: 'Buat website portfolio pribadi menggunakan HTML, CSS, dan JavaScript. Website harus responsive dan memiliki minimal 3 halaman: Home, About, Projects.',
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    deadline: '2024-02-15T23:59:00Z',
    max_score: 100,
    file_name: 'tugas-portfolio-brief.pdf',
    file_url: '/files/tugas/portfolio-brief.pdf',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
  },
  {
    id: 2,
    judul: 'Query Database MySQL',
    deskripsi: 'Kerjakan 20 soal query MySQL yang ada di file attachment. Upload file SQL sebagai jawaban.',
    guru_id: 2,
    mata_pelajaran_id: 2,
    kelas_id: 1,
    deadline: '2024-02-20T23:59:00Z',
    max_score: 100,
    file_name: 'mysql-queries.pdf',
    file_url: '/files/tugas/mysql-queries.pdf',
    status: 'active',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 3,
    judul: 'Implementasi Algoritma Sorting',
    deskripsi: 'Implementasikan 3 algoritma sorting (Bubble, Quick, Merge) dalam bahasa pemrograman pilihan Anda. Sertakan analisis kompleksitas waktu.',
    guru_id: 3,
    mata_pelajaran_id: 3,
    kelas_id: 2,
    deadline: '2024-01-10T23:59:00Z',
    max_score: 100,
    file_name: null,
    file_url: null,
    status: 'closed',
    created_at: '2024-01-05T08:00:00Z',
    updated_at: '2024-01-11T08:00:00Z',
  },
];

// ============= SUBMISSIONS (Pengumpulan Tugas) =============
export const submissions = [
  {
    id: 1,
    tugas_id: 1,
    siswa_id: 4,
    file_name: 'ahmad-portfolio.zip',
    file_url: '/files/submissions/ahmad-portfolio.zip',
    catatan: 'Sudah saya kerjakan semua pak, mohon reviewnya',
    nilai: 85,
    feedback: 'Bagus, tapi masih ada bug di halaman projects',
    status: 'graded',
    submitted_at: '2024-02-10T14:30:00Z',
    graded_at: '2024-02-12T10:00:00Z',
  },
  {
    id: 2,
    tugas_id: 1,
    siswa_id: 5,
    file_name: 'dewi-portfolio.zip',
    file_url: '/files/submissions/dewi-portfolio.zip',
    catatan: null,
    nilai: null,
    feedback: null,
    status: 'submitted',
    submitted_at: '2024-02-11T09:15:00Z',
    graded_at: null,
  },
  {
    id: 3,
    tugas_id: 2,
    siswa_id: 4,
    file_name: 'mysql-answers.sql',
    file_url: '/files/submissions/mysql-answers.sql',
    catatan: 'Query nomor 15-20 agak susah pak',
    nilai: 90,
    feedback: 'Excellent! Semua query benar',
    status: 'graded',
    submitted_at: '2024-02-18T20:00:00Z',
    graded_at: '2024-02-19T08:30:00Z',
  },
];

// ============= NILAI =============
export const nilai = [
  {
    id: 1,
    siswa_id: 4,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    jenis: 'tugas',
    nilai: 85,
    keterangan: 'Website Portfolio',
    created_at: '2024-02-12T10:00:00Z',
  },
  {
    id: 2,
    siswa_id: 4,
    guru_id: 2,
    mata_pelajaran_id: 2,
    kelas_id: 1,
    jenis: 'tugas',
    nilai: 90,
    keterangan: 'Query MySQL',
    created_at: '2024-02-19T08:30:00Z',
  },
  {
    id: 3,
    siswa_id: 4,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    jenis: 'uts',
    nilai: 88,
    keterangan: 'UTS Semester 2',
    created_at: '2024-02-20T08:00:00Z',
  },
  {
    id: 4,
    siswa_id: 5,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    jenis: 'tugas',
    nilai: 78,
    keterangan: 'Website Portfolio',
    created_at: '2024-02-13T14:00:00Z',
  },
  {
    id: 5,
    siswa_id: 6,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    jenis: 'tugas',
    nilai: 92,
    keterangan: 'Website Portfolio',
    created_at: '2024-02-13T14:00:00Z',
  },
  {
    id: 6,
    siswa_id: 9,
    guru_id: 3,
    mata_pelajaran_id: 3,
    kelas_id: 2,
    jenis: 'tugas',
    nilai: 95,
    keterangan: 'Algoritma Sorting',
    created_at: '2024-01-11T08:00:00Z',
  },
];

// ============= ABSENSI =============
export const absensi = [
  {
    id: 1,
    siswa_id: 4,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    tanggal: '2024-02-15',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-15T08:00:00Z',
  },
  {
    id: 2,
    siswa_id: 4,
    guru_id: 2,
    mata_pelajaran_id: 2,
    kelas_id: 1,
    tanggal: '2024-02-16',
    status: 'sakit',
    keterangan: 'Demam',
    created_at: '2024-02-16T08:00:00Z',
  },
  {
    id: 3,
    siswa_id: 4,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    tanggal: '2024-02-17',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-17T08:00:00Z',
  },
  {
    id: 4,
    siswa_id: 5,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    tanggal: '2024-02-15',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-15T08:00:00Z',
  },
  {
    id: 5,
    siswa_id: 5,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    tanggal: '2024-02-17',
    status: 'izin',
    keterangan: 'Acara keluarga',
    created_at: '2024-02-17T08:00:00Z',
  },
  {
    id: 6,
    siswa_id: 6,
    guru_id: 2,
    mata_pelajaran_id: 1,
    kelas_id: 1,
    tanggal: '2024-02-15',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-15T08:00:00Z',
  },
  {
    id: 7,
    siswa_id: 9,
    guru_id: 3,
    mata_pelajaran_id: 3,
    kelas_id: 2,
    tanggal: '2024-02-15',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-15T08:00:00Z',
  },
];

// ============= HELPER FUNCTIONS =============

/**
 * Get current logged in user
 */
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  return users.find(u => u.token === token);
};

/**
 * Get teaching assignments for a guru
 */
export const getTeacherAssignments = (guruId) => {
  return teachingAssignments.filter(ta => ta.guru_id === guruId);
};

/**
 * Get unique mata pelajaran that a guru teaches
 */
export const getAllowedMapelForGuru = (guruId) => {
  const assignments = getTeacherAssignments(guruId);
  const mapelIds = [...new Set(assignments.map(a => a.mata_pelajaran_id))];
  return mataPelajaran.filter(m => mapelIds.includes(m.id));
};

/**
 * Get kelas that a guru teaches for a specific mata pelajaran
 */
export const getAllowedKelasForGuru = (guruId, mataPelajaranId) => {
  const assignments = teachingAssignments.filter(
    ta => ta.guru_id === guruId && ta.mata_pelajaran_id === mataPelajaranId
  );
  const kelasIds = assignments.map(a => a.kelas_id);
  return kelas.filter(k => kelasIds.includes(k.id));
};

/**
 * Validate if guru is allowed to teach this combination
 * Throws error if not allowed
 */
export const validateTeacherAssignment = (guruId, mataPelajaranId, kelasId) => {
  const assignment = teachingAssignments.find(
    ta => ta.guru_id === guruId && 
          ta.mata_pelajaran_id === mataPelajaranId && 
          ta.kelas_id === kelasId
  );
  
  if (!assignment) {
    const mapel = mataPelajaran.find(m => m.id === mataPelajaranId);
    const kelasObj = kelas.find(k => k.id === kelasId);
    throw {
      status: 403,
      message: `Anda tidak mengajar ${mapel?.nama || 'mata pelajaran ini'} di kelas ${kelasObj?.nama || 'ini'}`,
    };
  }
  
  return assignment;
};

/**
 * Get student class data
 */
export const getStudentClassData = (siswaId) => {
  const siswa = users.find(u => u.id === siswaId && u.role === 'siswa');
  if (!siswa || !siswa.kelas_id) return null;
  
  const kelasData = kelas.find(k => k.id === siswa.kelas_id);
  return kelasData;
};

/**
 * Get user by email and password (for login)
 */
export const getUserByCredentials = (email, password) => {
  return users.find(u => u.email === email && u.password === password);
};

/**
 * Get user by token
 */
export const getUserByToken = (token) => {
  return users.find(u => u.token === token);
};

/**
 * Enrich data with related objects
 */
export const enrichMataPelajaran = (id) => {
  return mataPelajaran.find(m => m.id === id);
};

export const enrichKelas = (id) => {
  return kelas.find(k => k.id === id);
};

export const enrichGuru = (id) => {
  const guru = users.find(u => u.id === id && u.role === 'guru');
  if (!guru) return null;
  return { id: guru.id, nama: guru.name };
};

export const enrichSiswa = (id) => {
  const siswa = users.find(u => u.id === id && u.role === 'siswa');
  if (!siswa) return null;
  return { id: siswa.id, nama: siswa.name, nis: siswa.nis };
};

/**
 * Mock delay to simulate network request
 */
export const mockDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get siswa by kelas
 */
export const getSiswaByKelas = (kelasId) => {
  return users.filter(u => u.role === 'siswa' && u.kelas_id === kelasId);
};

// ============= DASHBOARD HELPERS =============

/**
 * Get statistics for Admin Dashboard
 */
export const getDashboardAdmin = () => {
  const totalUsers = users.length;
  const totalGuru = users.filter(u => u.role === 'guru').length;
  const totalSiswa = users.filter(u => u.role === 'siswa').length;
  const totalKelas = kelas.length;
  const totalMateri = materi.length;
  const totalTugas = tugas.length;
  const totalSubmissions = submissions.length;

  // Count nilai average
  const allNilai = nilai.map(n => n.nilai);
  const rataRataNilai = allNilai.length > 0
    ? Math.round((allNilai.reduce((a, b) => a + b, 0) / allNilai.length) * 10) / 10
    : 0;

  // Count absensi hadir
  const totalAbsensi = absensi.length;
  const hadirAbsensi = absensi.filter(a => a.status === 'hadir').length;

  // Siswa per jurusan
  const siswaPerJurusan = jurusan.map(j => {
    const kelasJurusan = kelas.filter(k => k.jurusan_id === j.id);
    const kelasIds = kelasJurusan.map(k => k.id);
    const siswaCount = users.filter(u => u.role === 'siswa' && kelasIds.includes(u.kelas_id)).length;
    const percentage = totalSiswa > 0 ? Math.round((siswaCount / totalSiswa) * 100) : 0;
    return { name: j.kode, fullName: j.nama, siswa: siswaCount, percentage };
  });

  // Recent activities (derived from mock data timestamps)
  const recentActivities = [
    {
      user: 'Admin Sekolah',
      action: 'menambahkan guru baru',
      target: 'Dedi Kurniawan',
      time: '1 jam yang lalu',
      type: 'create',
    },
    {
      user: 'Budi Santoso',
      action: 'mengupload materi',
      target: 'Pengenalan Pemrograman Web',
      time: '2 jam yang lalu',
      type: 'upload',
    },
    {
      user: 'Budi Santoso',
      action: 'membuat tugas',
      target: 'Membuat Website Portfolio',
      time: '3 jam yang lalu',
      type: 'create',
    },
    {
      user: 'Siti Rahayu',
      action: 'mengupload materi',
      target: 'Algoritma Sorting',
      time: '5 jam yang lalu',
      type: 'upload',
    },
    {
      user: 'Admin Sekolah',
      action: 'mengatur jadwal mengajar',
      target: 'XII RPL 1',
      time: '1 hari yang lalu',
      type: 'update',
    },
  ];

  return {
    totalUsers,
    totalGuru,
    totalSiswa,
    totalKelas,
    totalMateri,
    totalTugas,
    totalSubmissions,
    rataRataNilai,
    totalAbsensi,
    hadirAbsensi,
    siswaPerJurusan,
    recentActivities,
  };
};

/**
 * Get statistics for Guru Dashboard based on guru login
 * @param {number} guruId
 */
export const getDashboardGuru = (guruId) => {
  const assignments = getTeacherAssignments(guruId);

  // Unique kelas that this guru teaches
  const uniqueKelasIds = [...new Set(assignments.map(a => a.kelas_id))];
  const myKelas = kelas.filter(k => uniqueKelasIds.includes(k.id));

  // My materi
  const myMateri = materi.filter(m => m.guru_id === guruId);

  // My tugas
  const myTugas = tugas.filter(t => t.guru_id === guruId);
  const activeTugas = myTugas.filter(t => t.status === 'active');

  // Pending submissions (submitted, not graded yet)
  const myTugasIds = myTugas.map(t => t.id);
  const pendingSubmissions = submissions.filter(
    s => myTugasIds.includes(s.tugas_id) && s.status === 'submitted'
  );

  // My nilai
  const myNilai = nilai.filter(n => n.guru_id === guruId);

  // Class performance per kelas
  const classPerformance = myKelas.map(k => {
    const siswaList = getSiswaByKelas(k.id);
    const kelasNilai = myNilai.filter(n => n.kelas_id === k.id);
    const avgScore = kelasNilai.length > 0
      ? Math.round((kelasNilai.reduce((sum, n) => sum + n.nilai, 0) / kelasNilai.length) * 10) / 10
      : 0;
    const kelasAbsensi = absensi.filter(a => a.guru_id === guruId && a.kelas_id === k.id);
    const hadirCount = kelasAbsensi.filter(a => a.status === 'hadir').length;
    const attendanceRate = kelasAbsensi.length > 0
      ? Math.round((hadirCount / kelasAbsensi.length) * 100)
      : 0;
    return {
      id: k.id,
      name: k.nama,
      avgScore,
      attendance: attendanceRate,
      students: siswaList.length,
    };
  });

  // Today's schedule based on teaching assignments
  const hariMap = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' };
  const todayHari = hariMap[new Date().getDay()] || 'Senin';
  const todaySchedule = assignments
    .filter(a => a.hari === todayHari)
    .map(a => {
      const mapel = enrichMataPelajaran(a.mata_pelajaran_id);
      const kelasData = enrichKelas(a.kelas_id);
      return {
        time: `${a.jam_mulai} - ${a.jam_selesai}`,
        class: kelasData?.nama || '-',
        subject: mapel?.nama || '-',
        room: 'Lab Komputer',
      };
    });

  // Submission status breakdown
  const allSubmissions = submissions.filter(s => myTugasIds.includes(s.tugas_id));
  const totalSiswaInMyKelas = myKelas.reduce((sum, k) => sum + getSiswaByKelas(k.id).length, 0);
  const gradedSubmissions = allSubmissions.filter(s => s.status === 'graded').length;
  const submittedOnly = allSubmissions.filter(s => s.status === 'submitted').length;

  return {
    totalMateri: myMateri.length,
    totalTugas: myTugas.length,
    activeTugas: activeTugas.length,
    pendingSubmissions: pendingSubmissions.length,
    totalKelas: myKelas.length,
    classPerformance,
    todaySchedule,
    allTodaySchedule: assignments.map(a => {
      const mapel = enrichMataPelajaran(a.mata_pelajaran_id);
      const kelasData = enrichKelas(a.kelas_id);
      return {
        hari: a.hari,
        time: `${a.jam_mulai} - ${a.jam_selesai}`,
        class: kelasData?.nama || '-',
        subject: mapel?.nama || '-',
        room: 'Lab Komputer',
      };
    }),
    submissionStatus: [
      { status: 'Sudah Dinilai', count: gradedSubmissions, percentage: totalSiswaInMyKelas > 0 ? Math.round((gradedSubmissions / totalSiswaInMyKelas) * 100) : 0, color: 'bg-green-500' },
      { status: 'Belum Dinilai', count: submittedOnly, percentage: totalSiswaInMyKelas > 0 ? Math.round((submittedOnly / totalSiswaInMyKelas) * 100) : 0, color: 'bg-yellow-500' },
    ],
  };
};

/**
 * Get statistics for Siswa Dashboard based on siswa login
 * @param {number} siswaId
 */
export const getDashboardSiswa = (siswaId) => {
  const siswa = users.find(u => u.id === siswaId && u.role === 'siswa');
  if (!siswa) return null;

  const { kelas_id } = siswa;

  // Materi available for this class
  const myMateri = materi.filter(m => m.kelas_id === kelas_id);

  // Tugas for this class
  const myTugas = tugas.filter(t => t.kelas_id === kelas_id);
  const activeTugas = myTugas.filter(t => t.status === 'active');

  // Check which tugas have been submitted by this siswa
  const mySubmissions = submissions.filter(s => s.siswa_id === siswaId);
  const submittedTugasIds = mySubmissions.map(s => s.tugas_id);

  // Overdue tugas (active, not submitted, past deadline)
  const now = new Date();
  const overdueTugas = activeTugas.filter(t => {
    const deadline = new Date(t.deadline);
    return deadline < now && !submittedTugasIds.includes(t.id);
  });

  // Nilai for this student
  const myNilai = nilai.filter(n => n.siswa_id === siswaId);
  const nilaiScores = myNilai.map(n => n.nilai);
  const rataRataNilai = nilaiScores.length > 0
    ? Math.round((nilaiScores.reduce((a, b) => a + b, 0) / nilaiScores.length) * 10) / 10
    : 0;

  // Absensi for this student
  const myAbsensi = absensi.filter(a => a.siswa_id === siswaId);

  // Learning progress per mapel (based on nilai)
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
  const nilaiPerMapel = {};
  myNilai.forEach(n => {
    if (!nilaiPerMapel[n.mata_pelajaran_id]) {
      nilaiPerMapel[n.mata_pelajaran_id] = [];
    }
    nilaiPerMapel[n.mata_pelajaran_id].push(n.nilai);
  });

  const learningProgress = Object.entries(nilaiPerMapel).map(([mapelId, scores], idx) => {
    const mapelData = enrichMataPelajaran(parseInt(mapelId));
    const avg = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10;
    return {
      subject: mapelData?.nama || 'Mapel',
      progress: avg,
      score: avg,
      color: colors[idx % colors.length],
    };
  });

  // Upcoming deadlines (active tugas for this class, not yet submitted)
  const upcomingDeadlines = activeTugas
    .filter(t => !submittedTugasIds.includes(t.id))
    .map(t => {
      const mapelData = enrichMataPelajaran(t.mata_pelajaran_id);
      const deadline = new Date(t.deadline);
      const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      return {
        title: t.judul,
        subject: mapelData?.nama || '-',
        deadline: t.deadline.split('T')[0],
        daysLeft,
        urgent: daysLeft <= 3,
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  // Today's schedule: teaching assignments for assignments in this class
  const assignmentsForMyClass = teachingAssignments.filter(a => a.kelas_id === kelas_id);
  const hariMap = { 0: 'Minggu', 1: 'Senin', 2: 'Selasa', 3: 'Rabu', 4: 'Kamis', 5: 'Jumat', 6: 'Sabtu' };
  const todayHari = hariMap[new Date().getDay()] || 'Senin';
  const todaySchedule = assignmentsForMyClass
    .filter(a => a.hari === todayHari)
    .map(a => {
      const mapelData = enrichMataPelajaran(a.mata_pelajaran_id);
      const guruData = enrichGuru(a.guru_id);
      return {
        time: `${a.jam_mulai} - ${a.jam_selesai}`,
        subject: mapelData?.nama || '-',
        teacher: guruData?.nama || '-',
        room: 'Lab Komputer',
        status: 'upcoming',
      };
    });

  return {
    totalMateri: myMateri.length,
    activeTugas: activeTugas.length,
    overdueTugas: overdueTugas.length,
    rataRataNilai,
    totalAbsensi: myAbsensi.length,
    hadirAbsensi: myAbsensi.filter(a => a.status === 'hadir').length,
    learningProgress,
    upcomingDeadlines,
    todaySchedule,
    allSchedule: assignmentsForMyClass.map(a => {
      const mapelData = enrichMataPelajaran(a.mata_pelajaran_id);
      const guruData = enrichGuru(a.guru_id);
      return {
        hari: a.hari,
        time: `${a.jam_mulai} - ${a.jam_selesai}`,
        subject: mapelData?.nama || '-',
        teacher: guruData?.nama || '-',
        room: 'Lab Komputer',
      };
    }),
  };
};

// ============= LAPORAN HELPERS =============

/**
 * Get laporan data for each guru (for Admin Laporan Guru page)
 */
export const getLaporanGuru = () => {
  const guruList = users.filter(u => u.role === 'guru');

  return guruList.map(guru => {
    const assignments = getTeacherAssignments(guru.id);
    const uniqueKelasIds = [...new Set(assignments.map(a => a.kelas_id))];
    const myKelas = kelas.filter(k => uniqueKelasIds.includes(k.id));
    const totalSiswa = myKelas.reduce((sum, k) => sum + getSiswaByKelas(k.id).length, 0);

    const myMateri = materi.filter(m => m.guru_id === guru.id);
    const myTugas = tugas.filter(t => t.guru_id === guru.id);
    const myNilai = nilai.filter(n => n.guru_id === guru.id);
    const myAbsensi = absensi.filter(a => a.guru_id === guru.id);

    const allNilaiScores = myNilai.map(n => n.nilai);
    const avgNilaiSiswa = allNilaiScores.length > 0
      ? Math.round((allNilaiScores.reduce((a, b) => a + b, 0) / allNilaiScores.length) * 10) / 10
      : 0;

    const hadirAbsensi = myAbsensi.filter(a => a.status === 'hadir').length;
    const kehadiranPct = myAbsensi.length > 0
      ? Math.round((hadirAbsensi / myAbsensi.length) * 100)
      : 0;

    // Mapel yang diajar (unique)
    const uniqueMapelIds = [...new Set(assignments.map(a => a.mata_pelajaran_id))];
    const mapelNames = uniqueMapelIds
      .map(id => enrichMataPelajaran(id)?.nama)
      .filter(Boolean)
      .join(', ');

    return {
      id: guru.id,
      nama: guru.name,
      email: guru.email,
      mataPelajaran: mapelNames || '-',
      totalKelas: myKelas.length,
      totalSiswa,
      materiUpload: myMateri.length,
      tugasDibuat: myTugas.length,
      avgNilaiSiswa,
      kehadiranMengajar: kehadiranPct,
      statusAktif: true,
    };
  });
};

/**
 * Get laporan data for each siswa (for Admin Laporan Siswa page)
 */
export const getLaporanSiswa = () => {
  const siswaList = users.filter(u => u.role === 'siswa');

  return siswaList.map((siswa, idx) => {
    const siswaKelas = kelas.find(k => k.id === siswa.kelas_id);
    const siswaJurusan = siswaKelas ? jurusan.find(j => j.id === siswaKelas.jurusan_id) : null;

    const myNilai = nilai.filter(n => n.siswa_id === siswa.id);
    const nilaiScores = myNilai.map(n => n.nilai);
    const avgNilai = nilaiScores.length > 0
      ? Math.round((nilaiScores.reduce((a, b) => a + b, 0) / nilaiScores.length) * 10) / 10
      : 0;

    const myAbsensi = absensi.filter(a => a.siswa_id === siswa.id);
    const hadirCount = myAbsensi.filter(a => a.status === 'hadir').length;
    const kehadiranPct = myAbsensi.length > 0
      ? Math.round((hadirCount / myAbsensi.length) * 100)
      : 0;

    // Tugas for this class
    const myTugas = tugas.filter(t => t.kelas_id === siswa.kelas_id);
    const mySubmissions = submissions.filter(s => s.siswa_id === siswa.id);
    const tugasSelesai = mySubmissions.length;

    return {
      id: siswa.id,
      nis: siswa.nis || `20240${siswa.id}00${idx + 1}`,
      nama: siswa.name,
      email: siswa.email,
      kelas: siswaKelas?.nama || '-',
      kelas_id: siswa.kelas_id,
      jurusan: siswaJurusan?.kode || '-',
      avgNilai,
      kehadiran: kehadiranPct,
      tugasSelesai,
      totalTugas: myTugas.length,
      ranking: idx + 1,
      trend: avgNilai >= 80 ? 'up' : 'down',
    };
  }).sort((a, b) => b.avgNilai - a.avgNilai)
    .map((s, idx) => ({ ...s, ranking: idx + 1 }));
};

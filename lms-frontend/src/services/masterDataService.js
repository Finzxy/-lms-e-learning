/**
 * Service untuk master data (Kelas, Mata Pelajaran, dll)
 */
import {
  jurusan,
  kelas,
  mataPelajaran,
  teachingAssignments,
  getCurrentUser,
  getAllowedMapelForGuru,
  getAllowedKelasForGuru,
  enrichMataPelajaran,
  enrichKelas,
  mockDelay,
} from '../mocks/academicMock';

/**
 * Get all mata pelajaran
 * Jika user = guru, return hanya mapel yang diajar
 */
export const getAllMataPelajaran = async () => {
  await mockDelay(300);
  
  const currentUser = getCurrentUser();
  
  if (currentUser && currentUser.role === 'guru') {
    // Guru hanya melihat mapel yang diajar
    return { data: getAllowedMapelForGuru(currentUser.id) };
  }
  
  // Admin dan Siswa melihat semua
  return { data: mataPelajaran };
};

/**
 * Get all kelas
 * Jika user = guru + mata_pelajaran_id, return hanya kelas untuk mapel tersebut
 * Jika user = siswa, return hanya kelasnya
 */
export const getAllKelas = async (mataPelajaranId = null) => {
  await mockDelay(300);
  
  const currentUser = getCurrentUser();
  
  if (currentUser && currentUser.role === 'guru' && mataPelajaranId) {
    // Guru hanya melihat kelas untuk mapel tertentu
    return { data: getAllowedKelasForGuru(currentUser.id, mataPelajaranId) };
  }
  
  if (currentUser && currentUser.role === 'siswa') {
    // Siswa hanya melihat kelasnya sendiri
    const siswaKelas = kelas.find(k => k.id === currentUser.kelas_id);
    return { data: siswaKelas ? [siswaKelas] : [] };
  }
  
  // Admin melihat semua
  return { data: kelas };
};

/**
 * Get all jurusan
 */
export const getAllJurusan = async () => {
  await mockDelay(300);
  return { data: jurusan };
};

/**
 * Get teaching assignments (jadwal mengajar)
 * Jika user = guru, return hanya jadwal miliknya
 */
export const getTeachingAssignments = async (guruId = null) => {
  await mockDelay(300);
  
  const currentUser = getCurrentUser();
  
  // Jika guru login, hanya bisa melihat jadwalnya sendiri
  if (currentUser && currentUser.role === 'guru') {
    const assignments = teachingAssignments.filter(ta => ta.guru_id === currentUser.id);
    
    // Enrich dengan data lengkap
    const enriched = assignments.map(ta => ({
      ...ta,
      mata_pelajaran: enrichMataPelajaran(ta.mata_pelajaran_id),
      kelas: enrichKelas(ta.kelas_id),
    }));
    
    return { data: enriched };
  }
  
  // Admin bisa filter by guruId atau lihat semua
  let filtered = teachingAssignments;
  if (guruId) {
    filtered = filtered.filter(ta => ta.guru_id === guruId);
  }
  
  const enriched = filtered.map(ta => ({
    ...ta,
    mata_pelajaran: enrichMataPelajaran(ta.mata_pelajaran_id),
    kelas: enrichKelas(ta.kelas_id),
  }));
  
  return { data: enriched };
};

const masterDataService = {
  getAllMataPelajaran,
  getAllKelas,
  getAllJurusan,
  getTeachingAssignments,
};

export default masterDataService;

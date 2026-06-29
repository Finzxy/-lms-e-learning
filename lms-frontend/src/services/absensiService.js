import api from './api';
import {
  absensi as mockAbsensi,
  getCurrentUser,
  validateTeacherAssignment,
  enrichMataPelajaran,
  enrichKelas,
  enrichSiswa,
  getSiswaByKelas,
  mockDelay,
} from '../mocks/academicMock';

/**
 * Get all absensi with filters
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getAllAbsensi = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/absensi', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(500);
    
    const currentUser = getCurrentUser();
    let filtered = [...mockAbsensi];
    
    // Filter by role
    if (currentUser) {
      if (currentUser.role === 'guru') {
        // Guru hanya melihat absensi yang dia input
        filtered = filtered.filter(a => a.guru_id === currentUser.id);
      } else if (currentUser.role === 'siswa') {
        // Siswa hanya melihat absensinya sendiri
        filtered = filtered.filter(a => a.siswa_id === currentUser.id);
      }
      // Admin melihat semua
    }
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(a => a.mata_pelajaran_id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(a => a.kelas_id === parseInt(params.kelas_id));
    }
    if (params.tanggal) {
      filtered = filtered.filter(a => a.tanggal === params.tanggal);
    }
    if (params.bulan) {
      filtered = filtered.filter(a => a.tanggal.startsWith(params.bulan));
    }
    if (params.siswa_id) {
      filtered = filtered.filter(a => a.siswa_id === parseInt(params.siswa_id));
    }
    
    // Enrich data
    const enriched = filtered.map(a => ({
      ...a,
      siswa: enrichSiswa(a.siswa_id),
      mata_pelajaran: enrichMataPelajaran(a.mata_pelajaran_id),
      kelas: enrichKelas(a.kelas_id),
    }));
    
    return { data: enriched };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get absensi by kelas for input (Guru)
 * @param {number} kelasId - Kelas ID
 * @param {number} mataPelajaranId - Mata Pelajaran ID
 * @param {string} tanggal - Tanggal (YYYY-MM-DD)
 * @returns {Promise}
 */
export const getAbsensiByKelas = async (kelasId, mataPelajaranId, tanggal) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/absensi/kelas', {
    //   params: { kelas_id: kelasId, mata_pelajaran_id: mataPelajaranId, tanggal }
    // });
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'guru') {
      // Validate guru mengajar di kelas/mapel ini
      validateTeacherAssignment(currentUser.id, mataPelajaranId, kelasId);
    }
    
    // Get siswa list untuk kelas
    const siswaList = getSiswaByKelas(kelasId);

    // Get existing absensi
    const existingAbsensi = mockAbsensi.filter(a => 
      a.kelas_id === parseInt(kelasId) && 
      a.mata_pelajaran_id === parseInt(mataPelajaranId) &&
      a.tanggal === tanggal
    );

    // Combine siswa list with their absensi
    const result = siswaList.map(siswa => {
      const absensiData = existingAbsensi.find(a => a.siswa_id === siswa.id);
      return {
        siswa_id: siswa.id,
        siswa_nama: siswa.name,
        siswa_nis: siswa.nis,
        status: absensiData?.status || 'hadir',
        keterangan: absensiData?.keterangan || '',
        absensi_id: absensiData?.id || null,
      };
    });
    
    return { data: result };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Bulk input absensi (Guru)
 * @param {Object} data - Bulk absensi data
 * @returns {Promise}
 */
export const bulkInputAbsensi = async (data) => {
  try {
    // In production, uncomment this:
    // const response = await api.post('/absensi/bulk', data);
    // return response.data;

    // Mock response for development
    await mockDelay(800);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'guru') {
      throw { status: 403, message: 'Hanya guru yang dapat input absensi' };
    }
    
    // Validate teaching assignment
    validateTeacherAssignment(currentUser.id, data.mata_pelajaran_id, data.kelas_id);
    
    // Simulate saving data
    data.absensi_list.forEach((item, index) => {
      const newAbsensi = {
        id: mockAbsensi.length + index + 1,
        siswa_id: item.siswa_id,
        guru_id: currentUser.id,
        mata_pelajaran_id: data.mata_pelajaran_id,
        kelas_id: data.kelas_id,
        tanggal: data.tanggal,
        status: item.status,
        keterangan: item.keterangan || '',
        created_at: new Date().toISOString(),
      };
      
      // Check if absensi already exists (update) or new (create)
      const existingIndex = mockAbsensi.findIndex(a => 
        a.siswa_id === item.siswa_id &&
        a.mata_pelajaran_id === data.mata_pelajaran_id &&
        a.tanggal === data.tanggal
      );

      if (existingIndex !== -1) {
        mockAbsensi[existingIndex] = { ...mockAbsensi[existingIndex], ...newAbsensi };
      } else {
        mockAbsensi.push(newAbsensi);
      }
    });
    
    return { message: 'Absensi berhasil disimpan', total: data.absensi_list.length };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get my absensi (Siswa)
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getMyAbsensi = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-absensi', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat absensi mereka' };
    }
    
    // Filter absensi for current user
    let filtered = mockAbsensi.filter(a => a.siswa_id === currentUser.id);
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(a => a.mata_pelajaran_id === parseInt(params.mata_pelajaran_id));
    }
    if (params.bulan) {
      filtered = filtered.filter(a => a.tanggal.startsWith(params.bulan));
    }
    
    // Sort by date descending
    filtered.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    
    // Enrich data
    const enriched = filtered.map(a => ({
      ...a,
      mata_pelajaran: enrichMataPelajaran(a.mata_pelajaran_id),
      kelas: enrichKelas(a.kelas_id),
    }));
    
    return { data: enriched };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get absensi summary (Siswa)
 * Count hadir, sakit, izin, alpha
 * @param {Object} params - Filter parameters (bulan)
 * @returns {Promise}
 */
export const getAbsensiSummary = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-absensi/summary', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(300);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat summary absensi mereka' };
    }
    
    let myAbsensi = mockAbsensi.filter(a => a.siswa_id === currentUser.id);
    
    if (params.bulan) {
      myAbsensi = myAbsensi.filter(a => a.tanggal.startsWith(params.bulan));
    }
    
    const summary = {
      hadir: myAbsensi.filter(a => a.status === 'hadir').length,
      sakit: myAbsensi.filter(a => a.status === 'sakit').length,
      izin: myAbsensi.filter(a => a.status === 'izin').length,
      alpha: myAbsensi.filter(a => a.status === 'alpha').length,
      total: myAbsensi.length,
    };
    
    // Calculate percentage
    const persentase_hadir = summary.total > 0 
      ? Math.round((summary.hadir / summary.total) * 100) 
      : 0;
    
    return {
      data: {
        ...summary,
        persentase_hadir,
      }
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get absensi chart data (Siswa)
 * For visualization per bulan
 * @param {string} tahun - Year (YYYY)
 * @returns {Promise}
 */
export const getAbsensiChart = async (tahun = '2024') => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-absensi/chart', { params: { tahun } });
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat chart absensi mereka' };
    }
    
    const myAbsensi = mockAbsensi.filter(a => 
      a.siswa_id === currentUser.id && a.tanggal.startsWith(tahun)
    );
    
    // Group by month
    const monthlyData = {};
    for (let i = 1; i <= 12; i++) {
      const month = i.toString().padStart(2, '0');
      const monthAbsensi = myAbsensi.filter(a => a.tanggal.startsWith(`${tahun}-${month}`));
      
      monthlyData[month] = {
        bulan: month,
        hadir: monthAbsensi.filter(a => a.status === 'hadir').length,
        sakit: monthAbsensi.filter(a => a.status === 'sakit').length,
        izin: monthAbsensi.filter(a => a.status === 'izin').length,
        alpha: monthAbsensi.filter(a => a.status === 'alpha').length,
      };
    }
    
    return { data: Object.values(monthlyData) };
  } catch (error) {
    throw error.response?.data || error;
  }
};

const absensiService = {
  getAllAbsensi,
  getAbsensiByKelas,
  bulkInputAbsensi,
  getMyAbsensi,
  getAbsensiSummary,
  getAbsensiChart,
};

export default absensiService;

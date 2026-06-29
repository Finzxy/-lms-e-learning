import api from './api';
import {
  nilai as mockNilai,
  getCurrentUser,
  validateTeacherAssignment,
  enrichMataPelajaran,
  enrichKelas,
  enrichSiswa,
  getSiswaByKelas,
  mockDelay,
} from '../mocks/academicMock';

/**
 * Get all nilai with filters
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getAllNilai = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/nilai', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(500);
    
    const currentUser = getCurrentUser();
    let filtered = [...mockNilai];
    
    // Filter by role
    if (currentUser) {
      if (currentUser.role === 'guru') {
        // Guru hanya melihat nilai yang dia input
        filtered = filtered.filter(n => n.guru_id === currentUser.id);
      } else if (currentUser.role === 'siswa') {
        // Siswa hanya melihat nilainya sendiri
        filtered = filtered.filter(n => n.siswa_id === currentUser.id);
      }
      // Admin melihat semua
    }
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(n => n.mata_pelajaran_id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(n => n.kelas_id === parseInt(params.kelas_id));
    }
    if (params.jenis) {
      filtered = filtered.filter(n => n.jenis === params.jenis);
    }
    if (params.siswa_id) {
      filtered = filtered.filter(n => n.siswa_id === parseInt(params.siswa_id));
    }
    
    // Enrich data
    const enriched = filtered.map(n => ({
      ...n,
      siswa: enrichSiswa(n.siswa_id),
      mata_pelajaran: enrichMataPelajaran(n.mata_pelajaran_id),
      kelas: enrichKelas(n.kelas_id),
    }));
    
    return { data: enriched };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get nilai by kelas for bulk input (Guru)
 * @param {number} kelasId - Kelas ID
 * @param {number} mataPelajaranId - Mata Pelajaran ID
 * @param {string} jenis - Jenis nilai (tugas, uts, uas)
 * @returns {Promise}
 */
export const getNilaiByKelas = async (kelasId, mataPelajaranId, jenis) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/nilai/kelas', {
    //   params: { kelas_id: kelasId, mata_pelajaran_id: mataPelajaranId, jenis }
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

    // Get existing nilai for these students
    const existingNilai = mockNilai.filter(n => 
      n.kelas_id === parseInt(kelasId) && 
      n.mata_pelajaran_id === parseInt(mataPelajaranId) &&
      n.jenis === jenis
    );

    // Combine siswa list with their nilai (if exists)
    const result = siswaList.map(siswa => {
      const nilaiData = existingNilai.find(n => n.siswa_id === siswa.id);
      return {
        siswa_id: siswa.id,
        siswa_nama: siswa.name,
        siswa_nis: siswa.nis,
        nilai: nilaiData?.nilai || null,
        keterangan: nilaiData?.keterangan || '',
        nilai_id: nilaiData?.id || null,
      };
    });
    
    return { data: result };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Bulk input nilai (Guru)
 * @param {Object} data - Bulk nilai data
 * @returns {Promise}
 */
export const bulkInputNilai = async (data) => {
  try {
    // In production, uncomment this:
    // const response = await api.post('/nilai/bulk', data);
    // return response.data;

    // Mock response for development
    await mockDelay(800);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'guru') {
      throw { status: 403, message: 'Hanya guru yang dapat input nilai' };
    }
    
    // Validate teaching assignment
    validateTeacherAssignment(currentUser.id, data.mata_pelajaran_id, data.kelas_id);
    
    // Simulate saving data
    data.nilai_list.forEach((item, index) => {
      if (item.nilai !== null && item.nilai !== '') {
        const newNilai = {
          id: mockNilai.length + index + 1,
          siswa_id: item.siswa_id,
          guru_id: currentUser.id,
          mata_pelajaran_id: data.mata_pelajaran_id,
          kelas_id: data.kelas_id,
          jenis: data.jenis,
          nilai: parseInt(item.nilai),
          keterangan: item.keterangan || data.keterangan || '',
          created_at: new Date().toISOString(),
        };
        
        // Check if nilai already exists (update) or new (create)
        const existingIndex = mockNilai.findIndex(n => 
          n.siswa_id === item.siswa_id &&
          n.mata_pelajaran_id === data.mata_pelajaran_id &&
          n.jenis === data.jenis
        );

        if (existingIndex !== -1) {
          mockNilai[existingIndex] = { ...mockNilai[existingIndex], ...newNilai };
        } else {
          mockNilai.push(newNilai);
        }
      }
    });
    
    return { message: 'Nilai berhasil disimpan', total: data.nilai_list.length };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get my nilai (Siswa)
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getMyNilai = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-nilai', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat nilai mereka' };
    }
    
    // Filter nilai for current user
    let filtered = mockNilai.filter(n => n.siswa_id === currentUser.id);
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(n => n.mata_pelajaran_id === parseInt(params.mata_pelajaran_id));
    }
    if (params.jenis) {
      filtered = filtered.filter(n => n.jenis === params.jenis);
    }
    
    // Enrich data
    const enriched = filtered.map(n => ({
      ...n,
      mata_pelajaran: enrichMataPelajaran(n.mata_pelajaran_id),
      kelas: enrichKelas(n.kelas_id),
    }));
    
    return { data: enriched };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get nilai summary (Siswa)
 * Calculate average, highest, lowest scores
 * @returns {Promise}
 */
export const getNilaiSummary = async () => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-nilai/summary');
    // return response.data;

    // Mock response for development
    await mockDelay(300);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat summary nilai mereka' };
    }
    
    const myNilai = mockNilai.filter(n => n.siswa_id === currentUser.id);
    
    if (myNilai.length === 0) {
      return {
        data: {
          rata_rata: 0,
          tertinggi: 0,
          terendah: 0,
          total_nilai: 0,
        }
      };
    }
    
    const scores = myNilai.map(n => n.nilai);
    const rata_rata = scores.reduce((a, b) => a + b, 0) / scores.length;
    const tertinggi = Math.max(...scores);
    const terendah = Math.min(...scores);
    
    return {
      data: {
        rata_rata: Math.round(rata_rata * 100) / 100,
        tertinggi,
        terendah,
        total_nilai: scores.length,
      }
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get nilai by mata pelajaran (Siswa)
 * Group nilai by mata pelajaran
 * @returns {Promise}
 */
export const getNilaiByMapel = async () => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-nilai/by-mapel');
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat nilai mereka' };
    }
    
    const myNilai = mockNilai.filter(n => n.siswa_id === currentUser.id);
    
    // Group by mata pelajaran
    const grouped = {};
    myNilai.forEach(n => {
      const mapelId = n.mata_pelajaran_id;
      if (!grouped[mapelId]) {
        const mapel = enrichMataPelajaran(mapelId);
        grouped[mapelId] = {
          mata_pelajaran: mapel.nama,
          nilai: [],
        };
      }
      grouped[mapelId].nilai.push({
        jenis: n.jenis,
        nilai: n.nilai,
        keterangan: n.keterangan,
      });
    });
    
    // Calculate average for each mapel
    const result = Object.values(grouped).map(item => {
      const scores = item.nilai.map(n => n.nilai);
      const rata_rata = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      return {
        mata_pelajaran: item.mata_pelajaran,
        nilai: item.nilai,
        rata_rata: Math.round(rata_rata * 100) / 100,
      };
    });
    
    return { data: result };
  } catch (error) {
    throw error.response?.data || error;
  }
};

const nilaiService = {
  getAllNilai,
  getNilaiByKelas,
  bulkInputNilai,
  getMyNilai,
  getNilaiSummary,
  getNilaiByMapel,
};

export default nilaiService;

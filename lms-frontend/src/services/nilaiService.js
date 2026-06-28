import api from './api';

// Mock data untuk development
const mockNilai = [
  {
    id: 1,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    jenis: 'tugas', // tugas, uts, uas
    nilai: 85,
    keterangan: 'Website Portfolio',
    created_at: '2024-02-12T10:00:00Z',
  },
  {
    id: 2,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    mata_pelajaran: { id: 2, nama: 'Basis Data' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    jenis: 'tugas',
    nilai: 90,
    keterangan: 'Query MySQL',
    created_at: '2024-02-19T08:30:00Z',
  },
  {
    id: 3,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    jenis: 'uts',
    nilai: 88,
    keterangan: 'UTS Semester 2',
    created_at: '2024-02-20T08:00:00Z',
  },
  {
    id: 4,
    siswa: { id: 5, nama: 'Dewi Lestari', nis: '12346' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    jenis: 'tugas',
    nilai: 78,
    keterangan: 'Website Portfolio',
    created_at: '2024-02-13T14:00:00Z',
  },
];

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
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockNilai];
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(n => n.mata_pelajaran.id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(n => n.kelas.id === parseInt(params.kelas_id));
    }
    if (params.jenis) {
      filtered = filtered.filter(n => n.jenis === params.jenis);
    }
    if (params.siswa_id) {
      filtered = filtered.filter(n => n.siswa.id === parseInt(params.siswa_id));
    }
    
    return { data: filtered };
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock siswa list untuk kelas
    const siswaList = [
      { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
      { id: 5, nama: 'Dewi Lestari', nis: '12346' },
      { id: 6, nama: 'Budi Setiawan', nis: '12347' },
      { id: 7, nama: 'Siti Aminah', nis: '12348' },
      { id: 8, nama: 'Eko Prasetyo', nis: '12349' },
    ];

    // Get existing nilai for these students
    const existingNilai = mockNilai.filter(n => 
      n.kelas.id === parseInt(kelasId) && 
      n.mata_pelajaran.id === parseInt(mataPelajaranId) &&
      n.jenis === jenis
    );

    // Combine siswa list with their nilai (if exists)
    const result = siswaList.map(siswa => {
      const nilai = existingNilai.find(n => n.siswa.id === siswa.id);
      return {
        siswa_id: siswa.id,
        siswa_nama: siswa.nama,
        siswa_nis: siswa.nis,
        nilai: nilai?.nilai || null,
        keterangan: nilai?.keterangan || '',
        nilai_id: nilai?.id || null,
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate saving data
    data.nilai_list.forEach((item, index) => {
      if (item.nilai !== null && item.nilai !== '') {
        const newNilai = {
          id: mockNilai.length + index + 1,
          siswa: { id: item.siswa_id, nama: item.siswa_nama, nis: item.siswa_nis },
          mata_pelajaran: { id: data.mata_pelajaran_id, nama: 'Pemrograman Web' },
          kelas: { id: data.kelas_id, nama: 'XII RPL 1' },
          jenis: data.jenis,
          nilai: parseInt(item.nilai),
          keterangan: item.keterangan || data.keterangan || '',
          created_at: new Date().toISOString(),
        };
        
        // Check if nilai already exists (update) or new (create)
        const existingIndex = mockNilai.findIndex(n => 
          n.siswa.id === item.siswa_id &&
          n.mata_pelajaran.id === data.mata_pelajaran_id &&
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Filter nilai for current user (mock: siswa id 4)
    let filtered = mockNilai.filter(n => n.siswa.id === 4);
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(n => n.mata_pelajaran.id === parseInt(params.mata_pelajaran_id));
    }
    if (params.jenis) {
      filtered = filtered.filter(n => n.jenis === params.jenis);
    }
    
    return { data: filtered };
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
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const myNilai = mockNilai.filter(n => n.siswa.id === 4);
    
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const myNilai = mockNilai.filter(n => n.siswa.id === 4);
    
    // Group by mata pelajaran
    const grouped = {};
    myNilai.forEach(n => {
      const mapelId = n.mata_pelajaran.id;
      if (!grouped[mapelId]) {
        grouped[mapelId] = {
          mata_pelajaran: n.mata_pelajaran.nama,
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

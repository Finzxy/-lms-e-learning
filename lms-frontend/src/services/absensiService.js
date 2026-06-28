import api from './api';

// Mock data untuk development
const mockAbsensi = [
  {
    id: 1,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    tanggal: '2024-02-15',
    status: 'hadir', // hadir, sakit, izin, alpha
    keterangan: null,
    created_at: '2024-02-15T08:00:00Z',
  },
  {
    id: 2,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    mata_pelajaran: { id: 2, nama: 'Basis Data' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    tanggal: '2024-02-16',
    status: 'sakit',
    keterangan: 'Demam',
    created_at: '2024-02-16T08:00:00Z',
  },
  {
    id: 3,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    tanggal: '2024-02-17',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-17T08:00:00Z',
  },
  {
    id: 4,
    siswa: { id: 5, nama: 'Dewi Lestari', nis: '12346' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    tanggal: '2024-02-15',
    status: 'hadir',
    keterangan: null,
    created_at: '2024-02-15T08:00:00Z',
  },
  {
    id: 5,
    siswa: { id: 5, nama: 'Dewi Lestari', nis: '12346' },
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    tanggal: '2024-02-17',
    status: 'izin',
    keterangan: 'Acara keluarga',
    created_at: '2024-02-17T08:00:00Z',
  },
];

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
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockAbsensi];
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(a => a.mata_pelajaran.id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(a => a.kelas.id === parseInt(params.kelas_id));
    }
    if (params.tanggal) {
      filtered = filtered.filter(a => a.tanggal === params.tanggal);
    }
    if (params.bulan) {
      filtered = filtered.filter(a => a.tanggal.startsWith(params.bulan));
    }
    if (params.siswa_id) {
      filtered = filtered.filter(a => a.siswa.id === parseInt(params.siswa_id));
    }
    
    return { data: filtered };
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock siswa list
    const siswaList = [
      { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
      { id: 5, nama: 'Dewi Lestari', nis: '12346' },
      { id: 6, nama: 'Budi Setiawan', nis: '12347' },
      { id: 7, nama: 'Siti Aminah', nis: '12348' },
      { id: 8, nama: 'Eko Prasetyo', nis: '12349' },
    ];

    // Get existing absensi
    const existingAbsensi = mockAbsensi.filter(a => 
      a.kelas.id === parseInt(kelasId) && 
      a.mata_pelajaran.id === parseInt(mataPelajaranId) &&
      a.tanggal === tanggal
    );

    // Combine siswa list with their absensi
    const result = siswaList.map(siswa => {
      const absensi = existingAbsensi.find(a => a.siswa.id === siswa.id);
      return {
        siswa_id: siswa.id,
        siswa_nama: siswa.nama,
        siswa_nis: siswa.nis,
        status: absensi?.status || 'hadir',
        keterangan: absensi?.keterangan || '',
        absensi_id: absensi?.id || null,
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate saving data
    data.absensi_list.forEach((item, index) => {
      const newAbsensi = {
        id: mockAbsensi.length + index + 1,
        siswa: { id: item.siswa_id, nama: item.siswa_nama, nis: item.siswa_nis },
        mata_pelajaran: { id: data.mata_pelajaran_id, nama: 'Pemrograman Web' },
        kelas: { id: data.kelas_id, nama: 'XII RPL 1' },
        tanggal: data.tanggal,
        status: item.status,
        keterangan: item.keterangan || '',
        created_at: new Date().toISOString(),
      };
      
      // Check if absensi already exists (update) or new (create)
      const existingIndex = mockAbsensi.findIndex(a => 
        a.siswa.id === item.siswa_id &&
        a.mata_pelajaran.id === data.mata_pelajaran_id &&
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Filter absensi for current user (mock: siswa id 4)
    let filtered = mockAbsensi.filter(a => a.siswa.id === 4);
    
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(a => a.mata_pelajaran.id === parseInt(params.mata_pelajaran_id));
    }
    if (params.bulan) {
      filtered = filtered.filter(a => a.tanggal.startsWith(params.bulan));
    }
    
    // Sort by date descending
    filtered.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    
    return { data: filtered };
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
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let myAbsensi = mockAbsensi.filter(a => a.siswa.id === 4);
    
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const myAbsensi = mockAbsensi.filter(a => 
      a.siswa.id === 4 && a.tanggal.startsWith(tahun)
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

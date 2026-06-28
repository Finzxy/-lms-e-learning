import api from './api';

// Mock data untuk development
const mockMateri = [
  {
    id: 1,
    judul: 'Pengenalan Pemrograman Web',
    deskripsi: 'Materi dasar tentang HTML, CSS, dan JavaScript',
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    guru: { id: 2, nama: 'Budi Santoso' },
    file_name: 'pemrograman-web-intro.pdf',
    file_size: 2048576, // 2MB
    file_url: '/files/materi/pemrograman-web-intro.pdf',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
  },
  {
    id: 2,
    judul: 'Database MySQL',
    deskripsi: 'Panduan lengkap penggunaan MySQL untuk aplikasi web',
    mata_pelajaran: { id: 2, nama: 'Basis Data' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    guru: { id: 2, nama: 'Budi Santoso' },
    file_name: 'mysql-guide.pdf',
    file_size: 3145728, // 3MB
    file_url: '/files/materi/mysql-guide.pdf',
    created_at: '2024-01-16T10:30:00Z',
    updated_at: '2024-01-16T10:30:00Z',
  },
  {
    id: 3,
    judul: 'Algoritma Sorting',
    deskripsi: 'Penjelasan berbagai algoritma sorting: Bubble, Quick, Merge Sort',
    mata_pelajaran: { id: 3, nama: 'Algoritma' },
    kelas: { id: 2, nama: 'XII RPL 2' },
    guru: { id: 3, nama: 'Siti Rahayu' },
    file_name: 'sorting-algorithms.pdf',
    file_size: 1572864, // 1.5MB
    file_url: '/files/materi/sorting-algorithms.pdf',
    created_at: '2024-01-17T13:00:00Z',
    updated_at: '2024-01-17T13:00:00Z',
  },
];

/**
 * Get all materi with optional filters
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getAllMateri = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/materi', { params });
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    let filtered = [...mockMateri];
    
    // Apply filters
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(m => m.mata_pelajaran.id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(m => m.kelas.id === parseInt(params.kelas_id));
    }
    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(m => 
        m.judul.toLowerCase().includes(search) || 
        m.deskripsi.toLowerCase().includes(search)
      );
    }
    
    return {
      data: filtered,
      total: filtered.length,
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get materi by ID
 * @param {number} id - Materi ID
 * @returns {Promise}
 */
export const getMateriById = async (id) => {
  try {
    // In production, uncomment this:
    // const response = await api.get(`/materi/${id}`);
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 300));
    const materi = mockMateri.find(m => m.id === parseInt(id));
    if (!materi) {
      throw { message: 'Materi tidak ditemukan' };
    }
    return { data: materi };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create new materi (with file upload)
 * @param {FormData} formData - Form data including file
 * @returns {Promise}
 */
export const createMateri = async (formData) => {
  try {
    // In production, uncomment this:
    // const response = await api.post('/materi', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate upload
    
    const newMateri = {
      id: mockMateri.length + 1,
      judul: formData.get('judul'),
      deskripsi: formData.get('deskripsi'),
      mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
      kelas: { id: 1, nama: 'XII RPL 1' },
      guru: { id: 2, nama: 'Budi Santoso' },
      file_name: formData.get('file')?.name || 'file.pdf',
      file_size: formData.get('file')?.size || 0,
      file_url: '/files/materi/new-file.pdf',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockMateri.push(newMateri);
    return { data: newMateri, message: 'Materi berhasil ditambahkan' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update materi
 * @param {number} id - Materi ID
 * @param {FormData} formData - Form data
 * @returns {Promise}
 */
export const updateMateri = async (id, formData) => {
  try {
    // In production, uncomment this:
    // const response = await api.post(`/materi/${id}`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockMateri.findIndex(m => m.id === parseInt(id));
    if (index === -1) {
      throw { message: 'Materi tidak ditemukan' };
    }
    
    mockMateri[index] = {
      ...mockMateri[index],
      judul: formData.get('judul') || mockMateri[index].judul,
      deskripsi: formData.get('deskripsi') || mockMateri[index].deskripsi,
      updated_at: new Date().toISOString(),
    };
    
    return { data: mockMateri[index], message: 'Materi berhasil diupdate' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete materi
 * @param {number} id - Materi ID
 * @returns {Promise}
 */
export const deleteMateri = async (id) => {
  try {
    // In production, uncomment this:
    // const response = await api.delete(`/materi/${id}`);
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockMateri.findIndex(m => m.id === parseInt(id));
    if (index === -1) {
      throw { message: 'Materi tidak ditemukan' };
    }
    
    mockMateri.splice(index, 1);
    return { message: 'Materi berhasil dihapus' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Download materi file
 * @param {number} id - Materi ID
 * @returns {Promise}
 */
export const downloadMateri = async (id) => {
  try {
    // In production, uncomment this:
    // const response = await api.get(`/materi/${id}/download`, {
    //   responseType: 'blob',
    // });
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(`Mock: Downloading materi ${id}`);
    return { message: 'Download started' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

const materiService = {
  getAllMateri,
  getMateriById,
  createMateri,
  updateMateri,
  deleteMateri,
  downloadMateri,
};

export default materiService;

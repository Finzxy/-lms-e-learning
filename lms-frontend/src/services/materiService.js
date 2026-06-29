import api from './api';
import {
  materi as mockMateri,
  getCurrentUser,
  validateTeacherAssignment,
  enrichMataPelajaran,
  enrichKelas,
  enrichGuru,
  mockDelay,
} from '../mocks/academicMock';

// Helper to enrich materi with full data
const enrichMateri = (m) => ({
  ...m,
  mata_pelajaran: enrichMataPelajaran(m.mata_pelajaran_id),
  kelas: enrichKelas(m.kelas_id),
  guru: enrichGuru(m.guru_id),
});

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
    await mockDelay(500);
    
    const currentUser = getCurrentUser();
    let filtered = [...mockMateri];
    
    // Filter by role
    if (currentUser) {
      if (currentUser.role === 'guru') {
        // Guru hanya melihat materi yang dia buat
        filtered = filtered.filter(m => m.guru_id === currentUser.id);
      } else if (currentUser.role === 'siswa') {
        // Siswa hanya melihat materi untuk kelasnya
        filtered = filtered.filter(m => m.kelas_id === currentUser.kelas_id);
      }
      // Admin melihat semua
    }
    
    // Apply additional filters
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(m => m.mata_pelajaran_id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(m => m.kelas_id === parseInt(params.kelas_id));
    }
    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(m => 
        m.judul.toLowerCase().includes(search) || 
        m.deskripsi.toLowerCase().includes(search)
      );
    }
    
    // Enrich with full data
    const enriched = filtered.map(enrichMateri);
    
    return {
      data: enriched,
      total: enriched.length,
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
    await mockDelay(300);
    const materi = mockMateri.find(m => m.id === parseInt(id));
    if (!materi) {
      throw { message: 'Materi tidak ditemukan' };
    }
    
    const currentUser = getCurrentUser();
    // Check access
    if (currentUser && currentUser.role === 'guru' && materi.guru_id !== currentUser.id) {
      throw { status: 403, message: 'Anda tidak memiliki akses ke materi ini' };
    }
    if (currentUser && currentUser.role === 'siswa' && materi.kelas_id !== currentUser.kelas_id) {
      throw { status: 403, message: 'Anda tidak memiliki akses ke materi ini' };
    }
    
    return { data: enrichMateri(materi) };
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
    await mockDelay(800);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'guru') {
      throw { status: 403, message: 'Hanya guru yang dapat membuat materi' };
    }
    
    const mataPelajaranId = parseInt(formData.get('mata_pelajaran_id'));
    const kelasId = parseInt(formData.get('kelas_id'));
    
    // Validate teaching assignment
    validateTeacherAssignment(currentUser.id, mataPelajaranId, kelasId);
    
    const newMateri = {
      id: mockMateri.length + 1,
      judul: formData.get('judul'),
      deskripsi: formData.get('deskripsi'),
      guru_id: currentUser.id,
      mata_pelajaran_id: mataPelajaranId,
      kelas_id: kelasId,
      file_name: formData.get('file')?.name || 'file.pdf',
      file_size: formData.get('file')?.size || 0,
      file_url: '/files/materi/new-file.pdf',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockMateri.push(newMateri);
    return { data: enrichMateri(newMateri), message: 'Materi berhasil ditambahkan' };
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
    await mockDelay(800);
    
    const index = mockMateri.findIndex(m => m.id === parseInt(id));
    if (index === -1) {
      throw { message: 'Materi tidak ditemukan' };
    }
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'guru' && mockMateri[index].guru_id !== currentUser.id) {
      throw { status: 403, message: 'Anda tidak dapat mengubah materi orang lain' };
    }
    
    mockMateri[index] = {
      ...mockMateri[index],
      judul: formData.get('judul') || mockMateri[index].judul,
      deskripsi: formData.get('deskripsi') || mockMateri[index].deskripsi,
      updated_at: new Date().toISOString(),
    };
    
    return { data: enrichMateri(mockMateri[index]), message: 'Materi berhasil diupdate' };
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
    await mockDelay(500);
    
    const index = mockMateri.findIndex(m => m.id === parseInt(id));
    if (index === -1) {
      throw { message: 'Materi tidak ditemukan' };
    }
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'guru' && mockMateri[index].guru_id !== currentUser.id) {
      throw { status: 403, message: 'Anda tidak dapat menghapus materi orang lain' };
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
    await mockDelay(500);
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

import api from './api';
import {
  tugas as mockTugas,
  submissions as mockSubmissions,
  getCurrentUser,
  validateTeacherAssignment,
  enrichMataPelajaran,
  enrichKelas,
  enrichGuru,
  enrichSiswa,
  getSiswaByKelas,
  mockDelay,
} from '../mocks/academicMock';

// Helper to enrich tugas with full data
const enrichTugas = (t) => {
  const siswaList = getSiswaByKelas(t.kelas_id);
  const tugasSubmissions = mockSubmissions.filter(s => s.tugas_id === t.id);
  
  return {
    ...t,
    mata_pelajaran: enrichMataPelajaran(t.mata_pelajaran_id),
    kelas: enrichKelas(t.kelas_id),
    guru: enrichGuru(t.guru_id),
    total_submissions: tugasSubmissions.length,
    total_students: siswaList.length,
  };
};

/**
 * Get all tugas with optional filters
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getAllTugas = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/tugas', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(500);
    
    const currentUser = getCurrentUser();
    let filtered = [...mockTugas];
    
    // Filter by role
    if (currentUser) {
      if (currentUser.role === 'guru') {
        // Guru hanya melihat tugas yang dia buat
        filtered = filtered.filter(t => t.guru_id === currentUser.id);
      } else if (currentUser.role === 'siswa') {
        // Siswa hanya melihat tugas untuk kelasnya
        filtered = filtered.filter(t => t.kelas_id === currentUser.kelas_id);
      }
      // Admin melihat semua
    }
    
    // Apply filters
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(t => t.mata_pelajaran_id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(t => t.kelas_id === parseInt(params.kelas_id));
    }
    if (params.status) {
      filtered = filtered.filter(t => t.status === params.status);
    }
    if (params.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.judul.toLowerCase().includes(search) || 
        t.deskripsi.toLowerCase().includes(search)
      );
    }
    
    // Enrich with full data
    const enriched = filtered.map(enrichTugas);
    
    return {
      data: enriched,
      total: enriched.length,
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get tugas by ID
 * @param {number} id - Tugas ID
 * @returns {Promise}
 */
export const getTugasById = async (id) => {
  try {
    // In production, uncomment this:
    // const response = await api.get(`/tugas/${id}`);
    // return response.data;

    // Mock response for development
    await mockDelay(300);
    const tugas = mockTugas.find(t => t.id === parseInt(id));
    if (!tugas) {
      throw { message: 'Tugas tidak ditemukan' };
    }
    
    const currentUser = getCurrentUser();
    // Check access
    if (currentUser && currentUser.role === 'guru' && tugas.guru_id !== currentUser.id) {
      throw { status: 403, message: 'Anda tidak memiliki akses ke tugas ini' };
    }
    if (currentUser && currentUser.role === 'siswa' && tugas.kelas_id !== currentUser.kelas_id) {
      throw { status: 403, message: 'Anda tidak memiliki akses ke tugas ini' };
    }
    
    return { data: enrichTugas(tugas) };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create new tugas
 * @param {FormData} formData - Form data including file (optional)
 * @returns {Promise}
 */
export const createTugas = async (formData) => {
  try {
    // In production, uncomment this:
    // const response = await api.post('/tugas', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    // Mock response for development
    await mockDelay(800);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'guru') {
      throw { status: 403, message: 'Hanya guru yang dapat membuat tugas' };
    }
    
    const mataPelajaranId = parseInt(formData.get('mata_pelajaran_id'));
    const kelasId = parseInt(formData.get('kelas_id'));
    
    // Validate teaching assignment
    validateTeacherAssignment(currentUser.id, mataPelajaranId, kelasId);
    
    const newTugas = {
      id: mockTugas.length + 1,
      judul: formData.get('judul'),
      deskripsi: formData.get('deskripsi'),
      guru_id: currentUser.id,
      mata_pelajaran_id: mataPelajaranId,
      kelas_id: kelasId,
      deadline: formData.get('deadline'),
      max_score: parseInt(formData.get('max_score')) || 100,
      file_name: formData.get('file')?.name || null,
      file_url: formData.get('file') ? '/files/tugas/new-file.pdf' : null,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockTugas.push(newTugas);
    return { data: enrichTugas(newTugas), message: 'Tugas berhasil dibuat' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Update tugas
 * @param {number} id - Tugas ID
 * @param {FormData} formData - Form data
 * @returns {Promise}
 */
export const updateTugas = async (id, formData) => {
  try {
    // In production, uncomment this:
    // const response = await api.post(`/tugas/${id}`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = mockTugas.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      throw { message: 'Tugas tidak ditemukan' };
    }
    
    mockTugas[index] = {
      ...mockTugas[index],
      judul: formData.get('judul') || mockTugas[index].judul,
      deskripsi: formData.get('deskripsi') || mockTugas[index].deskripsi,
      deadline: formData.get('deadline') || mockTugas[index].deadline,
      updated_at: new Date().toISOString(),
    };
    
    return { data: mockTugas[index], message: 'Tugas berhasil diupdate' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Delete tugas
 * @param {number} id - Tugas ID
 * @returns {Promise}
 */
export const deleteTugas = async (id) => {
  try {
    // In production, uncomment this:
    // const response = await api.delete(`/tugas/${id}`);
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockTugas.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      throw { message: 'Tugas tidak ditemukan' };
    }
    
    mockTugas.splice(index, 1);
    return { message: 'Tugas berhasil dihapus' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get submissions for a tugas (for Guru)
 * @param {number} tugasId - Tugas ID
 * @returns {Promise}
 */
export const getTugasSubmissions = async (tugasId) => {
  try {
    // In production, uncomment this:
    // const response = await api.get(`/tugas/${tugasId}/submissions`);
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const tugas = mockTugas.find(t => t.id === parseInt(tugasId));
    if (!tugas) {
      throw { message: 'Tugas tidak ditemukan' };
    }
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'guru' && tugas.guru_id !== currentUser.id) {
      throw { status: 403, message: 'Anda tidak dapat melihat submission tugas orang lain' };
    }
    
    const submissions = mockSubmissions.filter(s => s.tugas_id === parseInt(tugasId));
    const enriched = submissions.map(s => ({
      ...s,
      siswa: enrichSiswa(s.siswa_id),
    }));
    
    return { data: enriched };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Submit tugas (for Siswa)
 * @param {number} tugasId - Tugas ID
 * @param {FormData} formData - Form data with file and catatan
 * @returns {Promise}
 */
export const submitTugas = async (tugasId, formData) => {
  try {
    // In production, uncomment this:
    // const response = await api.post(`/tugas/${tugasId}/submit`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    // Mock response for development
    await mockDelay(1000); // Simulate upload
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat mengumpulkan tugas' };
    }
    
    const tugas = mockTugas.find(t => t.id === parseInt(tugasId));
    if (!tugas) {
      throw { message: 'Tugas tidak ditemukan' };
    }
    
    if (tugas.kelas_id !== currentUser.kelas_id) {
      throw { status: 403, message: 'Tugas ini bukan untuk kelas Anda' };
    }
    
    const newSubmission = {
      id: mockSubmissions.length + 1,
      tugas_id: parseInt(tugasId),
      siswa_id: currentUser.id,
      file_name: formData.get('file')?.name || 'submission.pdf',
      file_url: '/files/submissions/new-submission.pdf',
      catatan: formData.get('catatan') || null,
      nilai: null,
      feedback: null,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      graded_at: null,
    };
    
    mockSubmissions.push(newSubmission);
    return { data: newSubmission, message: 'Tugas berhasil dikumpulkan' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Grade submission (for Guru)
 * @param {number} submissionId - Submission ID
 * @param {Object} data - Grading data (nilai, feedback)
 * @returns {Promise}
 */
export const gradeSubmission = async (submissionId, data) => {
  try {
    // In production, uncomment this:
    // const response = await api.post(`/submissions/${submissionId}/grade`, data);
    // return response.data;

    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = mockSubmissions.findIndex(s => s.id === parseInt(submissionId));
    if (index === -1) {
      throw { message: 'Pengumpulan tidak ditemukan' };
    }
    
    mockSubmissions[index] = {
      ...mockSubmissions[index],
      nilai: data.nilai,
      feedback: data.feedback,
      status: 'graded',
      graded_at: new Date().toISOString(),
    };
    
    return { data: mockSubmissions[index], message: 'Nilai berhasil diberikan' };
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get my submissions (for Siswa)
 * @param {Object} params - Filter parameters
 * @returns {Promise}
 */
export const getMySubmissions = async (params = {}) => {
  try {
    // In production, uncomment this:
    // const response = await api.get('/my-submissions', { params });
    // return response.data;

    // Mock response for development
    await mockDelay(400);
    
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'siswa') {
      throw { status: 403, message: 'Hanya siswa yang dapat melihat submission mereka' };
    }
    
    // Filter submissions by current user
    let filtered = mockSubmissions.filter(s => s.siswa_id === currentUser.id);
    
    if (params.status) {
      filtered = filtered.filter(s => s.status === params.status);
    }
    
    return { data: filtered };
  } catch (error) {
    throw error.response?.data || error;
  }
};

const tugasService = {
  getAllTugas,
  getTugasById,
  createTugas,
  updateTugas,
  deleteTugas,
  getTugasSubmissions,
  submitTugas,
  gradeSubmission,
  getMySubmissions,
};

export default tugasService;

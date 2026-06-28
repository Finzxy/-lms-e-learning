import api from './api';

// Mock data untuk development
const mockTugas = [
  {
    id: 1,
    judul: 'Membuat Website Portfolio',
    deskripsi: 'Buat website portfolio pribadi menggunakan HTML, CSS, dan JavaScript. Website harus responsive dan memiliki minimal 3 halaman: Home, About, Projects.',
    mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    guru: { id: 2, nama: 'Budi Santoso' },
    deadline: '2024-02-15T23:59:00Z',
    max_score: 100,
    file_name: 'tugas-portfolio-brief.pdf',
    file_url: '/files/tugas/portfolio-brief.pdf',
    status: 'active', // active, closed
    total_submissions: 25,
    total_students: 30,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z',
  },
  {
    id: 2,
    judul: 'Query Database MySQL',
    deskripsi: 'Kerjakan 20 soal query MySQL yang ada di file attachment. Upload file SQL sebagai jawaban.',
    mata_pelajaran: { id: 2, nama: 'Basis Data' },
    kelas: { id: 1, nama: 'XII RPL 1' },
    guru: { id: 2, nama: 'Budi Santoso' },
    deadline: '2024-02-20T23:59:00Z',
    max_score: 100,
    file_name: 'mysql-queries.pdf',
    file_url: '/files/tugas/mysql-queries.pdf',
    status: 'active',
    total_submissions: 18,
    total_students: 30,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
  },
  {
    id: 3,
    judul: 'Implementasi Algoritma Sorting',
    deskripsi: 'Implementasikan 3 algoritma sorting (Bubble, Quick, Merge) dalam bahasa pemrograman pilihan Anda. Sertakan analisis kompleksitas waktu.',
    mata_pelajaran: { id: 3, nama: 'Algoritma' },
    kelas: { id: 2, nama: 'XII RPL 2' },
    guru: { id: 3, nama: 'Siti Rahayu' },
    deadline: '2024-01-10T23:59:00Z', // Past deadline
    max_score: 100,
    file_name: null,
    file_url: null,
    status: 'closed',
    total_submissions: 28,
    total_students: 28,
    created_at: '2024-01-05T08:00:00Z',
    updated_at: '2024-01-11T08:00:00Z',
  },
];

// Mock submission data (pengumpulan tugas)
const mockSubmissions = [
  {
    id: 1,
    tugas_id: 1,
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
    file_name: 'ahmad-portfolio.zip',
    file_url: '/files/submissions/ahmad-portfolio.zip',
    catatan: 'Sudah saya kerjakan semua pak, mohon reviewnya',
    nilai: 85,
    feedback: 'Bagus, tapi masih ada bug di halaman projects',
    status: 'graded', // submitted, graded, late
    submitted_at: '2024-02-10T14:30:00Z',
    graded_at: '2024-02-12T10:00:00Z',
  },
  {
    id: 2,
    tugas_id: 1,
    siswa: { id: 5, nama: 'Dewi Lestari', nis: '12346' },
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
    siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
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
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockTugas];
    
    // Apply filters
    if (params.mata_pelajaran_id) {
      filtered = filtered.filter(t => t.mata_pelajaran.id === parseInt(params.mata_pelajaran_id));
    }
    if (params.kelas_id) {
      filtered = filtered.filter(t => t.kelas.id === parseInt(params.kelas_id));
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
    
    return {
      data: filtered,
      total: filtered.length,
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
    await new Promise(resolve => setTimeout(resolve, 300));
    const tugas = mockTugas.find(t => t.id === parseInt(id));
    if (!tugas) {
      throw { message: 'Tugas tidak ditemukan' };
    }
    return { data: tugas };
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
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newTugas = {
      id: mockTugas.length + 1,
      judul: formData.get('judul'),
      deskripsi: formData.get('deskripsi'),
      mata_pelajaran: { id: 1, nama: 'Pemrograman Web' },
      kelas: { id: 1, nama: 'XII RPL 1' },
      guru: { id: 2, nama: 'Budi Santoso' },
      deadline: formData.get('deadline'),
      max_score: parseInt(formData.get('max_score')) || 100,
      file_name: formData.get('file')?.name || null,
      file_url: formData.get('file') ? '/files/tugas/new-file.pdf' : null,
      status: 'active',
      total_submissions: 0,
      total_students: 30,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockTugas.push(newTugas);
    return { data: newTugas, message: 'Tugas berhasil dibuat' };
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
    await new Promise(resolve => setTimeout(resolve, 400));
    const submissions = mockSubmissions.filter(s => s.tugas_id === parseInt(tugasId));
    return { data: submissions };
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
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
    
    const newSubmission = {
      id: mockSubmissions.length + 1,
      tugas_id: parseInt(tugasId),
      siswa: { id: 4, nama: 'Ahmad Fauzi', nis: '12345' },
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
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Filter submissions by current user (mock: siswa id 4)
    let filtered = mockSubmissions.filter(s => s.siswa.id === 4);
    
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

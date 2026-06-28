import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import FileUpload from '../../components/common/FileUpload';
import Badge from '../../components/common/Badge';
import ActionButtons from '../../components/common/ActionButtons';
import tugasService from '../../services/tugasService';

const Tugas = () => {
  const navigate = useNavigate();
  const [tugas, setTugas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTugas, setEditingTugas] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMapel, setFilterMapel] = useState('');
  const [filterKelas, setFilterKelas] = useState('');

  // Allowed data from jadwal (authorization)
  const [allowedMapel, setAllowedMapel] = useState([]);
  const [allowedKelas, setAllowedKelas] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    mata_pelajaran_id: '',
    kelas_id: '',
    deadline: '',
    max_score: 100,
    file: null,
  });
  const [formErrors, setFormErrors] = useState({});

  // Load allowed mapel & kelas (from jadwal mengajar)
  useEffect(() => {
    loadAllowedData();
  }, []);

  // Load tugas
  useEffect(() => {
    loadTugas();
  }, [filterStatus, filterMapel, filterKelas, searchQuery]);

  const loadAllowedData = async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await api.get('/guru/mapel-kelas');
      
      // Mock data - will be replaced with API call
      const mockData = {
        mata_pelajaran: [
          { id: 1, nama: 'Pemrograman Web', kode: 'PWEB' },
          { id: 2, nama: 'Database', kode: 'DB' },
        ],
        kelas: [
          { id: 1, nama: 'XII RPL 1' },
          { id: 2, nama: 'XII RPL 2' },
          { id: 3, nama: 'XI RPL 1' },
        ],
      };
      
      setAllowedMapel(mockData.mata_pelajaran);
      setAllowedKelas(mockData.kelas);
    } catch (error) {
      console.error('Error loading allowed data:', error);
      alert('Gagal memuat data mata pelajaran dan kelas');
    }
  };

  const loadTugas = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (filterStatus) params.status = filterStatus;
      if (filterMapel) params.mata_pelajaran_id = filterMapel;
      if (filterKelas) params.kelas_id = filterKelas;

      const response = await tugasService.getAllTugas(params);
      setTugas(response.data);
    } catch (error) {
      console.error('Error loading tugas:', error);
      alert('Gagal memuat data tugas');
    } finally {
      setLoading(false);
    }
  };

  // Handle open modal
  const handleOpenModal = (tugasData = null) => {
    if (tugasData) {
      setEditingTugas(tugasData);
      setFormData({
        judul: tugasData.judul,
        deskripsi: tugasData.deskripsi,
        mata_pelajaran_id: tugasData.mata_pelajaran.id,
        kelas_id: tugasData.kelas.id,
        deadline: tugasData.deadline.split('T')[0],
        max_score: tugasData.max_score,
        file: null,
      });
    } else {
      setEditingTugas(null);
      setFormData({
        judul: '',
        deskripsi: '',
        mata_pelajaran_id: '',
        kelas_id: '',
        deadline: '',
        max_score: 100,
        file: null,
      });
    }
    setFormErrors({});
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTugas(null);
    setFormData({
      judul: '',
      deskripsi: '',
      mata_pelajaran_id: '',
      kelas_id: '',
      deadline: '',
      max_score: 100,
      file: null,
    });
    setFormErrors({});
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle file change
  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, file }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.judul.trim()) errors.judul = 'Judul harus diisi';
    if (!formData.deskripsi.trim()) errors.deskripsi = 'Deskripsi harus diisi';
    if (!formData.deadline) errors.deadline = 'Deadline harus diisi';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const data = new FormData();
      data.append('judul', formData.judul);
      data.append('deskripsi', formData.deskripsi);
      data.append('mata_pelajaran_id', formData.mata_pelajaran_id);
      data.append('kelas_id', formData.kelas_id);
      data.append('deadline', formData.deadline);
      data.append('max_score', formData.max_score);
      if (formData.file) {
        data.append('file', formData.file);
      }

      if (editingTugas) {
        await tugasService.updateTugas(editingTugas.id, data);
        alert('Tugas berhasil diupdate');
      } else {
        await tugasService.createTugas(data);
        alert('Tugas berhasil dibuat');
      }

      handleCloseModal();
      loadTugas();
    } catch (error) {
      console.error('Error saving tugas:', error);
      alert(error.message || 'Gagal menyimpan tugas');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return;

    try {
      setLoading(true);
      await tugasService.deleteTugas(id);
      alert('Tugas berhasil dihapus');
      loadTugas();
    } catch (error) {
      console.error('Error deleting tugas:', error);
      alert('Gagal menghapus tugas');
    } finally {
      setLoading(false);
    }
  };

  // Handle view submissions
  const handleViewSubmissions = (tugasId) => {
    navigate(`/guru/tugas/${tugasId}/submissions`);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Check if deadline passed
  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  // Get deadline badge
  const getDeadlineBadge = (deadline) => {
    if (isDeadlinePassed(deadline)) {
      return <Badge variant="danger" size="sm">Ditutup</Badge>;
    }
    
    const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 3) {
      return <Badge variant="warning" size="sm">{daysLeft} hari lagi</Badge>;
    }
    
    return <Badge variant="success" size="sm">Aktif</Badge>;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kelola Tugas</h1>
        <p className="text-gray-600">Buat dan kelola tugas untuk siswa</p>
      </div>

      {/* Actions Bar */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96">
            <Input
              icon={Search}
              placeholder="Cari tugas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters & Add Button */}
          <div className="flex gap-2 w-full md:w-auto">
            {/* Filter Mata Pelajaran */}
            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Semua Mata Pelajaran</option>
              {allowedMapel.map((mapel) => (
                <option key={mapel.id} value={mapel.id}>
                  {mapel.nama}
                </option>
              ))}
            </select>

            {/* Filter Kelas */}
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Semua Kelas</option>
              {allowedKelas.map((kelas) => (
                <option key={kelas.id} value={kelas.id}>
                  {kelas.nama}
                </option>
              ))}
            </select>

            {/* Filter Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="closed">Ditutup</option>
            </select>

            <Button
              icon={Plus}
              onClick={() => handleOpenModal()}
            >
              Buat Tugas
            </Button>
          </div>
        </div>
      </Card>

      {/* Tugas List */}
      {loading && tugas.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Memuat data...</p>
        </div>
      ) : tugas.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada tugas</h3>
            <p className="mt-1 text-sm text-gray-500">Mulai dengan membuat tugas pertama Anda.</p>
            <div className="mt-6">
              <Button icon={Plus} onClick={() => handleOpenModal()}>
                Buat Tugas
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {tugas.map((item) => (
            <Card key={item.id} hover>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {item.judul}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" size="sm">
                          {item.mata_pelajaran.nama}
                        </Badge>
                        <Badge variant="secondary" size="sm">
                          {item.kelas.nama}
                        </Badge>
                        {getDeadlineBadge(item.deadline)}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.deskripsi}
                  </p>

                  {/* Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Deadline: {formatDate(item.deadline)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>{item.total_submissions}/{item.total_students} terkumpul</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Eye}
                    onClick={() => handleViewSubmissions(item.id)}
                    className="w-full"
                  >
                    Lihat
                  </Button>
                  <div className="flex gap-2 md:justify-center">
                    <ActionButtons
                      onEdit={() => handleOpenModal(item)}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingTugas ? 'Edit Tugas' : 'Buat Tugas Baru'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Judul */}
            <Input
              label="Judul Tugas"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
              error={formErrors.judul}
              placeholder="Contoh: Membuat Website Portfolio"
            />

            {/* Deskripsi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Jelaskan tugas secara detail..."
                required
              />
              {formErrors.deskripsi && (
                <p className="mt-1 text-sm text-red-600">{formErrors.deskripsi}</p>
              )}
            </div>

            {/* Mata Pelajaran */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mata Pelajaran <span className="text-red-500">*</span>
              </label>
              <select
                name="mata_pelajaran_id"
                value={formData.mata_pelajaran_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Pilih Mata Pelajaran</option>
                {allowedMapel.map((mapel) => (
                  <option key={mapel.id} value={mapel.id}>
                    {mapel.nama} ({mapel.kode})
                  </option>
                ))}
              </select>
              {formErrors.mata_pelajaran_id && (
                <p className="mt-1 text-sm text-red-600">{formErrors.mata_pelajaran_id}</p>
              )}
            </div>

            {/* Kelas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kelas <span className="text-red-500">*</span>
              </label>
              <select
                name="kelas_id"
                value={formData.kelas_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Pilih Kelas</option>
                {allowedKelas.map((kelas) => (
                  <option key={kelas.id} value={kelas.id}>
                    {kelas.nama}
                  </option>
                ))}
              </select>
              {formErrors.kelas_id && (
                <p className="mt-1 text-sm text-red-600">{formErrors.kelas_id}</p>
              )}
            </div>

            {/* Deadline */}
            <Input
              type="datetime-local"
              label="Deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              error={formErrors.deadline}
            />

            {/* Max Score */}
            <Input
              type="number"
              label="Nilai Maksimal"
              name="max_score"
              value={formData.max_score}
              onChange={handleChange}
              min={0}
              max={100}
              required
            />

            {/* File Upload (Optional) */}
            <FileUpload
              label="File Lampiran (Opsional)"
              name="file"
              accept=".pdf,.doc,.docx"
              maxSize={5}
              onChange={handleFileChange}
              helperText="Upload file soal/instruksi (PDF, DOC, DOCX). Maksimal 5MB"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              disabled={loading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : editingTugas ? 'Update' : 'Buat Tugas'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Tugas;

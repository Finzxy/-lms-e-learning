import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import JadwalForm from '../../components/forms/JadwalForm';

/**
 * Jadwal Page - Admin
 * Manage jadwal pelajaran with table and calendar views
 * 
 * Features:
 * - Toggle between table and calendar view
 * - Filter by kelas, hari, semester
 * - Add/Edit/Delete jadwal
 * - Conflict detection
 * - Export to PDF
 */
const Jadwal = () => {
  const [view, setView] = useState('table'); // 'table' or 'calendar'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('');
  const [filterHari, setFilterHari] = useState('');
  const [filterSemester, setFilterSemester] = useState('Ganjil');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data
  const [jadwalList, setJadwalList] = useState([
    {
      id: 1,
      hari: 'Senin',
      jam_mulai: '07:00',
      jam_selesai: '08:30',
      mata_pelajaran: 'Matematika',
      mata_pelajaran_kode: 'MTK',
      guru: 'Pak Budi Santoso',
      kelas: 'X RPL 1',
      ruangan: 'R.101',
      semester: 'Ganjil',
    },
    {
      id: 2,
      hari: 'Senin',
      jam_mulai: '08:30',
      jam_selesai: '10:00',
      mata_pelajaran: 'Bahasa Indonesia',
      mata_pelajaran_kode: 'BIND',
      guru: 'Bu Ani Wijaya',
      kelas: 'X RPL 1',
      ruangan: 'R.101',
      semester: 'Ganjil',
    },
    {
      id: 3,
      hari: 'Selasa',
      jam_mulai: '07:00',
      jam_selesai: '08:30',
      mata_pelajaran: 'Pemrograman Web',
      mata_pelajaran_kode: 'PWEB',
      guru: 'Pak Joko Susilo',
      kelas: 'X RPL 1',
      ruangan: 'Lab.1',
      semester: 'Ganjil',
    },
    {
      id: 4,
      hari: 'Rabu',
      jam_mulai: '07:00',
      jam_selesai: '08:30',
      mata_pelajaran: 'Database',
      mata_pelajaran_kode: 'DB',
      guru: 'Pak Joko Susilo',
      kelas: 'X RPL 1',
      ruangan: 'Lab.2',
      semester: 'Ganjil',
    },
    {
      id: 5,
      hari: 'Kamis',
      jam_mulai: '07:00',
      jam_selesai: '08:30',
      mata_pelajaran: 'Jaringan Komputer',
      mata_pelajaran_kode: 'JKM',
      guru: 'Bu Siti Nurhaliza',
      kelas: 'XI TKJ 1',
      ruangan: 'Lab.3',
      semester: 'Ganjil',
    },
  ]);

  const mockKelas = [
    { id: 1, nama: 'X RPL 1' },
    { id: 2, nama: 'X RPL 2' },
    { id: 3, nama: 'XI TKJ 1' },
    { id: 4, nama: 'XI MM 1' },
  ];

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  // Filter jadwal
  const filteredJadwal = jadwalList.filter(jadwal => {
    const matchSearch = 
      jadwal.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jadwal.guru.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jadwal.kelas.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchKelas = !filterKelas || jadwal.kelas === filterKelas;
    const matchHari = !filterHari || jadwal.hari === filterHari;
    const matchSemester = !filterSemester || jadwal.semester === filterSemester;

    return matchSearch && matchKelas && matchHari && matchSemester;
  });

  // Group jadwal by hari for calendar view
  const groupedJadwal = hariOptions.reduce((acc, hari) => {
    acc[hari] = filteredJadwal
      .filter(j => j.hari === hari)
      .sort((a, b) => a.jam_mulai.localeCompare(b.jam_mulai));
    return acc;
  }, {});

  const handleAdd = () => {
    setModalMode('create');
    setSelectedJadwal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (jadwal) => {
    setModalMode('edit');
    setSelectedJadwal(jadwal);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus jadwal ini?')) {
      setJadwalList(prev => prev.filter(j => j.id !== id));
      // Show success toast (implement toast later)
      alert('Jadwal berhasil dihapus');
    }
  };

  const handleSubmit = (data) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (modalMode === 'create') {
        const newJadwal = {
          id: jadwalList.length + 1,
          ...data,
          // Map IDs to names (mock)
          mata_pelajaran: 'Matematika',
          mata_pelajaran_kode: 'MTK',
          guru: 'Pak Budi Santoso',
          kelas: 'X RPL 1',
        };
        setJadwalList(prev => [...prev, newJadwal]);
        alert('Jadwal berhasil ditambahkan');
      } else {
        setJadwalList(prev =>
          prev.map(j => (j.id === selectedJadwal.id ? { ...j, ...data } : j))
        );
        alert('Jadwal berhasil diupdate');
      }

      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  const handleExportPDF = () => {
    alert('Export to PDF feature will be implemented');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Jadwal Pelajaran</h1>
        <p className="text-gray-600">Kelola jadwal pelajaran sekolah</p>
      </div>

      {/* View Toggle & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'table'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tabel
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === 'calendar'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Kalender
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari mata pelajaran, guru, kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filter Kelas */}
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Semua Kelas</option>
              {mockKelas.map(kelas => (
                <option key={kelas.id} value={kelas.nama}>{kelas.nama}</option>
              ))}
            </select>

            {/* Filter Hari */}
            <select
              value={filterHari}
              onChange={(e) => setFilterHari(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Semua Hari</option>
              {hariOptions.map(hari => (
                <option key={hari} value={hari}>{hari}</option>
              ))}
            </select>

            {/* Filter Semester */}
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Semua Semester</option>
              <option value="Ganjil">Ganjil</option>
              <option value="Genap">Genap</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleExportPDF} size="sm">
              Export PDF
            </Button>
            <Button variant="primary" onClick={handleAdd} size="sm">
              + Tambah Jadwal
            </Button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hari
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mata Pelajaran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guru
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kelas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruangan
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredJadwal.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <p className="text-lg font-medium">Tidak ada data</p>
                        <p className="text-sm mt-1">
                          {searchTerm || filterKelas || filterHari || filterSemester
                            ? 'Coba ubah filter pencarian'
                            : 'Klik tombol "Tambah Jadwal" untuk menambah jadwal baru'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJadwal.map((jadwal, index) => (
                    <tr key={jadwal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jadwal.hari}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jadwal.jam_mulai} - {jadwal.jam_selesai}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {jadwal.mata_pelajaran}
                        </div>
                        <div className="text-sm text-gray-500">
                          {jadwal.mata_pelajaran_kode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jadwal.guru}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jadwal.kelas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jadwal.ruangan || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <ActionButtons
                          onEdit={() => handleEdit(jadwal)}
                          onDelete={() => handleDelete(jadwal.id)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredJadwal.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Menampilkan {filteredJadwal.length} dari {jadwalList.length} jadwal
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {hariOptions.map(hari => (
              <div key={hari} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Day Header */}
                <div className="bg-primary text-white px-4 py-2 font-semibold">
                  {hari}
                </div>

                {/* Schedule Cards */}
                <div className="p-3 space-y-2 min-h-[200px]">
                  {groupedJadwal[hari]?.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">
                      Tidak ada jadwal
                    </p>
                  ) : (
                    groupedJadwal[hari]?.map(jadwal => (
                      <div
                        key={jadwal.id}
                        className="bg-blue-50 border border-blue-200 rounded p-2 text-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleEdit(jadwal)}
                      >
                        <div className="font-semibold text-blue-900">
                          {jadwal.jam_mulai} - {jadwal.jam_selesai}
                        </div>
                        <div className="text-blue-800 font-medium mt-1">
                          {jadwal.mata_pelajaran_kode}
                        </div>
                        <div className="text-blue-700 text-xs mt-1">
                          {jadwal.guru}
                        </div>
                        <div className="text-blue-600 text-xs">
                          {jadwal.kelas}
                        </div>
                        {jadwal.ruangan && (
                          <div className="text-blue-600 text-xs">
                            📍 {jadwal.ruangan}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'create' ? 'Tambah Jadwal' : 'Edit Jadwal'}
        size="xl"
      >
        <JadwalForm
          mode={modalMode}
          initialData={selectedJadwal}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Jadwal;

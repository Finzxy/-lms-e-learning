import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import MataPelajaranForm from '../../components/forms/MataPelajaranForm';

const MataPelajaran = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMapel, setSelectedMapel] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - will be replaced with API calls
  const [mapelList] = useState([
    {
      id: 1,
      kode: 'MTK',
      nama: 'Matematika',
      kategori: 'umum',
      jurusan: 'Semua',
      jurusan_ids: [],
      sks: 4,
      tingkat: ['10', '11', '12'],
      is_active: true,
    },
    {
      id: 2,
      kode: 'BIND',
      nama: 'Bahasa Indonesia',
      kategori: 'umum',
      jurusan: 'Semua',
      jurusan_ids: [],
      sks: 4,
      tingkat: ['10', '11', '12'],
      is_active: true,
    },
    {
      id: 3,
      kode: 'PWEB',
      nama: 'Pemrograman Web',
      kategori: 'produktif',
      jurusan: 'RPL',
      jurusan_ids: [1],
      sks: 6,
      tingkat: ['11', '12'],
      is_active: true,
    },
    {
      id: 4,
      kode: 'JKM',
      nama: 'Jaringan Komputer',
      kategori: 'produktif',
      jurusan: 'TKJ',
      jurusan_ids: [2],
      sks: 6,
      tingkat: ['10', '11', '12'],
      is_active: true,
    },
    {
      id: 5,
      kode: 'DG',
      nama: 'Desain Grafis',
      kategori: 'produktif',
      jurusan: 'MM',
      jurusan_ids: [3],
      sks: 6,
      tingkat: ['10', '11', '12'],
      is_active: true,
    },
    {
      id: 6,
      kode: 'MULOK',
      nama: 'Bahasa Sunda',
      kategori: 'muatan_lokal',
      jurusan: 'Semua',
      jurusan_ids: [],
      sks: 2,
      tingkat: ['10'],
      is_active: true,
    },
  ]);

  const jurusanList = [
    { id: 1, kode: 'RPL' },
    { id: 2, kode: 'TKJ' },
    { id: 3, kode: 'MM' },
  ];

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);

      if (selectedMapel) {
        console.log('Update mata pelajaran:', selectedMapel.id, data);
        alert('Mata pelajaran updated successfully!');
      } else {
        console.log('Create mata pelajaran:', data);
        alert('Mata pelajaran created successfully!');
      }

      setIsModalOpen(false);
      setSelectedMapel(null);
    } catch (error) {
      console.error('Form submit error:', error);
      alert('Failed to save mata pelajaran');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle add
   */
  const handleAdd = () => {
    setSelectedMapel(null);
    setIsModalOpen(true);
  };

  /**
   * Handle edit
   */
  const handleEdit = (mapel) => {
    setSelectedMapel(mapel);
    setIsModalOpen(true);
  };

  /**
   * Handle delete
   */
  const handleDelete = async (mapel) => {
    if (!confirm(`Yakin ingin menghapus mata pelajaran "${mapel.nama}"?`)) {
      return;
    }

    try {
      setLoading(true);
      alert('Mata pelajaran deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete mata pelajaran');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get kategori badge color
   */
  const getKategoriColor = (kategori) => {
    const colors = {
      umum: 'bg-blue-100 text-blue-700',
      produktif: 'bg-green-100 text-green-700',
      muatan_lokal: 'bg-purple-100 text-purple-700',
    };
    return colors[kategori] || 'bg-gray-100 text-gray-700';
  };

  /**
   * Get kategori label
   */
  const getKategoriLabel = (kategori) => {
    const labels = {
      umum: 'Umum',
      produktif: 'Produktif',
      muatan_lokal: 'Muatan Lokal',
    };
    return labels[kategori] || kategori;
  };

  /**
   * Filter mata pelajaran
   */
  const filteredMapel = mapelList.filter((mapel) => {
    const matchesSearch =
      mapel.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapel.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesKategori =
      filterKategori === 'all' || mapel.kategori === filterKategori;
    const matchesJurusan =
      filterJurusan === 'all' ||
      mapel.jurusan_ids.includes(parseInt(filterJurusan)) ||
      mapel.jurusan_ids.length === 0; // Semua jurusan
    return matchesSearch && matchesKategori && matchesJurusan;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Data Mata Pelajaran</h1>
        <p className="mt-2 text-gray-600">
          Kelola data mata pelajaran yang diajarkan
        </p>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kode atau nama mata pelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filter by Kategori */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Semua Kategori</option>
              <option value="umum">Umum</option>
              <option value="produktif">Produktif</option>
              <option value="muatan_lokal">Muatan Lokal</option>
            </select>
          </div>

          {/* Filter by Jurusan */}
          <select
            value={filterJurusan}
            onChange={(e) => setFilterJurusan(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">Semua Jurusan</option>
            {jurusanList.map((jurusan) => (
              <option key={jurusan.id} value={jurusan.id}>
                {jurusan.kode}
              </option>
            ))}
          </select>

          {/* Add Button */}
          <Button
            variant="primary"
            onClick={handleAdd}
            className="whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Tambah Mapel
          </Button>
        </div>
      </div>

      {/* Mata Pelajaran Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Mata Pelajaran
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jurusan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMapel.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">Tidak ada data</p>
                      <p className="text-sm mt-1">
                        {searchQuery || filterKategori !== 'all' || filterJurusan !== 'all'
                          ? 'Coba ubah filter pencarian'
                          : 'Klik tombol "Tambah Mapel" untuk menambah mata pelajaran baru'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMapel.map((mapel, index) => (
                  <tr key={mapel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-sm font-semibold bg-primary-100 text-primary-700 rounded-lg">
                        {mapel.kode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {mapel.nama}
                      </p>
                      <p className="text-xs text-gray-500">
                        Tingkat: {mapel.tingkat.map(t => t === '10' ? 'X' : t === '11' ? 'XI' : 'XII').join(', ')}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getKategoriColor(
                          mapel.kategori
                        )}`}
                      >
                        {getKategoriLabel(mapel.kategori)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {mapel.jurusan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {mapel.sks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Aktif</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        onEdit={() => handleEdit(mapel)}
                        onDelete={() => handleDelete(mapel)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredMapel.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredMapel.length} dari {mapelList.length} mata pelajaran
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

      {/* Mata Pelajaran Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedMapel ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
        size="lg"
      >
        <MataPelajaranForm
          mataPelajaran={selectedMapel}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default MataPelajaran;

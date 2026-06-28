import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import JurusanForm from '../../components/forms/JurusanForm';

const Jurusan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - will be replaced with API calls
  const [jurusanList] = useState([
    {
      id: 1,
      kode: 'RPL',
      nama: 'Rekayasa Perangkat Lunak',
      deskripsi: 'Jurusan yang mempelajari pengembangan software dan aplikasi',
      is_active: true,
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      kode: 'TKJ',
      nama: 'Teknik Komputer dan Jaringan',
      deskripsi: 'Jurusan yang mempelajari jaringan komputer dan infrastruktur IT',
      is_active: true,
      createdAt: '2024-01-02',
    },
    {
      id: 3,
      kode: 'MM',
      nama: 'Multimedia',
      deskripsi: 'Jurusan yang mempelajari desain grafis, video editing, dan animasi',
      is_active: true,
      createdAt: '2024-01-03',
    },
    {
      id: 4,
      kode: 'TBSM',
      nama: 'Teknik dan Bisnis Sepeda Motor',
      deskripsi: 'Jurusan yang mempelajari perawatan dan perbaikan sepeda motor',
      is_active: false,
      createdAt: '2024-01-04',
    },
  ]);

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);

      if (selectedJurusan) {
        // Update jurusan
        console.log('Update jurusan:', selectedJurusan.id, data);
        alert('Jurusan updated successfully!');
      } else {
        // Create jurusan
        console.log('Create jurusan:', data);
        alert('Jurusan created successfully!');
      }

      setIsModalOpen(false);
      setSelectedJurusan(null);
      // TODO: Refresh jurusan list
    } catch (error) {
      console.error('Form submit error:', error);
      alert('Failed to save jurusan');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle add jurusan
   */
  const handleAdd = () => {
    setSelectedJurusan(null);
    setIsModalOpen(true);
  };

  /**
   * Handle edit jurusan
   */
  const handleEdit = (jurusan) => {
    setSelectedJurusan(jurusan);
    setIsModalOpen(true);
  };

  /**
   * Handle delete jurusan
   */
  const handleDelete = async (jurusan) => {
    if (!confirm(`Yakin ingin menghapus jurusan "${jurusan.nama}"?`)) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Call API to delete jurusan
      alert('Jurusan deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete jurusan');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Filter jurusan
   */
  const filteredJurusan = jurusanList.filter((jurusan) => {
    const matchesSearch =
      jurusan.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jurusan.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && jurusan.is_active) ||
      (filterStatus === 'inactive' && !jurusan.is_active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Data Jurusan</h1>
        <p className="mt-2 text-gray-600">
          Kelola data jurusan yang tersedia di sekolah
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
              placeholder="Cari kode atau nama jurusan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filter by Status */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>

          {/* Add Button */}
          <Button
            variant="primary"
            onClick={handleAdd}
            className="whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Tambah Jurusan
          </Button>
        </div>
      </div>

      {/* Jurusan Table */}
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
                  Nama Jurusan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
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
              {filteredJurusan.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">Tidak ada data</p>
                      <p className="text-sm mt-1">
                        {searchQuery || filterStatus !== 'all'
                          ? 'Coba ubah filter pencarian'
                          : 'Klik tombol "Tambah Jurusan" untuk menambah jurusan baru'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJurusan.map((jurusan, index) => (
                  <tr key={jurusan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-sm font-semibold bg-primary-100 text-primary-700 rounded-lg">
                        {jurusan.kode}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {jurusan.nama}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-md truncate">
                        {jurusan.deskripsi || '-'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {jurusan.is_active ? (
                        <Badge variant="success">Aktif</Badge>
                      ) : (
                        <Badge variant="danger">Nonaktif</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        onEdit={() => handleEdit(jurusan)}
                        onDelete={() => handleDelete(jurusan)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredJurusan.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredJurusan.length} dari {jurusanList.length}{' '}
              jurusan
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

      {/* Jurusan Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedJurusan ? 'Edit Jurusan' : 'Tambah Jurusan'}
        size="md"
      >
        <JurusanForm
          jurusan={selectedJurusan}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Jurusan;

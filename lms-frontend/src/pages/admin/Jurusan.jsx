import { useState } from 'react';
import { Plus, GraduationCap } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import JurusanForm from '../../components/forms/JurusanForm';
import PageHeader from '../../components/common/PageHeader';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import EmptyState from '../../components/common/EmptyState';
import { jurusan as mockJurusan } from '../../mocks/academicMock';

const Jurusan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJurusan, setSelectedJurusan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data dari mock pusat
  const [jurusanList, setJurusanList] = useState(
    mockJurusan.map(j => ({
      ...j,
      deskripsi: j.kode === 'RPL' ? 'Jurusan yang mempelajari pengembangan software dan aplikasi'
        : j.kode === 'TKJ' ? 'Jurusan yang mempelajari jaringan komputer dan infrastruktur IT'
        : 'Jurusan yang mempelajari desain grafis, video editing, dan animasi',
      is_active: true,
      createdAt: '2024-01-01',
    }))
  );

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
      <PageHeader
        title="Data Jurusan"
        subtitle="Kelola data jurusan yang tersedia di sekolah"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            Tambah Jurusan
          </Button>
        }
      />

      <SearchFilterBar
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Cari kode atau nama jurusan..."
        filters={[
          {
            value: filterStatus,
            onChange: (e) => setFilterStatus(e.target.value),
            placeholder: 'Semua Status',
            options: [
              { value: 'active',   label: 'Aktif' },
              { value: 'inactive', label: 'Nonaktif' },
            ],
          },
        ]}
      />

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
                  <td colSpan="6">
                    <EmptyState
                      icon={GraduationCap}
                      title="Tidak ada jurusan"
                      description={searchQuery || filterStatus !== 'all' ? 'Coba ubah filter pencarian' : 'Klik tombol "Tambah Jurusan" untuk menambah jurusan baru'}
                    />
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

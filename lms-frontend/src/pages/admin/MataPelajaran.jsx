import { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import MataPelajaranForm from '../../components/forms/MataPelajaranForm';
import PageHeader from '../../components/common/PageHeader';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import EmptyState from '../../components/common/EmptyState';
import { mataPelajaran as mockMapel, jurusan as mockJurusan } from '../../mocks/academicMock';

const MataPelajaran = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKategori, setFilterKategori] = useState('all');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMapel, setSelectedMapel] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data dari mock pusat
  const [mapelList, setMapelList] = useState(
    mockMapel.map(m => ({
      id: m.id,
      kode: m.kode,
      nama: m.nama,
      // Tentukan kategori dan jurusan berdasarkan kode
      kategori: ['PW', 'BD', 'ALG', 'JK', 'DG'].includes(m.kode) ? 'produktif' : 'umum',
      jurusan: m.kode === 'PW' || m.kode === 'BD' || m.kode === 'ALG' ? 'RPL'
        : m.kode === 'JK' ? 'TKJ'
        : m.kode === 'DG' ? 'MM'
        : 'Semua',
      jurusan_ids: m.kode === 'PW' || m.kode === 'BD' || m.kode === 'ALG' ? [1]
        : m.kode === 'JK' ? [2]
        : m.kode === 'DG' ? [3]
        : [],
      sks: ['PW', 'BD', 'ALG', 'JK', 'DG'].includes(m.kode) ? 6 : 4,
      tingkat: ['10', '11', '12'],
      is_active: true,
    }))
  );

  const jurusanList = mockJurusan.map(j => ({ id: j.id, kode: j.kode }));

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
   * Get kategori badge variant
   */
  const getKategoriVariant = (kategori) => {
    const map = { umum: 'secondary', produktif: 'success', muatan_lokal: 'purple' };
    return map[kategori] || 'default';
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
      <PageHeader
        title="Data Mata Pelajaran"
        subtitle="Kelola data mata pelajaran yang diajarkan"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            Tambah Mapel
          </Button>
        }
      />

      <SearchFilterBar
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Cari kode atau nama mata pelajaran..."
        filters={[
          {
            value: filterKategori,
            onChange: (e) => setFilterKategori(e.target.value),
            placeholder: 'Semua Kategori',
            options: [
              { value: 'umum',         label: 'Umum' },
              { value: 'produktif',    label: 'Produktif' },
              { value: 'muatan_lokal', label: 'Muatan Lokal' },
            ],
          },
          {
            value: filterJurusan,
            onChange: (e) => setFilterJurusan(e.target.value),
            placeholder: 'Semua Jurusan',
            options: jurusanList.map(j => ({ value: j.id, label: j.kode })),
          },
        ]}
      />

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
                  <td colSpan="8">
                    <EmptyState
                      icon={BookOpen}
                      title="Tidak ada mata pelajaran"
                      description={searchQuery || filterKategori !== 'all' || filterJurusan !== 'all' ? 'Coba ubah filter pencarian' : 'Klik tombol "Tambah Mapel" untuk menambah mata pelajaran baru'}
                    />
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
                      <Badge variant={getKategoriVariant(mapel.kategori)}>
                        {getKategoriLabel(mapel.kategori)}
                      </Badge>
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

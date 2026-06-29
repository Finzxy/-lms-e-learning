import { useState } from 'react';
import { Plus, Users, BookOpen } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import KelasForm from '../../components/forms/KelasForm';
import PageHeader from '../../components/common/PageHeader';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import EmptyState from '../../components/common/EmptyState';
import { kelas as mockKelas, jurusan as mockJurusan, getSiswaByKelas } from '../../mocks/academicMock';

const Kelas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterTingkat, setFilterTingkat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data dari mock pusat
  const [kelasList, setKelasList] = useState(
    mockKelas.map(k => ({
      id: k.id,
      nama: k.nama,
      jurusan: k.jurusan,
      tingkat: k.tingkat.toString(),
      wali_kelas: null,
      jumlah_siswa: getSiswaByKelas(k.id).length,
      kapasitas: 32,
      tahun_ajaran: '2025/2026',
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

      if (selectedKelas) {
        console.log('Update kelas:', selectedKelas.id, data);
        alert('Kelas updated successfully!');
      } else {
        console.log('Create kelas:', data);
        alert('Kelas created successfully!');
      }

      setIsModalOpen(false);
      setSelectedKelas(null);
    } catch (error) {
      console.error('Form submit error:', error);
      alert('Failed to save kelas');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle add kelas
   */
  const handleAdd = () => {
    setSelectedKelas(null);
    setIsModalOpen(true);
  };

  /**
   * Handle edit kelas
   */
  const handleEdit = (kelas) => {
    setSelectedKelas({
      ...kelas,
      jurusan_id: kelas.jurusan.id,
      wali_kelas_id: kelas.wali_kelas ? kelas.wali_kelas.id : null,
    });
    setIsModalOpen(true);
  };

  /**
   * Handle delete kelas
   */
  const handleDelete = async (kelas) => {
    if (!confirm(`Yakin ingin menghapus kelas "${kelas.nama}"?`)) {
      return;
    }

    try {
      setLoading(true);
      alert('Kelas deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete kelas');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get jurusan badge variant
   */
  const getJurusanVariant = (kode) => {
    const map = { RPL: 'secondary', TKJ: 'success', MM: 'purple' };
    return map[kode] || 'default';
  };

  /**
   * Filter kelas
   */
  const filteredKelas = kelasList.filter((kelas) => {
    const matchesSearch = kelas.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesJurusan =
      filterJurusan === 'all' || kelas.jurusan.id === parseInt(filterJurusan);
    const matchesTingkat =
      filterTingkat === 'all' || kelas.tingkat === filterTingkat;
    return matchesSearch && matchesJurusan && matchesTingkat;
  });

  return (
    <div>
      <PageHeader
        title="Data Kelas"
        subtitle="Kelola data kelas dan wali kelas"
        actions={
          <Button variant="primary" onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            Tambah Kelas
          </Button>
        }
      />

      <SearchFilterBar
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        searchPlaceholder="Cari nama kelas..."
        filters={[
          {
            value: filterJurusan,
            onChange: (e) => setFilterJurusan(e.target.value),
            placeholder: 'Semua Jurusan',
            options: jurusanList.map(j => ({ value: j.id, label: j.kode })),
          },
          {
            value: filterTingkat,
            onChange: (e) => setFilterTingkat(e.target.value),
            placeholder: 'Semua Tingkat',
            options: [
              { value: '10', label: 'Kelas X' },
              { value: '11', label: 'Kelas XI' },
              { value: '12', label: 'Kelas XII' },
            ],
          },
        ]}
      />


      {/* Kelas Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jurusan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tingkat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wali Kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah Siswa
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
              {filteredKelas.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <EmptyState
                      icon={BookOpen}
                      title="Tidak ada kelas"
                      description={searchQuery || filterJurusan !== 'all' || filterTingkat !== 'all' ? 'Coba ubah filter pencarian' : 'Klik tombol "Tambah Kelas" untuk menambah kelas baru'}
                    />
                  </td>
                </tr>
              ) : (
                filteredKelas.map((kelas, index) => (
                  <tr key={kelas.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">
                        {kelas.nama}
                      </p>
                      <p className="text-xs text-gray-500">
                        {kelas.tahun_ajaran}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getJurusanVariant(kelas.jurusan.kode)}>
                        {kelas.jurusan.kode}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {kelas.tingkat === '10' && 'X'}
                      {kelas.tingkat === '11' && 'XI'}
                      {kelas.tingkat === '12' && 'XII'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {kelas.wali_kelas ? kelas.wali_kelas.name : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {kelas.jumlah_siswa}/{kelas.kapasitas}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Aktif</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        onEdit={() => handleEdit(kelas)}
                        onDelete={() => handleDelete(kelas)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredKelas.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredKelas.length} dari {kelasList.length} kelas
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

      {/* Kelas Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedKelas ? 'Edit Kelas' : 'Tambah Kelas'}
        size="lg"
      >
        <KelasForm
          kelas={selectedKelas}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Kelas;

import { useState } from 'react';
import { Search, Plus, Filter, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ActionButtons from '../../components/common/ActionButtons';
import KelasForm from '../../components/forms/KelasForm';

const Kelas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJurusan, setFilterJurusan] = useState('all');
  const [filterTingkat, setFilterTingkat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - will be replaced with API calls
  const [kelasList] = useState([
    {
      id: 1,
      nama: 'X RPL 1',
      jurusan: { id: 1, kode: 'RPL', nama: 'Rekayasa Perangkat Lunak' },
      tingkat: '10',
      wali_kelas: { id: 1, name: 'Budi Santoso' },
      jumlah_siswa: 32,
      kapasitas: 32,
      tahun_ajaran: '2024/2025',
      is_active: true,
    },
    {
      id: 2,
      nama: 'X RPL 2',
      jurusan: { id: 1, kode: 'RPL', nama: 'Rekayasa Perangkat Lunak' },
      tingkat: '10',
      wali_kelas: { id: 2, name: 'Ani Wijaya' },
      jumlah_siswa: 30,
      kapasitas: 32,
      tahun_ajaran: '2024/2025',
      is_active: true,
    },
    {
      id: 3,
      nama: 'XI TKJ 1',
      jurusan: { id: 2, kode: 'TKJ', nama: 'Teknik Komputer dan Jaringan' },
      tingkat: '11',
      wali_kelas: { id: 3, name: 'Joko Susilo' },
      jumlah_siswa: 28,
      kapasitas: 32,
      tahun_ajaran: '2024/2025',
      is_active: true,
    },
    {
      id: 4,
      nama: 'XII MM 1',
      jurusan: { id: 3, kode: 'MM', nama: 'Multimedia' },
      tingkat: '12',
      wali_kelas: { id: 4, name: 'Siti Rahayu' },
      jumlah_siswa: 25,
      kapasitas: 30,
      tahun_ajaran: '2024/2025',
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
      wali_kelas_id: kelas.wali_kelas.id,
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
   * Get jurusan badge color
   */
  const getJurusanColor = (kode) => {
    const colors = {
      RPL: 'bg-blue-100 text-blue-700',
      TKJ: 'bg-green-100 text-green-700',
      MM: 'bg-purple-100 text-purple-700',
    };
    return colors[kode] || 'bg-gray-100 text-gray-700';
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
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Data Kelas</h1>
        <p className="mt-2 text-gray-600">
          Kelola data kelas dan wali kelas
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
              placeholder="Cari nama kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filter by Jurusan */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
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
          </div>

          {/* Filter by Tingkat */}
          <select
            value={filterTingkat}
            onChange={(e) => setFilterTingkat(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">Semua Tingkat</option>
            <option value="10">Kelas X</option>
            <option value="11">Kelas XI</option>
            <option value="12">Kelas XII</option>
          </select>

          {/* Add Button */}
          <Button
            variant="primary"
            onClick={handleAdd}
            className="whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Tambah Kelas
          </Button>
        </div>
      </div>

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
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">Tidak ada data</p>
                      <p className="text-sm mt-1">
                        {searchQuery || filterJurusan !== 'all' || filterTingkat !== 'all'
                          ? 'Coba ubah filter pencarian'
                          : 'Klik tombol "Tambah Kelas" untuk menambah kelas baru'}
                      </p>
                    </div>
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
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getJurusanColor(
                          kelas.jurusan.kode
                        )}`}
                      >
                        {kelas.jurusan.kode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {kelas.tingkat === '10' && 'X'}
                      {kelas.tingkat === '11' && 'XI'}
                      {kelas.tingkat === '12' && 'XII'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {kelas.wali_kelas.name}
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

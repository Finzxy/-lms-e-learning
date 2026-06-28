import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import UserForm from '../../components/forms/UserForm';
import ActionButtons from '../../components/common/ActionButtons';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data - will be replaced with API calls
  const [users] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@test.local',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01',
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi@test.local',
      role: 'guru',
      nip: '1234567890123456',
      status: 'active',
      createdAt: '2024-01-02',
    },
    {
      id: 3,
      name: 'Ani Wijaya',
      email: 'ani@test.local',
      role: 'guru',
      nip: '1234567890123457',
      status: 'active',
      createdAt: '2024-01-03',
    },
    {
      id: 4,
      name: 'Ahmad Fauzi',
      email: 'ahmad@test.local',
      role: 'siswa',
      nis: '1001',
      kelas: 'X RPL 1',
      status: 'active',
      createdAt: '2024-01-04',
    },
    {
      id: 5,
      name: 'Siti Nurhaliza',
      email: 'siti@test.local',
      role: 'siswa',
      nis: '1002',
      kelas: 'X RPL 1',
      status: 'active',
      createdAt: '2024-01-05',
    },
  ]);

  /**
   * Handle form submit
   */
  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (selectedUser) {
        // Update user
        console.log('Update user:', selectedUser.id, data);
        alert('User updated successfully!');
      } else {
        // Create user
        console.log('Create user:', data);
        alert('User created successfully!');
      }
      
      setIsModalOpen(false);
      setSelectedUser(null);
      // TODO: Refresh user list
    } catch (error) {
      console.error('Form submit error:', error);
      alert('Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle add user
   */
  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  /**
   * Handle edit user
   */
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  /**
   * Handle delete user
   */
  const handleDelete = async (user) => {
    if (!confirm(`Yakin ingin menghapus user "${user.name}"?`)) {
      return;
    }

    try {
      setLoading(true);
      // TODO: Call API to delete user
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get role badge color
   */
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700';
      case 'guru':
        return 'bg-blue-100 text-blue-700';
      case 'siswa':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  /**
   * Filter users
   */
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Kelola User</h1>
        <p className="mt-2 text-gray-600">
          Manage users, roles, and permissions
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
              placeholder="Cari nama atau email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filter by Role */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="guru">Guru</option>
              <option value="siswa">Siswa</option>
            </select>
          </div>

          {/* Add Button */}
          <Button
            variant="primary"
            onClick={handleAdd}
            className="whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Tambah User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Info
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <p className="text-lg font-medium">Tidak ada data</p>
                      <p className="text-sm mt-1">
                        {searchQuery || filterRole !== 'all'
                          ? 'Coba ubah filter pencarian'
                          : 'Klik tombol "Tambah User" untuk menambah user baru'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-primary-600">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.role === 'guru' && user.nip && (
                        <span>NIP: {user.nip}</span>
                      )}
                      {user.role === 'siswa' && (
                        <div>
                          <div>NIS: {user.nis}</div>
                          <div className="text-xs text-gray-500">
                            {user.kelas}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Aktif</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        onEdit={() => handleEdit(user)}
                        onDelete={() => handleDelete(user)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - TODO */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan {filteredUsers.length} dari {users.length} user
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

      {/* User Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User' : 'Tambah User'}
        size="lg"
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Users;

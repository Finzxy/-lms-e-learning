import { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import StatCard from '../../components/common/StatCard';
import { 
  Download, 
  FileText, 
  Search,
  Filter,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  CheckCircle
} from 'lucide-react';

const LaporanSiswa = () => {
  const [filters, setFilters] = useState({
    jurusan: 'all',
    kelas: 'all',
    periode: 'semester',
    search: ''
  });

  // Mock data
  const laporanData = [
    {
      id: 1,
      nis: '202401001',
      nama: 'Ahmad Fauzi',
      kelas: 'XII RPL 1',
      jurusan: 'RPL',
      avgNilai: 87.5,
      kehadiran: 92,
      tugasSelesai: 45,
      totalTugas: 48,
      ranking: 3,
      trend: 'up'
    },
    {
      id: 2,
      nis: '202401002',
      nama: 'Siti Nurhaliza',
      kelas: 'XII RPL 1',
      jurusan: 'RPL',
      avgNilai: 92.3,
      kehadiran: 98,
      tugasSelesai: 48,
      totalTugas: 48,
      ranking: 1,
      trend: 'up'
    },
    {
      id: 3,
      nis: '202401003',
      nama: 'Budi Santoso',
      kelas: 'XII RPL 2',
      jurusan: 'RPL',
      avgNilai: 78.5,
      kehadiran: 85,
      tugasSelesai: 40,
      totalTugas: 48,
      ranking: 15,
      trend: 'down'
    },
    {
      id: 4,
      nis: '202401004',
      nama: 'Dewi Lestari',
      kelas: 'XII TKJ 1',
      jurusan: 'TKJ',
      avgNilai: 89.0,
      kehadiran: 95,
      tugasSelesai: 46,
      totalTugas: 48,
      ranking: 2,
      trend: 'up'
    },
  ];

  const summary = {
    totalSiswa: 1189,
    avgKehadiran: 89.5,
    avgNilai: 82.3,
    tugasOnTime: 85
  };

  const summaryStats = [
    {
      title: 'Total Siswa',
      value: '1,189',
      icon: Users,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Avg Kehadiran',
      value: '89.5%',
      icon: CheckCircle,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      trend: 2,
      trendLabel: 'vs last month',
    },
    {
      title: 'Avg Nilai',
      value: '82.3',
      icon: FileText,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: 3.5,
      trendLabel: 'vs last month',
    },
    {
      title: 'Tugas Tepat Waktu',
      value: '85%',
      icon: Calendar,
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      trend: 5,
      trendLabel: 'vs last month',
    },
  ];

  const handleExport = (format) => {
    alert(`Export laporan ke format ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laporan Siswa</h1>
          <p className="mt-2 text-gray-600">
            Laporan lengkap performa siswa per periode
          </p>
        </div>
        
        {/* Export Buttons */}
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="primary" size="sm" icon={Download} onClick={() => handleExport('PDF')}>
            Export PDF
          </Button>
          <Button variant="primary" size="sm" icon={Download} onClick={() => handleExport('Excel')}>
            Export Excel
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau NIS..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Jurusan Filter */}
          <select
            value={filters.jurusan}
            onChange={(e) => setFilters({ ...filters, jurusan: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Semua Jurusan</option>
            <option value="RPL">RPL</option>
            <option value="TKJ">TKJ</option>
            <option value="MM">Multimedia</option>
          </select>
          
          {/* Kelas Filter */}
          <select
            value={filters.kelas}
            onChange={(e) => setFilters({ ...filters, kelas: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Semua Kelas</option>
            <option value="XII">Kelas XII</option>
            <option value="XI">Kelas XI</option>
            <option value="X">Kelas X</option>
          </select>
          
          {/* Periode Filter */}
          <select
            value={filters.periode}
            onChange={(e) => setFilters({ ...filters, periode: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="semester">Semester Ini</option>
            <option value="tahun">Tahun Ajaran</option>
            <option value="bulan">Bulan Ini</option>
          </select>
        </div>
      </Card>

      {/* Data Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-sm font-semibold text-gray-900 pb-3 px-4">NIS</th>
                <th className="text-left text-sm font-semibold text-gray-900 pb-3 px-4">Nama Siswa</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Kelas</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Jurusan</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Avg Nilai</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Kehadiran</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Tugas</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Ranking</th>
                <th className="text-center text-sm font-semibold text-gray-900 pb-3 px-4">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {laporanData.map((siswa) => (
                <tr key={siswa.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{siswa.nis}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{siswa.nama}</td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant="secondary" size="sm">{siswa.kelas}</Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant="primary" size="sm">{siswa.jurusan}</Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-semibold ${
                      siswa.avgNilai >= 85 ? 'text-green-600' :
                      siswa.avgNilai >= 75 ? 'text-blue-600' :
                      siswa.avgNilai >= 65 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {siswa.avgNilai}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-semibold ${
                      siswa.kehadiran >= 90 ? 'text-green-600' :
                      siswa.kehadiran >= 80 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {siswa.kehadiran}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-sm text-gray-600">
                    {siswa.tugasSelesai}/{siswa.totalTugas}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge 
                      variant={siswa.ranking <= 3 ? 'success' : siswa.ranking <= 10 ? 'info' : 'secondary'}
                      size="sm"
                    >
                      #{siswa.ranking}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {siswa.trend === 'up' ? (
                      <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default LaporanSiswa;

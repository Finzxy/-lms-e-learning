import { useState } from 'react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  Download,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data - will be replaced with API calls later
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: 12,
      trendLabel: 'vs last month',
    },
    {
      title: 'Total Guru',
      value: '45',
      icon: GraduationCap,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      trend: 5,
      trendLabel: 'vs last month',
    },
    {
      title: 'Total Siswa',
      value: '1,189',
      icon: Users,
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      trend: 8,
      trendLabel: 'vs last month',
    },
    {
      title: 'Total Kelas',
      value: '36',
      icon: BookOpen,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: 0,
      trendLabel: 'no change',
    },
  ];

  // Activity statistics
  const activityStats = [
    { label: 'Materi Diupload', value: '156', change: '+12%', positive: true },
    { label: 'Tugas Dibuat', value: '89', change: '+8%', positive: true },
    { label: 'Tugas Dikumpulkan', value: '1,245', change: '+15%', positive: true },
    { label: 'Rata-rata Nilai', value: '82.5', change: '-2%', positive: false },
  ];

  // Distribution data
  const jurusanDistribution = [
    { name: 'RPL', siswa: 450, percentage: 38 },
    { name: 'TKJ', siswa: 380, percentage: 32 },
    { name: 'MM', siswa: 359, percentage: 30 },
  ];

  // Recent activities log
  const recentActivities = [
    {
      user: 'Admin',
      action: 'menambahkan user baru',
      target: 'Budi Santoso',
      time: '5 menit yang lalu',
      type: 'create',
    },
    {
      user: 'Pak Ahmad',
      action: 'mengupload materi',
      target: 'Pemrograman Web - React Hooks',
      time: '15 menit yang lalu',
      type: 'upload',
    },
    {
      user: 'Admin',
      action: 'mengubah jadwal',
      target: 'XII RPL 1',
      time: '1 jam yang lalu',
      type: 'update',
    },
    {
      user: 'Bu Siti',
      action: 'membuat tugas',
      target: 'Database - SQL Query',
      time: '2 jam yang lalu',
      type: 'create',
    },
    {
      user: 'Admin',
      action: 'menghapus kelas',
      target: 'XI RPL 4',
      time: '3 jam yang lalu',
      type: 'delete',
    },
  ];

  // System health
  const systemHealth = {
    server: 'Operational',
    database: 'Operational',
    storage: '65% Used',
    lastBackup: '2 hours ago',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="mt-2 text-gray-600">
            Overview dan statistik sistem LMS
          </p>
        </div>
        
        {/* Period Selector */}
        <div className="mt-4 md:mt-0 flex gap-2">
          {['today', 'week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period === 'today' ? 'Hari Ini' : 
               period === 'week' ? 'Minggu Ini' :
               period === 'month' ? 'Bulan Ini' : 'Tahun Ini'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Activity Stats */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Aktivitas Sistem
          </h3>
          <Button size="sm" variant="secondary" icon={Download}>
            Export
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {activityStats.map((stat, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.positive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribusi Jurusan */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Distribusi Siswa per Jurusan
            </h3>
          </div>
          <div className="space-y-4">
            {jurusanDistribution.map((jurusan, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{jurusan.name}</span>
                  <span className="text-sm text-gray-600">{jurusan.siswa} siswa</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${jurusan.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{jurusan.percentage}%</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <Button variant="secondary" size="sm" className="w-full" icon={BarChart3}>
              Lihat Detail Statistik
            </Button>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Aktivitas Terkini
            </h3>
            <Badge variant="info" size="sm">Live</Badge>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'create' ? 'bg-green-100' :
                  activity.type === 'update' ? 'bg-blue-100' :
                  activity.type === 'upload' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  {activity.type === 'create' && <Users className="w-4 h-4 text-green-600" />}
                  {activity.type === 'update' && <Calendar className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'upload' && <BookOpen className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'delete' && <FileText className="w-4 h-4 text-red-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
              <Users className="w-6 h-6" />
              <span className="text-sm font-medium">Tambah User</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm font-medium">Tambah Jurusan</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm font-medium">Tambah Kelas</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors">
              <Calendar className="w-6 h-6" />
              <span className="text-sm font-medium">Atur Jadwal</span>
            </button>
          </div>
        </Card>

        {/* System Health */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Status Sistem
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Server</span>
              <Badge variant="success">{systemHealth.server}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Database</span>
              <Badge variant="success">{systemHealth.database}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Storage</span>
              <Badge variant="warning">{systemHealth.storage}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">Last Backup</span>
              <span className="text-sm text-gray-600">{systemHealth.lastBackup}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="secondary" size="sm" className="w-full" icon={FileText}>
              Lihat Log Sistem
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

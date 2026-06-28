import { useState } from 'react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  BookOpen, 
  ClipboardList, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Download,
  BarChart3,
  FileText
} from 'lucide-react';

const GuruDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('all');

  // Mock data
  const stats = [
    {
      title: 'Total Materi',
      value: '24',
      icon: BookOpen,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: 3,
      trendLabel: 'this month',
    },
    {
      title: 'Total Tugas',
      value: '18',
      icon: ClipboardList,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      trend: 2,
      trendLabel: 'this month',
    },
    {
      title: 'Pending Submissions',
      value: '45',
      icon: Clock,
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      title: 'My Classes',
      value: '4',
      icon: Users,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  // Class performance
  const classPerformance = [
    { name: 'XII RPL 1', avgScore: 85.5, attendance: 92, students: 30 },
    { name: 'XII RPL 2', avgScore: 82.3, attendance: 88, students: 28 },
    { name: 'XI RPL 1', avgScore: 78.9, attendance: 85, students: 32 },
    { name: 'XI RPL 2', avgScore: 80.1, attendance: 90, students: 29 },
  ];

  // Submission status
  const submissionStatus = [
    { status: 'Sudah Dinilai', count: 125, percentage: 55, color: 'bg-green-500' },
    { status: 'Belum Dinilai', count: 45, percentage: 20, color: 'bg-yellow-500' },
    { status: 'Terlambat', count: 32, percentage: 14, color: 'bg-red-500' },
    { status: 'Belum Submit', count: 25, percentage: 11, color: 'bg-gray-500' },
  ];

  // Weekly schedule
  const todaySchedule = [
    { time: '07:00 - 08:40', class: 'XII RPL 1', subject: 'Pemrograman Web', room: 'Lab 1' },
    { time: '09:00 - 10:40', class: 'XII RPL 2', subject: 'Pemrograman Web', room: 'Lab 2' },
    { time: '11:00 - 12:40', class: 'XI RPL 1', subject: 'Algoritma', room: 'Lab 1' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Guru</h1>
          <p className="mt-2 text-gray-600">
            Kelola materi, tugas, dan penilaian siswa
          </p>
        </div>
        
        {/* Class Filter */}
        <div className="mt-4 md:mt-0">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Semua Kelas</option>
            <option value="1">XII RPL 1</option>
            <option value="2">XII RPL 2</option>
            <option value="3">XI RPL 1</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Jadwal Hari Ini
            </h3>
            <Badge variant="info" size="sm">
              {todaySchedule.length} Kelas
            </Badge>
          </div>
          <div className="space-y-3">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border-l-4 border-primary">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-900">{schedule.class}</p>
                  <Badge variant="secondary" size="sm">{schedule.room}</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-1">{schedule.subject}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{schedule.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="secondary" size="sm" className="w-full" icon={Calendar}>
              Lihat Jadwal Lengkap
            </Button>
          </div>
        </Card>

        {/* Class Performance */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Performa Kelas
            </h3>
            <Button size="sm" variant="secondary" icon={Download}>
              Export
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-sm font-semibold text-gray-900 pb-3">Kelas</th>
                  <th className="text-center text-sm font-semibold text-gray-900 pb-3">Siswa</th>
                  <th className="text-center text-sm font-semibold text-gray-900 pb-3">Rata-rata</th>
                  <th className="text-center text-sm font-semibold text-gray-900 pb-3">Kehadiran</th>
                  <th className="text-right text-sm font-semibold text-gray-900 pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classPerformance.map((cls, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium text-gray-900">{cls.name}</td>
                    <td className="py-3 text-sm text-center text-gray-600">{cls.students}</td>
                    <td className="py-3 text-sm text-center">
                      <span className={`font-semibold ${
                        cls.avgScore >= 85 ? 'text-green-600' :
                        cls.avgScore >= 75 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {cls.avgScore}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-center">
                      <span className={`font-semibold ${
                        cls.attendance >= 90 ? 'text-green-600' :
                        cls.attendance >= 80 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {cls.attendance}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {cls.avgScore >= 80 && cls.attendance >= 85 ? (
                        <Badge variant="success" size="sm">Baik</Badge>
                      ) : (
                        <Badge variant="warning" size="sm">Perlu Perhatian</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Status */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Status Pengumpulan Tugas
          </h3>
          <div className="space-y-4">
            {submissionStatus.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-gray-900">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.count}</span>
                    <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="primary" size="sm" className="w-full">
              Beri Nilai
            </Button>
            <Button variant="secondary" size="sm" className="w-full">
              Lihat Detail
            </Button>
          </div>
        </Card>

        {/* Recent Materials & Tasks */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Aktivitas Terkini
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { type: 'materi', title: 'React Hooks & State Management', class: 'XII RPL 1', time: '2 jam lalu', icon: BookOpen, bg: 'bg-blue-100', color: 'text-blue-600' },
              { type: 'tugas', title: 'Project Database MySQL', class: 'XII RPL 2', time: '5 jam lalu', icon: ClipboardList, bg: 'bg-green-100', color: 'text-green-600' },
              { type: 'nilai', title: 'UTS Pemrograman Web dinilai', class: 'XII RPL 1', time: '1 hari lalu', icon: CheckCircle, bg: 'bg-purple-100', color: 'text-purple-600' },
              { type: 'tugas', title: 'Quiz Algoritma Sorting', class: 'XI RPL 1', time: '2 hari lalu', icon: ClipboardList, bg: 'bg-yellow-100', color: 'text-yellow-600' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 ${activity.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" size="sm">{activity.class}</Badge>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Materi Bulan Ini</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Tugas Dibuat</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <ClipboardList className="w-8 h-8 text-green-200" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Nilai Diinput</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-200" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Absensi Dicatat</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <Users className="w-8 h-8 text-orange-200" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GuruDashboard;

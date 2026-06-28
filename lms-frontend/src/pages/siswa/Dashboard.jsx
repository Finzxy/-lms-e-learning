import { useState } from 'react';
import StatCard from '../../components/common/StatCard';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { 
  BookOpen, 
  ClipboardList, 
  BarChart3, 
  AlertCircle,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  Target,
  Activity
} from 'lucide-react';

const SiswaDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Mock data
  const stats = [
    {
      title: 'Materi Tersedia',
      value: '32',
      icon: BookOpen,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Tugas Aktif',
      value: '8',
      icon: ClipboardList,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Tugas Terlambat',
      value: '2',
      icon: AlertCircle,
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Rata-rata Nilai',
      value: '85.5',
      icon: BarChart3,
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: 5,
      trendLabel: 'vs last month',
    },
  ];

  // Learning progress
  const learningProgress = [
    { subject: 'Pemrograman Web', progress: 85, score: 87, color: 'bg-blue-500' },
    { subject: 'Basis Data', progress: 78, score: 82, color: 'bg-green-500' },
    { subject: 'Algoritma', progress: 92, score: 90, color: 'bg-purple-500' },
    { subject: 'Jaringan', progress: 70, score: 75, color: 'bg-yellow-500' },
  ];

  // Upcoming deadlines dengan urgency
  const upcomingDeadlines = [
    { title: 'Project React', subject: 'Pemrograman Web', deadline: '2024-02-28', daysLeft: 2, urgent: true },
    { title: 'Laporan Database', subject: 'Basis Data', deadline: '2024-03-02', daysLeft: 4, urgent: false },
    { title: 'Quiz Algoritma', subject: 'Algoritma', deadline: '2024-03-05', daysLeft: 7, urgent: false },
  ];

  // Today's schedule
  const todaySchedule = [
    { time: '07:00 - 08:40', subject: 'Pemrograman Web', teacher: 'Pak Budi', room: 'Lab 1', status: 'ongoing' },
    { time: '09:00 - 10:40', subject: 'Basis Data', teacher: 'Bu Ani', room: 'Lab 2', status: 'upcoming' },
    { time: '11:00 - 12:40', subject: 'Matematika', teacher: 'Pak Joko', room: 'Kelas 301', status: 'upcoming' },
  ];

  // Achievement
  const achievements = [
    { title: 'Perfect Attendance', desc: 'Hadir 100% bulan ini', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { title: 'Fast Learner', desc: '5 materi diselesaikan minggu ini', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'On Time', desc: 'Semua tugas tepat waktu', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Siswa</h1>
          <p className="mt-2 text-gray-600">
            Akses materi, kerjakan tugas, dan lihat nilai Anda
          </p>
        </div>
        
        {/* Period Selector */}
        <div className="mt-4 md:mt-0 flex gap-2">
          {['week', 'month', 'semester'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period === 'week' ? 'Minggu Ini' : 
               period === 'month' ? 'Bulan Ini' : 'Semester Ini'}
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

      {/* Achievements Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <Card key={index} className={`${achievement.bg} border-none`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/50 rounded-lg flex items-center justify-center">
                <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${achievement.color}`}>{achievement.title}</p>
                <p className="text-xs text-gray-600">{achievement.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
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
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                schedule.status === 'ongoing' 
                  ? 'bg-green-50 border-green-500' 
                  : 'bg-gray-50 border-gray-300'
              }`}>
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-900">{schedule.subject}</p>
                  {schedule.status === 'ongoing' && (
                    <Badge variant="success" size="sm">Berlangsung</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">{schedule.teacher}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{schedule.time}</span>
                  </div>
                  <span>{schedule.room}</span>
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

        {/* Learning Progress */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Progress Belajar
            </h3>
            <Target className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {learningProgress.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600">Nilai: <span className="font-semibold">{item.score}</span></span>
                    <span className="text-xs text-gray-600">{item.progress}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="primary" size="sm" className="w-full" icon={BookOpen}>
              Lihat Materi
            </Button>
            <Button variant="secondary" size="sm" className="w-full" icon={BarChart3}>
              Lihat Nilai
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tugas Deadline Terdekat */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            Tugas Deadline Terdekat
          </h3>
          <div className="space-y-3">
            {upcomingDeadlines.map((task, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                task.urgent ? 'bg-red-50 border-red-500' : 'bg-blue-50 border-blue-500'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-600">{task.subject}</p>
                  </div>
                  <Badge variant={task.urgent ? 'danger' : 'info'} size="sm">
                    {task.daysLeft} hari
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(task.deadline).toLocaleDateString('id-ID')}</span>
                  </div>
                  <Button size="sm" variant={task.urgent ? 'danger' : 'primary'}>
                    Kerjakan
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="secondary" size="sm" className="w-full" icon={ClipboardList}>
              Lihat Semua Tugas
            </Button>
          </div>
        </Card>

        {/* Absensi & Nilai */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Ringkasan Kehadiran & Nilai
          </h3>
          
          {/* Absensi Bulan Ini */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Absensi Bulan Ini</p>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">18</p>
                <p className="text-xs text-gray-600 mt-1">Hadir</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">1</p>
                <p className="text-xs text-gray-600 mt-1">Sakit</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">1</p>
                <p className="text-xs text-gray-600 mt-1">Izin</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="text-xs text-gray-600 mt-1">Alpha</p>
              </div>
            </div>
            <div className="mt-3 p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">Persentase Kehadiran</span>
                <span className="font-semibold text-green-600">90%</span>
              </div>
            </div>
          </div>

          {/* Nilai Terbaru */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Nilai Terbaru</p>
            <div className="space-y-2">
              {[
                { subject: 'Pemrograman Web', score: 90, type: 'UTS' },
                { subject: 'Basis Data', score: 85, type: 'Tugas' },
                { subject: 'Algoritma', score: 88, type: 'Quiz' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      item.score >= 85 ? 'text-green-600' :
                      item.score >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {item.score}
                    </p>
                    <Badge 
                      variant={item.score >= 85 ? 'success' : item.score >= 70 ? 'warning' : 'danger'} 
                      size="sm"
                    >
                      {item.score >= 85 ? 'A' : item.score >= 70 ? 'B' : 'C'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Materi Terbaru */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Materi Terbaru
          </h3>
          <Button size="sm" variant="secondary">Lihat Semua</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'React Hooks & State Management', teacher: 'Pak Budi', subject: 'Pemrograman Web', date: '1 hari lalu', icon: BookOpen },
            { title: 'Normalisasi Database', teacher: 'Bu Ani', subject: 'Basis Data', date: '2 hari lalu', icon: BookOpen },
            { title: 'Algoritma Sorting', teacher: 'Pak Joko', subject: 'Algoritma', date: '3 hari lalu', icon: BookOpen },
          ].map((materi, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <materi.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                {materi.title}
              </h4>
              <div className="flex flex-col gap-1">
                <Badge variant="primary" size="sm" className="w-fit">{materi.subject}</Badge>
                <p className="text-xs text-gray-600">{materi.teacher}</p>
                <p className="text-xs text-gray-500">{materi.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SiswaDashboard;

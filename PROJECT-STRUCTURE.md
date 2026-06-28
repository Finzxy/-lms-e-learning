# 📁 LMS Project Structure

## Root Directory

```
E-Lerning/
├── lms-frontend/              # React + Vite frontend
├── lms-backend/               # Laravel backend (to be created)
├── LMS-Implementation-Plan.md # Master implementation plan
├── BACKEND-SETUP.md           # Backend setup guide
├── PHASE-1-COMPLETED.md       # Phase 1 completion report
└── PROJECT-STRUCTURE.md       # This file
```

## Frontend Structure (lms-frontend/)

```
lms-frontend/
├── node_modules/              # Dependencies
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, icons
│   ├── components/
│   │   ├── common/           # ✅ Reusable UI components
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Table.jsx
│   │   ├── forms/            # Form-specific components
│   │   └── layout/           # Layout components (Sidebar, Navbar)
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx   # (Phase 2)
│   │   └── ThemeContext.jsx  # (Phase 7)
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js        # (Phase 2)
│   │   └── useFetch.js       # (Phase 3)
│   ├── layouts/              # Page layouts
│   │   ├── AppLayout.jsx     # (Phase 3)
│   │   └── AuthLayout.jsx    # (Phase 2)
│   ├── pages/                # Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx     # (Phase 2)
│   │   │   └── Register.jsx  # (Phase 2)
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx # (Phase 3)
│   │   │   ├── Users.jsx     # (Phase 4)
│   │   │   ├── Jurusan.jsx   # (Phase 4)
│   │   │   └── Kelas.jsx     # (Phase 4)
│   │   ├── guru/
│   │   │   ├── Dashboard.jsx # (Phase 3)
│   │   │   ├── Materi.jsx    # (Phase 5)
│   │   │   ├── Tugas.jsx     # (Phase 5)
│   │   │   ├── Nilai.jsx     # (Phase 6)
│   │   │   └── Absensi.jsx   # (Phase 6)
│   │   └── siswa/
│   │       ├── Dashboard.jsx # (Phase 3)
│   │       ├── Materi.jsx    # (Phase 5)
│   │       ├── Tugas.jsx     # (Phase 5)
│   │       ├── Nilai.jsx     # (Phase 6)
│   │       └── Absensi.jsx   # (Phase 6)
│   ├── routes/               # Routing configuration
│   │   ├── index.jsx         # (Phase 2)
│   │   └── PrivateRoute.jsx  # (Phase 2)
│   ├── services/             # ✅ API service layer
│   │   ├── api.js            # Axios instance
│   │   ├── authService.js    # Auth endpoints
│   │   ├── userService.js    # User CRUD
│   │   ├── materiService.js  # (Phase 5)
│   │   ├── tugasService.js   # (Phase 5)
│   │   ├── nilaiService.js   # (Phase 6)
│   │   └── absensiService.js # (Phase 6)
│   ├── utils/                # ✅ Utility functions
│   │   ├── formatDate.js     # Date formatting
│   │   ├── roleHelper.js     # Role utilities
│   │   └── validation.js     # (Phase 4)
│   ├── App.jsx               # ✅ Root component
│   ├── index.css             # ✅ Global styles + Tailwind
│   └── main.jsx              # Entry point
├── .env.local                # ✅ Environment variables
├── .gitignore                # ✅ Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── postcss.config.js         # ✅ PostCSS configuration
├── tailwind.config.js        # ✅ Tailwind configuration
├── vite.config.js            # ✅ Vite configuration
└── README.md                 # ✅ Frontend documentation
```

## Backend Structure (lms-backend/) - To Be Created

```
lms-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── API/
│   │   │       ├── AuthController.php
│   │   │       ├── UserController.php
│   │   │       ├── JurusanController.php
│   │   │       ├── KelasController.php
│   │   │       ├── MataPelajaranController.php
│   │   │       ├── MateriController.php
│   │   │       ├── TugasController.php
│   │   │       ├── NilaiController.php
│   │   │       └── AbsensiController.php
│   │   ├── Middleware/
│   │   │   └── CheckRole.php
│   │   └── Requests/
│   │       └── (validation requests)
│   ├── Models/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Jurusan.php
│   │   ├── Kelas.php
│   │   ├── MataPelajaran.php
│   │   ├── Jadwal.php
│   │   ├── Materi.php
│   │   ├── Tugas.php
│   │   ├── PengumpulanTugas.php
│   │   ├── Nilai.php
│   │   ├── Absensi.php
│   │   └── Pengumuman.php
│   └── Traits/
│       └── (reusable logic)
├── config/
│   ├── cors.php              # CORS configuration
│   └── sanctum.php           # Sanctum configuration
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_000000_create_roles_table.php
│   │   ├── 2024_01_01_000001_create_users_table.php
│   │   ├── 2024_01_01_000002_create_jurusan_table.php
│   │   ├── 2024_01_01_000003_create_kelas_table.php
│   │   ├── 2024_01_01_000004_create_mata_pelajarans_table.php
│   │   ├── 2024_01_01_000005_create_jadwals_table.php
│   │   ├── 2024_01_01_000006_create_materis_table.php
│   │   ├── 2024_01_01_000007_create_tugas_table.php
│   │   ├── 2024_01_01_000008_create_pengumpulan_tugas_table.php
│   │   ├── 2024_01_01_000009_create_nilais_table.php
│   │   ├── 2024_01_01_000010_create_absensis_table.php
│   │   └── 2024_01_01_000011_create_pengumuman_table.php
│   └── seeders/
│       ├── RoleSeeder.php
│       ├── UserSeeder.php
│       ├── JurusanSeeder.php
│       └── DatabaseSeeder.php
├── routes/
│   ├── api.php               # API routes
│   └── web.php               # Web routes
├── storage/
│   ├── app/
│   │   └── public/
│   │       ├── materi/       # Uploaded materi files
│   │       └── tugas/        # Uploaded tugas files
│   └── logs/
├── .env                      # Environment variables
├── .gitignore                # Git ignore rules
├── composer.json             # PHP dependencies
└── artisan                   # Laravel CLI
```

## Database Schema

See `LMS-Implementation-Plan.md` section "🗄️ Database Schema" for complete table definitions.

### Main Tables:
- `roles` - User roles (admin, guru, siswa)
- `users` - All users with role_id
- `jurusan` - Departments/majors
- `kelas` - Classes
- `mata_pelajarans` - Subjects
- `jadwals` - Schedules
- `materis` - Learning materials
- `tugas` - Assignments
- `pengumpulan_tugas` - Assignment submissions
- `nilais` - Grades
- `absensis` - Attendance
- `pengumuman` - Announcements

## API Endpoints

### Authentication
```
POST   /api/register
POST   /api/login
POST   /api/logout          (auth)
GET    /api/me              (auth)
```

### User Management (Admin)
```
GET    /api/users           (admin)
POST   /api/users           (admin)
GET    /api/users/{id}      (admin)
PUT    /api/users/{id}      (admin)
DELETE /api/users/{id}      (admin)
```

### Master Data (Admin)
```
CRUD   /api/jurusan         (admin)
CRUD   /api/kelas           (admin)
CRUD   /api/mata-pelajaran  (admin)
CRUD   /api/jadwal          (admin)
```

### Materi (Guru & Siswa)
```
GET    /api/materi          (auth)
POST   /api/materi          (guru)
GET    /api/materi/{id}     (auth)
DELETE /api/materi/{id}     (guru)
```

### Tugas
```
GET    /api/tugas           (auth)
POST   /api/tugas           (guru)
PUT    /api/tugas/{id}      (guru)
POST   /api/tugas/{id}/submit (siswa)
```

### Nilai
```
GET    /api/nilai           (auth)
POST   /api/nilai           (guru)
PUT    /api/nilai/{id}      (guru)
POST   /api/nilai/bulk-update (guru)
```

### Absensi
```
GET    /api/absensi         (auth)
POST   /api/absensi         (guru)
GET    /api/absensi/recap   (guru)
```

## Development Phases

- [x] **Phase 1:** Setup Project (1-2 days) ✅
- [ ] **Phase 2:** Authentication System (2 days)
- [ ] **Phase 3:** Dashboard & Layout (2 days)
- [ ] **Phase 4:** CRUD Management (4-6 days)
- [ ] **Phase 5:** Materi & Tugas Management (5 days)
- [ ] **Phase 6:** Nilai & Absensi (4 days)
- [ ] **Phase 7:** Finishing & Deployment (3 days)

**Total:** 21 days (3 weeks)

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React

### Backend
- Laravel 10
- Laravel Sanctum
- MySQL 8.0
- PHP 8.1+

## Color Scheme

- **Primary:** #002B5B (Navy Blue)
- **Secondary:** #0056A3 (Blue)
- **Font:** Poppins

## Development Servers

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **Database:** localhost:3306

## Documentation Files

- `LMS-Implementation-Plan.md` - Complete implementation guide
- `BACKEND-SETUP.md` - Backend setup instructions
- `PHASE-1-COMPLETED.md` - Phase 1 completion report
- `PROJECT-STRUCTURE.md` - This file
- `lms-frontend/README.md` - Frontend-specific docs

---

**Last Updated:** Phase 1 Completed
**Next:** Phase 2 - Authentication System

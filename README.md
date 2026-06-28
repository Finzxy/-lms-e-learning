# 🎓 LMS SMKN 2 Kuningan

Learning Management System untuk SMKN 2 Kuningan - Built with React + Laravel

## 📊 Project Status

**Current Phase:** Phase 1 ✅ COMPLETED  
**Next Phase:** Phase 2 - Authentication System  
**Overall Progress:** 14% (1/7 phases)

### Phase Progress

| Phase | Name | Duration | Status |
|-------|------|----------|--------|
| 1 | Setup Project | 1-2 days | ✅ **DONE** |
| 2 | Authentication System | 2 days | ⏳ Next |
| 3 | Dashboard & Layout | 2 days | 📋 Planned |
| 4 | CRUD Management | 4-6 days | 📋 Planned |
| 5 | Materi & Tugas | 5 days | 📋 Planned |
| 6 | Nilai & Absensi | 4 days | 📋 Planned |
| 7 | Finishing & Deployment | 3 days | 📋 Planned |

**Total Estimated Time:** 21 days (3 weeks)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PHP 8.1+
- Composer
- MySQL 8.0+

### Frontend (✅ Ready)
```bash
cd lms-frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend (⏳ Setup Required)
```bash
# Follow BACKEND-SETUP.md for complete instructions
composer create-project laravel/laravel lms-backend
cd lms-backend
# ... (see BACKEND-SETUP.md)
php artisan serve
# Open http://localhost:8000
```

## 📁 Project Structure

```
E-Lerning/
├── lms-frontend/          # ✅ React + Vite + Tailwind
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utilities
│   │   └── ...
│   └── ...
├── lms-backend/           # ⏳ Laravel + Sanctum (to be setup)
│   ├── app/
│   │   ├── Models/
│   │   ├── Http/Controllers/
│   │   └── ...
│   └── ...
└── *.md                   # 📄 Documentation
```

## 🎯 Features (Planned)

### For Admin
- ✅ User management (CRUD)
- ✅ Jurusan & Kelas management
- ✅ Mata Pelajaran management
- ✅ Jadwal management
- ✅ System monitoring

### For Guru (Teachers)
- 📚 Upload materi pembelajaran
- ✏️ Create & manage tugas (assignments)
- ⭐ Input & manage nilai (grades)
- ✅ Record absensi (attendance)
- 💬 Forum diskusi

### For Siswa (Students)
- 📖 View & download materi
- ✏️ Submit tugas
- ⭐ View nilai
- ✅ View absensi
- 💬 Participate in forum

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Laravel 10** - PHP framework
- **Laravel Sanctum** - Authentication
- **MySQL 8.0** - Database
- **PHP 8.1+** - Programming language

## 🎨 Design System

- **Primary Color:** #002B5B (Navy Blue)
- **Secondary Color:** #0056A3 (Blue)
- **Font:** Poppins
- **UI Framework:** Tailwind CSS

## 📚 Documentation

| File | Description |
|------|-------------|
| [QUICK-START.md](QUICK-START.md) | Quick start guide |
| [BACKEND-SETUP.md](BACKEND-SETUP.md) | Backend setup instructions |
| [PHASE-1-COMPLETED.md](PHASE-1-COMPLETED.md) | Phase 1 completion report |
| [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) | Complete project structure |
| [lms-frontend/README.md](lms-frontend/README.md) | Frontend documentation |

## 🔐 Authentication Flow

```
User Login → Laravel Sanctum Token → Store in localStorage
→ Axios Interceptor adds token to requests
→ Role-based routing (Admin/Guru/Siswa)
```

## 📊 Database Schema

### Main Tables
- `roles` - User roles
- `users` - All users
- `jurusan` - Departments
- `kelas` - Classes
- `mata_pelajarans` - Subjects
- `jadwals` - Schedules
- `materis` - Learning materials
- `tugas` - Assignments
- `nilais` - Grades
- `absensis` - Attendance
- `pengumuman` - Announcements

See implementation plan for complete schema.

## 🌐 API Endpoints

### Authentication
```
POST /api/login
POST /api/logout
GET  /api/me
```

### Resources (Role-based)
```
/api/users          (Admin)
/api/jurusan        (Admin)
/api/kelas          (Admin)
/api/materi         (Guru, Siswa)
/api/tugas          (Guru, Siswa)
/api/nilai          (Guru, Siswa)
/api/absensi        (Guru, Siswa)
```

## 🧪 Testing

### Frontend
```bash
cd lms-frontend
npm run dev
# Test at http://localhost:3000
```

### Backend (after setup)
```bash
cd lms-backend
php artisan serve
# Test with Postman at http://localhost:8000/api
```

## 📝 Development Workflow

1. **Terminal 1:** Frontend dev server
   ```bash
   cd lms-frontend && npm run dev
   ```

2. **Terminal 2:** Backend server
   ```bash
   cd lms-backend && php artisan serve
   ```

3. **Terminal 3:** Database (if needed)
   ```bash
   mysql -u root -p
   ```

## 🎯 Next Steps

### Phase 2 Tasks (Authentication)

**Backend:**
- [ ] Create migrations (roles, users)
- [ ] Create models with relationships
- [ ] Create AuthController
- [ ] Setup API routes
- [ ] Create seeders
- [ ] Test with Postman

**Frontend:**
- [ ] Create AuthContext
- [ ] Create Login page
- [ ] Create PrivateRoute
- [ ] Setup routing
- [ ] Test login flow

**Goal:** User dapat login dan redirect ke dashboard sesuai role

## 👥 Target Users

- **Admin:** 1-2 users
- **Guru:** ~50 users
- **Siswa:** ~500 users

## 📦 Installation

See [QUICK-START.md](QUICK-START.md) for detailed installation instructions.

## 🤝 Contributing

Follow the 7-phase implementation plan for structured development.

## 📄 License

This project is for SMKN 2 Kuningan internal use.

---

**Last Updated:** Phase 1 Completed  
**Version:** 0.1.0 (MVP in progress)  
**Estimated Completion:** 21 days from start

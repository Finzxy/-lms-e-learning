# 🚀 Quick Start Guide - LMS SMKN 2 Kuningan

## Prerequisites

Pastikan sudah terinstall:
- ✅ Node.js (v18 or higher)
- ✅ npm atau yarn
- ⏳ PHP 8.1+ (untuk backend)
- ⏳ Composer (untuk backend)
- ⏳ MySQL 8.0+ (untuk backend)

## Phase 1: Frontend Setup ✅ COMPLETED

### 1. Frontend sudah running!

```bash
# Jika dev server belum jalan, jalankan:
cd lms-frontend
npm run dev
```

Frontend akan berjalan di: **http://localhost:3000**

### 2. Test Tailwind CSS

Buka browser ke `http://localhost:3000` - Anda akan melihat:
- ✅ Halaman dengan styling Tailwind
- ✅ Font Poppins
- ✅ Warna primary (Navy Blue #002B5B)
- ✅ Loading spinner animation

## Phase 2: Backend Setup ⏳ NEXT

### 1. Install Laravel

```bash
# Di root project (D:\Project\E Lerning\)
composer create-project laravel/laravel lms-backend
cd lms-backend
```

### 2. Install Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 3. Setup Database

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE lms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 4. Configure .env

```bash
cp .env.example .env
```

Edit `.env`:
```env
DB_DATABASE=lms_db
DB_USERNAME=root
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### 5. Generate Key & Migrate

```bash
php artisan key:generate
php artisan migrate
```

### 6. Start Backend Server

```bash
php artisan serve
```

Backend akan berjalan di: **http://localhost:8000**

## Development Workflow

### Terminal 1: Frontend
```bash
cd lms-frontend
npm run dev
# Running on http://localhost:3000
```

### Terminal 2: Backend (setelah setup)
```bash
cd lms-backend
php artisan serve
# Running on http://localhost:8000
```

## Project Structure

```
E-Lerning/
├── lms-frontend/          ✅ React + Vite (DONE)
├── lms-backend/           ⏳ Laravel (TODO)
└── *.md                   📄 Documentation
```

## What's Next?

### Immediate Next Steps (Phase 2):

**Backend:**
1. Create migrations (roles, users)
2. Create models (Role, User)
3. Create AuthController
4. Define API routes
5. Create seeders
6. Test with Postman

**Frontend:**
1. Create AuthContext
2. Create Login page
3. Create PrivateRoute
4. Setup routing
5. Test login flow

### Goal Phase 2:
✅ User dapat login dengan `admin@test.local / password`

## Useful Commands

### Frontend
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend (after setup)
```bash
# Install dependencies
composer install

# Run migrations
php artisan migrate

# Run seeders
php artisan db:seed

# Clear cache
php artisan cache:clear
php artisan config:clear

# Create migration
php artisan make:migration create_roles_table

# Create model
php artisan make:model Role

# Create controller
php artisan make:controller API/AuthController
```

## Testing

### Test Frontend
1. Open http://localhost:3000
2. Check console for errors
3. Verify Tailwind styles working

### Test Backend (after setup)
1. Open http://localhost:8000
2. Test API with Postman:
   ```
   GET http://localhost:8000/api/test
   ```

## Common Issues

### Frontend Issues

**Issue:** `npm run dev` error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Tailwind not working
```bash
# Solution: Check tailwind.config.js and restart dev server
npm run dev
```

### Backend Issues (after setup)

**Issue:** Database connection failed
```bash
# Solution: Check .env credentials and MySQL running
php artisan config:clear
```

**Issue:** CORS error
```bash
# Solution: Check config/cors.php
# Ensure 'allowed_origins' includes 'http://localhost:3000'
```

## Documentation

- 📘 **LMS-Implementation-Plan.md** - Complete 7-phase plan
- 📗 **BACKEND-SETUP.md** - Detailed backend setup
- 📙 **PHASE-1-COMPLETED.md** - Phase 1 report
- 📕 **PROJECT-STRUCTURE.md** - Full project structure
- 📔 **lms-frontend/README.md** - Frontend docs

## Support

Jika ada masalah:
1. Check documentation files
2. Check console/terminal for errors
3. Verify all prerequisites installed
4. Check .env configuration

## Progress Tracker

- [x] Phase 1: Setup Project ✅
- [ ] Phase 2: Authentication System
- [ ] Phase 3: Dashboard & Layout
- [ ] Phase 4: CRUD Management
- [ ] Phase 5: Materi & Tugas
- [ ] Phase 6: Nilai & Absensi
- [ ] Phase 7: Finishing & Deployment

---

**Current Status:** Phase 1 Complete ✅  
**Next:** Phase 2 - Authentication System  
**Estimated Time:** 2 days for Phase 2

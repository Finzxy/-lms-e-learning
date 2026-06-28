# Backend Setup Guide - Laravel

## Prerequisites

- PHP 8.1 or higher
- Composer
- MySQL 8.0 or higher
- Git

## Installation Steps

### 1. Create Laravel Project

```bash
composer create-project laravel/laravel lms-backend
cd lms-backend
```

### 2. Install Laravel Sanctum

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 3. Configure Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `.env` file:

```env
APP_NAME="LMS SMKN 2 Kuningan"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lms_db
DB_USERNAME=root
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DRIVER=cookie
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE lms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 6. Configure CORS

Edit `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### 7. Configure Sanctum

Edit `config/sanctum.php`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1')),
```

Add to `app/Http/Kernel.php` in `api` middleware group:

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### 8. Run Migrations

```bash
php artisan migrate
```

### 9. Create Storage Link

```bash
php artisan storage:link
```

### 10. Start Development Server

```bash
php artisan serve
# Server will run on http://localhost:8000
```

## Next Steps (Phase 2)

1. Create migrations for:
   - roles
   - users (with role_id)
   - jurusan
   - kelas
   - mata_pelajaran
   - jadwal
   - materi
   - tugas
   - pengumpulan_tugas
   - nilai
   - absensi
   - pengumuman

2. Create models with relationships

3. Create API controllers:
   - AuthController
   - UserController
   - JurusanController
   - etc.

4. Create seeders for test data

5. Define API routes in `routes/api.php`

## Folder Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   └── API/
│   │       ├── AuthController.php
│   │       ├── UserController.php
│   │       └── ...
│   ├── Middleware/
│   │   └── CheckRole.php
│   └── Requests/
│       └── ...
├── Models/
│   ├── User.php
│   ├── Role.php
│   ├── Jurusan.php
│   └── ...
└── Traits/
    └── ...

database/
├── migrations/
│   └── ...
└── seeders/
    ├── RoleSeeder.php
    ├── UserSeeder.php
    └── DatabaseSeeder.php

routes/
├── api.php
└── web.php
```

## Testing API

Use Postman or Insomnia to test endpoints:

```
GET  http://localhost:8000/api/test
POST http://localhost:8000/api/login
POST http://localhost:8000/api/register
GET  http://localhost:8000/api/me (with Bearer token)
```

## Common Issues

### Issue: CORS Error
**Solution:** Check `config/cors.php` and ensure frontend URL is in `allowed_origins`

### Issue: 419 CSRF Token Mismatch
**Solution:** Ensure Sanctum middleware is properly configured in `Kernel.php`

### Issue: Database Connection Failed
**Solution:** Check `.env` database credentials and ensure MySQL is running

### Issue: Storage Link Not Working
**Solution:** Run `php artisan storage:link` and check file permissions

## Production Checklist

- [ ] Set `APP_DEBUG=false`
- [ ] Set `APP_ENV=production`
- [ ] Use strong `APP_KEY`
- [ ] Configure proper database credentials
- [ ] Set up SSL certificate
- [ ] Configure file upload limits
- [ ] Set up backup strategy
- [ ] Configure error logging
- [ ] Enable rate limiting
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Run `php artisan view:cache`

## Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Laravel API Resources](https://laravel.com/docs/eloquent-resources)

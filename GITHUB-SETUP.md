# Setup GitHub Repository

## Langkah-langkah Push ke GitHub:

### 1. Buat Repository Baru di GitHub
1. Buka https://github.com/new
2. Isi detail repository:
   - **Repository name**: `lms-e-learning` (atau nama yang kamu mau)
   - **Description**: "Learning Management System - E-Learning Platform"
   - **Visibility**: Public atau Private (pilih sesuai kebutuhan)
   - **JANGAN centang** "Initialize this repository with a README" (karena kita sudah punya)
3. Klik **Create repository**

### 2. Setelah Repository Dibuat
GitHub akan menampilkan instruksi. Kamu cukup copy URL repository-nya (contoh: `https://github.com/username/lms-e-learning.git`)

### 3. Jalankan Command Berikut di Terminal
```bash
# Rename branch ke main
git branch -M main

# Tambahkan remote origin (ganti URL dengan URL repository kamu)
git remote add origin https://github.com/username/lms-e-learning.git

# Push ke GitHub
git push -u origin main
```

### 4. Verifikasi
Refresh halaman GitHub repository kamu, semua file seharusnya sudah terupload.

---

## Alternatif: Menggunakan GitHub CLI (Lebih Cepat)

Jika kamu mau install GitHub CLI untuk memudahkan ke depannya:

### Install GitHub CLI:
```bash
# Menggunakan winget (Windows Package Manager)
winget install --id GitHub.cli

# Atau download dari: https://cli.github.com/
```

### Setelah Install, Login dan Buat Repo:
```bash
# Login ke GitHub
gh auth login

# Buat repository dan push sekaligus
gh repo create lms-e-learning --public --source=. --remote=origin --push
```

---

## Status Saat Ini
✅ Git repository sudah diinisialisasi
✅ File sudah di-commit
✅ Siap untuk di-push ke GitHub

Tinggal pilih salah satu cara di atas untuk upload ke GitHub!

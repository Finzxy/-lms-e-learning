# 🎨 Priority 2 Wireframes - Before Phase 4 (CRUD)

## 📋 Admin CRUD Pages

### 1. Jurusan Management Page

```mermaid
graph TB
    subgraph "Jurusan Page - /admin/jurusan"
        direction TB
        
        T[Page Title: Data Jurusan]
        
        subgraph "Action Bar"
            B1[+ Tambah Jurusan Button]
            S[Search Input]
            F[Filter: Status Aktif/Nonaktif]
        end
        
        subgraph "Jurusan Table"
            TH[Headers: No | Kode | Nama Jurusan | Deskripsi | Status | Aksi]
            TR1[1 | RPL | Rekayasa Perangkat Lunak | ... | Aktif | Edit Delete]
            TR2[2 | TKJ | Teknik Komputer Jaringan | ... | Aktif | Edit Delete]
            TR3[3 | MM | Multimedia | ... | Aktif | Edit Delete]
        end
        
        P[Pagination: 1 2 3 ... Next]
        
        T --> B1
        B1 --> S
        S --> F
        F --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> P
    end
    
    M[Modal: Form Jurusan]
    B1 -.->|Click| M
    
    style B1 fill:#10b981
    style TR1 fill:#f8fafc
```

**Jurusan Table Columns:**
- No (Auto increment)
- Kode Jurusan (3-4 karakter, unique)
- Nama Jurusan (Full name)
- Deskripsi (Optional)
- Status (Aktif/Nonaktif badge)
- Aksi (Edit, Delete buttons)

### 2. Kelas Management Page

```mermaid
graph TB
    subgraph "Kelas Page - /admin/kelas"
        direction TB
        
        T[Page Title: Data Kelas]
        
        subgraph "Action Bar"
            B1[+ Tambah Kelas Button]
            S[Search Input]
            F1[Filter: Jurusan]
            F2[Filter: Tingkat]
        end
        
        subgraph "Kelas Table"
            TH[Headers: No | Nama Kelas | Jurusan | Tingkat | Wali Kelas | Jml Siswa | Aksi]
            TR1[1 | X RPL 1 | RPL | 10 | Pak Budi | 32 | Edit Delete]
            TR2[2 | X RPL 2 | RPL | 10 | Bu Ani | 30 | Edit Delete]
            TR3[3 | XI TKJ 1 | TKJ | 11 | Pak Joko | 28 | Edit Delete]
        end
        
        P[Pagination]
        
        T --> B1
        B1 --> S
        S --> F1
        F1 --> F2
        F2 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> P
    end
    
    M[Modal: Form Kelas]
    B1 -.->|Click| M
    
    style B1 fill:#10b981
```

**Kelas Table Columns:**
- No
- Nama Kelas (e.g., "X RPL 1")
- Jurusan (Badge with color)
- Tingkat (10, 11, 12)
- Wali Kelas (Guru name)
- Jumlah Siswa (Count)
- Aksi (Edit, Delete, View Students)

### 3. Mata Pelajaran Management Page

```mermaid
graph TB
    subgraph "Mata Pelajaran Page - /admin/mata-pelajaran"
        direction TB
        
        T[Page Title: Data Mata Pelajaran]
        
        subgraph "Action Bar"
            B1[+ Tambah Mata Pelajaran Button]
            S[Search Input]
            F1[Filter: Kategori]
            F2[Filter: Jurusan]
        end
        
        subgraph "Mata Pelajaran Table"
            TH[Headers: No | Kode | Nama | Kategori | Jurusan | SKS | Aksi]
            TR1[1 | MTK | Matematika | Umum | Semua | 4 | Edit Delete]
            TR2[2 | PWEB | Pemrograman Web | Produktif | RPL | 6 | Edit Delete]
            TR3[3 | JKM | Jaringan Komputer | Produktif | TKJ | 6 | Edit Delete]
        end
        
        P[Pagination]
        
        T --> B1
        B1 --> S
        S --> F1
        F1 --> F2
        F2 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> P
    end
    
    M[Modal: Form Mata Pelajaran]
    B1 -.->|Click| M
    
    style B1 fill:#10b981
```

**Mata Pelajaran Table Columns:**
- No
- Kode Mapel (Unique identifier)
- Nama Mata Pelajaran
- Kategori (Umum, Produktif, Muatan Lokal)
- Jurusan (Semua/Specific)
- SKS/Jam (Credit hours)
- Aksi (Edit, Delete)

### 4. Jadwal Pelajaran Page - Calendar View

```mermaid
graph TB
    subgraph "Jadwal Page - /admin/jadwal"
        direction TB
        
        T[Page Title: Jadwal Pelajaran]
        
        subgraph "View Toggle"
            V1[Calendar View - Active]
            V2[Table View]
        end
        
        subgraph "Filters"
            F1[Select: Kelas]
            F2[Select: Hari]
            F3[Select: Semester]
        end
        
        B1[+ Tambah Jadwal Button]
        
        subgraph "Calendar Grid"
            direction LR
            
            subgraph "Monday"
                M1[07:00-08:30 Matematika Pak Budi]
                M2[08:30-10:00 B. Indonesia Bu Ani]
                M3[10:15-11:45 Istirahat]
            end
            
            subgraph "Tuesday"
                T1[07:00-08:30 IPA Pak Joko]
                T2[08:30-10:00 Pemrograman Web Bu Siti]
            end
            
            subgraph "Wednesday"
                W1[07:00-08:30 Matematika Pak Budi]
                W2[08:30-10:00 Database Pak Andi]
            end
        end
        
        T --> V1
        V1 --> V2
        V2 --> F1
        F1 --> F2
        F2 --> F3
        F3 --> B1
        B1 --> M1
    end
    
    style V1 fill:#3b82f6
    style M1 fill:#dbeafe
    style T1 fill:#dcfce7
    style W1 fill:#fef3c7
```

### 5. Jadwal Pelajaran Page - Table View

```mermaid
graph TB
    subgraph "Jadwal Table View"
        direction TB
        
        subgraph "Action Bar"
            V1[Calendar View]
            V2[Table View - Active]
            B1[+ Tambah Jadwal]
            E1[Export to PDF]
        end
        
        subgraph "Jadwal Table"
            TH[Headers: Hari | Jam | Mata Pelajaran | Guru | Kelas | Ruangan | Aksi]
            TR1[Senin | 07:00-08:30 | Matematika | Pak Budi | X RPL 1 | R.101 | Edit Delete]
            TR2[Senin | 08:30-10:00 | B. Indonesia | Bu Ani | X RPL 1 | R.101 | Edit Delete]
            TR3[Selasa | 07:00-08:30 | IPA | Pak Joko | X RPL 1 | Lab.1 | Edit Delete]
        end
        
        P[Pagination]
        
        V1 --> V2
        V2 --> B1
        B1 --> E1
        E1 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> P
    end
    
    style V2 fill:#3b82f6
    style B1 fill:#10b981
```

**Jadwal Table Columns:**
- Hari (Senin-Jumat)
- Jam (Start-End time)
- Mata Pelajaran
- Guru (Teacher name)
- Kelas
- Ruangan (Room number)
- Aksi (Edit, Delete, Duplicate)

---

## 📝 Form Component Specifications

### 1. UserForm Component

```mermaid
graph TB
    subgraph "UserForm - Modal"
        direction TB
        
        H[Modal Header: Tambah/Edit User]
        
        subgraph "Form Fields"
            F1[Input: Nama Lengkap - Required]
            F2[Input: Email - Required, Unique]
            F3[Input: Password - Required on Create]
            F4[Select: Role - Required - Admin/Guru/Siswa]
            
            subgraph "Conditional Fields - If Guru"
                G1[Input: NIP]
                G2[Input: No. Telepon]
                G3[Select: Mata Pelajaran - Multiple]
            end
            
            subgraph "Conditional Fields - If Siswa"
                S1[Input: NIS]
                S2[Select: Kelas - Required]
                S3[Input: No. Telepon Ortu]
                S4[Select: Jenis Kelamin]
                S5[Input: Tanggal Lahir]
            end
            
            F5[Textarea: Alamat - Optional]
            F6[Toggle: Status Aktif - Default True]
        end
        
        subgraph "Footer Actions"
            B1[Cancel Button]
            B2[Save Button]
        end
        
        H --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> G1
        F4 --> S1
        G1 --> G2
        G2 --> G3
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> S5
        S5 --> F5
        F5 --> F6
        F6 --> B1
        B1 --> B2
    end
    
    style F1 fill:#fef3c7
    style F2 fill:#fef3c7
    style F3 fill:#fef3c7
    style F4 fill:#fef3c7
    style B2 fill:#10b981
```

**UserForm Validation Rules:**
```javascript
{
  nama: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique: true
  },
  password: {
    required: mode === 'create',
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  },
  role: {
    required: true,
    enum: ['admin', 'guru', 'siswa']
  },
  nip: {
    required: role === 'guru',
    pattern: /^\d{18}$/
  },
  nis: {
    required: role === 'siswa',
    pattern: /^\d{10}$/
  },
  kelas_id: {
    required: role === 'siswa'
  }
}
```

### 2. JurusanForm Component

```mermaid
graph TB
    subgraph "JurusanForm - Modal"
        direction TB
        
        H[Modal Header: Tambah/Edit Jurusan]
        
        subgraph "Form Fields"
            F1[Input: Kode Jurusan - Required, 3-4 chars, Uppercase]
            F2[Input: Nama Jurusan - Required]
            F3[Textarea: Deskripsi - Optional]
            F4[Toggle: Status Aktif - Default True]
        end
        
        subgraph "Footer Actions"
            B1[Cancel Button]
            B2[Save Button]
        end
        
        H --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> B1
        B1 --> B2
    end
    
    style F1 fill:#fef3c7
    style F2 fill:#fef3c7
    style B2 fill:#10b981
```

**JurusanForm Props:**
```javascript
{
  mode: 'create' | 'edit',
  initialData: {
    kode: string,
    nama: string,
    deskripsi: string,
    is_active: boolean
  },
  onSubmit: (data) => void,
  onCancel: () => void,
  loading: boolean
}
```

### 3. KelasForm Component

```mermaid
graph TB
    subgraph "KelasForm - Modal"
        direction TB
        
        H[Modal Header: Tambah/Edit Kelas]
        
        subgraph "Form Fields"
            F1[Input: Nama Kelas - Required - e.g. X RPL 1]
            F2[Select: Jurusan - Required]
            F3[Select: Tingkat - Required - 10/11/12]
            F4[Select: Wali Kelas - Required - From Guru List]
            F5[Input: Kapasitas Maksimal - Number, Default 32]
            F6[Input: Tahun Ajaran - Required - e.g. 2024/2025]
            F7[Toggle: Status Aktif - Default True]
        end
        
        subgraph "Footer Actions"
            B1[Cancel Button]
            B2[Save Button]
        end
        
        H --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> F5
        F5 --> F6
        F6 --> F7
        F7 --> B1
        B1 --> B2
    end
    
    style F1 fill:#fef3c7
    style F2 fill:#fef3c7
    style F3 fill:#fef3c7
    style F4 fill:#fef3c7
    style B2 fill:#10b981
```

**KelasForm Validation:**
```javascript
{
  nama: {
    required: true,
    pattern: /^(X|XI|XII)\s[A-Z]+\s\d+$/,
    example: 'X RPL 1'
  },
  jurusan_id: {
    required: true
  },
  tingkat: {
    required: true,
    enum: [10, 11, 12]
  },
  wali_kelas_id: {
    required: true
  },
  kapasitas: {
    required: true,
    min: 1,
    max: 50,
    default: 32
  },
  tahun_ajaran: {
    required: true,
    pattern: /^\d{4}\/\d{4}$/
  }
}
```

### 4. MataPelajaranForm Component

```mermaid
graph TB
    subgraph "MataPelajaranForm - Modal"
        direction TB
        
        H[Modal Header: Tambah/Edit Mata Pelajaran]
        
        subgraph "Form Fields"
            F1[Input: Kode Mapel - Required, Uppercase]
            F2[Input: Nama Mata Pelajaran - Required]
            F3[Select: Kategori - Required]
            F4[Select: Jurusan - Multiple or Semua]
            F5[Input: SKS/Jam - Number, Required]
            F6[Select: Tingkat - Multiple - 10/11/12]
            F7[Textarea: Deskripsi - Optional]
            F8[Toggle: Status Aktif - Default True]
        end
        
        subgraph "Footer Actions"
            B1[Cancel Button]
            B2[Save Button]
        end
        
        H --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> F5
        F5 --> F6
        F6 --> F7
        F7 --> F8
        F8 --> B1
        B1 --> B2
    end
    
    style F1 fill:#fef3c7
    style F2 fill:#fef3c7
    style F3 fill:#fef3c7
    style B2 fill:#10b981
```

**Kategori Options:**
- Umum (Matematika, B. Indonesia, B. Inggris, IPA, IPS)
- Produktif (Specific to Jurusan)
- Muatan Lokal (Local content)

### 5. JadwalForm Component

```mermaid
graph TB
    subgraph "JadwalForm - Modal Large"
        direction TB
        
        H[Modal Header: Tambah/Edit Jadwal]
        
        subgraph "Form Fields - 2 Columns"
            subgraph "Column 1"
                F1[Select: Hari - Required]
                F2[Time: Jam Mulai - Required]
                F3[Time: Jam Selesai - Required]
                F4[Select: Mata Pelajaran - Required]
            end
            
            subgraph "Column 2"
                F5[Select: Guru - Required - Filtered by Mapel]
                F6[Select: Kelas - Required]
                F7[Input: Ruangan - Optional]
                F8[Select: Semester - Required - Ganjil/Genap]
            end
        end
        
        A[Alert: Conflict Warning - If time/room conflict]
        
        subgraph "Footer Actions"
            B1[Cancel Button]
            B2[Save Button]
            B3[Save & Add Another]
        end
        
        H --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> F5
        F5 --> F6
        F6 --> F7
        F7 --> F8
        F8 --> A
        A --> B1
        B1 --> B2
        B2 --> B3
    end
    
    style F1 fill:#fef3c7
    style A fill:#fef3c7
    style B2 fill:#10b981
```

**JadwalForm Features:**
- Auto-detect time conflicts
- Filter guru by mata pelajaran
- Validate time range (jam_selesai > jam_mulai)
- Show existing jadwal for selected kelas
- Duplicate jadwal feature

**Hari Options:**
```javascript
['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
```

---

## 🎯 Form Field Types Reference

### Text Input Variants

```mermaid
graph LR
    subgraph "Input Types"
        I1[Text - Default]
        I2[Email - With validation]
        I3[Password - Toggle visibility]
        I4[Number - Min/Max]
        I5[Tel - Phone format]
        I6[URL - URL validation]
        I7[Date - Date picker]
        I8[Time - Time picker]
    end
    
    style I1 fill:#f1f5f9
    style I2 fill:#dbeafe
    style I3 fill:#fef3c7
```

### Select/Dropdown Variants

```mermaid
graph LR
    subgraph "Select Types"
        S1[Single Select]
        S2[Multi Select - Checkboxes]
        S3[Searchable Select]
        S4[Async Select - Load from API]
        S5[Grouped Select]
    end
    
    style S1 fill:#f1f5f9
    style S2 fill:#dbeafe
```

### Other Input Types

```mermaid
graph LR
    subgraph "Special Inputs"
        O1[Textarea - Multi-line]
        O2[Toggle/Switch - Boolean]
        O3[Radio Group]
        O4[Checkbox Group]
        O5[File Upload]
        O6[Rich Text Editor]
    end
    
    style O1 fill:#f1f5f9
    style O2 fill:#dbeafe
    style O5 fill:#fef3c7
```

---

## 🔄 CRUD Operation Flows

### Create Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page
    participant M as Modal
    participant F as Form
    participant API as Backend API
    
    U->>P: Click "Tambah" button
    P->>M: Open modal
    M->>F: Render empty form
    U->>F: Fill form fields
    F->>F: Validate on blur
    U->>F: Click "Save"
    F->>F: Validate all fields
    alt Validation Failed
        F->>U: Show error messages
    else Validation Passed
        F->>API: POST /api/resource
        alt API Success
            API->>F: Return created data
            F->>M: Close modal
            M->>P: Refresh table
            P->>U: Show success toast
        else API Error
            API->>F: Return error
            F->>U: Show error message
        end
    end
```

### Edit Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page
    participant M as Modal
    participant F as Form
    participant API as Backend API
    
    U->>P: Click "Edit" button
    P->>API: GET /api/resource/:id
    API->>P: Return data
    P->>M: Open modal
    M->>F: Render form with data
    U->>F: Modify fields
    U->>F: Click "Save"
    F->>F: Validate all fields
    F->>API: PUT /api/resource/:id
    alt API Success
        API->>F: Return updated data
        F->>M: Close modal
        M->>P: Refresh table
        P->>U: Show success toast
    else API Error
        API->>F: Return error
        F->>U: Show error message
    end
```

### Delete Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Page
    participant C as Confirm Dialog
    participant API as Backend API
    
    U->>P: Click "Delete" button
    P->>C: Show confirmation
    C->>U: "Yakin hapus data ini?"
    alt User Confirms
        U->>C: Click "Ya, Hapus"
        C->>API: DELETE /api/resource/:id
        alt API Success
            API->>C: Return success
            C->>P: Refresh table
            P->>U: Show success toast
        else API Error
            API->>C: Return error
            C->>U: Show error message
        end
    else User Cancels
        U->>C: Click "Batal"
        C->>P: Close dialog
    end
```

---

## 📊 Table Features Specification

### Sortable Columns

```mermaid
graph TB
    subgraph "Column Header with Sort"
        H[Column Name]
        I[Sort Icon]
        
        subgraph "Sort States"
            S1[Unsorted - Default]
            S2[Ascending - Arrow Up]
            S3[Descending - Arrow Down]
        end
        
        H --> I
        I --> S1
        S1 -->|Click| S2
        S2 -->|Click| S3
        S3 -->|Click| S1
    end
    
    style S2 fill:#3b82f6
    style S3 fill:#3b82f6
```

### Bulk Actions

```mermaid
graph TB
    subgraph "Bulk Actions Bar"
        direction LR
        
        C[Checkbox: Select All]
        T[Text: 5 items selected]
        B1[Bulk Delete Button]
        B2[Bulk Export Button]
        B3[Clear Selection]
        
        C --> T
        T --> B1
        B1 --> B2
        B2 --> B3
    end
    
    style C fill:#3b82f6
    style B1 fill:#ef4444
```

### Pagination Component

```mermaid
graph LR
    subgraph "Pagination Controls"
        P1[Previous Button]
        P2[Page 1]
        P3[Page 2 - Active]
        P4[Page 3]
        P5[...]
        P6[Page 10]
        P7[Next Button]
        
        I[Items per page: 10/25/50/100]
        T[Showing 11-20 of 95]
        
        P1 --> P2
        P2 --> P3
        P3 --> P4
        P4 --> P5
        P5 --> P6
        P6 --> P7
        P7 --> I
        I --> T
    end
    
    style P3 fill:#3b82f6
```

---

**Status:** ✅ Priority 2 Complete - Ready for Phase 4 Implementation!

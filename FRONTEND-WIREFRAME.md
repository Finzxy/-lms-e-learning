# 🎨 LMS Frontend Wireframe & Architecture

## 📐 System Architecture

```mermaid
graph TB
    subgraph "Frontend - React + Vite"
        A[Browser] --> B[React Router]
        B --> C{Auth Check}
        C -->|Not Auth| D[Login Page]
        C -->|Authenticated| E{Role Check}
        E -->|Admin| F[Admin Dashboard]
        E -->|Guru| G[Guru Dashboard]
        E -->|Siswa| H[Siswa Dashboard]
        
        F --> F1[User Management]
        F --> F2[Master Data]
        F --> F3[Reports]
        
        G --> G1[Materi]
        G --> G2[Tugas]
        G --> G3[Nilai]
        G --> G4[Absensi]
        
        H --> H1[Materi Saya]
        H --> H2[Tugas Saya]
        H --> H3[Nilai Saya]
        H --> H4[Absensi Saya]
    end
    
    subgraph "Backend - Laravel API"
        I[API Gateway]
        I --> J[Sanctum Auth]
        J --> K[Controllers]
        K --> L[(MySQL Database)]
        K --> M[File Storage]
    end
    
    F1 --> I
    F2 --> I
    G1 --> I
    G2 --> I
    H1 --> I
    H2 --> I
    D --> I
```

## 🏗️ Component Architecture

```mermaid
graph LR
    subgraph "Layout Components"
        L1[AppLayout]
        L2[AuthLayout]
        L3[Sidebar]
        L4[Navbar]
    end
    
    subgraph "Common Components"
        C1[Button]
        C2[Input]
        C3[Card]
        C4[Table]
        C5[Badge]
        C6[Modal]
        C7[FileUpload]
        C8[StatCard]
    end
    
    subgraph "Form Components"
        F1[UserForm]
        F2[MateriForm]
        F3[TugasForm]
        F4[NilaiForm]
    end
    
    subgraph "Pages"
        P1[Dashboard]
        P2[Login]
        P3[Users]
        P4[Materi]
        P5[Tugas]
    end
    
    L1 --> L3
    L1 --> L4
    P1 --> L1
    P3 --> L1
    P4 --> L1
    P2 --> L2
    
    P3 --> C4
    P3 --> F1
    P4 --> C6
    P4 --> C7
```

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Page
    participant A as AuthContext
    participant API as Laravel API
    participant D as Dashboard
    
    U->>L: Enter credentials
    L->>A: login(email, password)
    A->>API: POST /api/login
    API-->>A: {token, user}
    A->>A: Store token in localStorage
    A->>A: Set user state
    A-->>L: Success
    L->>D: Redirect to dashboard
    D->>API: GET /api/me (with token)
    API-->>D: User data
    D->>D: Render based on role
```

## 📱 Page Wireframes

### 1. Login Page

```mermaid
graph TB
    subgraph "Login Page - /login"
        A[Logo & Title]
        B[Email Input]
        C[Password Input]
        D[Login Button]
        E[Error Message]
        
        A --> B
        B --> C
        C --> D
        D --> E
    end
    
    style A fill:#3b82f6
    style D fill:#10b981
    style E fill:#ef4444
```

### 2. Admin Dashboard

```mermaid
graph TB
    subgraph "Admin Dashboard - /admin/dashboard"
        direction TB
        N[Navbar: User Info + Logout]
        
        subgraph "Main Content"
            S1[StatCard: Total Users]
            S2[StatCard: Total Guru]
            S3[StatCard: Total Siswa]
            S4[StatCard: Total Kelas]
            
            T1[Recent Users Table]
            T2[Quick Actions]
        end
        
        SB[Sidebar Menu]
        
        N --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> T1
        T1 --> T2
        SB -.-> N
    end
    
    style N fill:#1e293b
    style SB fill:#334155
    style S1 fill:#3b82f6
    style S2 fill:#10b981
    style S3 fill:#f59e0b
    style S4 fill:#8b5cf6
```

### 3. Guru Dashboard

```mermaid
graph TB
    subgraph "Guru Dashboard - /guru/dashboard"
        direction TB
        N[Navbar]
        
        subgraph "Stats Row"
            S1[Total Materi]
            S2[Total Tugas]
            S3[Pending Submissions]
            S4[My Classes]
        end
        
        subgraph "Content Area"
            C1[Recent Materi]
            C2[Upcoming Deadlines]
            C3[Quick Actions]
        end
        
        SB[Sidebar: Materi, Tugas, Nilai, Absensi]
        
        N --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> C1
        C1 --> C2
        C2 --> C3
        SB -.-> N
    end
    
    style N fill:#1e293b
    style SB fill:#334155
```

### 4. Siswa Dashboard

```mermaid
graph TB
    subgraph "Siswa Dashboard - /siswa/dashboard"
        direction TB
        N[Navbar]
        
        subgraph "Stats Row"
            S1[Materi Tersedia]
            S2[Tugas Aktif]
            S3[Tugas Terlambat]
            S4[Rata-rata Nilai]
        end
        
        subgraph "Content Area"
            C1[Materi Terbaru]
            C2[Tugas Deadline Terdekat]
            C3[Absensi Bulan Ini]
        end
        
        SB[Sidebar: Materi, Tugas, Nilai, Absensi]
        
        N --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> C1
        C1 --> C2
        C2 --> C3
        SB -.-> N
    end
    
    style N fill:#1e293b
    style SB fill:#334155
    style S3 fill:#ef4444
```

## 🎯 User Management (Admin)

```mermaid
graph TB
    subgraph "Users Page - /admin/users"
        T[Page Title: User Management]
        
        subgraph "Actions Bar"
            B1[+ Add User Button]
            S[Search Input]
            F[Filter by Role]
        end
        
        subgraph "Users Table"
            TH[Headers: Name, Email, Role, Kelas, Actions]
            TR1[User Row 1]
            TR2[User Row 2]
            TR3[User Row 3]
            A1[Edit Button]
            A2[Delete Button]
        end
        
        P[Pagination]
        
        T --> B1
        B1 --> S
        S --> F
        F --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> A1
        A1 --> A2
        A2 --> P
    end
    
    M[Modal: User Form]
    B1 -.->|Click| M
    A1 -.->|Click| M
    
    style B1 fill:#10b981
    style A1 fill:#3b82f6
    style A2 fill:#ef4444
```

## 📚 Materi Management (Guru)

```mermaid
graph TB
    subgraph "Materi Page - /guru/materi"
        T[Page Title: Materi Pembelajaran]
        
        subgraph "Actions"
            B1[+ Upload Materi]
            F1[Filter by Kelas]
            F2[Filter by Mata Pelajaran]
        end
        
        subgraph "Materi Grid"
            C1[Card: Materi 1]
            C2[Card: Materi 2]
            C3[Card: Materi 3]
            
            subgraph "Card Content"
                CT[Title]
                CD[Description]
                CF[File Icon + Size]
                CA[Edit | Delete | Download]
            end
        end
        
        T --> B1
        B1 --> F1
        F1 --> F2
        F2 --> C1
        C1 --> C2
        C2 --> C3
        C1 --> CT
    end
    
    M[Modal: Upload Form]
    B1 -.->|Click| M
    
    style B1 fill:#10b981
```

## 📝 Tugas Management (Guru)

```mermaid
graph TB
    subgraph "Tugas Page - /guru/tugas"
        T[Page Title: Tugas]
        
        subgraph "Actions"
            B1[+ Buat Tugas Baru]
            F1[Filter by Status]
        end
        
        subgraph "Tugas List"
            T1[Tugas Card 1]
            T2[Tugas Card 2]
            
            subgraph "Card Details"
                TD[Title + Deadline]
                TS[Status Badge]
                TSub[Submissions: 20/30]
                TA[View | Edit | Delete]
            end
        end
        
        T --> B1
        B1 --> F1
        F1 --> T1
        T1 --> T2
        T1 --> TD
    end
    
    M[Modal: Create Tugas]
    D[Detail Page: Submissions]
    
    B1 -.->|Click| M
    TA -.->|View| D
    
    style B1 fill:#10b981
    style TS fill:#f59e0b
```

## 📊 Nilai Input (Guru)

```mermaid
graph TB
    subgraph "Nilai Input - /guru/nilai"
        T[Page Title: Input Nilai]
        
        subgraph "Filters"
            F1[Select Kelas]
            F2[Select Mata Pelajaran]
            F3[Select Jenis Nilai]
        end
        
        subgraph "Nilai Table"
            TH[Headers: No, Nama, NIS, Nilai, Keterangan]
            TR1[Siswa 1 | Input Field]
            TR2[Siswa 2 | Input Field]
            TR3[Siswa 3 | Input Field]
        end
        
        B[Save All Button]
        
        T --> F1
        F1 --> F2
        F2 --> F3
        F3 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> B
    end
    
    style B fill:#10b981
    style TR1 fill:#f0f9ff
```

## 📋 Absensi Input (Guru)

```mermaid
graph TB
    subgraph "Absensi Page - /guru/absensi"
        T[Page Title: Absensi]
        
        subgraph "Filters"
            F1[Select Kelas]
            F2[Select Tanggal]
            F3[Select Mata Pelajaran]
        end
        
        subgraph "Absensi Table"
            TH[Headers: No, Nama, Status]
            TR1[Siswa 1 | H | S | I | A]
            TR2[Siswa 2 | H | S | I | A]
            TR3[Siswa 3 | H | S | I | A]
        end
        
        B[Save Absensi]
        
        T --> F1
        F1 --> F2
        F2 --> F3
        F3 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> B
    end
    
    style B fill:#10b981
    style TR1 fill:#f0f9ff
```

## 🎓 Siswa - Materi View

```mermaid
graph TB
    subgraph "Materi Siswa - /siswa/materi"
        T[Page Title: Materi Pembelajaran]
        
        subgraph "Filters"
            F1[Filter by Mata Pelajaran]
            S[Search]
        end
        
        subgraph "Materi Grid"
            C1[Card: Materi 1]
            C2[Card: Materi 2]
            C3[Card: Materi 3]
            
            subgraph "Card Content"
                CT[Title]
                CM[Mata Pelajaran Badge]
                CG[Guru Name]
                CD[Upload Date]
                CB[Download Button]
            end
        end
        
        T --> F1
        F1 --> S
        S --> C1
        C1 --> C2
        C2 --> C3
        C1 --> CT
    end
    
    style CB fill:#3b82f6
```

## 📝 Siswa - Tugas View

```mermaid
graph TB
    subgraph "Tugas Siswa - /siswa/tugas"
        T[Page Title: Tugas Saya]
        
        subgraph "Tabs"
            T1[Aktif]
            T2[Selesai]
            T3[Terlambat]
        end
        
        subgraph "Tugas List"
            TC1[Tugas Card 1]
            TC2[Tugas Card 2]
            
            subgraph "Card Details"
                TT[Title]
                TM[Mata Pelajaran]
                TDL[Deadline Badge]
                TST[Status: Belum Submit]
                TB[Submit Button]
            end
        end
        
        T --> T1
        T1 --> T2
        T2 --> T3
        T3 --> TC1
        TC1 --> TC2
        TC1 --> TT
    end
    
    M[Modal: Submit Tugas]
    TB -.->|Click| M
    
    style TB fill:#10b981
    style TDL fill:#ef4444
```

## 📊 Siswa - Nilai View

```mermaid
graph TB
    subgraph "Nilai Siswa - /siswa/nilai"
        T[Page Title: Nilai Saya]
        
        subgraph "Summary Cards"
            S1[Rata-rata: 85]
            S2[Tertinggi: 95]
            S3[Terendah: 70]
        end
        
        subgraph "Filters"
            F1[Filter by Semester]
            F2[Filter by Mata Pelajaran]
        end
        
        subgraph "Nilai Table"
            TH[Headers: Mata Pelajaran, Tugas, UTS, UAS, Rata-rata]
            TR1[Matematika | 85 | 80 | 90 | 85]
            TR2[Bahasa Indonesia | 90 | 85 | 88 | 87.7]
            TR3[IPA | 75 | 80 | 85 | 80]
        end
        
        CH[Chart: Nilai per Mata Pelajaran]
        
        T --> S1
        S1 --> S2
        S2 --> S3
        S3 --> F1
        F1 --> F2
        F2 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> CH
    end
    
    style S1 fill:#3b82f6
    style S2 fill:#10b981
    style S3 fill:#f59e0b
```

## 📅 Siswa - Absensi View

```mermaid
graph TB
    subgraph "Absensi Siswa - /siswa/absensi"
        T[Page Title: Absensi Saya]
        
        subgraph "Summary Cards"
            S1[Hadir: 45]
            S2[Sakit: 2]
            S3[Izin: 1]
            S4[Alpha: 0]
        end
        
        subgraph "Filters"
            F1[Filter by Bulan]
            F2[Filter by Mata Pelajaran]
        end
        
        subgraph "Absensi Table"
            TH[Headers: Tanggal, Mata Pelajaran, Status, Keterangan]
            TR1[2024-01-15 | Matematika | H | -]
            TR2[2024-01-16 | B. Indonesia | S | Demam]
            TR3[2024-01-17 | IPA | H | -]
        end
        
        CH[Chart: Absensi per Bulan]
        
        T --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> F1
        F1 --> F2
        F2 --> TH
        TH --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> CH
    end
    
    style S1 fill:#10b981
    style S2 fill:#f59e0b
    style S3 fill:#3b82f6
    style S4 fill:#ef4444
```

## 🎨 Design System

### Color Palette

```mermaid
graph LR
    subgraph "Primary Colors"
        P1[Primary: #3b82f6]
        P2[Primary Dark: #2563eb]
        P3[Primary Light: #60a5fa]
    end
    
    subgraph "Status Colors"
        S1[Success: #10b981]
        S2[Warning: #f59e0b]
        S3[Error: #ef4444]
        S4[Info: #3b82f6]
    end
    
    subgraph "Neutral Colors"
        N1[Gray 900: #1e293b]
        N2[Gray 700: #334155]
        N3[Gray 500: #64748b]
        N4[Gray 100: #f1f5f9]
    end
    
    style P1 fill:#3b82f6,color:#fff
    style P2 fill:#2563eb,color:#fff
    style P3 fill:#60a5fa,color:#fff
    style S1 fill:#10b981,color:#fff
    style S2 fill:#f59e0b,color:#fff
    style S3 fill:#ef4444,color:#fff
    style S4 fill:#3b82f6,color:#fff
    style N1 fill:#1e293b,color:#fff
    style N2 fill:#334155,color:#fff
    style N3 fill:#64748b,color:#fff
    style N4 fill:#f1f5f9,color:#000
```

## 🔄 State Management

```mermaid
graph TB
    subgraph "Context Providers"
        A[AuthContext]
        T[ThemeContext]
    end
    
    subgraph "Custom Hooks"
        H1[useAuth]
        H2[useFileUpload]
        H3[useTable]
        H4[useModal]
    end
    
    subgraph "Services"
        S1[authService]
        S2[userService]
        S3[materiService]
        S4[tugasService]
    end
    
    subgraph "API Layer"
        API[axios instance]
    end
    
    A --> H1
    H1 --> S1
    S1 --> API
    
    H2 --> S3
    S3 --> API
    
    H3 --> S2
    S2 --> API
    
    style A fill:#3b82f6
    style API fill:#10b981
```

## 📱 Responsive Breakpoints

```mermaid
graph LR
    M[Mobile: 375px-767px]
    T[Tablet: 768px-1023px]
    D[Desktop: 1024px+]
    
    M -->|Sidebar: Hidden| M1[Hamburger Menu]
    T -->|Sidebar: Collapsible| T1[Icon Only]
    D -->|Sidebar: Full| D1[Full Width]
    
    style M fill:#ef4444
    style T fill:#f59e0b
    style D fill:#10b981
```

## 🚀 Navigation Structure

```mermaid
graph TB
    R[Root /]
    
    subgraph "Public Routes"
        L[/login]
    end
    
    subgraph "Admin Routes /admin"
        AD[/dashboard]
        AU[/users]
        AJ[/jurusan]
        AK[/kelas]
        AM[/mata-pelajaran]
        AS[/jadwal]
    end
    
    subgraph "Guru Routes /guru"
        GD[/dashboard]
        GM[/materi]
        GT[/tugas]
        GN[/nilai]
        GA[/absensi]
    end
    
    subgraph "Siswa Routes /siswa"
        SD[/dashboard]
        SM[/materi]
        ST[/tugas]
        SN[/nilai]
        SA[/absensi]
    end
    
    R --> L
    R --> AD
    R --> GD
    R --> SD
    
    AD --> AU
    AU --> AJ
    AJ --> AK
    AK --> AM
    AM --> AS
    
    GD --> GM
    GM --> GT
    GT --> GN
    GN --> GA
    
    SD --> SM
    SM --> ST
    ST --> SN
    SN --> SA
    
    style L fill:#3b82f6
    style AD fill:#8b5cf6
    style GD fill:#10b981
    style SD fill:#f59e0b
```

---

## 📝 Notes

### Design Principles
1. **Consistency**: Gunakan komponen yang sama di seluruh aplikasi
2. **Accessibility**: Pastikan semua elemen dapat diakses dengan keyboard
3. **Responsive**: Mobile-first approach
4. **Performance**: Lazy loading untuk route dan komponen besar
5. **User Feedback**: Loading states, error messages, success notifications

### Key Features
- Role-based navigation
- File upload/download
- Bulk operations (nilai, absensi)
- Real-time validation
- Search & filter
- Pagination
- Dark mode support
- Responsive design

### Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form (optional)
- **State**: Context API + Custom Hooks

---

**Ready for Phase 2 Implementation! 🚀**

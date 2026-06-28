# 🎨 Priority 1 Wireframes - Before Phase 1

## 📐 Navbar Design Detail

```mermaid
graph TB
    subgraph "Navbar Component - Full Width"
        direction LR
        
        subgraph "Left Section"
            L1[Hamburger Menu Icon - Mobile Only]
            L2[App Logo/Title: LMS Sekolah]
        end
        
        subgraph "Center Section"
            C1[Breadcrumb Navigation]
            C2[Dashboard > Users > Edit]
        end
        
        subgraph "Right Section"
            R1[Search Icon - Optional]
            R2[Notification Bell - Optional]
            R3[Theme Toggle - Dark/Light]
            R4[Profile Dropdown Trigger]
        end
        
        L1 --> L2
        L2 --> C1
        C1 --> C2
        C2 --> R1
        R1 --> R2
        R2 --> R3
        R3 --> R4
    end
    
    style L1 fill:#64748b
    style R3 fill:#f59e0b
    style R4 fill:#3b82f6
```

### Profile Dropdown Detail

```mermaid
graph TB
    subgraph "Profile Dropdown - Expanded"
        direction TB
        
        T[Trigger: Avatar + Name + Chevron]
        
        subgraph "Dropdown Menu"
            H[Header Section]
            HA[Avatar Image - Large]
            HN[User Name]
            HE[User Email]
            HR[Role Badge]
            
            D[Divider Line]
            
            M1[Menu Item: Profile]
            M2[Menu Item: Pengaturan]
            M3[Menu Item: Bantuan]
            
            D2[Divider Line]
            
            M4[Menu Item: Logout - Red]
        end
        
        T -.->|Click| H
        H --> HA
        HA --> HN
        HN --> HE
        HE --> HR
        HR --> D
        D --> M1
        M1 --> M2
        M2 --> M3
        M3 --> D2
        D2 --> M4
    end
    
    style T fill:#3b82f6
    style M4 fill:#ef4444
    style HR fill:#10b981
```

### Navbar States

```mermaid
graph LR
    subgraph "Desktop View - 1024px+"
        D1[Full Navbar]
        D2[Logo + Breadcrumb + Profile]
        D3[Sidebar Always Visible]
    end
    
    subgraph "Tablet View - 768px-1023px"
        T1[Compact Navbar]
        T2[Logo + Profile Only]
        T3[Sidebar Collapsible]
    end
    
    subgraph "Mobile View - 375px-767px"
        M1[Mobile Navbar]
        M2[Hamburger + Logo + Profile]
        M3[Sidebar Hidden - Overlay]
    end
    
    style D1 fill:#10b981
    style T1 fill:#f59e0b
    style M1 fill:#ef4444
```

---

## 🧩 Component Library Wireframes

### 1. Button Component Variants

```mermaid
graph TB
    subgraph "Button Variants"
        direction TB
        
        subgraph "By Style"
            B1[Primary - Blue Background]
            B2[Secondary - Gray Background]
            B3[Outline - Border Only]
            B4[Ghost - No Background]
            B5[Link - Text Only]
            B6[Danger - Red Background]
        end
        
        subgraph "By Size"
            S1[xs - 24px height]
            S2[sm - 32px height]
            S3[md - 40px height - Default]
            S4[lg - 48px height]
            S5[xl - 56px height]
        end
        
        subgraph "States"
            ST1[Default]
            ST2[Hover - Darker]
            ST3[Active - Pressed]
            ST4[Disabled - Opacity 50%]
            ST5[Loading - Spinner]
        end
        
        subgraph "With Icons"
            I1[Icon Left + Text]
            I2[Icon Right + Text]
            I3[Icon Only - Square]
        end
    end
    
    style B1 fill:#3b82f6,color:#fff
    style B2 fill:#64748b,color:#fff
    style B3 fill:#fff,stroke:#3b82f6
    style B6 fill:#ef4444,color:#fff
    style ST5 fill:#f59e0b
```

**Button Props:**
```javascript
{
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  disabled: boolean,
  loading: boolean,
  icon: ReactNode,
  iconPosition: 'left' | 'right',
  fullWidth: boolean,
  onClick: () => void
}
```

### 2. Input Component Variants

```mermaid
graph TB
    subgraph "Input Component Structure"
        direction TB
        
        L[Label - Optional]
        H[Helper Text - Optional]
        
        subgraph "Input Field"
            I1[Icon Left - Optional]
            I2[Input Element]
            I3[Icon Right - Optional]
            I4[Clear Button - Optional]
        end
        
        E[Error Message - Conditional]
        
        L --> H
        H --> I1
        I1 --> I2
        I2 --> I3
        I3 --> I4
        I4 --> E
    end
    
    style L fill:#64748b
    style E fill:#ef4444
    style I2 fill:#f1f5f9
```

**Input Types & States:**

```mermaid
graph LR
    subgraph "Input Types"
        T1[Text]
        T2[Email]
        T3[Password - Toggle Visibility]
        T4[Number]
        T5[Date]
        T6[Textarea]
        T7[Select/Dropdown]
        T8[File Upload]
    end
    
    subgraph "Input States"
        S1[Default - Gray Border]
        S2[Focus - Blue Border + Ring]
        S3[Error - Red Border]
        S4[Success - Green Border]
        S5[Disabled - Gray Background]
        S6[Read Only - No Border]
    end
    
    style S2 fill:#3b82f6
    style S3 fill:#ef4444
    style S4 fill:#10b981
```

**Input Props:**
```javascript
{
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select',
  label: string,
  placeholder: string,
  helperText: string,
  error: string,
  disabled: boolean,
  readOnly: boolean,
  required: boolean,
  icon: ReactNode,
  iconPosition: 'left' | 'right',
  clearable: boolean,
  rows: number, // for textarea
  options: Array, // for select
}
```

### 3. Card Component Variants

```mermaid
graph TB
    subgraph "Card Component Structure"
        direction TB
        
        subgraph "Card Container"
            H[Header - Optional]
            HT[Title]
            HS[Subtitle]
            HA[Action Button]
            
            D[Divider - Optional]
            
            B[Body/Content]
            BC[Main Content Area]
            
            F[Footer - Optional]
            FL[Footer Left]
            FR[Footer Right]
        end
        
        H --> HT
        HT --> HS
        HS --> HA
        HA --> D
        D --> B
        B --> BC
        BC --> F
        F --> FL
        FL --> FR
    end
    
    style H fill:#f1f5f9
    style B fill:#ffffff
    style F fill:#f8fafc
```

**Card Variants:**

```mermaid
graph LR
    subgraph "Card Styles"
        C1[Default - White + Shadow]
        C2[Bordered - Border Only]
        C3[Elevated - Large Shadow]
        C4[Flat - No Shadow]
        C5[Colored - Background Color]
    end
    
    subgraph "Special Cards"
        S1[StatCard - Dashboard Stats]
        S2[UserCard - Profile Display]
        S3[MateriCard - File Display]
        S4[TugasCard - Assignment]
    end
    
    style C1 fill:#ffffff
    style C5 fill:#dbeafe
    style S1 fill:#3b82f6,color:#fff
```

**Card Props:**
```javascript
{
  variant: 'default' | 'bordered' | 'elevated' | 'flat' | 'colored',
  title: string,
  subtitle: string,
  headerAction: ReactNode,
  footer: ReactNode,
  hoverable: boolean,
  clickable: boolean,
  padding: 'none' | 'sm' | 'md' | 'lg',
}
```

### 4. Modal Component

```mermaid
graph TB
    subgraph "Modal Structure"
        O[Overlay - Dark Background]
        
        subgraph "Modal Container"
            H[Header]
            HT[Title]
            HC[Close Button X]
            
            D[Divider]
            
            B[Body]
            BC[Content Area - Scrollable]
            
            D2[Divider]
            
            F[Footer]
            FB1[Cancel Button]
            FB2[Action Button]
        end
        
        O -.-> H
        H --> HT
        HT --> HC
        HC --> D
        D --> B
        B --> BC
        BC --> D2
        D2 --> F
        F --> FB1
        FB1 --> FB2
    end
    
    style O fill:#00000080
    style HC fill:#ef4444
    style FB2 fill:#3b82f6
```

**Modal Sizes:**

```mermaid
graph LR
    subgraph "Modal Sizes"
        S1[sm - 400px]
        S2[md - 600px - Default]
        S3[lg - 800px]
        S4[xl - 1000px]
        S5[full - 90vw]
    end
    
    style S2 fill:#3b82f6
```

**Modal Props:**
```javascript
{
  isOpen: boolean,
  onClose: () => void,
  title: string,
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full',
  closeOnOverlay: boolean,
  closeOnEsc: boolean,
  showCloseButton: boolean,
  footer: ReactNode,
  preventScroll: boolean,
}
```

### 5. Table Component

```mermaid
graph TB
    subgraph "Table Component Structure"
        direction TB
        
        T[Table Container]
        
        subgraph "Table Header"
            TH[Column Headers]
            TH1[Sortable Columns]
            TH2[Column Width]
            TH3[Sticky Header]
        end
        
        subgraph "Table Body"
            TR[Table Rows]
            TR1[Hover Effect]
            TR2[Striped Rows - Optional]
            TR3[Row Actions]
        end
        
        subgraph "Table Footer"
            P[Pagination]
            P1[Page Numbers]
            P2[Items per Page]
            P3[Total Count]
        end
        
        T --> TH
        TH --> TH1
        TH1 --> TH2
        TH2 --> TH3
        TH3 --> TR
        TR --> TR1
        TR1 --> TR2
        TR2 --> TR3
        TR3 --> P
        P --> P1
        P1 --> P2
        P2 --> P3
    end
    
    style TH fill:#f1f5f9
    style TR1 fill:#f8fafc
    style P fill:#ffffff
```

**Table Features:**

```mermaid
graph LR
    subgraph "Table Features"
        F1[Sortable Columns]
        F2[Selectable Rows]
        F3[Expandable Rows]
        F4[Fixed Header]
        F5[Responsive - Horizontal Scroll]
        F6[Loading State]
        F7[Empty State]
        F8[Row Actions - Edit/Delete]
    end
    
    style F1 fill:#3b82f6
    style F6 fill:#f59e0b
    style F7 fill:#64748b
```

**Table Props:**
```javascript
{
  columns: Array<{
    key: string,
    label: string,
    sortable: boolean,
    width: string,
    render: (value, row) => ReactNode
  }>,
  data: Array<Object>,
  loading: boolean,
  emptyMessage: string,
  striped: boolean,
  hoverable: boolean,
  selectable: boolean,
  onRowClick: (row) => void,
  pagination: {
    page: number,
    pageSize: number,
    total: number,
    onPageChange: (page) => void
  }
}
```

---

## 🎭 Error/Empty/Loading State Wireframes

### 1. Loading States

```mermaid
graph TB
    subgraph "Loading State Variants"
        direction TB
        
        subgraph "Skeleton Loaders"
            S1[Card Skeleton]
            S2[Table Skeleton]
            S3[Form Skeleton]
            S4[Text Skeleton]
        end
        
        subgraph "Spinners"
            SP1[Full Page Spinner]
            SP2[Button Spinner]
            SP3[Inline Spinner]
            SP4[Overlay Spinner]
        end
        
        subgraph "Progress Indicators"
            P1[Linear Progress Bar]
            P2[Circular Progress]
            P3[Upload Progress]
        end
    end
    
    style SP1 fill:#3b82f6
    style P1 fill:#10b981
```

**Loading State Examples:**

```mermaid
graph TB
    subgraph "Card Loading State"
        C[Card Container]
        
        subgraph "Skeleton Content"
            L1[Line 1 - 80% width - Animated]
            L2[Line 2 - 60% width - Animated]
            L3[Line 3 - 90% width - Animated]
            B1[Button Skeleton]
        end
        
        C --> L1
        L1 --> L2
        L2 --> L3
        L3 --> B1
    end
    
    style L1 fill:#e2e8f0
    style L2 fill:#e2e8f0
    style L3 fill:#e2e8f0
```

### 2. Empty States

```mermaid
graph TB
    subgraph "Empty State Component"
        direction TB
        
        I[Icon/Illustration - Large]
        T[Title Text]
        D[Description Text]
        B[Action Button - Optional]
        
        I --> T
        T --> D
        D --> B
    end
    
    style I fill:#cbd5e1
    style B fill:#3b82f6
```

**Empty State Variants:**

```mermaid
graph LR
    subgraph "Empty State Types"
        E1[No Data - Database Icon]
        E2[No Results - Search Icon]
        E3[No Files - Folder Icon]
        E4[No Notifications - Bell Icon]
        E5[No Access - Lock Icon]
    end
    
    style E1 fill:#94a3b8
    style E5 fill:#ef4444
```

**Empty State Messages:**
- **No Users:** "Belum ada user terdaftar. Klik tombol 'Tambah User' untuk memulai."
- **No Materi:** "Belum ada materi tersedia. Upload materi pertama Anda."
- **No Tugas:** "Tidak ada tugas aktif saat ini."
- **No Search Results:** "Tidak ditemukan hasil untuk '{query}'. Coba kata kunci lain."
- **No Permission:** "Anda tidak memiliki akses ke halaman ini."

### 3. Error States

```mermaid
graph TB
    subgraph "Error State Component"
        direction TB
        
        I[Error Icon - Red]
        T[Error Title]
        D[Error Description]
        C[Error Code - Optional]
        
        subgraph "Actions"
            B1[Retry Button]
            B2[Go Back Button]
            B3[Contact Support]
        end
        
        I --> T
        T --> D
        D --> C
        C --> B1
        B1 --> B2
        B2 --> B3
    end
    
    style I fill:#ef4444
    style B1 fill:#3b82f6
```

**Error Types:**

```mermaid
graph LR
    subgraph "Error Categories"
        E1[Network Error - 500]
        E2[Not Found - 404]
        E3[Unauthorized - 401]
        E4[Forbidden - 403]
        E5[Validation Error - 422]
        E6[Timeout Error]
    end
    
    style E1 fill:#ef4444
    style E2 fill:#f59e0b
    style E3 fill:#f59e0b
```

**Error Messages:**
- **500:** "Terjadi kesalahan server. Silakan coba lagi."
- **404:** "Halaman tidak ditemukan."
- **401:** "Sesi Anda telah berakhir. Silakan login kembali."
- **403:** "Anda tidak memiliki izin untuk mengakses ini."
- **Network:** "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."

### 4. Toast Notifications

```mermaid
graph TB
    subgraph "Toast Notification"
        direction LR
        
        I[Icon]
        
        subgraph "Content"
            T[Title]
            M[Message]
        end
        
        C[Close Button]
        
        I --> T
        T --> M
        M --> C
    end
    
    subgraph "Toast Variants"
        T1[Success - Green]
        T2[Error - Red]
        T3[Warning - Yellow]
        T4[Info - Blue]
    end
    
    style T1 fill:#10b981
    style T2 fill:#ef4444
    style T3 fill:#f59e0b
    style T4 fill:#3b82f6
```

**Toast Props:**
```javascript
{
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string,
  duration: number, // ms, default 3000
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center',
  closable: boolean,
}
```

---

## ⚙️ Settings Page Wireframe

```mermaid
graph TB
    subgraph "Settings Page - /pengaturan"
        direction TB
        
        T[Page Title: Pengaturan]
        
        subgraph "Tabs Navigation"
            TAB1[Profil]
            TAB2[Keamanan]
            TAB3[Notifikasi]
            TAB4[Tampilan]
        end
        
        subgraph "Tab Content Area"
            C[Dynamic Content Based on Active Tab]
        end
        
        T --> TAB1
        TAB1 --> TAB2
        TAB2 --> TAB3
        TAB3 --> TAB4
        TAB4 --> C
    end
    
    style TAB1 fill:#3b82f6
    style C fill:#f8fafc
```

### Tab 1: Profil

```mermaid
graph TB
    subgraph "Profil Tab"
        direction TB
        
        subgraph "Avatar Section"
            A[Current Avatar - Large Circle]
            B1[Upload Button]
            B2[Remove Button]
        end
        
        subgraph "Form Fields"
            F1[Input: Nama Lengkap]
            F2[Input: Email - Read Only]
            F3[Input: No. Telepon]
            F4[Select: Jenis Kelamin]
            F5[Textarea: Alamat]
            F6[Input: Tanggal Lahir]
        end
        
        subgraph "Role Info - Read Only"
            R1[Badge: Role]
            R2[Text: Kelas - If Siswa]
            R3[Text: NIP/NIS]
        end
        
        S[Save Changes Button]
        
        A --> B1
        B1 --> B2
        B2 --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> F5
        F5 --> F6
        F6 --> R1
        R1 --> R2
        R2 --> R3
        R3 --> S
    end
    
    style A fill:#e2e8f0
    style S fill:#10b981
    style R1 fill:#3b82f6
```

### Tab 2: Keamanan

```mermaid
graph TB
    subgraph "Keamanan Tab"
        direction TB
        
        S1[Section: Ubah Password]
        
        subgraph "Password Form"
            P1[Input: Password Lama]
            P2[Input: Password Baru]
            P3[Input: Konfirmasi Password]
            P4[Password Strength Indicator]
        end
        
        B1[Update Password Button]
        
        D[Divider]
        
        S2[Section: Aktivitas Login]
        
        subgraph "Login History Table"
            T1[Device | Location | Time]
            T2[Chrome - Windows | Jakarta | 2 hours ago]
            T3[Safari - iPhone | Bandung | 1 day ago]
        end
        
        S1 --> P1
        P1 --> P2
        P2 --> P3
        P3 --> P4
        P4 --> B1
        B1 --> D
        D --> S2
        S2 --> T1
        T1 --> T2
        T2 --> T3
    end
    
    style B1 fill:#3b82f6
    style P4 fill:#10b981
```

### Tab 3: Notifikasi

```mermaid
graph TB
    subgraph "Notifikasi Tab"
        direction TB
        
        S1[Section: Email Notifications]
        
        subgraph "Email Settings"
            E1[Toggle: Tugas Baru]
            E2[Toggle: Deadline Reminder]
            E3[Toggle: Nilai Baru]
            E4[Toggle: Pengumuman]
        end
        
        D[Divider]
        
        S2[Section: Push Notifications]
        
        subgraph "Push Settings"
            P1[Toggle: Browser Notifications]
            P2[Toggle: Sound]
        end
        
        B[Save Preferences Button]
        
        S1 --> E1
        E1 --> E2
        E2 --> E3
        E3 --> E4
        E4 --> D
        D --> S2
        S2 --> P1
        P1 --> P2
        P2 --> B
    end
    
    style B fill:#10b981
    style E1 fill:#3b82f6
```

### Tab 4: Tampilan

```mermaid
graph TB
    subgraph "Tampilan Tab"
        direction TB
        
        S1[Section: Theme]
        
        subgraph "Theme Options"
            T1[Radio: Light Mode]
            T2[Radio: Dark Mode]
            T3[Radio: Auto - System]
        end
        
        D[Divider]
        
        S2[Section: Language]
        
        subgraph "Language Options"
            L1[Select: Bahasa Indonesia]
            L2[Select: English - Coming Soon]
        end
        
        D2[Divider]
        
        S3[Section: Display]
        
        subgraph "Display Options"
            D1[Toggle: Compact Mode]
            D2[Toggle: Show Animations]
            D3[Select: Items per Page]
        end
        
        B[Save Settings Button]
        
        S1 --> T1
        T1 --> T2
        T2 --> T3
        T3 --> D
        D --> S2
        S2 --> L1
        L1 --> L2
        L2 --> D2
        D2 --> S3
        S3 --> D1
        D1 --> D2
        D2 --> D3
        D3 --> B
    end
    
    style T2 fill:#1e293b
    style B fill:#10b981
```

---

## 📱 Responsive Component Behavior

```mermaid
graph TB
    subgraph "Component Responsive Rules"
        direction TB
        
        subgraph "Desktop - 1024px+"
            D1[Navbar: Full with Breadcrumb]
            D2[Sidebar: Always Visible]
            D3[Modal: Center, Max Width]
            D4[Table: Full Width, All Columns]
            D5[Cards: Grid 3-4 columns]
        end
        
        subgraph "Tablet - 768px-1023px"
            T1[Navbar: Compact]
            T2[Sidebar: Collapsible]
            T3[Modal: 90% Width]
            T4[Table: Horizontal Scroll]
            T5[Cards: Grid 2 columns]
        end
        
        subgraph "Mobile - 375px-767px"
            M1[Navbar: Minimal]
            M2[Sidebar: Overlay]
            M3[Modal: Full Screen]
            M4[Table: Card View]
            M5[Cards: Stack 1 column]
        end
    end
    
    style D1 fill:#10b981
    style T1 fill:#f59e0b
    style M1 fill:#ef4444
```

---

## 🎨 Component Style Tokens

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Border Radius
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
full: 9999px
```

### Shadow Scale
```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.1)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.1)
```

### Typography Scale
```
xs: 12px
sm: 14px
base: 16px
lg: 18px
xl: 20px
2xl: 24px
3xl: 30px
4xl: 36px
```

---

**Status:** ✅ Priority 1 Complete - Ready for Phase 1 Implementation!

# 🎨 Priority 3 Wireframes - Before Phase 5 (File Upload & Grading)

## 📤 File Upload Component Design

### 1. File Upload Area - Drag & Drop

```mermaid
graph TB
    subgraph "FileUpload Component"
        direction TB
        
        subgraph "Upload Area - Default State"
            I1[Upload Icon - Large]
            T1[Drag & drop file here]
            T2[or]
            B1[Browse Files Button]
            T3[Max size: 10MB | Allowed: PDF, DOC, DOCX, PPT, PPTX, ZIP]
        end
        
        subgraph "Upload Area - Drag Over State"
            I2[Upload Icon - Animated]
            T4[Drop file to upload]
            BG[Background: Blue highlight]
        end
        
        subgraph "Upload Area - Uploading State"
            P[Progress Bar]
            PT[Uploading... 45%]
            BC[Cancel Button]
        end
        
        subgraph "Upload Area - Success State"
            I3[Check Icon - Green]
            T5[File uploaded successfully]
            F[File Preview Card]
        end
        
        subgraph "Upload Area - Error State"
            I4[Error Icon - Red]
            T6[Upload failed: File too large]
            BR[Retry Button]
        end
    end
    
    style BG fill:#dbeafe
    style P fill:#3b82f6
    style I3 fill:#10b981
    style I4 fill:#ef4444
```

### 2. File Preview Card

```mermaid
graph TB
    subgraph "File Preview Card"
        direction LR
        
        subgraph "Left Section"
            I[File Icon - Based on type]
            T[File Type Badge]
        end
        
        subgraph "Middle Section"
            N[File Name]
            S[File Size]
            D[Upload Date - Optional]
        end
        
        subgraph "Right Section"
            B1[Download Button]
            B2[Delete Button]
        end
        
        I --> T
        T --> N
        N --> S
        S --> D
        D --> B1
        B1 --> B2
    end
    
    style I fill:#3b82f6
    style B1 fill:#10b981
    style B2 fill:#ef4444
```

### 3. Multiple File Upload

```mermaid
graph TB
    subgraph "Multiple File Upload"
        direction TB
        
        U[Upload Area - Drag & Drop]
        
        subgraph "File List"
            F1[File 1 - Uploaded - 2.5MB]
            F2[File 2 - Uploading 60% - 1.8MB]
            F3[File 3 - Error - 15MB - Too large]
            F4[File 4 - Queued - 3.2MB]
        end
        
        A[Add More Files Button]
        
        U --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> A
    end
    
    style F1 fill:#dcfce7
    style F2 fill:#dbeafe
    style F3 fill:#fee2e2
    style F4 fill:#f1f5f9
```

### 4. File Type Icons

```mermaid
graph LR
    subgraph "File Type Icons"
        I1[PDF - Red]
        I2[DOC/DOCX - Blue]
        I3[XLS/XLSX - Green]
        I4[PPT/PPTX - Orange]
        I5[ZIP/RAR - Purple]
        I6[Image - Pink]
        I7[Video - Teal]
        I8[Other - Gray]
    end
    
    style I1 fill:#ef4444
    style I2 fill:#3b82f6
    style I3 fill:#10b981
    style I4 fill:#f59e0b
    style I5 fill:#8b5cf6
    style I6 fill:#ec4899
    style I7 fill:#14b8a6
    style I8 fill:#64748b
```

### 5. Upload Progress Indicator

```mermaid
graph TB
    subgraph "Upload Progress Component"
        direction TB
        
        subgraph "Progress Bar"
            B[Background Bar - Gray]
            F[Fill Bar - Blue - Animated]
            P[Percentage Text - 65%]
        end
        
        subgraph "Details"
            S[Speed: 2.5 MB/s]
            T[Time remaining: 5 seconds]
            U[Uploaded: 6.5 MB / 10 MB]
        end
        
        C[Cancel Upload Button]
        
        B --> F
        F --> P
        P --> S
        S --> T
        T --> U
        U --> C
    end
    
    style F fill:#3b82f6
    style C fill:#ef4444
```

---

## 📝 Guru: Materi Upload Form

```mermaid
graph TB
    subgraph "Upload Materi Form - Modal Large"
        direction TB
        
        H[Modal Header: Upload Materi Baru]
        
        subgraph "Form Fields"
            F1[Input: Judul Materi - Required]
            F2[Select: Mata Pelajaran - Required]
            F3[Select: Kelas - Multiple - Required]
            F4[Select: Kategori - Materi/Modul/Slide/Video/Lainnya]
            F5[Textarea: Deskripsi - Optional]
            
            subgraph "File Upload Section"
                U[Drag & Drop Upload Area]
                L[File List - Multiple files allowed]
            end
            
            F6[Date: Tanggal Publish - Default Today]
            F7[Toggle: Langsung Publish - Default True]
        end
        
        subgraph "Footer Actions"
            B1[Cancel Button]
            B2[Save as Draft]
            B3[Upload & Publish Button]
        end
        
        H --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> F5
        F5 --> U
        U --> L
        L --> F6
        F6 --> F7
        F7 --> B1
        B1 --> B2
        B2 --> B3
    end
    
    style F1 fill:#fef3c7
    style F2 fill:#fef3c7
    style F3 fill:#fef3c7
    style U fill:#dbeafe
    style B3 fill:#10b981
```

**Materi Upload Validation:**
```javascript
{
  judul: {
    required: true,
    minLength: 5,
    maxLength: 200
  },
  mata_pelajaran_id: {
    required: true
  },
  kelas_ids: {
    required: true,
    minItems: 1
  },
  files: {
    required: true,
    maxSize: 10 * 1024 * 1024, // 10MB per file
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
      'video/mp4',
      'image/jpeg',
      'image/png'
    ]
  }
}
```

---

## 📊 Guru: Nilai Input - Inline Table Design

```mermaid
graph TB
    subgraph "Nilai Input Page - /guru/nilai"
        direction TB
        
        T[Page Title: Input Nilai]
        
        subgraph "Filter Section"
            F1[Select: Kelas - Required]
            F2[Select: Mata Pelajaran - Required]
            F3[Select: Jenis Nilai - Required]
            B1[Load Data Button]
        end
        
        subgraph "Nilai Table - Inline Edit"
            TH[Headers: No | NIS | Nama Siswa | Nilai | Keterangan | Status]
            
            subgraph "Row 1"
                R1C1[1]
                R1C2[1001]
                R1C3[Ahmad Fauzi]
                R1C4[Input: 85 - Auto validate 0-100]
                R1C5[Input: Bagus]
                R1C6[Badge: Saved]
            end
            
            subgraph "Row 2"
            R2C1[2]
                R2C2[1002]
                R2C3[Siti Nurhaliza]
                R2C4[Input: 92 - Modified]
                R2C5[Input: Excellent]
                R2C6[Badge: Modified]
            end
            
            subgraph "Row 3"
                R3C1[3]
                R3C2[1003]
                R3C3[Budi Santoso]
                R3C4[Input: Empty]
                R3C5[Input: Empty]
                R3C6[Badge: Not Filled]
            end
        end
        
        subgraph "Summary Section"
            S1[Total Siswa: 30]
            S2[Sudah Dinilai: 25]
            S3[Belum Dinilai: 5]
            S4[Rata-rata: 82.5]
        end
        
        subgraph "Action Buttons"
            B2[Save All Changes]
            B3[Export to Excel]
            B4[Reset Changes]
        end
        
        T --> F1
        F1 --> F2
        F2 --> F3
        F3 --> B1
        B1 --> TH
        TH --> R1C1
        R1C1 --> R1C2
        R1C2 --> R1C3
        R1C3 --> R1C4
        R1C4 --> R1C5
        R1C5 --> R1C6
        R1C6 --> R2C1
        R2C1 --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> B2
        B2 --> B3
        B3 --> B4
    end
    
    style R1C6 fill:#10b981
    style R2C6 fill:#f59e0b
    style R3C6 fill:#64748b
    style B2 fill:#10b981
```

### Jenis Nilai Options

```mermaid
graph LR
    subgraph "Jenis Nilai"
        J1[Tugas]
        J2[Quiz]
        J3[UTS - Ujian Tengah Semester]
        J4[UAS - Ujian Akhir Semester]
        J5[Praktik]
        J6[Proyek]
    end
    
    style J3 fill:#ef4444
    style J4 fill:#ef4444
```

### Inline Edit Features

```mermaid
graph TB
    subgraph "Inline Edit Behavior"
        direction TB
        
        I[Input Field]
        
        subgraph "On Focus"
            F1[Highlight row]
            F2[Show validation]
        end
        
        subgraph "On Change"
            C1[Validate range 0-100]
            C2[Mark as modified]
            C3[Update summary]
        end
        
        subgraph "On Blur"
            B1[Auto-save to temp]
            B2[Show status badge]
        end
        
        I --> F1
        F1 --> C1
        C1 --> B1
    end
    
    style I fill:#dbeafe
    style C1 fill:#f59e0b
    style B1 fill:#10b981
```

---

## 📋 Guru: Absensi Input Page Detail

```mermaid
graph TB
    subgraph "Absensi Input Page - /guru/absensi"
        direction TB
        
        T[Page Title: Input Absensi]
        
        subgraph "Filter Section"
            F1[Select: Kelas - Required]
            F2[Select: Mata Pelajaran - Required]
            F3[Date: Tanggal - Default Today]
            F4[Time: Jam Pelajaran - Optional]
            B1[Load Data Button]
        end
        
        subgraph "Quick Actions"
            Q1[Set All: Hadir]
            Q2[Set All: Sakit]
            Q3[Set All: Izin]
            Q4[Set All: Alpha]
        end
        
        subgraph "Absensi Table"
            TH[Headers: No | NIS | Nama | Foto | Status | Keterangan]
            
            subgraph "Row 1"
                R1C1[1]
                R1C2[1001]
                R1C3[Ahmad Fauzi]
                R1C4[Avatar]
                R1C5[Button Group: H S I A]
                R1C6[Input: Optional]
            end
            
            subgraph "Row 2"
                R2C1[2]
                R2C2[1002]
                R2C3[Siti Nurhaliza]
                R2C4[Avatar]
                R2C5[Button Group: H S I A]
                R2C6[Input: Demam]
            end
        end
        
        subgraph "Summary"
            S1[Hadir: 28]
            S2[Sakit: 1]
            S3[Izin: 1]
            S4[Alpha: 0]
            S5[Total: 30]
        end
        
        subgraph "Actions"
            B2[Save Absensi]
            B3[Export to PDF]
        end
        
        T --> F1
        F1 --> F2
        F2 --> F3
        F3 --> F4
        F4 --> B1
        B1 --> Q1
        Q1 --> Q2
        Q2 --> Q3
        Q3 --> Q4
        Q4 --> TH
        TH --> R1C1
        R1C1 --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> S5
        S5 --> B2
        B2 --> B3
    end
    
    style Q1 fill:#10b981
    style R1C5 fill:#dbeafe
    style B2 fill:#10b981
```

### Status Button Group

```mermaid
graph LR
    subgraph "Status Button Group"
        B1[H - Hadir - Green]
        B2[S - Sakit - Yellow]
        B3[I - Izin - Blue]
        B4[A - Alpha - Red]
    end
    
    subgraph "Button States"
        S1[Default - Gray outline]
        S2[Selected - Colored fill]
        S3[Hover - Colored outline]
    end
    
    style B1 fill:#10b981
    style B2 fill:#f59e0b
    style B3 fill:#3b82f6
    style B4 fill:#ef4444
```

### Absensi Keyboard Shortcuts

```mermaid
graph TB
    subgraph "Keyboard Shortcuts"
        K1[H - Set Hadir]
        K2[S - Set Sakit]
        K3[I - Set Izin]
        K4[A - Set Alpha]
        K5[Tab - Next Student]
        K6[Shift+Tab - Previous Student]
        K7[Enter - Save & Next]
    end
    
    style K1 fill:#10b981
    style K7 fill:#3b82f6
```

---

## 📝 Tugas Submission Detail Page (Grading)

```mermaid
graph TB
    subgraph "Tugas Submission Detail - /guru/tugas/:id/submissions"
        direction TB
        
        subgraph "Header Section"
            T[Tugas Title: Membuat Website E-Commerce]
            I[Info: Deadline: 2024-01-20 | Submitted: 25/30 | Graded: 15/25]
        end
        
        subgraph "Filter & Actions"
            F1[Filter: All/Submitted/Not Submitted/Graded/Not Graded]
            F2[Sort: Name/Submit Time/Score]
            B1[Export Grades]
            B2[Send Reminder to Not Submitted]
        end
        
        subgraph "Submission List"
            subgraph "Card 1 - Submitted & Graded"
                C1H[Ahmad Fauzi - 1001]
                C1S[Submitted: 2024-01-18 10:30 - On Time]
                C1F[Files: project.zip - 2.5MB]
                C1N[Catatan: Sudah bagus, tambahkan validasi]
                C1G[Nilai: 85 - Badge Green]
                C1A[View Files | Edit Grade]
            end
            
            subgraph "Card 2 - Submitted Not Graded"
                C2H[Siti Nurhaliza - 1002]
                C2S[Submitted: 2024-01-19 23:45 - On Time]
                C2F[Files: tugas.zip - 3.1MB]
                C2N[Catatan: -]
                C2G[Nilai: - - Badge Yellow]
                C2A[View Files | Grade Now]
            end
            
            subgraph "Card 3 - Not Submitted"
                C3H[Budi Santoso - 1003]
                C3S[Not Submitted - Badge Red]
                C3F[Files: -]
                C3N[Catatan: -]
                C3G[Nilai: 0]
                C3A[Send Reminder]
            end
        end
        
        T --> I
        I --> F1
        F1 --> F2
        F2 --> B1
        B1 --> B2
        B2 --> C1H
        C1H --> C2H
        C2H --> C3H
    end
    
    style C1G fill:#10b981
    style C2G fill:#f59e0b
    style C3S fill:#ef4444
```

### Grading Modal

```mermaid
graph TB
    subgraph "Grading Modal"
        direction TB
        
        H[Modal Header: Grade Submission - Ahmad Fauzi]
        
        subgraph "Student Info"
            I1[NIS: 1001]
            I2[Kelas: X RPL 1]
            I3[Submit Time: 2024-01-18 10:30]
            I4[Status: On Time]
        end
        
        subgraph "Files Section"
            F1[File Preview/Download]
            F2[project.zip - 2.5MB]
            F3[Download Button]
        end
        
        subgraph "Grading Section"
            G1[Input: Nilai - 0-100 - Required]
            G2[Textarea: Catatan/Feedback - Optional]
            G3[File Upload: Feedback File - Optional]
        end
        
        subgraph "Footer Actions"
            B1[Cancel]
            B2[Save Grade]
            B3[Save & Next Student]
        end
        
        H --> I1
        I1 --> I2
        I2 --> I3
        I3 --> I4
        I4 --> F1
        F1 --> F2
        F2 --> F3
        F3 --> G1
        G1 --> G2
        G2 --> G3
        G3 --> B1
        B1 --> B2
        B2 --> B3
    end
    
    style G1 fill:#fef3c7
    style B2 fill:#10b981
    style B3 fill:#3b82f6
```

### Submission Status Badges

```mermaid
graph LR
    subgraph "Status Badges"
        S1[On Time - Green]
        S2[Late - Red]
        S3[Not Submitted - Gray]
        S4[Graded - Blue]
        S5[Not Graded - Yellow]
    end
    
    style S1 fill:#10b981
    style S2 fill:#ef4444
    style S3 fill:#64748b
    style S4 fill:#3b82f6
    style S5 fill:#f59e0b
```

---

## 📥 Siswa: Tugas Submission Form

```mermaid
graph TB
    subgraph "Submit Tugas Modal - Siswa View"
        direction TB
        
        H[Modal Header: Submit Tugas]
        
        subgraph "Tugas Info - Read Only"
            I1[Judul: Membuat Website E-Commerce]
            I2[Mata Pelajaran: Pemrograman Web]
            I3[Deadline: 2024-01-20 23:59]
            I4[Status: 2 days remaining - Badge Yellow]
        end
        
        subgraph "Submission Form"
            F1[Textarea: Catatan - Optional]
            
            subgraph "File Upload"
                U[Drag & Drop Area]
                L[File List - Max 5 files]
            end
            
            W[Warning: Pastikan file sudah benar sebelum submit]
        end
        
        subgraph "Previous Submission - If exists"
            P1[Previous File: tugas_v1.zip]
            P2[Submitted: 2024-01-15 10:30]
            P3[Note: This will replace previous submission]
        end
        
        subgraph "Footer Actions"
            B1[Cancel]
            B2[Submit Tugas]
        end
        
        H --> I1
        I1 --> I2
        I2 --> I3
        I3 --> I4
        I4 --> F1
        F1 --> U
        U --> L
        L --> W
        W --> P1
        P1 --> P2
        P2 --> P3
        P3 --> B1
        B1 --> B2
    end
    
    style I4 fill:#f59e0b
    style W fill:#fef3c7
    style B2 fill:#10b981
```

### Deadline Warning States

```mermaid
graph LR
    subgraph "Deadline Warnings"
        D1[> 7 days - Green - Plenty of time]
        D2[3-7 days - Blue - Normal]
        D3[1-2 days - Yellow - Soon]
        D4[< 24 hours - Orange - Urgent]
        D5[< 1 hour - Red - Very Urgent]
        D6[Overdue - Red - Late]
    end
    
    style D1 fill:#10b981
    style D2 fill:#3b82f6
    style D3 fill:#f59e0b
    style D4 fill:#fb923c
    style D5 fill:#ef4444
    style D6 fill:#991b1b
```

---

## 🎯 File Upload Props & API

### FileUpload Component Props

```javascript
{
  // Basic props
  accept: string, // MIME types, e.g., "application/pdf,.doc,.docx"
  maxSize: number, // in bytes, e.g., 10 * 1024 * 1024 for 10MB
  maxFiles: number, // max number of files, default 1
  multiple: boolean, // allow multiple files
  
  // UI props
  label: string,
  helperText: string,
  error: string,
  disabled: boolean,
  showPreview: boolean, // show file preview cards
  
  // Callbacks
  onUpload: (files: File[]) => Promise<void>,
  onDelete: (fileId: string) => Promise<void>,
  onError: (error: Error) => void,
  
  // Initial files (for edit mode)
  initialFiles: Array<{
    id: string,
    name: string,
    size: number,
    url: string,
    type: string
  }>,
  
  // Advanced
  uploadOnSelect: boolean, // auto upload on file select
  showProgress: boolean, // show upload progress
  allowedTypes: string[], // custom validation
}
```

### Upload API Endpoints

```javascript
// Upload file
POST /api/files/upload
Content-Type: multipart/form-data
Body: {
  file: File,
  type: 'materi' | 'tugas' | 'submission',
  related_id: number // optional
}
Response: {
  id: number,
  name: string,
  path: string,
  url: string,
  size: number,
  mime_type: string
}

// Delete file
DELETE /api/files/:id
Response: {
  message: 'File deleted successfully'
}

// Download file
GET /api/files/:id/download
Response: File stream
```

---

## 📊 Grading Statistics Component

```mermaid
graph TB
    subgraph "Grading Statistics Card"
        direction TB
        
        T[Statistics for: Tugas Website E-Commerce]
        
        subgraph "Charts"
            C1[Bar Chart: Score Distribution]
            C2[Pie Chart: Submission Status]
        end
        
        subgraph "Stats Grid"
            S1[Highest: 95]
            S2[Lowest: 60]
            S3[Average: 82.5]
            S4[Median: 85]
            S5[Submitted: 25/30]
            S6[On Time: 23/25]
        end
        
        T --> C1
        C1 --> C2
        C2 --> S1
        S1 --> S2
        S2 --> S3
        S3 --> S4
        S4 --> S5
        S5 --> S6
    end
    
    style S1 fill:#10b981
    style S2 fill:#ef4444
    style S3 fill:#3b82f6
```

---

## 🔔 Notification System for Submissions

```mermaid
graph TB
    subgraph "Notification Triggers"
        direction TB
        
        T1[New Tugas Created]
        T2[Deadline in 24 hours]
        T3[Deadline in 1 hour]
        T4[New Submission Received]
        T5[Tugas Graded]
        
        subgraph "Notification Channels"
            C1[In-App Notification]
            C2[Email - Optional]
            C3[Browser Push - Optional]
        end
        
        T1 --> C1
        T2 --> C1
        T3 --> C1
        T4 --> C1
        T5 --> C1
        
        C1 --> C2
        C1 --> C3
    end
    
    style T3 fill:#ef4444
    style T5 fill:#10b981
```

---

**Status:** ✅ Priority 3 Complete - Ready for Phase 5 Implementation!

## 📝 Summary

### File Upload Features
- ✅ Drag & drop interface
- ✅ Multiple file support
- ✅ Progress indicator
- ✅ File type validation
- ✅ Size validation
- ✅ Preview cards
- ✅ Error handling

### Nilai Input Features
- ✅ Inline table editing
- ✅ Auto-validation (0-100)
- ✅ Real-time summary
- ✅ Bulk save
- ✅ Export to Excel
- ✅ Status indicators

### Absensi Input Features
- ✅ Quick status buttons (H/S/I/A)
- ✅ Keyboard shortcuts
- ✅ Bulk actions
- ✅ Real-time summary
- ✅ Export to PDF

### Tugas Grading Features
- ✅ Submission list with filters
- ✅ File preview/download
- ✅ Inline grading
- ✅ Feedback system
- ✅ Statistics dashboard
- ✅ Deadline warnings
- ✅ Notification system

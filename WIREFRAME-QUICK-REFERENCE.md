# 🎨 LMS Wireframe - Quick Reference

## 📚 File Structure

```
📁 Wireframe Documentation
│
├── 📄 WIREFRAME-INDEX.md ⭐ START HERE
│   └── Complete navigation & summary of all wireframes
│
├── 📄 FRONTEND-WIREFRAME.md
│   ├── System Architecture
│   ├── Component Architecture
│   ├── Authentication Flow
│   ├── Dashboard Wireframes (Admin, Guru, Siswa)
│   ├── User Management
│   ├── Materi & Tugas Views
│   ├── Nilai & Absensi Views
│   └── Design System & Navigation
│
├── 📄 WIREFRAME-PRIORITY-1.md (Before Phase 1)
│   ├── Navbar Design (Profile dropdown, Logout)
│   ├── Component Library
│   │   ├── Button (6 variants, 5 sizes)
│   │   ├── Input (8 types, 6 states)
│   │   ├── Card (5 variants)
│   │   ├── Modal (5 sizes)
│   │   └── Table (sortable, paginated)
│   ├── Error/Empty/Loading States
│   ├── Settings Page (4 tabs)
│   └── Responsive Behavior
│
├── 📄 WIREFRAME-PRIORITY-2.md (Before Phase 4)
│   ├── Admin CRUD Pages
│   │   ├── Jurusan Management
│   │   ├── Kelas Management
│   │   ├── Mata Pelajaran Management
│   │   └── Jadwal (Calendar & Table View)
│   ├── Form Components
│   │   ├── UserForm (with conditional fields)
│   │   ├── JurusanForm
│   │   ├── KelasForm
│   │   ├── MataPelajaranForm
│   │   └── JadwalForm (with conflict detection)
│   └── CRUD Operation Flows
│
└── 📄 WIREFRAME-PRIORITY-3.md (Before Phase 5)
    ├── File Upload Component
    │   ├── Drag & Drop Interface
    │   ├── Progress Indicator
    │   ├── File Preview Cards
    │   └── Multiple File Support
    ├── Guru: Materi Upload Form
    ├── Guru: Nilai Input (Inline Table)
    ├── Guru: Absensi Input (Quick Actions)
    ├── Guru: Tugas Grading (with Statistics)
    └── Siswa: Tugas Submission (with Deadline Warnings)
```

---

## 🎯 Quick Access by Phase

### Phase 1: Setup Project
**Read:** `WIREFRAME-PRIORITY-1.md`
- Navbar with profile dropdown
- All common components (Button, Input, Card, Modal, Table)
- Loading/Empty/Error states
- Settings page

### Phase 2-3: Auth & Dashboard
**Read:** `FRONTEND-WIREFRAME.md`
- Authentication flow
- Login page
- Dashboard layouts (Admin, Guru, Siswa)
- Role-based routing

### Phase 4: CRUD Management
**Read:** `WIREFRAME-PRIORITY-2.md`
- Jurusan, Kelas, Mata Pelajaran pages
- Jadwal (calendar & table)
- All form components
- Table features (sort, filter, pagination)

### Phase 5: File Upload & Grading
**Read:** `WIREFRAME-PRIORITY-3.md`
- File upload component
- Materi upload
- Nilai input (inline editing)
- Absensi input (quick actions)
- Tugas grading system

---

## 🧩 Component Quick Reference

### Button
```jsx
<Button 
  variant="primary|secondary|outline|ghost|link|danger"
  size="xs|sm|md|lg|xl"
  loading={false}
  disabled={false}
  icon={<Icon />}
  iconPosition="left|right"
/>
```

### Input
```jsx
<Input
  type="text|email|password|number|date|textarea|select"
  label="Label"
  placeholder="Placeholder"
  error="Error message"
  helperText="Helper text"
  icon={<Icon />}
  clearable={true}
/>
```

### Card
```jsx
<Card
  variant="default|bordered|elevated|flat|colored"
  title="Title"
  subtitle="Subtitle"
  headerAction={<Button />}
  footer={<div>Footer</div>}
/>
```

### Modal
```jsx
<Modal
  isOpen={true}
  onClose={() => {}}
  title="Title"
  size="sm|md|lg|xl|full"
  footer={<div>Actions</div>}
/>
```

### Table
```jsx
<Table
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' }
  ]}
  data={[]}
  loading={false}
  pagination={{
    page: 1,
    pageSize: 10,
    total: 100
  }}
/>
```

---

## 🎨 Design Tokens

### Colors
```css
/* Primary */
--primary: #3b82f6;
--primary-dark: #2563eb;
--primary-light: #60a5fa;

/* Status */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Neutral */
--gray-900: #1e293b;
--gray-700: #334155;
--gray-500: #64748b;
--gray-100: #f1f5f9;
```

### Spacing
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

### Typography
```css
--font-family: 'Poppins', sans-serif;

--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (min-width: 375px) and (max-width: 767px) {
  /* Navbar: Minimal */
  /* Sidebar: Overlay */
  /* Modal: Full screen */
  /* Table: Card view */
  /* Cards: 1 column */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Navbar: Compact */
  /* Sidebar: Collapsible */
  /* Modal: 90% width */
  /* Table: Horizontal scroll */
  /* Cards: 2 columns */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Navbar: Full with breadcrumb */
  /* Sidebar: Always visible */
  /* Modal: Center, max width */
  /* Table: Full width */
  /* Cards: 3-4 columns */
}
```

---

## 🔄 Common Patterns

### Loading State
```jsx
{loading ? (
  <Skeleton />
) : data.length > 0 ? (
  <DataDisplay data={data} />
) : (
  <EmptyState message="No data available" />
)}
```

### Error Handling
```jsx
try {
  await api.call();
  toast.success('Success message');
} catch (error) {
  toast.error(error.message);
}
```

### Form Validation
```jsx
const validate = (values) => {
  const errors = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }
  
  return errors;
};
```

### CRUD Operations
```jsx
// Create
const handleCreate = async (data) => {
  try {
    await api.post('/resource', data);
    toast.success('Created successfully');
    fetchData();
  } catch (error) {
    toast.error(error.message);
  }
};

// Update
const handleUpdate = async (id, data) => {
  try {
    await api.put(`/resource/${id}`, data);
    toast.success('Updated successfully');
    fetchData();
  } catch (error) {
    toast.error(error.message);
  }
};

// Delete
const handleDelete = async (id) => {
  if (confirm('Are you sure?')) {
    try {
      await api.delete(`/resource/${id}`);
      toast.success('Deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error.message);
    }
  }
};
```

---

## 📊 Page Templates

### List Page Template
```
┌─────────────────────────────────────────┐
│ Page Title                    [+ Add]   │
├─────────────────────────────────────────┤
│ [Search] [Filter 1] [Filter 2]          │
├─────────────────────────────────────────┤
│ Table with data                         │
│ - Sortable columns                      │
│ - Row actions (Edit, Delete)            │
│ - Pagination                            │
└─────────────────────────────────────────┘
```

### Form Modal Template
```
┌─────────────────────────────────────────┐
│ Modal Title                        [X]  │
├─────────────────────────────────────────┤
│ [Label]                                 │
│ [Input Field]                           │
│                                         │
│ [Label]                                 │
│ [Select Field]                          │
│                                         │
│ [Label]                                 │
│ [Textarea]                              │
├─────────────────────────────────────────┤
│                    [Cancel] [Save]      │
└─────────────────────────────────────────┘
```

### Dashboard Template
```
┌─────────────────────────────────────────┐
│ Navbar                                  │
├──────┬──────────────────────────────────┤
│      │ Dashboard Title                  │
│      ├──────────────────────────────────┤
│ Side │ [Stat 1] [Stat 2] [Stat 3]      │
│ bar  ├──────────────────────────────────┤
│      │ Recent Items Table               │
│      │                                  │
│      │ Quick Actions                    │
└──────┴──────────────────────────────────┘
```

---

## 🎯 Key Features Checklist

### Authentication
- [ ] Login page with email/password
- [ ] Role-based redirect (Admin/Guru/Siswa)
- [ ] Protected routes
- [ ] Profile dropdown with logout
- [ ] Session management

### Components
- [ ] Button (all variants)
- [ ] Input (all types)
- [ ] Card (all variants)
- [ ] Modal (all sizes)
- [ ] Table (sortable, paginated)
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Toast notifications

### Admin Features
- [ ] User management (CRUD)
- [ ] Jurusan management
- [ ] Kelas management
- [ ] Mata Pelajaran management
- [ ] Jadwal management (calendar & table)

### Guru Features
- [ ] Materi upload (drag & drop)
- [ ] Tugas creation
- [ ] Nilai input (inline table)
- [ ] Absensi input (quick actions)
- [ ] Tugas grading (with feedback)

### Siswa Features
- [ ] View materi (download)
- [ ] Submit tugas (with deadline warning)
- [ ] View nilai (with charts)
- [ ] View absensi (with statistics)

### UI/UX
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Accessibility (ARIA labels)
- [ ] Loading indicators
- [ ] Error handling
- [ ] Success feedback

---

## 📞 Need Help?

1. **Start with:** `WIREFRAME-INDEX.md` for complete navigation
2. **For components:** `WIREFRAME-PRIORITY-1.md`
3. **For CRUD pages:** `WIREFRAME-PRIORITY-2.md`
4. **For file upload:** `WIREFRAME-PRIORITY-3.md`
5. **For architecture:** `FRONTEND-WIREFRAME.md`

---

## ✅ Status

All wireframe documentation is complete and ready for implementation! 🚀

**Files Created:**
- ✅ FRONTEND-WIREFRAME.md (17.5 KB)
- ✅ WIREFRAME-PRIORITY-1.md (21.7 KB)
- ✅ WIREFRAME-PRIORITY-2.md (19.4 KB)
- ✅ WIREFRAME-PRIORITY-3.md (21.8 KB)
- ✅ WIREFRAME-INDEX.md (15.8 KB)
- ✅ WIREFRAME-QUICK-REFERENCE.md (This file)

**Total:** 6 comprehensive wireframe documents with 96+ KB of detailed specifications!

---

**Last Updated:** 2024-01-15
**Version:** 1.0.0
**Ready for:** Phase 2 Implementation

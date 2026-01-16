# Virtual University - Frontend

The frontend application for Virtual University, built with Next.js 16, TypeScript, and modern React features.

## 🚀 Features

- **Next.js 16.1.2** with App Router
- **TypeScript** for type safety
- **Dark Mode** with Light/Dark/Auto themes
- **Internationalization** (English/Arabic) with RTL support
- **CSS Modules** with CSS Variables for theming
- **JWT Authentication** with protected routes
- **Role-Based UI** (Admin, Instructor, Student)

## 📦 Tech Stack

- **Framework**: Next.js 16.1.2 (React 19)
- **Language**: TypeScript 5.0
- **Styling**: CSS Modules + CSS Variables
- **State Management**: React Context API
- **i18n**: next-intl
- **Authentication**: JWT with localStorage

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on http://localhost:3001

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin panel pages
│   │   ├── auth/              # Authentication pages
│   │   ├── courses/           # Course catalog & details
│   │   ├── dashboard/         # Student dashboard
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── ThemeSwitcher.tsx  # Theme toggle component
│   │   └── LanguageSwitcher.tsx # Language toggle
│   ├── context/               # React contexts
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── ThemeContext.tsx   # Theme state
│   └── i18n.ts                # i18n configuration
├── messages/                   # Translation files
│   ├── en.json                # English translations
│   └── ar.json                # Arabic translations
└── public/                    # Static assets
```

## 🎨 Theming

The application uses CSS Variables for dynamic theming:

```css
/* Light Mode */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  /* ... */
}

/* Dark Mode */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... */
}
```

## 🌐 Internationalization

Translation files are located in `/messages`:
- `en.json` - English translations
- `ar.json` - Arabic translations

The app automatically applies RTL layout for Arabic.

## 🔐 Authentication

The app uses JWT tokens stored in localStorage:
- Token key: `vu_token`
- User data key: `vu_user`

Protected routes automatically redirect to login if not authenticated.

## 📱 Pages

### Public Pages
- `/` - Landing page
- `/courses` - Course catalog
- `/courses/[slug]` - Course details
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Student Pages
- `/dashboard` - Student dashboard with enrolled courses

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/students` - Student management
- `/admin/faculties` - Faculty management
- `/admin/departments` - Department management
- `/admin/subjects` - Course management

## 🎯 Key Components

### ThemeSwitcher
Toggle between Light, Dark, and Auto modes.

### LanguageSwitcher
Switch between English and Arabic languages.

### AuthContext
Manages authentication state and provides login/logout functions.

### ThemeContext
Manages theme state and persists user preference.

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Please refer to the main project README for contribution guidelines.

## 📄 License

MIT License - see the main project README for details.

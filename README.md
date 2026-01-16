# 🎓 Virtual University

A modern, full-stack Learning Management System (LMS) built with Next.js, NestJS, and PostgreSQL. Features include course management, user authentication, role-based access control, dark mode, and bilingual support (English/Arabic).

![Virtual University](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)
![NestJS](https://img.shields.io/badge/NestJS-10.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

### 🎨 User Experience
- **Dark Mode Support**: Light, Dark, and Auto modes with smooth transitions
- **Bilingual Interface**: Full support for English and Arabic with RTL layout
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Theme Persistence**: User preferences saved across sessions

### 👥 User Management
- **Role-Based Access Control**: Admin, Instructor, and Student roles
- **JWT Authentication**: Secure token-based authentication
- **User Profiles**: Comprehensive user management system
- **Student Dashboard**: Track enrolled courses and progress

### 📚 Course Management
- **Course Catalog**: Browse and search courses
- **Course Details**: Detailed course information with syllabus
- **Enrollment System**: Easy course enrollment for students
- **Faculty & Department Structure**: Organized academic hierarchy

### 🔐 Admin Panel
- **User Management**: CRUD operations for all users
- **Student Management**: Dedicated student administration
- **Course Management**: Create and manage courses
- **Faculty & Department Management**: Organize academic structure
- **Dark Mode Support**: Fully themed admin interface

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.2 (React 19)
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS Variables
- **State Management**: React Context API
- **Internationalization**: next-intl
- **Authentication**: JWT with localStorage

### Backend
- **Framework**: NestJS 10.0
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **API Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcryptjs

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15
- **Development**: Hot reload for both frontend and backend

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ahmedabdelhaleemnoby/Virtual-University.git
cd Virtual-University
```

2. **Start the database**
```bash
docker-compose up -d
```

3. **Setup Backend**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

4. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api/docs

### Default Admin Credentials
After running the seed script:
- Email: `admin@vu.edu`
- Password: `admin123`

## 📁 Project Structure

```
Virtual-University/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── faculties/      # Faculty management
│   │   ├── departments/    # Department management
│   │   ├── subjects/       # Course management
│   │   ├── lectures/       # Lecture/video management
│   │   ├── enrollments/    # Enrollment system
│   │   └── prisma/         # Database service
│   └── prisma/
│       └── schema.prisma   # Database schema
├── frontend/               # Next.js Frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts
│   │   └── i18n.ts        # Internationalization config
│   └── messages/          # Translation files
│       ├── en.json        # English translations
│       └── ar.json        # Arabic translations
└── docker-compose.yml     # Docker configuration
```

## 🎯 Key Features Implementation

### Theme System
- CSS Variables for dynamic theming
- Light/Dark/Auto mode detection
- Persistent theme preferences
- Smooth transitions between themes

### Internationalization
- English and Arabic support
- RTL layout for Arabic
- Translation files for all UI strings
- Language switcher in navigation

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes and API endpoints
- Secure password hashing

### Admin Dashboard
- User management (CRUD)
- Student management
- Course management
- Faculty & Department management
- Themed interface with dark mode

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- CORS configuration
- Environment variable protection
- SQL injection prevention (Prisma ORM)

## 🌐 API Documentation

Access the interactive API documentation at:
```
http://localhost:3001/api/docs
```

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Authentication testing
- Interactive API testing

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/virtual_university"
JWT_SECRET="your-secret-key"
PORT=3001
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ahmed Abdelhaleemnoby**
- GitHub: [@ahmedabdelhaleemnoby](https://github.com/ahmedabdelhaleemnoby)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NestJS team for the robust backend framework
- Prisma team for the excellent ORM
- All contributors and supporters

---

**Built with ❤️ for education**

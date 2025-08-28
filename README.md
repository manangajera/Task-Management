# Task Management System (MERN)

A **full-stack task management system** built with **MERN (MongoDB, Express.js, React, Node.js)** featuring secure authentication, role-based access, task & user management, reporting, and dashboards.  

---

## 🚀 Features  

### 🔐 Authentication & Authorization  
- User registration with profile image upload (Multer).  
- Secure login/logout with JWT-based authentication.  
- Role-based access control (Admin/User).  


### ✅ Task Management  
- Create, view, update, and delete tasks.  
- Assign tasks to users (Admin only).  
- Task status tracking (Pending, In Progress, Completed).  
- Checklist/todo updates.  
- User & Admin dashboards with analytics.  

### 👥 User Management  
- Admin-only user listing.  
- Fetch user details by ID.  
- Secure user deletion.  

### 📊 Reports  
- Export task reports.  
- Export user reports (Admin only).  

### 💻 Frontend (React)  
- Modern UI built with **React + Tailwind CSS**.  
- **Protected routes** with JWT authentication.  
- Role-based navigation (Admin/User).  
- Task list, status updates, and dashboards.  

---

## 🛠 Tech Stack  

- **Frontend**: React, React Router, Axios, Tailwind CSS, React Hot Toast  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT, bcrypt  
- **File Uploads**: Multer  
- **State Management**: React Context

---

## 📂 Project Structure  

```
project-root/
├── backend/
│   ├── controllers/       # Route controllers (auth, task, user, report)
│   ├── middlewares/       # Auth & role-based access
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── config/            # Config files (upload, db)
│   ├── server.js          # Backend entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── layouts/       # Layouts (Dashboard, Auth, etc.)
│   │   ├── pages/         # Pages (Login, Register, Dashboard, Tasks)
│   │   ├── context/       # Global state management
│   │   ├── utils/         # API utils, helpers
│   │   ├── App.js         # App entry
│   │   ├── main.jsx       # React entry
│   └── package.json
│
├── README.md
└── package.json
```

---

## 🔑 API Endpoints  

### Auth  
- `POST /api/auth/register` → Register user (with image)  
- `POST /api/auth/login` → Login user  
- `POST /api/auth/logout` → Logout user (protected)  
- `GET /api/auth/profile` → Get user profile  
- `PUT /api/auth/profile` → Update user profile (with image)  

### Tasks  
- `GET /api/tasks/dashboard-data` → Admin dashboard data  
- `GET /api/tasks/user-dashboard-data` → User dashboard data  
- `GET /api/tasks` → Get all tasks (Admin: all, User: assigned)  
- `GET /api/tasks/:id` → Get task by ID  
- `POST /api/tasks` → Create task (Admin only)  
- `PUT /api/tasks/:id` → Update task  
- `DELETE /api/tasks/:id` → Delete task (Admin only)  
- `PUT /api/tasks/:id/status` → Update task status  
- `PUT /api/tasks/:id/todo` → Update checklist  

### Users  
- `GET /api/users/all` → Get all users (Admin only)  
- `GET /api/users/:id` → Get user by ID  
- `DELETE /api/users/:id` → Delete user (Admin only)  

### Reports  
- `GET /api/reports/export/tasks` → Export tasks report  
- `GET /api/reports/export/users` → Export users report (Admin only)  

---

## ⚡ Getting Started  

### Backend Setup  
```bash
cd backend
npm install
```

Create `.env` inside `backend/`  
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Run backend server:  
```bash
npm run dev
```

### Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

---

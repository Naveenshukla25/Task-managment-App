# Premium Task-Managment App 🚀

A modern, full-stack Task managment application built with the MERN stack (MongoDB, Express, React, Node.js). It features a beautiful, glassmorphic UI, smooth animations, and a secure JWT-based authentication system.

## 🌟 Features

- **Secure Authentication**: User signup, login, and secure sessions using JSON Web Tokens (JWT) stored in HTTP-only cookies/headers.
- **CRUD Operations**: Comprehensive task management – Create, Read, Update, and Delete your daily todos effortlessly.
- **Premium Glassmorphic UI**: A stunning, modern interface built with the latest **Tailwind CSS v4** featuring translucent panels, animated background blobs, and sleek interactive elements.
- **Optimistic UI Updates**: The frontend reacts instantly to user actions, making the application feel blazing fast.
- **Beautiful Icons**: Powered by `lucide-react` for crisp and consistent iconography across the platform.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS v4 (Glassmorphism design system)
- Axios (API requests)
- React Router DOM (Navigation)
- React Hot Toast (Notifications)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Token (JWT) & bcryptjs (Auth and Security)
- CORS (Cross-Origin Resource Sharing)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and MongoDB installed on your local machine.
- Node.js (v18+ recommended)
- MongoDB Connection String (Local or MongoDB Atlas)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend server will start running on `http://localhost:3000`.*

### 2. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client app will be accessible at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
Test/
├── backend/                  # Express/Node server
│   ├── controller/           # Route logic (task, user)
│   ├── middleware/           # JWT Auth Verification
│   ├── models/               # Mongoose Schemas (User, Task)
│   ├── routes/               # API Routes definitions
│   ├── index.js              # Entry point
│   └── package.json
└── client/                   # React Frontend
    ├── src/
    │   ├── components/       # UI Components (Home, Login, Signup)
    │   ├── App.jsx           # Main Router
    │   ├── main.jsx          # React Root
    │   └── index.css         # Tailwind & Base Styles
    ├── package.json
    └── vite.config.js
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a Pull Request.

## 📝 License
This project is licensed under the MIT License.

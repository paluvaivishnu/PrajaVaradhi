# Complete Setup Guide - PrajaVaradhi Backend with MongoDB

## 📦 Prerequisites Installation

### Step 1: Install Node.js
1. Download Node.js from: **https://nodejs.org/**
2. Download the **LTS version** (recommended)
3. Run the installer and follow the installation steps
4. Verify installation by opening PowerShell and running:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install MongoDB
1. Download MongoDB Community Server from: **https://www.mongodb.com/try/download/community**
2. Choose **Windows** and download the MSI installer
3. Run the installer:
   - Choose "Complete" installation
   - Install MongoDB as a Service
   - Install MongoDB Compass (GUI tool) - recommended
4. MongoDB will start automatically as a service

### Step 3: Verify MongoDB Installation
Open PowerShell and run:
```bash
mongod --version
```

## 🚀 Backend Setup

### Step 1: Install Dependencies
```bash
cd C:\Users\Admin\Desktop\hack\hack\backend
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (cross-origin requests)
- dotenv (environment variables)
- body-parser (request parsing)
- express-validator (input validation)
- nodemon (development auto-reload)

### Step 2: Start MongoDB
MongoDB should already be running as a service. If not, run:
```bash
mongod
```

### Step 3: Start the Backend Server
Development mode (with auto-restart on changes):
```bash
cd C:\Users\Admin\Desktop\hack\hack\backend
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on: **http://localhost:5000**

## 🌐 Connecting Frontend to Backend

You'll need to update your HTML files to make API calls to the backend instead of using localStorage.

### Example: Update login.html
Replace the login function with:
```javascript
async function login() {
  const user = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value;
  
  if (!user || !password) {
    alert("Please fill all fields");
    return;
  }
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'index.html';
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error connecting to server');
    console.error(error);
  }
}
```

## 📊 Database Structure

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "hashed_password",
  "role": "citizen",
  "registeredDate": "2026-01-28T...",
  "createdAt": "2026-01-28T...",
  "updatedAt": "2026-01-28T..."
}
```

### Issues Collection
```json
{
  "_id": "ObjectId",
  "id": "VI-1234",
  "userId": "ObjectId_reference",
  "district": "VI",
  "category": "Road & Infrastructure",
  "title": "Pothole on Main Street",
  "location": "Main Street, Sector 5",
  "details": "Large pothole causing traffic issues",
  "status": "Pending",
  "tag": "",
  "date": "28/01/2026",
  "createdAt": "2026-01-28T...",
  "updatedAt": "2026-01-28T..."
}
```

## 🧪 Testing the API

### Using MongoDB Compass (GUI)
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You'll see the `prajavaradhi` database after first signup
4. Explore `users` and `issues` collections

### Using Postman or Thunder Client

#### Signup Request:
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

#### Login Request:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "user": "john@example.com",
  "password": "password123"
}
```

#### Create Issue:
```
POST http://localhost:5000/api/issues
Content-Type: application/json

{
  "district": "VI",
  "category": "Road & Infrastructure",
  "title": "Pothole Issue",
  "location": "Main Street",
  "details": "Large pothole needs fixing",
  "userId": "user_object_id_here"
}
```

## 🔐 Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Input validation
✅ Unique email and phone constraints
✅ Mongoose schema validation
✅ CORS enabled for frontend
✅ Error handling middleware

## 📁 Backend Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── issueController.js # Issue management logic
├── models/
│   ├── User.js            # User schema
│   └── Issue.js           # Issue schema
├── routes/
│   ├── auth.js            # Auth routes
│   └── issues.js          # Issue routes
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── README.md             # This file
└── server.js             # Main server file
```

## 🎯 Next Steps

1. **Install Node.js and MongoDB** (see above)
2. **Run `npm install`** in the backend folder
3. **Start MongoDB** (usually automatic)
4. **Start the backend server** with `npm run dev`
5. **Update frontend files** to make API calls (I can help with this)
6. **Test the application**

## ⚠️ Troubleshooting

### MongoDB not connecting?
- Check if MongoDB service is running
- Verify connection string in `.env` file
- Try: `mongodb://127.0.0.1:27017/prajavaradhi`

### Port 5000 already in use?
- Change PORT in `.env` file to another port (e.g., 3000)
- Update API URLs in frontend accordingly

### CORS errors?
- Make sure backend is running
- Check that CORS is enabled in `server.js`
- Verify API URL in frontend matches backend URL

## 📞 Support

If you encounter any issues, check the console logs for error messages. Most errors will provide helpful information about what went wrong.

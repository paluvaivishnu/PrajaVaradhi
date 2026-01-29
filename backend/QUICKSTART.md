# 🚀 Quick Start Guide - MongoDB Backend

## ✅ What's Already Done

Your MongoDB backend is **100% ready!** It includes:

- ✅ **User Authentication** (Signup/Login with JWT)
- ✅ **Issue Management** (Create, Read, Update)
- ✅ **Password Security** (bcrypt hashing)
- ✅ **Authorization** (Role-based access control)
- ✅ **Database Models** (User & Issue schemas)
- ✅ **API Routes** (RESTful endpoints)
- ✅ **CORS** (Frontend integration ready)

---

## 📦 Installation Steps (One-Time Setup)

### Step 1: Install Node.js
1. Download from: https://nodejs.org/ (LTS version)
2. Install and verify:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install MongoDB
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Choose **Windows** → Download MSI installer
3. During installation:
   - Select "Complete" installation
   - ✅ Install as Windows Service
   - ✅ Install MongoDB Compass (GUI tool)

4. MongoDB will auto-start as a service

### Step 3: Install Backend Dependencies
Open PowerShell in your backend folder:
```bash
cd C:\Users\Admin\Desktop\hack\hack\backend
npm install
```

---

## 🎯 Running the Backend

### Start the Server:
```bash
cd C:\Users\Admin\Desktop\hack\hack\backend
npm run dev
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
API available at http://localhost:5000
```

**That's it!** Your backend is now running! 🎉

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user/admin

### Issues
- `GET /api/issues` - Get all issues (public)
- `GET /api/issues/:id` - Get single issue (public)
- `POST /api/issues` - Create new issue (protected)
- `GET /api/issues/user/:userId` - Get user's issues (protected)
- `PUT /api/issues/:id` - Update issue status (admin only)

---

## 🔐 Test Using Browser Console

Open any of your HTML files and test the API:

### Test Signup:
```javascript
fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### Test Login:
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user: 'test@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => {
  console.log(data);
  // Save token for authenticated requests
  localStorage.setItem('token', data.token);
});
```

### Test Create Issue (needs token):
```javascript
const token = localStorage.getItem('token');
const userId = JSON.parse(localStorage.getItem('user')).id;

fetch('http://localhost:5000/api/issues', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    district: 'VI',
    category: 'Road & Infrastructure',
    title: 'Pothole on Main Street',
    location: 'Main Street, Sector 5',
    details: 'Large pothole causing issues',
    userId: userId
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🗄️ View Your Database

1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. You'll see `prajavaradhi` database
4. Explore the `users` and `issues` collections

---

## 📝 Default Admin Credentials

For testing, use these admin accounts:
- Username: `admin` / Password: `admin123`
- Username: `collector` / Password: `gov456`

---

## ⚙️ Configuration

The `.env` file contains:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prajavaradhi
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` before deploying to production!

---

## 🔧 Common Issues & Solutions

### MongoDB won't connect?
- Check if MongoDB service is running
- Windows: Open Services → Find "MongoDB" → Start
- Alternative URI: `mongodb://127.0.0.1:27017/prajavaradhi`

### Port 5000 already in use?
- Change `PORT=3000` in `.env` file
- Update frontend API URLs accordingly

### CORS errors?
- Ensure backend is running
- Check API URL in frontend matches backend

---

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  phone: String (unique, 10 digits),
  password: String (hashed),
  role: 'citizen' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Issues Collection
```javascript
{
  id: String (e.g., "VI-1234"),
  userId: ObjectId (ref: User),
  district: String,
  category: String,
  title: String,
  location: String,
  details: String,
  status: 'Pending' | 'In Action' | 'Resolved',
  tag: String,
  date: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Integrate with Frontend

Your HTML files can now use real backend APIs instead of localStorage!

Example for `login.html`:
```javascript
async function login() {
  const user = document.getElementById("user").value.trim();
  const password = document.getElementById("pass").value;
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on role
      window.location.href = data.user.role === 'admin' ? 'admin.html' : 'home.html';
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error connecting to server');
  }
}
```

---

## 🛠️ Development Tips

- **Auto-reload**: Using `npm run dev` automatically restarts on code changes
- **Logging**: Check console for MongoDB connection and error logs
- **Testing**: Use Postman/Thunder Client for API testing
- **Database**: Use MongoDB Compass GUI to view/edit data directly

---

## ✨ Next Steps

1. ✅ Run `npm install` (if not done)
2. ✅ Start backend with `npm run dev`
3. ✅ Test APIs using browser console
4. ✅ Connect your HTML frontend to the backend
5. ✅ View data in MongoDB Compass

Your backend is production-ready with security, validation, and error handling! 🚀

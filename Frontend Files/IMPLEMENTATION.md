# PrajaVaradhi - Implementation Documentation

## Project Overview
**PrajaVaradhi** is a citizen complaint management system for Andhra Pradesh that enables citizens to raise public issues and allows district-based administrators to manage and resolve them.

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Local)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcryptjs
- **Middleware**: CORS, Express JSON Parser

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with gradients and animations
- **JavaScript**: Vanilla JS (ES6+)
- **API Communication**: Fetch API

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (HTML/CSS/JS)                │
├─────────────────────────────────────────────────────────────┤
│  home.html  │  signup.html  │  login.html  │  admin-signup  │
│  index.html │  raise.html   │  track.html  │  admin.html    │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP Requests (Fetch API)
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Express.js)                  │
├─────────────────────────────────────────────────────────────┤
│  Routes:                                                     │
│  • /api/auth/signup    • /api/auth/login                    │
│  • /api/auth/me        • /api/issues                        │
│  • /api/issues/:id     • /api/issues/user/:userId          │
└─────────────────────┬───────────────────────────────────────┘
                      │ Mongoose ODM
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                          │
├─────────────────────────────────────────────────────────────┤
│  Collections:                                                │
│  • users    (Citizens & Admins)                             │
│  • issues   (Complaints)                                     │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['citizen', 'admin'], default: 'citizen'),
  district: String (optional, required for admins),
  createdAt: Date,
  updatedAt: Date
}
```

### Issue Model
```javascript
{
  id: String (custom format: DISTRICT-DATE-RANDOM),
  userId: ObjectId (ref: User),
  userName: String,
  userPhone: String,
  district: String (required),
  category: String,
  title: String (required),
  location: String (required),
  details: String (required),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Medium'),
  status: String (enum: ['Pending', 'In Action', 'Resolved'], default: 'Pending'),
  tag: String (optional),
  photos: [String] (optional),
  assignedTo: ObjectId (ref: User),
  assignedDate: Date,
  resolvedDate: Date,
  resolutionNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST /api/auth/signup
**Description**: Register a new user (citizen or admin)
**Access**: Public
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "role": "citizen", // or "admin"
  "district": "Visakhapatnam" // required for admins
}
```
**Response**:
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "citizen",
    "district": null
  }
}
```

#### POST /api/auth/login
**Description**: Login user
**Access**: Public
**Request Body**:
```json
{
  "email": "john@example.com", // or phone
  "password": "password123"
}
```
**Response**: Same as signup

#### GET /api/auth/me
**Description**: Get current user details
**Access**: Protected (requires JWT token)
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

### Issue Routes (`/api/issues`)

#### GET /api/issues
**Description**: Get all issues (filtered by district for admins)
**Access**: Protected
**Headers**: `Authorization: Bearer <token>`
**Response**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "issue_id",
      "id": "VISAKHAPATNAM-20260128-1234",
      "district": "Visakhapatnam",
      "category": "Road & Infrastructure",
      "title": "Pothole on Main Road",
      "location": "MG Road, Visakhapatnam",
      "status": "Pending",
      "createdAt": "2026-01-28T10:00:00.000Z"
    }
  ]
}
```

#### POST /api/issues
**Description**: Create a new issue
**Access**: Protected
**Request Body**:
```json
{
  "district": "Visakhapatnam",
  "category": "Road & Infrastructure",
  "title": "Pothole on Main Road",
  "location": "MG Road, Visakhapatnam",
  "details": "Large pothole causing accidents",
  "priority": "High"
}
```

#### PUT /api/issues/:id
**Description**: Update issue status (admin only)
**Access**: Protected + Admin role
**Request Body**:
```json
{
  "status": "Resolved",
  "tag": "Fixed",
  "resolutionNotes": "Pothole filled on 28th Jan"
}
```

## User Roles & Permissions

### Citizen
- **Can**:
  - Sign up and login
  - Raise complaints
  - Track all complaints (public view)
  - View their own complaint history
- **Cannot**:
  - Update complaint status
  - Access admin dashboard

### District Admin
- **Can**:
  - Register with admin code (`ADMIN2026`)
  - Login to admin portal
  - View complaints from their assigned district only
  - Update complaint status (Pending → In Action → Resolved)
  - Add tags and resolution notes
- **Cannot**:
  - View complaints from other districts
  - Delete complaints

### Super Admin (Legacy)
- **Credentials**: `admin` / `admin123`
- **Can**:
  - View ALL complaints from ALL districts
  - Full admin privileges

## Frontend Pages

### Public Pages
1. **home.html**: Landing page with navigation
2. **signup.html**: Citizen registration
3. **admin-signup.html**: Admin registration (requires admin code)
4. **login.html**: Login for both citizens and admins

### Citizen Pages (Protected)
1. **index.html**: Citizen dashboard
2. **raise.html**: Submit new complaint
3. **track.html**: Track all complaints

### Admin Pages (Protected + Admin Role)
1. **admin.html**: Admin dashboard with district-filtered complaints

### Static Pages
1. **budget.html**: Budget information
2. **scheme.html**: Government schemes

## Key Features

### 1. District-Based Admin System
- Each district has its own administrator
- Admins only see complaints from their district
- Automatic filtering at API level
- Scalable for all 13 districts of Andhra Pradesh

### 2. Authentication & Security
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Role-based access control (RBAC)
- Admin verification code for admin registration

### 3. Complaint Management
- Custom issue ID generation (e.g., `VISAKHAPATNAM-20260128-1234`)
- Status tracking (Pending → In Action → Resolved)
- Priority levels (Low, Medium, High)
- Tag system for categorization
- Resolution notes

### 4. Real-time Statistics
- Total complaints count
- Pending, In Action, Resolved counts
- District-specific statistics for admins

## Setup Instructions

### Prerequisites
1. Node.js (v14 or higher)
2. MongoDB (running locally on port 27017)

### Installation Steps

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Update MongoDB URI if needed (default: `mongodb://localhost:27017/prajavaradhi`)

4. **Start MongoDB**:
   ```bash
   mongod
   ```

5. **Start the backend server**:
   ```bash
   node server.js
   ```
   Server will run on `http://localhost:5000`

6. **Open frontend**:
   - Open `home.html` in your browser
   - Or use Live Server extension in VS Code

## Testing Workflow

### Test 1: Citizen Flow
1. Open `home.html`
2. Click "Sign Up" → Register as citizen
3. Login with credentials
4. Go to "Raise Request"
5. Select district, fill form, submit
6. Note the Issue ID
7. Go to "Track Complaints" → Verify issue appears

### Test 2: District Admin Flow
1. Logout from citizen account
2. Go to Login → Click "Register as District Admin"
3. Fill form, select district (e.g., "Visakhapatnam")
4. Enter admin code: `ADMIN2026`
5. Register and login
6. Admin dashboard shows "Managing Visakhapatnam District"
7. Only Visakhapatnam complaints are visible
8. Update status to "Resolved"
9. Verify statistics update

### Test 3: Multi-District Testing
1. Register another admin for different district (e.g., "Guntur")
2. Raise complaint in Guntur district
3. Login as Guntur admin → See only Guntur complaints
4. Login as Visakhapatnam admin → Don't see Guntur complaints

## File Structure

```
hack/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── issueController.js    # Issue CRUD operations
│   ├── middleware/
│   │   └── auth.js               # JWT verification & RBAC
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Issue.js              # Issue schema
│   │   └── [other models]        # Future features
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── issues.js             # Issue routes
│   ├── .env                      # Environment variables
│   ├── package.json              # Dependencies
│   └── server.js                 # Express app entry point
├── js/
│   ├── api.js                    # API utility functions
│   └── auth.js                   # Frontend auth logic
├── home.html                     # Landing page
├── signup.html                   # Citizen signup
├── admin-signup.html             # Admin signup
├── login.html                    # Login page
├── index.html                    # Citizen dashboard
├── raise.html                    # Raise complaint
├── track.html                    # Track complaints
├── admin.html                    # Admin dashboard
├── budget.html                   # Budget info
├── scheme.html                   # Schemes info
├── logo.png                      # Logo
├── indian-flag.jpg               # Flag image
├── README_SETUP.md               # Setup guide
└── ADMIN_SYSTEM_GUIDE.md         # Admin guide
```

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prajavaradhi
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

## Admin Verification Code
- **Code**: `ADMIN2026`
- Used during admin registration to verify legitimate administrators
- Can be changed in `admin-signup.html`

## Districts Supported
1. Visakhapatnam
2. Guntur
3. East Godavari
4. West Godavari
5. Krishna
6. Anantapur
7. Chittoor
8. Srikakulam
9. Kurnool
10. Nellore
11. Prakasam
12. YSR Kadapa
13. Vizianagaram

## Future Enhancements
- [ ] File upload for complaint photos
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Analytics dashboard
- [ ] Budget tracking integration
- [ ] Scheme management
- [ ] Feedback system
- [ ] Mobile app (React Native)

## Troubleshooting

### Issue: "Failed to load issues"
- **Solution**: Ensure backend server is running on port 5000
- Check MongoDB connection

### Issue: "Complaints not showing in admin portal"
- **Solution**: Ensure district names match exactly between complaint and admin
- Refresh browser cache

### Issue: "Login failed"
- **Solution**: Check credentials
- Verify MongoDB is running
- Check console for errors

## Security Best Practices
1. Never commit `.env` file to version control
2. Use strong JWT secret in production
3. Implement rate limiting for API endpoints
4. Add HTTPS in production
5. Sanitize user inputs
6. Implement CSRF protection

## License
This project is developed for Andhra Pradesh Government citizen services.

## Contact & Support
For issues and support, contact the development team.

---
**Last Updated**: January 28, 2026
**Version**: 1.0.0

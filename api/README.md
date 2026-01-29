# PrajaVaradhi Backend API

## Setup Instructions

### 1. Install MongoDB
Download and install MongoDB from: https://www.mongodb.com/try/download/community

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
Edit `.env` file with your MongoDB connection string if needed.

### 4. Start MongoDB
```bash
mongod
```

### 5. Run the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will run on: http://localhost:5000

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Register new user
- **POST** `/api/auth/login` - Login user

### Issues/Complaints
- **GET** `/api/issues` - Get all issues
- **POST** `/api/issues` - Create new issue
- **PUT** `/api/issues/:id` - Update issue status/tag

## Admin Credentials
- Username: `admin` / Password: `admin123`
- Username: `collector` / Password: `gov456`

## Test the API
Use Postman or any API testing tool to test endpoints.

### Example Signup Request:
```json
POST http://localhost:5000/api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123"
}
```

### Example Login Request:
```json
POST http://localhost:5000/api/auth/login
{
  "user": "john@example.com",
  "password": "password123"
}
```

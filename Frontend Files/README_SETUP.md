# PrajaVaradhi - Problem Raising System Setup Guide

This guide explains how to run the full application with the new MongoDB backend integration.

## 1. Prerequisites
- **Node.js** installed.
- **MongoDB** installed and running locally.

## 2. Start the Backend Server
The backend handles authentication and database operations.

1. Open a terminal.
2. Navigate to the backend folder:
   ```bash
   cd c:\Users\Admin\Desktop\hack\hack\backend
   ```
3. Install dependencies (if not already done):
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node server.js
   ```
   *You should see "Server running on port 5000" and "MongoDB Connected".*

## 3. Run the Frontend
You can open the HTML files directly in your browser or use a "Live Server" extension in VS Code.

1. **Open `home.html`** to start.
2. **Sign Up**: Create a new Citizen account via the "Sign Up" button.
3. **Login**: Login with your new account.
4. **Raise Issue**: Go to "Raise a Request" to submit a complaint.
   - It will be saved to your local MongoDB database.
5. **Track**: Go to "Track Complaints" to see all public issues.

## 4. Admin Access (Officials)
To manage complaints, you need to log in as an admin.

**Default Admin Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

or

- **Username:** `collector`
- **Password:** `gov456`

1. Go to `login.html`.
2. Login with the credentials above.
3. You will be redirected to the **Admin Portal** (`admin.html`).
4. Here you can see all raised issues, update their status (Pending -> In Action -> Resolved), and mark them as completed.

## 5. Troubleshooting
- **Login doesn't work?** Ensure the backend server (`node server.js`) is running.
- **Issues not saving?** Check your MongoDB connection string in `.env`.
- **"Network Error"?** Make sure `js/api.js` points to `http://localhost:5000/api` and CORS is enabled on the server (it is enabled by default).

---
*System is now fully integrated with MongoDB.*

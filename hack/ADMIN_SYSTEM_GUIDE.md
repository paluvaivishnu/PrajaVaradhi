# District-Based Admin System - Quick Guide

## Overview
The system now supports multiple district-based admins. Each admin manages complaints only from their assigned district.

## Admin Registration

### Step 1: Access Admin Signup
- Go to `login.html`
- Click on **"Register as District Admin"** link

### Step 2: Fill Registration Form
- **Full Name**: Your name
- **Email**: Your official email
- **Phone**: 10-digit phone number
- **District**: Select your district from the dropdown
- **Password**: Minimum 6 characters
- **Admin Code**: Enter `ADMIN2026` (verification code)

### Step 3: Login
After registration, login with your email/phone and password.

## How It Works

### For District Admins:
- **Filtered View**: You only see complaints from YOUR assigned district
- **Dashboard**: Shows statistics for your district only
- **Updates**: You can update status and add tags to complaints in your district

### For Super Admin (Legacy):
- Username: `admin` / Password: `admin123`
- **Full Access**: Can see ALL complaints from ALL districts
- No district restriction

## District List
- Visakhapatnam
- Guntur
- East Godavari
- West Godavari
- Krishna
- Anantapur
- Chittoor
- Srikakulam
- Kurnool
- Nellore
- Prakasam
- YSR Kadapa
- Vizianagaram

## Example Workflow

1. **Visakhapatnam Admin** registers with district "Visakhapatnam"
2. Citizen raises complaint in Visakhapatnam
3. Visakhapatnam Admin logs in → Sees only Visakhapatnam complaints
4. Admin updates status to "Resolved"
5. Citizen can track the updated status

## Security
- Admin verification code required: `ADMIN2026`
- Passwords are hashed in database
- JWT token-based authentication
- District filtering enforced at API level

---
*Each district now has its own dedicated admin for faster response times!*

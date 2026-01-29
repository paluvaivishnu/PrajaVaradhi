# PrajaVaradhi - Citizen Complaint Management System

## Project Overview

PrajaVaradhi is a comprehensive digital platform designed to bridge the gap between citizens and government representatives in Andhra Pradesh. The system enables citizens to raise complaints, track their resolution status, and engage with public representatives, while providing politicians and administrators with powerful tools to manage, monitor, and resolve civic issues efficiently. Built with a focus on transparency and accountability, PrajaVaradhi empowers citizens to actively participate in governance and holds elected representatives accountable for their promises and actions.

## Key Features

**For Citizens:**
- User-friendly complaint submission system with category-based classification (Roads, Water, Electricity, Education, Healthcare, Sanitation)
- Real-time complaint tracking with status updates (New, In Progress, Resolved)
- District-based complaint routing for efficient resolution
- Secure authentication with JWT tokens
- Personal dashboard to view complaint history
- Budget enquiry system for transparency in fund allocation
- Feedback and rating system for government services

**For Politicians/Public Representatives:**
- Comprehensive dashboard with 8 specialized modules
- Public Issues Dashboard with advanced filtering (area, category, priority, status)
- Approve/Escalate system for quick action on citizen requests
- Constituency Overview with analytics and problem area identification
- Government Schemes Monitor to track implementation and beneficiary feedback
- Budget & Development Works tracker with fund allocation vs usage metrics
- Announcements & Messages system for public communication
- Public Feedback & Sentiment analysis dashboard
- Profile & Accountability section with promise tracking and achievement showcase

**For Administrators:**
- District-based admin authentication and management
- Role-based access control (Citizen, Admin, Politician)
- Centralized complaint management system
- Admin signup with district assignment
- Super admin capabilities to oversee all districts
- Complete CRUD operations on complaints and user data

## Technology Stack

**Frontend:**
- Pure HTML5, CSS3, and Vanilla JavaScript
- Responsive design with mobile-first approach
- Modern UI with card-based layouts and gradient backgrounds
- Cultural branding with Andhra Pradesh theme
- No external frameworks for maximum performance

**Backend:**
- Node.js with Express.js framework
- RESTful API architecture
- JWT-based authentication and authorization
- Bcrypt for secure password hashing
- CORS enabled for cross-origin requests

**Database:**
- MongoDB for flexible, scalable data storage
- Mongoose ODM for elegant data modeling
- Collections: Users, Issues, Complaints
- District-based data segregation

**Security:**
- JWT token-based authentication
- Password encryption with bcrypt
- Role-based access control
- Protected API routes
- Input validation and sanitization

## System Architecture

The application follows a three-tier architecture:

1. **Presentation Layer:** Clean, intuitive HTML/CSS/JS interfaces for citizens, politicians, and admins
2. **Application Layer:** Node.js/Express backend handling business logic, authentication, and API endpoints
3. **Data Layer:** MongoDB database storing user information, complaints, and system data

## Project Structure

```
PrajaVaradhi/
├── Frontend (HTML/CSS/JS)
│   ├── home.html - Landing page with AP cultural background
│   ├── signup.html - Citizen registration
│   ├── login.html - User authentication
│   ├── track.html - Complaint tracking dashboard
│   ├── admin.html - Admin complaint management
│   ├── admin-signup.html - District admin registration
│   ├── budget.html - Budget transparency portal
│   ├── politician-dashboard.html - Main politician navigation
│   ├── politician-issues.html - Issue management with filters
│   ├── politician-approve.html - Request approval system
│   ├── politician-constituency.html - Analytics dashboard
│   ├── politician-schemes.html - Government schemes monitor
│   ├── politician-budget.html - Development works tracker
│   ├── politician-announcements.html - Public communication
│   ├── politician-feedback.html - Sentiment analysis
│   └── politician-profile.html - Accountability tracker
├── Backend (Node.js/Express)
│   ├── index.js - Server entry point
│   ├── config/db.js - MongoDB connection
│   ├── models/ - Mongoose schemas (User, Issue)
│   ├── controllers/ - Business logic (auth, issues)
│   ├── routes/ - API endpoints
│   └── middleware/ - Authentication & authorization
├── Assets
│   ├── logo.png - PrajaVaradhi branding
│   ├── ap-culture.jpg - Cultural background
│   └── js/ - Shared JavaScript utilities
└── Documentation
    ├── README_SETUP.md - Installation guide
    ├── IMPLEMENTATION.md - Technical documentation
    └── MONGODB_SETUP.md - Database setup
```

## Key Functionalities

**Authentication & Authorization:**
- Multi-role system (Citizen, District Admin, Politician, Super Admin)
- Secure signup and login with email/phone
- JWT token management with localStorage
- District-based admin segregation
- Role-based page access control

**Complaint Management:**
- Category-wise complaint submission
- Priority assignment (High, Medium, Low)
- Status tracking workflow
- District-based routing
- Admin approval/escalation/resolution
- Citizen feedback on resolution

**Analytics & Reporting:**
- Constituency-wise complaint statistics
- Category breakdown with visual indicators
- Resolution rate tracking
- Top problem areas identification
- Sentiment analysis (Positive, Neutral, Negative)
- Service rating system

**Transparency Features:**
- Budget allocation vs usage tracking
- Development project progress monitoring
- Promise vs progress accountability
- Public announcements system
- Citizen budget enquiries

## Installation & Setup

1. **Prerequisites:** Node.js, MongoDB, Git
2. **Clone Repository:** `git clone https://github.com/paluvaivishnu/PrajaVaradhi.git`
3. **Install Dependencies:** `npm install` in backend directory
4. **Configure Environment:** Create `.env` with MongoDB URI and JWT secret
5. **Start MongoDB:** Ensure MongoDB service is running
6. **Run Backend:** `node index.js` or `npm start`
7. **Access Application:** Open `home.html` in browser

## Default Credentials

- **Admin:** Username: `admin` | Password: `admin123`
- **Citizens:** Register via signup page
- **District Admins:** Register via admin-signup page with district selection

## Future Enhancements

- Mobile application (Android/iOS)
- SMS/Email notifications for status updates
- Multilingual support (Telugu, Hindi, English)
- AI-based complaint categorization
- Chatbot for citizen assistance
- Integration with government databases
- Advanced analytics with charts and graphs
- Geolocation-based complaint mapping
- Document upload for complaint evidence
- WhatsApp integration for updates

## Impact & Benefits

- **For Citizens:** Easy complaint submission, transparent tracking, accountability of representatives
- **For Politicians:** Data-driven decision making, constituent engagement, performance tracking
- **For Administration:** Efficient resource allocation, problem area identification, improved governance
- **For Society:** Enhanced civic participation, transparent governance, faster issue resolution

## License & Credits

Developed as part of a civic technology initiative to improve citizen-government interaction in Andhra Pradesh. Open for community contributions and enhancements.

---

**PrajaVaradhi** - Empowering Citizens, Enabling Governance, Ensuring Accountability

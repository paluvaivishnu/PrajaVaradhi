# MongoDB Models Overview - PrajaVaradhi Platform

## 🎯 Complete Database Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRAJAVARADHI DATABASE                        │
│                   mongodb://localhost:27017                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴──────────────┐
                │                            │
        ┌───────▼────────┐          ┌───────▼────────┐
        │  CORE MODELS   │          │  FEATURE MODELS│
        └───────┬────────┘          └───────┬────────┘
                │                            │
    ┌───────────┼───────────┐               │
    │           │           │               │
┌───▼───┐  ┌───▼───┐  ┌───▼───┐      ┌────▼────┐
│ User  │  │ Issue │  │Scheme │      │Budget   │
│ 👤    │  │ 📋    │  │ 📜    │      │ 💰      │
└───┬───┘  └───┬───┘  └───────┘      └─────────┘
    │          │
    │    ┌─────┴─────┬──────────┬─────────────┐
    │    │           │          │             │
┌───▼────▼───┐  ┌───▼────┐ ┌──▼──────┐  ┌───▼──────┐
│Notification│  │Feedback│ │Analytics│  │ (Future) │
│     🔔     │  │   ⭐   │ │   📊    │  │          │
└────────────┘  └────────┘ └─────────┘  └──────────┘
```

---

## 📦 MODEL DETAILS

### 1️⃣ USER MODEL
```
┌─────────────────────────────────────┐
│           USER SCHEMA               │
├─────────────────────────────────────┤
│ 🔑 _id: ObjectId                    │
│ 👤 name: String                     │
│ 📧 email: String (unique)           │
│ 📱 phone: String (unique)           │
│ 🔒 password: String (hashed)        │
│ 🎭 role: citizen | admin            │
│ 📍 district: String                 │
│ 🏠 address: String                  │
│ 🖼️ profilePicture: URL              │
│ ✅ isActive: Boolean                │
│ ⏰ lastLogin: Date                  │
│ 📅 registeredDate: Date             │
│ 🕒 timestamps: true                 │
└─────────────────────────────────────┘
        │
        ├──> Creates Issues
        ├──> Receives Notifications
        ├──> Submits Feedback
        └──> Can be assigned Issues (if admin)
```

### 2️⃣ ISSUE MODEL
```
┌─────────────────────────────────────┐
│          ISSUE SCHEMA               │
├─────────────────────────────────────┤
│ 🆔 id: String (ISS001)              │
│ 👤 userId: → User                   │
│ 👨 userName: String                 │
│ 📞 userPhone: String                │
│ 📍 district: String                 │
│ 🏷️ category: String                 │
│ 📝 title: String                    │
│ 📌 location: String                 │
│ 📄 details: String                  │
│ 🚦 status: Pending|InAction|Solved  │
│ ⚡ priority: Low|Med|High|Critical  │
│ 🏷️ tag: String                      │
│ 📸 photos: [URLs]                   │
│ 👮 assignedTo: → User (admin)       │
│ 📅 assignedDate: Date               │
│ ✅ resolvedDate: Date               │
│ 📝 resolutionNotes: String          │
│ 👁️ viewCount: Number                │
│ 👍 upvotes: Number                  │
│ 🕒 timestamps: true                 │
└─────────────────────────────────────┘
```

### 3️⃣ SCHEME MODEL
```
┌─────────────────────────────────────┐
│         SCHEME SCHEMA               │
├─────────────────────────────────────┤
│ 📜 name: String                     │
│ 📝 description: String              │
│ 🏷️ category: Agriculture|Education  │
│ 🏛️ department: String               │
│ ✅ eligibilityCriteria: String      │
│ 🎁 benefits: String                 │
│ 📋 applicationProcess: String       │
│ 📄 documentsRequired: [Strings]     │
│ 💰 budgetAllocated: Number          │
│ 💸 budgetUtilized: Number           │
│ 🎯 targetBeneficiaries: Number      │
│ 👥 beneficiariesEnrolled: Number    │
│ 🌐 officialWebsite: URL             │
│ 📞 contactNumber: String            │
│ 📧 contactEmail: String             │
│ 📅 startDate: Date                  │
│ ⏰ endDate: Date                    │
│ ✅ isActive: Boolean                │
│ 📍 districts: [Strings]             │
│ 🎂 ageLimit: {min, max}             │
│ 💵 incomeLimit: Number              │
│ ⏳ applicationDeadline: Date        │
│ 🎨 icon: String (emoji)             │
└─────────────────────────────────────┘
```

### 4️⃣ BUDGET MODEL
```
┌─────────────────────────────────────┐
│         BUDGET SCHEMA               │
├─────────────────────────────────────┤
│ 📅 year: String (2025-26)           │
│ 🏛️ department: String               │
│ 🏷️ category: Infrastructure|etc     │
│ 🏗️ projectName: String              │
│ 📝 description: String              │
│ 💰 allocatedAmount: Number          │
│ 💸 spentAmount: Number              │
│ 💵 remainingAmount: Number (calc)   │
│ 📊 utilizationPercentage: % (calc)  │
│ 📍 district: String                 │
│ 🗺️ constituency: String             │
│ 🚦 status: Proposed|Progress|Done   │
│ ⚡ priority: Low|Med|High|Critical  │
│ 📅 startDate: Date                  │
│ ⏰ expectedEndDate: Date            │
│ ✅ actualEndDate: Date              │
│ 👥 beneficiaries: Number            │
│ 🏗️ physicalProgress: % (0-100)     │
│ 💰 financialProgress: % (0-100)     │
│ 👷 contractorName: String           │
│ 📞 contractorContact: String        │
│ 📄 sanctionOrderNumber: String      │
│ 📋 documents: [Files]               │
│ 🎯 milestones: [Objects]            │
└─────────────────────────────────────┘
```

### 5️⃣ NOTIFICATION MODEL
```
┌─────────────────────────────────────┐
│      NOTIFICATION SCHEMA            │
├─────────────────────────────────────┤
│ 👤 userId: → User                   │
│ 📋 issueId: → Issue (optional)      │
│ 🏷️ type: issue_update|status_change│
│ 📝 title: String                    │
│ 💬 message: String                  │
│ ✅ isRead: Boolean                  │
│ ⚡ priority: low|medium|high        │
│ 🔗 actionUrl: String                │
│ 🎨 icon: String (emoji)             │
│ 📦 metadata: Mixed                  │
│ 👁️ readAt: Date                     │
└─────────────────────────────────────┘
```

### 6️⃣ FEEDBACK MODEL
```
┌─────────────────────────────────────┐
│        FEEDBACK SCHEMA              │
├─────────────────────────────────────┤
│ 👤 userId: → User                   │
│ 📋 issueId: → Issue (optional)      │
│ 🏷️ type: issue|platform|suggestion │
│ ⭐ rating: Number (1-5)             │
│ 📝 subject: String                  │
│ 💬 message: String                  │
│ 🏷️ category: Service|Time|Quality  │
│ 🚦 status: Pending|Reviewed|Done    │
│ 💭 adminResponse: String            │
│ 👨‍💼 respondedBy: → User (admin)     │
│ ⏰ respondedAt: Date                │
│ 📢 isPublished: Boolean             │
│ 🕶️ isAnonymous: Boolean             │
└─────────────────────────────────────┘
```

### 7️⃣ ANALYTICS MODEL
```
┌─────────────────────────────────────┐
│       ANALYTICS SCHEMA              │
├─────────────────────────────────────┤
│ 📅 date: Date                       │
│ 🏷️ type: daily|weekly|monthly      │
│                                     │
│ 👥 USER STATS                       │
│   • totalUsers                      │
│   • newUsers                        │
│   • activeUsers                     │
│                                     │
│ 📋 ISSUE STATS                      │
│   • totalIssues                     │
│   • pendingIssues                   │
│   • inActionIssues                  │
│   • resolvedIssues                  │
│   • issuesByCategory: Map           │
│   • issuesByDistrict: Map           │
│   • averageResolutionTime (hrs)     │
│                                     │
│ 📜 SCHEME STATS                     │
│   • totalSchemes                    │
│   • activeSchemes                   │
│   • totalBeneficiaries              │
│                                     │
│ 💰 BUDGET STATS                     │
│   • totalBudgetAllocated            │
│   • totalBudgetUtilized             │
│   • budgetUtilizationPercentage     │
│                                     │
│ ⭐ FEEDBACK STATS                   │
│   • totalFeedback                   │
│   • averageRating                   │
│                                     │
│ 📊 ENGAGEMENT                       │
│   • totalPageViews                  │
│   • totalSessionDuration            │
│   • notificationsSent               │
└─────────────────────────────────────┘
```

---

## 🔗 RELATIONSHIPS DIAGRAM

```
                    ┌─────────┐
                    │  USER   │
                    └────┬────┘
                         │
          ┌──────────────┼──────────────┬────────────┐
          │              │              │            │
     Creates         Receives      Submits      Assigned
          │              │              │            │
    ┌─────▼────┐   ┌────▼─────┐  ┌────▼────┐  ┌────▼────┐
    │  ISSUE   │   │NOTIFICATION│ │FEEDBACK │  │  ISSUE  │
    └─────┬────┘   └──────────┘  └─────────┘  │(as admin)│
          │                                    └─────────┘
          │
    ┌─────┴─────┬───────────┐
    │           │           │
Links to    Links to    Links to
    │           │           │
┌───▼────┐  ┌──▼──────┐  ┌─▼────────┐
│NOTIFIC.│  │FEEDBACK │  │ANALYTICS │
└────────┘  └─────────┘  └──────────┘


INDEPENDENT MODELS:
┌─────────┐  ┌────────┐
│ SCHEME  │  │ BUDGET │
└─────────┘  └────────┘
```

---

## 📈 DATA FLOW

```
1. CITIZEN FLOW
   User Signs Up → User Created in DB
                 ↓
   Submit Issue → Issue Created
                 ↓
   Admin Updates → Notification Sent to User
                 ↓
   Issue Resolved → User Submits Feedback
                 ↓
   Analytics Updated

2. ADMIN FLOW
   Admin Login → View Dashboard (Analytics)
               ↓
   View Issues → Assign to Self
               ↓
   Update Status → Notification Sent to Citizen
               ↓
   Add Resolution Notes → Mark Resolved
               ↓
   Analytics Updated

3. SCHEME FLOW
   Scheme Created → Citizens View
                  ↓
   Citizens Apply (External)
                  ↓
   Beneficiary Count Updated
                  ↓
   Budget Utilization Updated
                  ↓
   Analytics Reflects Impact

4. BUDGET FLOW
   Budget Allocated → Project Starts
                    ↓
   Milestones Updated → Progress Tracked
                    ↓
   Spending Updated → Utilization Calculated
                    ↓
   Analytics Dashboard Shows Transparency
```

---

## 🎨 FIELD TYPE LEGEND

```
🔑 = Primary Key
👤 = User Reference
📋 = Issue Reference
🏷️ = Enum Field
⚡ = Priority/Status
📅 = Date
💰 = Money/Number
📝 = Text
🔒 = Encrypted/Hashed
✅ = Boolean
🎨 = UI Element (icon/emoji)
🗺️ = Location
📸 = Media (photos/files)
📊 = Calculated Field
🔔 = Notification
⭐ = Rating
```

---

## 💾 STORAGE ESTIMATES

```
Model          Avg Size    100 Records    1000 Records
─────────────────────────────────────────────────────
User           800 bytes   78 KB          781 KB
Issue          1.2 KB      117 KB         1.17 MB
Scheme         1.5 KB      146 KB         1.46 MB
Budget         2.0 KB      195 KB         1.95 MB
Notification   500 bytes   49 KB          488 KB
Feedback       600 bytes   59 KB          586 KB
Analytics      3.0 KB      293 KB         2.93 MB
─────────────────────────────────────────────────────
TOTAL          ~9.6 KB     ~937 KB        ~9.4 MB
```

---

## 🔍 INDEXES CONFIGURED

```
User Model:
  • email (unique)
  • phone (unique)

Issue Model:
  • id (unique)
  • userId, assignedTo (references)

Scheme Model:
  • name, category, isActive (compound)
  • districts (array)

Budget Model:
  • year, department (compound)
  • district, status (compound)
  • category (single)

Notification Model:
  • userId, isRead (compound)
  • createdAt (descending)

Feedback Model:
  • userId, issueId, rating, status (singles)

Analytics Model:
  • date, type (compound, unique)
  • type (single)
```

---

## 🎯 READY TO USE!

✅ 7 Models Created
✅ All Relationships Defined
✅ Indexes Configured
✅ Sample Data Seeder Ready
✅ Documentation Complete
✅ Backend Connected to MongoDB

**Next:** Run `node seeder.js` to populate sample data!

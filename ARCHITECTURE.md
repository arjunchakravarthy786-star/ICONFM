# ICONFM 2025 - Code Architecture & Flow Analysis

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure & Connections](#file-structure--connections)
3. [How Code Runs](#how-code-runs)
4. [Data Flow](#data-flow)
5. [Backend Setup](#backend-setup)
6. [Feature Breakdown](#feature-breakdown)

---

## 🎯 Project Overview

**ICONFM 2025** is a collaboration platform for an International Conference on Organic and Functional Materials. It allows:
- **Research Speakers** to present unsolved problems
- **Problem Solvers** to propose solutions and collaborate
- Real-time collaboration in a Conference Hall
- Dynamic content management via Firebase

---

## 📁 File Structure & Connections

### **Core Files**

```
ICONFM/
├── index.html          → Homepage (Hero, About, Sponsors, CTA)
├── committee.html      → Committee members display
├── registration.html   → User registration form
├── login.html          → Authentication page
├── hall.html           → Conference Hall (protected)
├── insights.html       → Statistics & Timeline
├── app.js              → Main JavaScript logic (ALL features)
├── styles.css          → Custom CSS styling
└── firebase-config.js  → Firebase configuration (to be created)
```

### **File Dependencies**

```
┌─────────────────────────────────────────────────────────┐
│                    HTML Files                           │
│  (index, committee, registration, login, hall,         │
│   insights)                                             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├── Loads ──→ Tailwind CSS (CDN)
                 ├── Loads ──→ styles.css
                 ├── Loads ──→ Firebase SDK (CDN)
                 └── Loads ──→ app.js
                                │
                                ├── Uses ──→ Firebase Firestore
                                ├── Uses ──→ LocalStorage (auth)
                                └── Uses ──→ SAMPLE data (fallback)
```

---

## 🔄 How Code Runs

### **1. Page Load Sequence**

```
1. Browser loads HTML
   ↓
2. Tailwind CSS loads (styling)
   ↓
3. styles.css loads (custom styles)
   ↓
4. Firebase SDK loads (firebase-app-compat.js, firebase-firestore-compat.js)
   ↓
5. app.js executes
   ↓
6. DOMContentLoaded event fires
   ↓
7. Page-specific functions initialize
```

### **2. app.js Execution Flow**

```javascript
// STEP 1: Firebase Initialization (Lines 6-32)
FIREBASE_CONFIG → Check if apiKey exists
  ├── YES → Initialize Firebase → Connect to Firestore
  └── NO  → Use SAMPLE data (local fallback)

// STEP 2: DOM Ready (Lines 358-367)
document.addEventListener('DOMContentLoaded', () => {
  loadSponsors();        // Always runs (index.html)
  loadCommittee();        // Always runs (committee.html)
  initMobileMenu();      // Always runs (all pages)
  initHeroTransform();    // Only on index.html
  
  // Conditional initialization based on page
  if(el('#reg-form')) initRegistration();      // registration.html
  if(el('#login-form')) initLogin();          // login.html
  if(el('#hall-content')) checkHallAccess();  // hall.html
  if(el('#stats')) loadInsights();            // insights.html
});
```

### **3. Data Loading Pattern**

Every data-loading function follows this pattern:

```javascript
async function loadData() {
  1. Check if element exists → return if not
  2. Show "Loading..." message
  3. Try Firestore (if configured)
     ├── Success → Use Firestore data
     └── Error   → Fallback to SAMPLE data
  4. Render data to DOM
}
```

---

## 🔀 Data Flow

### **Registration Flow**

```
User fills form (registration.html)
  ↓
Clicks "Pay & Register" button
  ↓
initRegistration() captures form data
  ↓
Shows payment modal (simulated)
  ↓
After 900ms timeout:
  ├── If Firestore connected → Save to 'registrations' collection
  └── Else → Save to SAMPLE.registrations (in-memory)
  ↓
Show success message
```

### **Login Flow**

```
User enters credentials (login.html)
  ↓
initLogin() validates:
  ├── Hardcoded: attendee@example.com / password
  └── OR: admin@example.com / password
  ↓
If valid:
  ├── Save to localStorage as 'iconfm_user'
  └── Redirect to hall.html
  ↓
hall.html loads
  ↓
checkHallAccess() checks localStorage
  ├── Token exists → Show hall content, load data
  └── No token → Show locked warning
```

### **Conference Hall Flow**

```
User accesses hall.html
  ↓
checkHallAccess() runs
  ├── Checks localStorage for 'iconfm_user'
  ├── If authenticated → loadHallData()
  └── If not → Show locked message
  ↓
loadHallData() fetches:
  ├── Current problem from Firestore 'meta/currentProblem'
  └── Collaboration posts from Firestore 'collabs' collection
  ↓
User can post collaboration
  ↓
Saves to Firestore 'collabs' or SAMPLE.collabs
```

### **Committee & Sponsors Flow**

```
Page loads (committee.html or index.html)
  ↓
loadCommittee() / loadSponsors() runs
  ↓
Checks useFirestore flag
  ├── TRUE → Query Firestore 'committee' or 'sponsors' collection
  └── FALSE → Use SAMPLE.committee or SAMPLE.sponsors
  ↓
Renders cards/logos to DOM
```

---

## 🔧 Backend Setup

### **Firebase Firestore Collections Structure**

```
Firestore Database
│
├── committee/              (Collection)
│   ├── {docId}
│   │   ├── name: string
│   │   ├── role: string
│   │   └── photo: string (URL)
│
├── sponsors/               (Collection)
│   ├── {docId}
│   │   ├── name: string
│   │   └── logo: string (URL)
│
├── registrations/          (Collection)
│   ├── {docId}
│   │   ├── name: string
│   │   ├── email: string
│   │   ├── affiliation: string
│   │   ├── role: "speaker" | "solver"
│   │   ├── problem: string (optional)
│   │   ├── category: string
│   │   ├── ticket: string
│   │   └── createdAt: timestamp
│
├── collabs/                (Collection)
│   ├── {docId}
│   │   ├── name: string
│   │   ├── message: string
│   │   └── createdAt: timestamp
│
├── meta/                   (Collection)
│   ├── currentProblem      (Document)
│   │   ├── title: string
│   │   ├── summary: string
│   │   └── presenter: string
│   │
│   └── stats               (Document)
│       ├── problemsPresented: number
│       ├── collaborations: number
│       └── solutionsFound: number
│
└── timeline/               (Collection)
    ├── {docId}
    │   ├── date: string (YYYY-MM-DD)
    │   └── event: string
```

### **Firebase Security Rules (Required)**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /committee/{document=**} {
      allow read: if true;
      allow write: if false; // Admin only via console
    }
    
    match /sponsors/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /meta/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /timeline/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Authenticated write access
    match /registrations/{document=**} {
      allow read: if false; // Admin only
      allow create: if true; // Anyone can register
    }
    
    match /collabs/{document=**} {
      allow read: if true;
      allow create: if true; // Anyone can post
      allow update, delete: if false;
    }
  }
}
```

---

## 🎨 Feature Breakdown

### **1. Navigation System**
- **Location**: All HTML files (inline script + app.js)
- **Functions**: `initMobileMenu()`, inline navigation highlighting
- **Features**: 
  - Mobile hamburger menu
  - Active link highlighting
  - Responsive design

### **2. Hero Section Animation**
- **Location**: index.html, app.js
- **Function**: `initHeroTransform()`
- **Behavior**: Logo shrinks and moves to header on scroll > 120px

### **3. Committee Display**
- **Location**: committee.html, app.js
- **Function**: `loadCommittee()`
- **Data Source**: Firestore `committee` collection or SAMPLE.committee

### **4. Sponsors Display**
- **Location**: index.html, app.js
- **Function**: `loadSponsors()`
- **Data Source**: Firestore `sponsors` collection or SAMPLE.sponsors
- **Feature**: Refresh button (needs handler in app.js)

### **5. Registration System**
- **Location**: registration.html, app.js
- **Function**: `initRegistration()`
- **Features**:
  - Role selection (Speaker/Solver)
  - Dynamic form (problem field shows only for speakers)
  - Simulated payment modal
  - Saves to Firestore `registrations` collection

### **6. Authentication**
- **Location**: login.html, app.js
- **Function**: `initLogin()`
- **Storage**: localStorage (key: 'iconfm_user')
- **Note**: Currently hardcoded credentials (needs Firebase Auth for production)

### **7. Conference Hall**
- **Location**: hall.html, app.js
- **Functions**: `checkHallAccess()`, `loadHallData()`
- **Features**:
  - Protected content (requires login)
  - Current problem display
  - Collaboration posts feed
  - Post collaboration form

### **8. Insights/Statistics**
- **Location**: insights.html, app.js
- **Function**: `loadInsights()`
- **Data Source**: 
  - Firestore `meta/stats` document
  - Firestore `timeline` collection

---

## 🚀 Setup Instructions

### **1. Firebase Setup**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Get your config from Project Settings → General → Your apps
5. Update `FIREBASE_CONFIG` in `app.js`:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### **2. Firestore Collections Setup**

Create the collections manually in Firebase Console or use the provided seed data script.

### **3. Security Rules**

Copy the security rules from the Backend Setup section above.

---

## 🔍 Key Design Patterns

1. **Progressive Enhancement**: Works without Firebase (uses SAMPLE data)
2. **Conditional Initialization**: Functions only run if their DOM elements exist
3. **Error Handling**: Try-catch blocks with fallback to SAMPLE data
4. **Separation of Concerns**: 
   - HTML = Structure
   - CSS = Styling
   - JS = Logic & Data
5. **Single Source of Truth**: `app.js` contains all JavaScript logic

---

## 📝 Missing Features / Improvements Needed

1. ✅ **Refresh Sponsors Button Handler** - Needs event listener
2. ⚠️ **Firebase Authentication** - Currently using localStorage (insecure)
3. ⚠️ **Real Payment Integration** - Currently simulated
4. ⚠️ **Admin Panel** - No UI for managing content
5. ⚠️ **Real-time Updates** - No Firestore listeners for live updates
6. ⚠️ **Image Upload** - Committee photos/sponsor logos need upload feature

---

## 🎯 Summary

**Architecture**: Client-side SPA with Firebase backend
**State Management**: localStorage (auth) + Firestore (data)
**Styling**: Tailwind CSS + Custom CSS
**Backend**: Firebase Firestore (optional, falls back to in-memory data)

The application is designed to work **with or without Firebase**, making it easy to develop and demo locally before connecting to a real database.


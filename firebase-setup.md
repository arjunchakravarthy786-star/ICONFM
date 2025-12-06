# Firebase Setup Guide for ICONFM 2025

## Step-by-Step Firebase Configuration

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `iconfm-2025` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** (we'll add security rules later)
4. Select a location (choose closest to your users)
5. Click "Enable"

### 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the **Web icon** (`</>`)
4. Register app with nickname: `ICONFM Web`
5. Copy the `firebaseConfig` object

### 4. Update app.js

Replace the empty `FIREBASE_CONFIG` in `app.js` (lines 9-16) with your config:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "AIzaSy...",           // Your API key
  authDomain: "iconfm-2025.firebaseapp.com",
  projectId: "iconfm-2025",      // Your project ID
  storageBucket: "iconfm-2025.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 5. Set Up Firestore Collections

#### Option A: Manual Setup (Firebase Console)

1. Go to **Firestore Database** → **Data**
2. Click "Start collection"
3. Create these collections:

**Collection: `committee`**
- Document ID: Auto-generate
- Fields:
  - `name` (string): "Prof. A. Researcher"
  - `role` (string): "Chair"
  - `photo` (string): "https://via.placeholder.com/300?text=Prof+A"

**Collection: `sponsors`**
- Document ID: Auto-generate
- Fields:
  - `name` (string): "Govt Lab"
  - `logo` (string): "https://via.placeholder.com/200x80?text=Govt+Lab"

**Collection: `meta`**
- Document ID: `currentProblem` (exact name)
- Fields:
  - `title` (string): "Low quantum yield in polymer LEDs"
  - `summary` (string): "Scale-up issues in light-emitting polymer devices."
  - `presenter` (string): "Prof. A"

- Document ID: `stats` (exact name)
- Fields:
  - `problemsPresented` (number): 50
  - `collaborations` (number): 30
  - `solutionsFound` (number): 10

**Collection: `timeline`**
- Document ID: Auto-generate
- Fields:
  - `date` (string): "2026-01-21"
  - `event` (string): "50 problems presented"

**Collection: `registrations`**
- Will be created automatically when users register

**Collection: `collabs`**
- Will be created automatically when users post collaborations

#### Option B: Use Firebase CLI (Advanced)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init firestore

# Use the provided firestore.rules and firestore.indexes.json
```

### 6. Set Up Security Rules

1. Go to **Firestore Database** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for committee and sponsors
    match /committee/{document=**} {
      allow read: if true;
      allow write: if false; // Admin only via console
    }
    
    match /sponsors/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Public read, admin write for meta and timeline
    match /meta/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    match /timeline/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Registrations: anyone can create, only admin can read
    match /registrations/{document=**} {
      allow read: if false; // Admin only via console
      allow create: if true; // Anyone can register
      allow update, delete: if false;
    }
    
    // Collaborations: anyone can read and create
    match /collabs/{document=**} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

3. Click "Publish"

### 7. Test Connection

1. Open `index.html` in browser
2. Open Developer Console (F12)
3. You should see: `"Firestore Connected"` in console
4. Sponsors and committee should load from Firestore

### 8. Verify Data Flow

1. **Test Registration**:
   - Go to `registration.html`
   - Fill form and submit
   - Check Firestore Console → `registrations` collection
   - New document should appear

2. **Test Collaboration**:
   - Login to `hall.html`
   - Post a collaboration
   - Check Firestore Console → `collabs` collection
   - New document should appear

---

## Troubleshooting

### "Firebase config missing" warning
- Check that `FIREBASE_CONFIG.apiKey` is not empty in `app.js`
- Verify you copied the complete config object

### "Permission denied" errors
- Check Firestore Security Rules
- Ensure rules allow the operation you're trying to perform

### Data not loading
- Check browser console for errors
- Verify collections exist in Firestore
- Check network tab for failed requests

### CORS errors
- Firebase handles CORS automatically
- If you see CORS errors, check your Firebase project settings

---

## Production Checklist

- [ ] Firebase project created
- [ ] Firestore enabled
- [ ] Config added to `app.js`
- [ ] Collections created
- [ ] Security rules published
- [ ] Test registration works
- [ ] Test collaboration works
- [ ] Test data loads correctly
- [ ] Security rules reviewed for production

---

## Next Steps (Optional Enhancements)

1. **Firebase Authentication**: Replace localStorage with Firebase Auth
2. **Storage**: Add Firebase Storage for image uploads
3. **Real-time Listeners**: Use `onSnapshot()` for live updates
4. **Admin Panel**: Create admin interface for content management
5. **Analytics**: Enable Firebase Analytics for usage tracking


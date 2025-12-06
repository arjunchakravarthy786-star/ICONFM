# ICONFM 2025 - Code Flow Diagrams

## 🔄 Complete Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER OPENS BROWSER                       │
│                    Loads index.html                         │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  HTML PARSING & RESOURCE LOADING                           │
│  ├── Tailwind CSS (CDN)                                    │
│  ├── styles.css                                            │
│  ├── Firebase SDK (CDN)                                    │
│  └── app.js                                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  app.js EXECUTION                                           │
│                                                             │
│  1. FIREBASE INIT (Lines 6-32)                              │
│     ├── Check FIREBASE_CONFIG.apiKey                       │
│     ├── If exists → Initialize Firebase                    │
│     │   └── db = firebase.firestore()                      │
│     └── If not → useFirestore = false                     │
│                                                             │
│  2. SAMPLE DATA DEFINED (Lines 34-57)                       │
│     └── Fallback data structure                            │
│                                                             │
│  3. UTILITY FUNCTIONS (Lines 59-62)                        │
│     └── el(), q(), safe()                                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  DOMContentLoaded EVENT (Lines 358-367)                     │
│                                                             │
│  ┌─────────────────────────────────────────────┐          │
│  │ ALWAYS RUNS:                                 │          │
│  │ ├── loadSponsors()                           │          │
│  │ ├── loadCommittee()                           │          │
│  │ ├── initMobileMenu()                         │          │
│  │ └── initHeroTransform()                      │          │
│  └─────────────────────────────────────────────┘          │
│                                                             │
│  ┌─────────────────────────────────────────────┐          │
│  │ CONDITIONAL (if element exists):              │          │
│  │ ├── initRegistration() → #reg-form           │          │
│  │ ├── initLogin() → #login-form                │          │
│  │ ├── checkHallAccess() → #hall-content        │          │
│  │ └── loadInsights() → #stats                   │          │
│  └─────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Loading Flow (Example: Sponsors)

```
loadSponsors() called
        │
        ▼
┌───────────────────────────┐
│ Check: #sponsors-grid     │
│ exists?                   │
└───────┬───────────────────┘
        │
        ├── NO → return (do nothing)
        │
        └── YES
            │
            ▼
┌───────────────────────────┐
│ Show "Loading..."         │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│ Check: useFirestore?      │
└───────┬───────────────────┘
        │
        ├── FALSE
        │   │
        │   └──► Use SAMPLE.sponsors
        │
        └── TRUE
            │
            ▼
┌───────────────────────────┐
│ Try: db.collection()      │
│      .get()               │
└───────┬───────────────────┘
        │
        ├── SUCCESS
        │   │
        │   └──► Use Firestore data
        │
        └── ERROR
            │
            └──► Fallback to SAMPLE.sponsors
                    │
                    ▼
            ┌───────────────────────────┐
            │ Render to DOM             │
            │ Create cards/logos        │
            └───────────────────────────┘
```

## 🔐 Authentication Flow

```
User visits login.html
        │
        ▼
┌───────────────────────────┐
│ initLogin() runs          │
│ Listens for form submit   │
└───────┬───────────────────┘
        │
        ▼
User submits form
        │
        ▼
┌───────────────────────────┐
│ Validate credentials:     │
│ email === 'attendee@...'  │
│ AND pass === 'password'   │
└───────┬───────────────────┘
        │
        ├── INVALID
        │   │
        │   └──► Show error message
        │
        └── VALID
            │
            ▼
┌───────────────────────────┐
│ Save to localStorage:     │
│ key: 'iconfm_user'        │
│ value: {email, time}      │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│ Redirect to hall.html     │
└───────────────────────────┘
```

## 🏛️ Conference Hall Access Flow

```
User visits hall.html
        │
        ▼
┌───────────────────────────┐
│ checkHallAccess() runs    │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│ Check localStorage:       │
│ 'iconfm_user' exists?     │
└───────┬───────────────────┘
        │
        ├── NO
        │   │
        │   └──► Show #locked-warning
        │        Hide #hall-content
        │
        └── YES
            │
            ▼
┌───────────────────────────┐
│ Hide #locked-warning       │
│ Show #hall-content        │
│ Call loadHallData()       │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│ loadHallData():           │
│ 1. Fetch current problem  │
│ 2. Fetch collaboration     │
│    posts                  │
│ 3. Render to DOM          │
│ 4. Set up collaboration   │
│    form handlers          │
└───────────────────────────┘
```

## 📝 Registration Flow

```
User visits registration.html
        │
        ▼
┌───────────────────────────┐
│ initRegistration() runs    │
│ Sets up form handlers      │
└───────┬───────────────────┘
        │
        ▼
User selects role (Speaker/Solver)
        │
        ▼
┌───────────────────────────┐
│ updateRoleUI() runs       │
│ Shows/hides problem field │
└───────┬───────────────────┘
        │
        ▼
User fills form & clicks "Pay & Register"
        │
        ▼
┌───────────────────────────┐
│ Capture form data:        │
│ - name, email, etc.        │
│ - role, problem, category │
└───────┬───────────────────┘
        │
        ▼
┌───────────────────────────┐
│ Show payment modal        │
│ "Simulating payment..."   │
└───────┬───────────────────┘
        │
        ▼
Wait 900ms (simulated payment)
        │
        ▼
┌───────────────────────────┐
│ Check: useFirestore?      │
└───────┬───────────────────┘
        │
        ├── NO
        │   │
        │   └──► Save to SAMPLE.registrations
        │
        └── YES
            │
            ▼
┌───────────────────────────┐
│ Try: db.collection()       │
│      .add(data)            │
└───────┬───────────────────┘
        │
        ├── SUCCESS
        │   │
        │   └──► Show "Saved to Firestore"
        │
        └── ERROR
            │
            └──► Fallback to SAMPLE.registrations
                    │
                    ▼
            ┌───────────────────────────┐
            │ Show success message     │
            │ User can close modal     │
            └───────────────────────────┘
```

## 🔗 File Connection Map

```
┌─────────────────────────────────────────────────────────────┐
│                    HTML FILES                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │index.html│  │committee │  │register │  │ login.html│    │
│  └────┬─────┘  │.html    │  │.html    │  └────┬──────┘    │
│       │        └────┬─────┘  └────┬─────┘     │            │
│       │             │             │            │            │
│  ┌────▼─────┐  ┌────▼─────┐  ┌───▼─────┐  ┌──▼──────┐    │
│  │hall.html │  │insights.  │  │        │  │         │    │
│  └────┬─────┘  │html      │  │        │  │         │    │
│       │        └────┬─────┘  │        │  │         │    │
│       │             │         │        │  │         │    │
│       └─────────────┴─────────┴────────┴──┴─────────┘    │
│                    │                                       │
│                    │ All load:                            │
│                    │ ├── Tailwind CSS (CDN)               │
│                    │ ├── styles.css                       │
│                    │ ├── Firebase SDK (CDN)               │
│                    │ └── app.js                           │
└────────────────────┼───────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    app.js                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │ FIREBASE CONFIG                                     │    │
│  │ ├── Initialize Firebase (if configured)             │    │
│  │ └── Set useFirestore flag                          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ SAMPLE DATA (Fallback)                             │    │
│  │ ├── sponsors, committee, problems                  │    │
│  │ ├── registrations, collabs, stats                  │    │
│  │ └── timeline                                       │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ FUNCTIONS                                           │    │
│  │ ├── loadSponsors()                                 │    │
│  │ ├── loadCommittee()                                │    │
│  │ ├── initRegistration()                             │    │
│  │ ├── initLogin()                                    │    │
│  │ ├── checkHallAccess()                              │    │
│  │ ├── loadHallData()                                 │    │
│  │ ├── loadInsights()                                 │    │
│  │ └── initHeroTransform()                            │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ DOMContentLoaded Handler                            │    │
│  │ └── Calls appropriate functions based on page      │    │
│  └────────────────────────────────────────────────────┘    │
└────────────────────┬───────────────────────────────────────┘
                     │
                     ├──► Firebase Firestore (if configured)
                     │    ├── committee collection
                     │    ├── sponsors collection
                     │    ├── registrations collection
                     │    ├── collabs collection
                     │    ├── meta collection
                     │    └── timeline collection
                     │
                     └──► Browser localStorage
                          └── 'iconfm_user' (auth token)
```

## 🎯 State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION STATE                         │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ CLIENT-SIDE STATE (Browser)                        │    │
│  │                                                    │    │
│  │ localStorage:                                      │    │
│  │ └── 'iconfm_user': {email, time}                  │    │
│  │     └── Used for authentication                   │    │
│  │                                                    │    │
│  │ SAMPLE object (in-memory):                       │    │
│  │ ├── sponsors: [...]                               │    │
│  │ ├── committee: [...]                              │    │
│  │ ├── registrations: []                            │    │
│  │ ├── problems: [...]                               │    │
│  │ ├── collabs: []                                  │    │
│  │ ├── stats: {...}                                  │    │
│  │ └── timeline: [...]                              │    │
│  │     └── Fallback when Firebase not available     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │ SERVER-SIDE STATE (Firebase Firestore)             │    │
│  │                                                    │    │
│  │ Collections:                                       │    │
│  │ ├── committee/     → Committee members            │    │
│  │ ├── sponsors/     → Sponsor logos                │    │
│  │ ├── registrations/ → User registrations          │    │
│  │ ├── collabs/       → Collaboration posts          │    │
│  │ ├── meta/          → Current problem, stats       │    │
│  │ └── timeline/     → Event timeline               │    │
│  │                                                    │    │
│  │ └── Persistent, shared across all users           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📌 Key Takeaways

1. **Progressive Enhancement**: App works without Firebase
2. **Conditional Loading**: Functions only run if their DOM elements exist
3. **Error Handling**: Always falls back to SAMPLE data on errors
4. **Single Entry Point**: All JavaScript logic in `app.js`
5. **State Separation**: 
   - Auth state → localStorage
   - Data state → Firestore (or SAMPLE)


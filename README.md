# ICONFM 2025 - Collaboration Platform

International Conference on Organic and Functional Materials for Light and Energy — Collaboration Platform. Department of Chemistry, IIT Patna.

## 🚀 Quick Start

1. **Clone or download this repository**
2. **Open `index.html` in a web browser**
   - Works immediately with sample data (no setup required)
3. **For Firebase integration**, see `firebase-setup.md`

## 📁 Project Structure

```
ICONFM/
├── index.html          # Homepage
├── committee.html      # Committee members
├── registration.html   # User registration
├── login.html          # Authentication
├── hall.html           # Conference Hall (protected)
├── insights.html       # Statistics & outcomes
├── app.js              # Main JavaScript (all features)
├── styles.css          # Custom styling
├── ARCHITECTURE.md     # Detailed code analysis
├── firebase-setup.md   # Firebase configuration guide
└── README.md           # This file
```

## ✨ Features

- **Homepage**: Hero section, about department, sponsors, mission
- **Committee**: Dynamic committee member display
- **Registration**: Role-based registration (Speaker/Solver)
- **Conference Hall**: Protected collaboration space
- **Insights**: Statistics and timeline
- **Responsive Design**: Mobile-friendly navigation

## 🔧 Technology Stack

- **Frontend**: HTML5, Tailwind CSS (CDN)
- **Backend**: Firebase Firestore (optional)
- **JavaScript**: Vanilla JS (ES6+)
- **Storage**: localStorage (auth), Firestore (data)

## 📖 Documentation

- **`ARCHITECTURE.md`**: Complete code flow and architecture
- **`firebase-setup.md`**: Step-by-step Firebase setup

## 🎯 How It Works

1. **Without Firebase**: Uses in-memory sample data (works offline)
2. **With Firebase**: Connects to Firestore for persistent data

See `ARCHITECTURE.md` for detailed explanation of code flow.

## 🔐 Default Login Credentials

For testing the Conference Hall:
- **Email**: `attendee@example.com`
- **Password**: `password`

Or:
- **Email**: `admin@example.com`
- **Password**: `password`

## 📝 License

This project is for ICONFM 2025 conference use.

## 🤝 Contributing

For updates or issues, contact the development team.

---

**Built for IIT Patna - Department of Chemistry**

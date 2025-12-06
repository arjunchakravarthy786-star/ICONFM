/* ======================================================
   ICONFM 2025 — Full script.js
   Combined + Enhanced (Premium Committee Card Version)
====================================================== */

/* ---------- Firebase Config (Replace with yours) ---------- */
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

let useFirestore = false;
let db = null;

if (FIREBASE_CONFIG.apiKey) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    useFirestore = true;
    console.log("Firestore Connected");
  } catch (e) {
    console.warn("Firebase init failed:", e);
  }
} else {
  console.warn("Firebase config missing — running on SAMPLE data only.");
}

/* ---------- SAMPLE DATA (Local fallback) ---------- */
const SAMPLE = {
  sponsors: [
    {id:'s1', name:'Govt Lab', logo:'https://via.placeholder.com/200x80?text=Govt+Lab'},
    {id:'s2', name:'Materials Co', logo:'https://via.placeholder.com/200x80?text=Materials+Co'}
  ],

  committee: [
    {id:'c1', name:'Prof. A. Researcher', role:'Chair', photo:'https://via.placeholder.com/400?text=Prof+A'},
    {id:'c2', name:'Dr. B. Scientist', role:'Co-Chair', photo:'https://via.placeholder.com/400?text=Dr+B'},
    {id:'c3', name:'Dr. C. Member', role:'Organizing Secretary', photo:'https://via.placeholder.com/400?text=Dr+C'},
  ]
};

/* ======================================================
   UTILITIES
====================================================== */
const el = (s) => document.querySelector(s);
const q = (s) => document.querySelectorAll(s);
const safe = (x) => (x ? String(x) : "");

/* ======================================================
   COMMITTEE (PREMIUM CARD STYLE — OPTION B)
====================================================== */
async function loadCommittee() {
  const grid = el("#committee-grid");
  if (!grid) return;

  grid.innerHTML = `<div class="col-span-full text-gray-500 text-sm">Loading...</div>`;

  let items = [];

  // Load from Firestore (if connected)
  if (useFirestore) {
    try {
      const snap = await db.collection("committee").get();
      items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.warn(e);
      items = SAMPLE.committee;
    }
  } else {
    items = SAMPLE.committee;
  }

  grid.innerHTML = "";

  // Create committee cards
  items.forEach((c) => {
    const card = document.createElement("div");
    card.className = "committee-card fade-in";

    card.innerHTML = `
      <img src="${c.photo}" alt="${safe(c.name)}" class="committee-photo">
      <div>
        <div class="committee-name">${safe(c.name)}</div>
        <div class="committee-role">${safe(c.role)}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ======================================================
   SPONSORS
====================================================== */
async function loadSponsors() {
  const container = el("#sponsors-grid");
  if (!container) return;

  let sponsors = [];

  if (useFirestore) {
    try {
      const snap = await db.collection("sponsors").get();
      sponsors = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e) {
      sponsors = SAMPLE.sponsors;
    }
  } else sponsors = SAMPLE.sponsors;

  container.innerHTML = "";

  sponsors.forEach((s) => {
    const item = document.createElement("div");
    item.className =
      "flex items-center justify-center bg-white p-4 border rounded-lg shadow-sm hover:shadow-md transition";

    item.innerHTML = `<img src="${s.logo}" alt="${safe(s.name)} logo" class="max-h-14 object-contain">`;

    container.appendChild(item);
  });
}

/* ======================================================
   MOBILE NAVBAR (Hamburger Menu)
====================================================== */
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

/* ======================================================
   PAGE INITIALIZER
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadSponsors();
  loadCommittee();
});

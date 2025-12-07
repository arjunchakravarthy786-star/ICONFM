/* ======================================================
   ICONFM 2025 — Main Application Script
   Features: Firebase, Committee, Sponsors, Registration, Login, Hall, Insights
====================================================== */

/* ======================================================
   FIREBASE CONFIGURATION
====================================================== */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDJbatqsdJ9d0qECRGzAIDNFtIMvwC0tkQ",
  authDomain: "iconfm-26.firebaseapp.com",
  projectId: "iconfm-26",
  storageBucket: "iconfm-26.firebasestorage.app",
  messagingSenderId: "364335027860",
  appId: "1:364335027860:web:a6209ff8f499c90dec0681"
};


let useFirestore = false;
let db = null;

if (!FIREBASE_CONFIG.apiKey) {
  console.warn("Firebase config missing — running on sample data only.");
} else if (typeof firebase === "undefined") {
  console.warn("Firebase SDK not loaded — check script tags. Running on sample data only.");
} else {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    useFirestore = true;
    console.log("Firestore Connected");
  } catch (e) {
    console.warn("Firebase init failed:", e);
  }
}




/* ---------- SAMPLE DATA (Local fallback) ---------- */
const SAMPLE = {
  sponsors: [
    {id:'s1', name:'Govt Lab',        logo:'https://dummyimage.com/200x80/cccccc/000000&text=Govt+Lab'},
    {id:'s2', name:'Materials Co',    logo:'https://dummyimage.com/200x80/cccccc/000000&text=Materials+Co'},
    {id:'s3', name:'Photonics Inc',   logo:'https://dummyimage.com/200x80/cccccc/000000&text=Photonics'},
  ],
committee: [
  {id:'c1', name:'Prof. A. Researcher', role:'Chairperson',   photo:'https://...', order: 1},
  {id:'c2', name:'Dr. Mohan ...',       role:'Co-chairperson', photo:'https://...', order: 2},
  {id:'c3', name:'Dr. C. Member',       role:'Coordinator',    photo:'https://...', order: 3}
],
  registrations: [],
  problems: [
    {id:'p1', title:'Low quantum yield in polymer LEDs', summary:'Scale-up issues in light-emitting polymer devices.', presenter:'Prof. A'},
  ],
  collabs: [],
  stats: {problemsPresented:50, collaborations:30, solutionsFound:10},
  timeline: [
    {date:'2026-01-21', event:'50 problems presented'},
    {date:'2026-01-22', event:'30 collaborations formed'},
    {date:'2026-01-23', event:'10 solutions found'}
  ]
};

/* ---------- UTILITIES ---------- */
const el = (s) => document.querySelector(s);
const q = (s) => document.querySelectorAll(s);
const safe = (x) => (x ? String(x) : "");

/* ======================================================
   COMMITTEE RENDERING
====================================================== */
async function loadCommittee() {
  const grid = el("#committee-grid");
  if (!grid) return;

  grid.innerHTML = `<div class="text-gray-500 text-sm">Loading...</div>`;

  let items = [];

  if (useFirestore) {
    try {
      const snap = await db.collection("committee").orderBy("order").get();
      items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.warn(err);
      items = SAMPLE.committee;
    }
  } else {
    items = SAMPLE.committee.sort((a, b) => (a.order || 99) - (b.order || 99));
  }

  // GROUP BY ROLE ORDER
  const groups = { 1: [], 2: [], 3: [] };
  items.forEach(m => {
    const rank = m.order || 99;
    if (!groups[rank]) groups[rank] = [];
    groups[rank].push(m);
  });

  grid.innerHTML = "";

  function renderSection(title, members) {
    if (!members.length) return;

    const section = document.createElement("div");
    section.className = "space-y-5";

    section.innerHTML = `
      <h2 class="text-2xl font-bold text-blue-900">${title}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
    `;

    const row = section.querySelector("div.grid");

    members.forEach(m => {
      const card = document.createElement("div");
      card.className =
        "bg-white border rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition";

      card.innerHTML = `
        <img 
          src="${m.photo}" 
          alt="${safe(m.name)}"
          class="w-28 h-28 object-cover rounded-lg border"
        >

        <div class="flex-1">
          <div class="text-lg font-semibold">${safe(m.name)}</div>
          <div class="text-gray-600 text-sm mt-1">${safe(m.role)}</div>
        </div>
      `;

      row.appendChild(card);
    });

    grid.appendChild(section);
  }

  renderSection("Chairperson", groups[1]);
  renderSection("Co-chairperson", groups[2]);
  renderSection("Coordinators", groups[3]);
}







/* ======================================================
   SPONSORS RENDERING
====================================================== */
async function loadSponsors() {
  const container = el("#sponsors-grid");
  if (!container) return;

  container.innerHTML = `<div class="col-span-full text-gray-500 text-sm">Loading...</div>`;
  let sponsors = [];

  if (useFirestore) {
    try {
      const snap = await db.collection("sponsors").get();
      sponsors = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      console.log("Sponsors from Firestore:", sponsors);
    } catch (e) {
      console.warn("Error loading sponsors:", e);
      sponsors = SAMPLE.sponsors;
    }
  } else {
    sponsors = SAMPLE.sponsors;
  }

  container.innerHTML = "";
  sponsors.forEach((s) => {
    const item = document.createElement("div");
   item.className =
  "bg-white p-5 border rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center w-full max-w-xs";


    item.innerHTML = `
      <img 
        src="${s.logo}" 
        alt="${safe(s.name)} logo" 
        class="w-full h-48 object-contain mb-3"
      >
      <div class="text-center text-sm font-medium text-gray-800">
        ${safe(s.name)}
      </div>
    `;

    container.appendChild(item);
  });
}



/* ======================================================
   MOBILE NAVBAR (Hamburger)
====================================================== */
function initMobileMenu() {
  const mobileBtn = el("#mobile-menu-btn");
  const mobileMenu = el("#mobile-menu");
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

/* ======================================================
   REGISTRATION + PAYMENT MODAL
====================================================== */
function initRegistration() {
  const form = el('#reg-form');
  if(!form) return;
  const payBtn = el('#pay-btn');
  const modal = el('#payment-modal');
  const modalBody = el('#modal-body');
  const modalClose = el('#modal-close');
  const roleInputs = q('input[name="role"]');
  const problemField = el('#problem-field');

  function updateRoleUI(){
    const role = document.querySelector('input[name="role"]:checked').value;
    problemField.style.display = role === 'speaker' ? '' : 'none';
  }
  roleInputs.forEach(r => r.addEventListener('change', updateRoleUI));
  updateRoleUI();

  payBtn.addEventListener('click', async () => {
    const data = {
      name: el('#fullName').value,
      email: el('#email').value,
      affiliation: el('#affiliation').value,
      role: document.querySelector('input[name="role"]:checked').value,
      problem: el('#problem').value,
      category: el('#category').value,
      ticket: el('#ticket').value,
      createdAt: new Date().toISOString()
    };
    modal.classList.remove('hidden');
    modalBody.textContent = 'Simulating payment...';

    setTimeout(async () => {
      modalBody.textContent = 'Registration Successful! Saving details...';
      if(useFirestore && db) {
        try {
          await db.collection('registrations').add(data);
          modalBody.textContent = 'Saved to Firestore. Registration Successful.';
        } catch(e){
          SAMPLE.registrations.push(data);
          modalBody.textContent = 'Saved locally.';
        }
      } else {
        SAMPLE.registrations.push(data);
        modalBody.textContent = 'Saved locally (demo).';
      }
      modalClose.focus();
    }, 900);
  });

  modalClose.addEventListener('click', ()=> modal.classList.add('hidden'));
  document.addEventListener('keydown', (e)=> { if(e.key==='Escape'){ modal.classList.add('hidden'); } });
}

/* ======================================================
   LOGIN & HALL ACCESS
====================================================== */
function initLogin() {
  const loginForm = el('#login-form');
  if(!loginForm) return;
  const error = el('#login-error');

  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = el('#login-email').value.trim();
    const pass = el('#login-password').value;
    if((email==='attendee@example.com'||email==='admin@example.com') && pass==='password'){
      localStorage.setItem('iconfm_user', JSON.stringify({email, time:Date.now()}));
      window.location.href = 'hall.html';
    } else {
      error.textContent = 'Invalid credentials. Try attendee@example.com / password';
      error.classList.remove('hidden');
    }
  });
}

function checkHallAccess() {
  const token = localStorage.getItem('iconfm_user');
  const locked = el('#locked-warning');
  const hall = el('#hall-content');
  if(!hall) return;
  if(!token){
    locked.classList.remove('hidden');
    hall.classList.add('hidden');
  } else {
    locked.classList.add('hidden');
    hall.classList.remove('hidden');
    loadHallData();
  }

  const logoutBtn = el('#logout-btn');
  if(logoutBtn) logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('iconfm_user');
    window.location.href = 'login.html';
  });
}

/* ======================================================
   HALL DATA: PROBLEMS + COLLAB
====================================================== */
async function loadHallData() {
  let current = SAMPLE.problems[0];
  if(useFirestore && db) {
    try {
      const doc = await db.collection('meta').doc('currentProblem').get();
      if(doc.exists) current = doc.data();
    } catch(e){ console.warn(e); }
  }

  const cp = el('#current-problem');
  if(cp) cp.innerHTML = `<h4 class="font-semibold">${safe(current.title)}</h4><p class="text-sm text-gray-700 mt-1">${safe(current.summary)}</p>`;
  
  let posts = SAMPLE.collabs;
  if(useFirestore && db) {
    try {
      const snap = await db.collection('collabs').orderBy('createdAt','desc').limit(20).get();
      posts = snap.docs.map(d=> ({id:d.id,...d.data()}));
    } catch(e){ console.warn(e); }
  }

  const container = el('#collab-posts');
  if(container){
    container.innerHTML = '';
    if(posts.length===0) container.innerHTML = `<div class="text-sm text-gray-500">No collaboration posts yet.</div>`;
    posts.forEach(p=>{
      const node = document.createElement('div');
      node.className = "p-2 border rounded";
      node.innerHTML = `<div class="font-medium">${safe(p.name)}</div><div class="text-xs text-gray-600">${new Date(p.createdAt||Date.now()).toLocaleString()}</div><div class="mt-1">${safe(p.message)}</div>`;
      container.appendChild(node);
    });
  }

  const collabBtn = el('#collab-btn');
  const collabModal = el('#collab-modal');
  const collabForm = el('#collab-form');
  const collabCancel = el('#collab-cancel');
  if(collabBtn && collabModal){
    collabBtn.addEventListener('click', ()=>{
      collabModal.classList.remove('hidden');
      collabModal.querySelector('input,textarea')?.focus();
    });
  }
  if(collabCancel) collabCancel.addEventListener('click', ()=> collabModal.classList.add('hidden'));
  if(collabForm){
    collabForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = el('#collab-name').value;
      const message = el('#collab-message').value;
      const post = {name, message, createdAt:new Date().toISOString()};
      if(useFirestore && db){
        try{
          await db.collection('collabs').add(post);
        } catch(e){
          SAMPLE.collabs.unshift(post);
        }
      } else {
        SAMPLE.collabs.unshift(post);
      }
      collabModal.classList.add('hidden');
      loadHallData();
    });
  }
}

/* ======================================================
   INSIGHTS PAGE (STATS + TIMELINE)
====================================================== */
async function loadInsights() {
  const statsContainer = el('#stats');
  if(!statsContainer) return;

  let stats = SAMPLE.stats;
  let timeline = SAMPLE.timeline;

  if(useFirestore && db){
    try{
      const doc = await db.collection('meta').doc('stats').get();
      if(doc.exists) stats = doc.data();
    } catch(e){ console.warn(e); }
    try{
      const snap = await db.collection('timeline').orderBy('date','asc').get();
      timeline = snap.docs.map(d=> ({id:d.id,...d.data()}));
    } catch(e){ console.warn(e); }
  }

  statsContainer.innerHTML = `
    <div class="p-4 border rounded text-center"><div class="text-2xl font-bold">${stats.problemsPresented||0}</div><div class="text-sm text-gray-600">Problems Presented</div></div>
    <div class="p-4 border rounded text-center"><div class="text-2xl font-bold">${stats.collaborations||0}</div><div class="text-sm text-gray-600">Collaborations</div></div>
    <div class="p-4 border rounded text-center"><div class="text-2xl font-bold">${stats.solutionsFound||0}</div><div class="text-sm text-gray-600">Solutions Found</div></div>
  `;

  const tl = el('#timeline');
  if(tl){
    tl.innerHTML = '';
    timeline.forEach(item=>{
      const node = document.createElement('div');
      node.className = "border-l pl-4 mb-4";
      node.innerHTML = `<div class="text-xs text-gray-500">${item.date}</div><div class="mt-1">${item.event}</div>`;
      tl.appendChild(node);
    });
  }
}

/* ======================================================
   HERO SLIDER (AUTO IMAGE SWITCH)
====================================================== */
function initHeroSlider() {
  const slider = document.querySelector('#hero-slider');
  if (!slider) return;

  const slides = Array.from(slider.children);
  const count = slides.length;

  if (count === 0) return;

  // Each slide = 100% width
  slides.forEach(slide => {
    slide.style.flex = '0 0 100%';
  });

  slider.style.width = `${count * 100}%`;

  let index = 0;

  setInterval(() => {
    index = (index + 1) % count;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }, 3500); // smooth 3.5 sec
}



/* ======================================================
   PAGE INIT
====================================================== */
document.addEventListener('DOMContentLoaded', ()=>{
  loadSponsors();
  loadCommittee();
  initMobileMenu();
  initHeroSlider();
  highlightActiveNav();

  if(el('#reg-form')) initRegistration();
  if(el('#login-form')) initLogin();
  if(el('#hall-content')) checkHallAccess();
  if(el('#stats')) loadInsights();
  
  // Refresh sponsors button handler
  const refreshBtn = el('#refresh-sponsors');
  if(refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      loadSponsors();
    });
  }
});

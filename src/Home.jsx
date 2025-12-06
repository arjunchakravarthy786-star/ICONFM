export default function Home() {
  return (
    <main className="pt-24">
      {/* HERO */}
      <section id="hero" className="relative min-h-[60vh] md:min-h-[72vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white">
            <img src="https://academics.iitp.ac.in/images/homeslider/2.jpg?q=80&w=1920&auto=format&fit=crop" alt="IIT Patna campus" className="w-full h-full object-cover opacity-70"/>
          </div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
          <div id="hero-content" className="flex-1 transform transition-all duration-600">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-blue-900 drop-shadow">
              International Conference on <br className="hidden md:block"/>Organic & Functional Materials for Light and Energy
            </h1>
            <p className="mt-4 text-gray-700 max-w-2xl">
              Hosted by the Department of Chemistry, IIT Patna — a collaboration platform where speakers present unsolved research problems and listeners register to propose solutions and collaborate.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <div className="px-4 py-2 rounded-full bg-white/90 border text-sm">Date: <strong>Jan 21–23, 2026</strong></div>
              <a href="/registration" className="bg-gold-500 px-5 py-3 rounded text-sm font-semibold inline-block">Register</a>
              <a href="#mission" className="text-sm text-blue-800 underline">Learn more</a>
            </div>
          </div>

          <div id="hero-logo" className="w-44 h-44 rounded-full bg-blue-800 text-white flex items-center justify-center shadow-xl">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Indian_Institute_of_Technology%2C_Patna.svg/1200px-Indian_Institute_of_Technology%2C_Patna.svg.png" alt="IITP"/>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-blue-900">About the Department</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The Department of Chemistry at IIT Patna focuses on cutting-edge research across organic, materials, and physical chemistry. We foster interdisciplinary work and industry-academia collaboration to address applied problems in energy and light-based materials.
        </p>
      </section>

      {/* MISSION */}
      <section id="mission" className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-blue-900">Our Mission</h3>
          <p className="mt-2 text-gray-700">
            This conference is a Collaboration Platform: speakers <strong>present unsolved research problems and bottlenecks</strong>. Listeners register as Problem Solvers, propose solutions, and form collaborations. The goal: accelerate actionable solutions and cross-disciplinary teams.
          </p>
        </div>
      </section>
    </main>
  );
}

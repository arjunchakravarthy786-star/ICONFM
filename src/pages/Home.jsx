import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-blue-50 to-white">
        <img
          src="/iitp-campus.jpg"
          alt="IIT Patna campus"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900">
            International Conference on <br /> Organic & Functional Materials for Light and Energy
          </h1>
          <p className="mt-4 text-gray-700 max-w-2xl">
            Hosted by the Department of Chemistry, IIT Patna — a collaboration platform where speakers present unsolved research problems and listeners register to propose solutions and collaborate.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-full bg-white/90 border text-sm">
              Date: <strong>Jan 21–23, 2026</strong>
            </div>
            <a href="/registration" className="px-5 py-3 rounded text-sm font-semibold" style={{background:"#c5941d", color:"white"}}>Register</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-blue-900">About the Department</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          The Department of Chemistry at IIT Patna focuses on cutting-edge research across organic, materials, and physical chemistry. We foster interdisciplinary work and industry-academia collaboration to address applied problems in energy and light-based materials.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-blue-900">Our Mission</h3>
          <p className="mt-2 text-gray-700">
            This conference is a Collaboration Platform: speakers present unsolved research problems and bottlenecks. Listeners register as Problem Solvers, propose solutions, and form collaborations.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

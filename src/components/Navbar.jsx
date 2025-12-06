import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed w-full z-40 bg-white/90 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold transition-transform">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Indian_Institute_of_Technology%2C_Patna.svg/1200px-Indian_Institute_of_Technology%2C_Patna.svg.png" alt="IITP" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold">ICONFM 2025</div>
            <div className="text-xs text-gray-600">IIT Patna</div>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white">Home</NavLink>
          <NavLink to="/committee" className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white">Committee</NavLink>
          <NavLink to="/insights" className="px-3 py-2 rounded hover:bg-blue-600 hover:text-white">Outcomes</NavLink>
          <NavLink to="/registration" className="px-3 py-2 bg-blue-800 text-white rounded">Register</NavLink>
          <NavLink to="/conference-hall" className="px-3 py-2 border rounded hover:bg-blue-600 hover:text-white">Conference Hall</NavLink>
        </nav>

        {/* Mobile toggle */}
        <button onClick={()=>setMobileOpen(!mobileOpen)} className="md:hidden px-3 py-2 border rounded">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          <NavLink to="/" className="block px-3 py-2 rounded hover:bg-blue-100">Home</NavLink>
          <NavLink to="/committee" className="block px-3 py-2 rounded hover:bg-blue-100">Committee</NavLink>
          <NavLink to="/insights" className="block px-3 py-2 rounded hover:bg-blue-100">Outcomes</NavLink>
          <NavLink to="/registration" className="block px-3 py-2 rounded bg-blue-800 text-white">Register</NavLink>
          <NavLink to="/conference-hall" className="block px-3 py-2 rounded border hover:bg-blue-100">Conference Hall</NavLink>
        </div>
      )}
    </header>
  );
}

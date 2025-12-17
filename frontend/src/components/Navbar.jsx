// src/components/Navbar.jsx   ←  REPLACE YOUR CURRENT FILE WITH THIS
import React, { useState } from 'react';
import logo from '../assets/logo.jpg';

const Navbar = ({ openLogin, openRegister }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img className="h-12 w-auto" src={logo} alt="Healio logo" />
            <h2 className="text-2xl font-bold text-purple-600">Healio</h2>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-3xl text-gray-700"
          >
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 font-medium hover:text-purple-600 transition">Home</a>
            <a href="/about" className="text-gray-700 font-medium hover:text-purple-600 transition">About</a>
            <a href="/awareness-hub" className="text-gray-700 font-medium hover:text-purple-600 transition">Awareness Hub</a>
            <a href="/contact" className="text-gray-700 font-medium hover:text-purple-600 transition">Contact</a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
              <i className="fas fa-phone"></i>
              <span>Emergency: 988</span>
            </div>
            <button
              onClick={openLogin}
              className="px-6 py-2.5 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition"
            >
              Login
            </button>
            <button
              onClick={openRegister}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition shadow-lg"
            >
              Register
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-200 pt-4 pb-6 space-y-4">
            <a href="/" onClick={closeMobileMenu} className="block text-lg font-medium hover:text-purple-600">Home</a>
            <a href="/about" onClick={closeMobileMenu} className="block text-lg font-medium hover:text-purple-600">About</a>
            <a href="/awareness-hub" onClick={closeMobileMenu} className="block text-lg font-medium hover:text-purple-600">Awareness Hub</a>
            <a href="/contact" onClick={closeMobileMenu} className="block text-lg font-medium hover:text-purple-600">Contact</a>
            
            <div className="pt-4 border-t border-gray-300">
              <p className="text-purple-600 font-medium mb-3 flex items-center gap-2">
                <i className="fas fa-phone"></i> Emergency: 988
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { openLogin(); closeMobileMenu(); }} className="py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium">
                  Login
                </button>
                <button onClick={() => { openRegister(); closeMobileMenu(); }} className="py-3 bg-purple-600 text-white rounded-full font-medium">
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
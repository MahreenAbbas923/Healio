import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold mb-2"><i className="fas fa-heart text-red-500"></i> Healio</h3>
          <p className="text-gray-400">Your trusted partner in mental wellness. Supporting individuals on their journey to emotional well-being.</p>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Healio. All rights reserved. | Made with <i className="fas fa-heart text-red-500"></i> for mental wellness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
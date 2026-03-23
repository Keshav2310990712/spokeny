import React from 'react';

const Footer = () => {
  return (
    <footer className="glass py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Spokeny. All rights reserved.</p>
        <p className="mt-2 text-sm">Empowering language learning with AI.</p>
      </div>
    </footer>
  );
};

export default Footer;

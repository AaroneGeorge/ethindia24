import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-gray-800">
            DEGEN
          </a>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Exchange
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Treasury
          </a>
          <a
            href="https://triceedesign.eth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            triceedesign.eth
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
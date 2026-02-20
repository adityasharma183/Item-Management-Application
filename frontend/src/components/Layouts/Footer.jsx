import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                ERN Auth
              </span>
            </div>
            <p className="text-white/60 text-sm">
              A modern authentication system built with the MERN stack.
              Secure, fast, and easy to use.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/60 hover:text-white transition">Home</Link></li>
              <li><Link to="/dashboard" className="text-white/60 hover:text-white transition">Dashboard</Link></li>
              <li><Link to="/profile" className="text-white/60 hover:text-white transition">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition text-xl">
                <FiGithub />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition text-xl">
                <FiTwitter />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition text-xl">
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} MERN Auth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
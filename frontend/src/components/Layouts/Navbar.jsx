import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiHome, FiGrid, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              ERN Auth
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/90 hover:text-white flex items-center space-x-1 transition">
              <FiHome />
              <span>Home</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-white/90 hover:text-white flex items-center space-x-1 transition">
                  <FiGrid />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="text-white/90 hover:text-white flex items-center space-x-1 transition">
                  <FiUser />
                  <span>Profile</span>
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-white/60 flex items-center">
                      {user?.role}
                      {isAdmin && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-600/30 text-purple-300 rounded-full text-xs">
                          Admin
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 glass rounded-xl p-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-white/90 hover:text-white flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition">
                <FiHome />
                <span>Home</span>
              </Link>

              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="text-white/90 hover:text-white flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition">
                    <FiGrid />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/profile" className="text-white/90 hover:text-white flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition">
                    <FiUser />
                    <span>Profile</span>
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition w-full"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="btn-secondary text-center">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
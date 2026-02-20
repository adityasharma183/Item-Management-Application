import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiCalendar, FiShield } from 'react-icons/fi';
import { format } from 'date-fns';

const Profile = () => {
  const { user, isAdmin } = useAuth();

  const profileStats = [
    { label: 'Member Since', value: format(new Date(user?.createdAt), 'MMMM dd, yyyy'), icon: <FiCalendar /> },
    { label: 'Email', value: user?.email, icon: <FiMail /> },
    { label: 'Role', value: user?.role, icon: <FiShield /> },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="glass-card rounded-3xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold border-4 border-white/20 mb-4 sm:mb-0 sm:mr-6">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white mb-1">{user?.name}</h1>
                <p className="text-gray-300 flex items-center justify-center sm:justify-start">
                  {user?.email}
                  {isAdmin && (
                    <span className="ml-3 px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs">
                      Admin
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profileStats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
                  <p className="text-white font-semibold text-lg">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Account Information */}
          <div className="md:col-span-2 glass-card rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <FiUser className="mr-2" />
              Account Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 text-sm">User ID</p>
                <p className="text-white font-mono text-sm break-all">{user?._id}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Account Created</p>
                <p className="text-white">{format(new Date(user?.createdAt), 'MMMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Last Updated</p>
                <p className="text-white">{format(new Date(user?.updatedAt || user?.createdAt), 'MMMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Account Status</p>
                <p className="text-green-400">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
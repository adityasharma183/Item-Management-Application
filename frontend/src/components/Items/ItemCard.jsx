import React from 'react';
import { FiEdit2, FiTrash2, FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';

const ItemCard = ({ item, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="glass-card rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{item.name}</h3>
        {isAdmin && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-2">{item.description}</p>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          ${item.price}
        </span>
        <div className="flex items-center space-x-4 text-gray-400">
          <div className="flex items-center space-x-1">
            <FiUser className="text-xs" />
            <span>{item.user?.name || 'Unknown'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiCalendar className="text-xs" />
            <span>{format(new Date(item.createdAt), 'MMM dd')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
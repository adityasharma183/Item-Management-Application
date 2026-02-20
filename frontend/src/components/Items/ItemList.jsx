import React from 'react';
import ItemCard from './ItemCard';
import { FiPackage } from 'react-icons/fi';

const ItemList = ({ items, isAdmin, onEdit, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiPackage className="text-4xl text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Items Found</h3>
        <p className="text-gray-300">
          {isAdmin 
            ? 'Click the "Add New Item" button to create your first item.' 
            : 'No items available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ItemList;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ItemList from '../components/Items/ItemList';
import ItemForm from '../components/Items/ItemForm';
import { itemsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FiPlus, FiPackage } from 'react-icons/fi';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemsAPI.getAll();
      setItems(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (itemData) => {
    try {
      const response = await itemsAPI.create(itemData);
      setItems([response.data.data, ...items]);
      setShowForm(false);
      toast.success('Item created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create item');
    }
  };

  const handleUpdateItem = async (id, itemData) => {
    try {
      const response = await itemsAPI.update(id, itemData);
      setItems(items.map(item => item._id === id ? response.data.data : item));
      setEditingItem(null);
      toast.success('Item updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update item');
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await itemsAPI.delete(id);
      setItems(items.filter(item => item._id !== id));
      toast.success('Item deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to delete item');
    }
  };

  const stats = [
    { label: 'Total Items', value: items.length, icon: <FiPackage />, color: 'from-purple-600 to-pink-600' },
    { label: 'Your Role', value: user?.role, icon: <FiPackage />, color: 'from-blue-600 to-cyan-600' },
    { label: 'Member Since', value: new Date(user?.createdAt).toLocaleDateString(), icon: <FiPackage />, color: 'from-green-600 to-emerald-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{user?.name}</span>!
          </h1>
          <p className="text-gray-300 text-lg">
            Here's what's happening with your items today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Items Section */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Items</h2>
              <p className="text-gray-300 text-sm mt-1">
                {isAdmin ? 'Manage your items' : 'View available items'}
              </p>
            </div>
            {isAdmin && !showForm && !editingItem && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary inline-flex items-center"
              >
                <FiPlus className="mr-2" />
                Add New Item
              </button>
            )}
          </div>

          {(showForm || editingItem) && (
            <div className="mb-6">
              <ItemForm
                onSubmit={editingItem ? 
                  (data) => handleUpdateItem(editingItem._id, data) : 
                  handleCreateItem
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                initialData={editingItem}
              />
            </div>
          )}

          <ItemList
            items={items}
            isAdmin={isAdmin}
            onEdit={setEditingItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
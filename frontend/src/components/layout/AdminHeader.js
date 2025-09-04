import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Page title - will be updated per page */}
        <div className="flex-1 lg:flex-none">
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Dashboard
          </h1>
        </div>

        {/* User menu */}
        <div className="flex items-center space-x-4">
          {/* User info */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full">
              <User className="h-4 w-4 text-primary-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">
                {user?.firstName || 'Admin'} {user?.lastName || 'User'}
              </p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

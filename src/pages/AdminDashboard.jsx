// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { FiUsers, FiSettings, FiHome, FiPieChart, FiMail, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaUserShield, FaUserEdit, FaUserPlus } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';





const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 dark:bg-gray-800 transition-all duration-300 ease-in-out relative`}>
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          {sidebarOpen ? <FiX className="text-indigo-800 dark:text-white" /> : <FiMenu className="text-indigo-800 dark:text-white" />}
        </button>
        
        <div className="p-4 flex items-center justify-center border-b border-indigo-700 dark:border-gray-700">
          {sidebarOpen ? (
            <h1 className="text-2xl font-bold text-white">AdminPro</h1>
          ) : (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-indigo-800 font-bold">AP</span>
            </div>
          )}
        </div>
        
        <nav className="mt-6">
          <SidebarItem 
            icon={<FiHome />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            sidebarOpen={sidebarOpen}
          />
          <SidebarItem 
            icon={<FiUsers />} 
            text="User Management" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
            sidebarOpen={sidebarOpen}
          />
        
          <SidebarItem 
            icon={<FiSettings />} 
            text="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
            sidebarOpen={sidebarOpen}
          />
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-indigo-700 dark:border-gray-700">
          <SidebarItem 
            icon={<FiLogOut />} 
            text="Logout" 
            sidebarOpen={sidebarOpen}
            onClick={() => console.log('Logging out...')}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiMail className="text-gray-400" />
                </span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </div>
              <div className="w-10 h-10 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-indigo-800 dark:text-white font-medium">A</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, onClick, sidebarOpen }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg cursor-pointer transition-colors ${active ? 'bg-indigo-700 dark:bg-gray-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:bg-opacity-50 hover:text-white'}`}
    >
      <span className="text-xl">{icon}</span>
      {sidebarOpen && <span className="ml-3">{text}</span>}
    </div>
  );
};


const DashboardHome = () => {
  // Get the report data and fetch function from your store
  const { report, fetchReport, isLoading, error } = useAuthStore();
  
  // Fetch data when component mounts
  React.useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  if (isLoading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Welcome back, Admin! Here's what's happening with your platform today.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={report?.totalUsers || 0} 
          change="+12.5%" // You might want to calculate this from your data
          icon={<FiUsers className="text-blue-500" />}
        />
        <StatCard 
          title="Admin Users" 
          value={report?.adminCount || 0} 
          change="+5.2%" // You might want to calculate this from your data
          icon={<FaUserShield className="text-green-500" />}
        />
        <StatCard 
          title="Regular Users" 
          value={report?.userCount || 0} 
          change="-3.1%" // You might want to calculate this from your data
          icon={<FaUserEdit className="text-yellow-500" />}
        />
        <StatCard 
          title="Total Posts" 
          value={report?.totalPosts || 0} 
          change="+8.7%" // You might want to calculate this from your data
          icon={<FaUserPlus className="text-purple-500" />}
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        {/* Activity timeline would go here */}
      </div>
    </div>
  );
};


const UserManagement = () => {
  const { users, fetchUsers, isLoading, error } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users
    ?.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1); // reset pagination on filter change
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset pagination on search change
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FaUserPlus className="mr-2" /> Add User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Top Controls */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="p-4">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-500">{error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-300">Settings  coming soon</p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
      <div className="p-3 rounded-full bg-opacity-20 bg-indigo-100 dark:bg-gray-700 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-xs mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change} {isPositive ? '↑' : '↓'}
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
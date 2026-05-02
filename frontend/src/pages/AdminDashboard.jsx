import { useState } from 'react';

const AdminDashboard = () => {
  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 1,
      vendorName: 'Elite Sports Center',
      businessEmail: 'contact@elitesports.com',
      facilityName: 'Main Arena',
      registrationDate: '2026-04-01',
    },
    {
      id: 2,
      vendorName: 'City Fitness Hub',
      businessEmail: 'info@cityfitness.com',
      facilityName: 'Downtown Court',
      registrationDate: '2026-04-03',
    },
    {
      id: 3,
      vendorName: 'Pro Badminton Club',
      businessEmail: 'admin@probadminton.com',
      facilityName: 'Premium Courts',
      registrationDate: '2026-04-05',
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Suspended' },
  ]);

  const [notification, setNotification] = useState('');

  const handleApproveVendor = (id) => {
    setPendingVendors(prev => prev.filter(vendor => vendor.id !== id));
    setNotification('Vendor Verified');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleRejectVendor = (id) => {
    setPendingVendors(prev => prev.filter(vendor => vendor.id !== id));
    setNotification('Vendor Rejected');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSuspendUser = (id) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
          : user
      )
    );
  };

  const stats = [
    { title: 'Total Active Vendors', value: 45, color: 'text-blue-600' },
    { title: 'Total Registered Players', value: 1200, color: 'text-green-600' },
    { title: 'Monthly Platform Revenue', value: '$15,300', color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {notification && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {notification}
        </div>
      )}

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Vendor Approval Queue */}
      <div className="bg-white rounded-lg shadow-md border mb-8">
        <div className="px-6 py-4 border-b bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Vendor Approval Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facility Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingVendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vendor.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.businessEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.facilityName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleApproveVendor(vendor.id)}
                      className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded mr-2 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectVendor(vendor.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingVendors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pending vendor applications.
            </div>
          )}
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow-md border">
        <div className="px-6 py-4 border-b bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleSuspendUser(user.id)}
                      className={`px-3 py-1 rounded transition-colors ${
                        user.status === 'Active'
                          ? 'bg-red-500 hover:bg-red-700 text-white'
                          : 'bg-green-500 hover:bg-green-700 text-white'
                      }`}
                    >
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
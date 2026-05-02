import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyFacilities = () => {
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: 'Badminton Court A',
      type: 'Badminton',
      pricePerHour: 15,
      location: 'Downtown Sports Center',
      image: 'https://via.placeholder.com/100x60?text=Court',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Futsal Arena',
      type: 'Futsal',
      pricePerHour: 25,
      location: 'Westside Complex',
      image: 'https://via.placeholder.com/100x60?text=Arena',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Basketball Court 1',
      type: 'Basketball',
      pricePerHour: 20,
      location: 'East Park',
      image: 'https://via.placeholder.com/100x60?text=Court',
      status: 'Inactive',
    },
  ]);

  const handleStatusToggle = (id) => {
    setFacilities(prev =>
      prev.map(facility =>
        facility.id === id
          ? { ...facility, status: facility.status === 'Active' ? 'Inactive' : 'Active' }
          : facility
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      setFacilities(prev => prev.filter(facility => facility.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Facilities</h1>
        <Link
          to="/vendor/add-facility"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Add New Facility
        </Link>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No facilities yet</h3>
          <p className="text-gray-500 mb-4">
            You haven't listed any sports facilities yet. Click 'Add New Facility' to get started!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facility
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
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
                {facilities.map((facility) => (
                  <tr key={facility.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-16 object-cover rounded"
                          src={facility.image}
                          alt={facility.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {facility.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {facility.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {facility.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${facility.pricePerHour}/hr
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            facility.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {facility.status}
                        </span>
                        <label className="ml-3 relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={facility.status === 'Active'}
                            onChange={() => handleStatusToggle(facility.id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(facility.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFacilities;
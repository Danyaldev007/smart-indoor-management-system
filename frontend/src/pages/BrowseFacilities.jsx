import { useState } from 'react';
import FacilityCard from './FacilityCard';

const BrowseFacilities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const facilities = [
    {
      id: 1,
      name: 'Badminton Court A',
      type: 'Badminton',
      pricePerHour: 15,
      location: 'Downtown Sports Center',
      image: 'https://via.placeholder.com/300x200?text=Badminton+Court',
    },
    {
      id: 2,
      name: 'Futsal Arena',
      type: 'Futsal',
      pricePerHour: 25,
      location: 'Westside Complex',
      image: 'https://via.placeholder.com/300x200?text=Futsal+Arena',
    },
    {
      id: 3,
      name: 'Basketball Court 1',
      type: 'Basketball',
      pricePerHour: 20,
      location: 'East Park',
      image: 'https://via.placeholder.com/300x200?text=Basketball+Court',
    },
    {
      id: 4,
      name: 'Squash Room B',
      type: 'Squash',
      pricePerHour: 18,
      location: 'Fitness Hub',
      image: 'https://via.placeholder.com/300x200?text=Squash+Room',
    },
    {
      id: 5,
      name: 'Badminton Court B',
      type: 'Badminton',
      pricePerHour: 16,
      location: 'Central Gym',
      image: 'https://via.placeholder.com/300x200?text=Badminton+Court+B',
    },
    {
      id: 6,
      name: 'Futsal Field',
      type: 'Futsal',
      pricePerHour: 30,
      location: 'Outdoor Sports Park',
      image: 'https://via.placeholder.com/300x200?text=Futsal+Field',
    },
  ];

  const categories = ['All', 'Badminton', 'Futsal', 'Basketball', 'Squash'];

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || facility.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Browse Facilities</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by facility name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Facilities Grid */}
      {filteredFacilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No facilities found for this category.
        </div>
      )}
    </div>
  );
};

export default BrowseFacilities;
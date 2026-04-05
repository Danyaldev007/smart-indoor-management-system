import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyBookings = () => {
  const bookings = useSelector((state) => state.bookings.bookings);
  const [filter, setFilter] = useState('Upcoming');

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filter === 'Upcoming') {
      return bookingDate >= today;
    } else {
      return bookingDate < today;
    }
  });

  const getSportIcon = (facilityName) => {
    if (facilityName.toLowerCase().includes('badminton')) return '🏸';
    if (facilityName.toLowerCase().includes('futsal')) return '⚽';
    if (facilityName.toLowerCase().includes('basketball')) return '🏀';
    if (facilityName.toLowerCase().includes('squash')) return '🎾';
    return '🏓';
  };

  const formatTimeSlots = (slots) => {
    if (slots.length === 0) return '';
    const start = slots[0];
    const end = slots[slots.length - 1];
    return `${start} - ${parseInt(end.split(':')[0]) + 1}:00`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelBooking = (id) => {
    // In real app, call API to cancel
    alert(`Booking ${id} cancelled`);
  };

  const handleGetDirections = (facilityName) => {
    // Mock directions
    alert(`Getting directions to ${facilityName}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {/* Filter Buttons */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('Upcoming')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'Upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('Past')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'Past'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500 mb-4">
            You don't have any {filter.toLowerCase()} bookings yet.
          </p>
          <Link
            to="/explore"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Find a Court
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-sm border p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/100x60?text=Facility"
                  alt={booking.facilityName}
                  className="w-16 h-12 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{booking.facilityName}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{getSportIcon(booking.facilityName)}</span>
                    <span>Sports</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.date).toLocaleDateString()} | {formatTimeSlots(booking.timeSlots)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

                <div className="flex space-x-2">
                  {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 hover:bg-red-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleGetDirections(booking.facilityName)}
                    className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
                  >
                    Directions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
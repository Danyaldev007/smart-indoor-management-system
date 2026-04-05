import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewBooking } from '../store/bookingSlice';
import Toast from '../components/Toast';

const FacilityDetails = () => {
  const { id } = useParams();
  const facilityId = parseInt(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [toast, setToast] = useState(null);

  // Mock facility data (in real app, fetch from API)
  const facilities = [
    {
      id: 1,
      name: 'Badminton Court A',
      type: 'Badminton',
      pricePerHour: 15,
      location: 'Downtown Sports Center',
      image: 'https://via.placeholder.com/600x400?text=Badminton+Court',
      description: 'A premium badminton court with high-quality flooring and lighting. Perfect for competitive play and casual games.',
    },
    {
      id: 2,
      name: 'Futsal Arena',
      type: 'Futsal',
      pricePerHour: 25,
      location: 'Westside Complex',
      image: 'https://via.placeholder.com/600x400?text=Futsal+Arena',
      description: 'Indoor futsal arena with professional-grade turf and climate control. Ideal for team sports and training sessions.',
    },
    {
      id: 3,
      name: 'Basketball Court 1',
      type: 'Basketball',
      pricePerHour: 20,
      location: 'East Park',
      image: 'https://via.placeholder.com/600x400?text=Basketball+Court',
      description: 'Full-size basketball court with adjustable hoops and excellent acoustics. Great for leagues and pickup games.',
    },
    {
      id: 4,
      name: 'Squash Room B',
      type: 'Squash',
      pricePerHour: 18,
      location: 'Fitness Hub',
      image: 'https://via.placeholder.com/600x400?text=Squash+Room',
      description: 'Private squash court with glass walls and premium equipment. Suitable for singles and doubles play.',
    },
    {
      id: 5,
      name: 'Badminton Court B',
      type: 'Badminton',
      pricePerHour: 16,
      location: 'Central Gym',
      image: 'https://via.placeholder.com/600x400?text=Badminton+Court+B',
      description: 'Well-maintained badminton court with modern amenities. Excellent for all skill levels.',
    },
    {
      id: 6,
      name: 'Futsal Field',
      type: 'Futsal',
      pricePerHour: 30,
      location: 'Outdoor Sports Park',
      image: 'https://via.placeholder.com/600x400?text=Futsal+Field',
      description: 'Outdoor futsal field with natural grass and lighting. Perfect for evening matches.',
    },
  ];

  const facility = facilities.find(f => f.id === facilityId);

  // Generate time slots from 8:00 AM to 10:00 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 22; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    timeSlots.push(time);
  }

  // Mock booked slots (in real app, fetch from API based on date)
  const bookedSlots = ['10:00', '14:00', '18:00']; // Example booked slots

  const handleSlotClick = (slot) => {
    if (bookedSlots.includes(slot)) return;

    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const totalAmount = selectedSlots.length * (facility?.pricePerHour || 0);

  const handleBookNow = () => {
    const bookingData = {
      customerName: 'Current User', // In real app, get from auth
      facilityName: facility.name,
      facilityId: facility.id,
      date: selectedDate,
      timeSlots: selectedSlots,
      totalPrice: totalAmount,
      vendorId: 1, // mock
    };
    dispatch(addNewBooking(bookingData));
    setToast({ message: 'Booking confirmed successfully!', type: 'success' });
    setTimeout(() => {
      navigate('/bookings');
    }, 2000);
  };

  if (!facility) {
    return <div className="p-4">Facility not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{facility.name}</h1>
          <p className="text-gray-600 mt-2">{facility.location}</p>
          <p className="text-gray-700 mt-4">{facility.description}</p>
        </div>

        {/* Right Column - Booking Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Book This Facility</h2>

          {/* Date Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Slot Grid */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlots.includes(slot);
                let bgColor = 'bg-white';
                let textColor = 'text-gray-700';
                let cursor = 'cursor-pointer';

                if (isBooked) {
                  bgColor = 'bg-gray-300';
                  textColor = 'text-gray-500';
                  cursor = 'cursor-not-allowed';
                } else if (isSelected) {
                  bgColor = 'bg-green-500';
                  textColor = 'text-white';
                }

                return (
                  <button
                    key={slot}
                    onClick={() => handleSlotClick(slot)}
                    disabled={isBooked}
                    className={`p-2 rounded-lg border ${bgColor} ${textColor} ${cursor} hover:shadow-md transition-shadow`}
                  >
                    {isBooked ? 'Occupied' : slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Calculation */}
          <div className="mb-4">
            <p className="text-lg">
              Selected Slots: {selectedSlots.length} hour(s)
            </p>
            <p className="text-2xl font-bold text-blue-600">
              Total Amount: ${totalAmount}
            </p>
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleBookNow}
            disabled={selectedSlots.length === 0 || !selectedDate}
            className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Proceed to Book
          </button>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default FacilityDetails;
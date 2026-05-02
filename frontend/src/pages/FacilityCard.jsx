import { Link } from 'react-router-dom';

const FacilityCard = ({ facility }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200">
      <img
        src={facility.image}
        alt={facility.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
        <p className="text-gray-600 mb-2">{facility.location}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">${facility.pricePerHour} / hr</p>
        <Link
          to={`/facility/${facility.id}`}
          className="block w-full bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FacilityCard;
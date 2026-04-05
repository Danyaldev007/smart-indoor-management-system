import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth.user);

  const links = {
    user: [
      { to: '/explore', label: 'Explore' },
      { to: '/bookings', label: 'My Bookings' },
      { to: '/profile', label: 'Profile' },
    ],
    vendor: [
      { to: '/vendor/dashboard', label: 'Dashboard' },
      { to: '/vendor/my-facilities', label: 'My Facilities' },
      { to: '/vendor/add-facility', label: 'Add Facility' },
      { to: '/vendor/requests', label: 'Booking Requests' },
      { to: '/profile', label: 'Profile' },
    ],
    admin: [
      { to: '/admin/approvals', label: 'Vendor Approvals' },
      { to: '/admin/users', label: 'User Management' },
      { to: '/admin/stats', label: 'Platform Stats' },
      { to: '/profile', label: 'Profile' },
    ],
  };

  const currentLinks = links[role] || [];

  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold">Sports Booking</h2>
      </div>
      <nav className="mt-4">
        <ul>
          {currentLinks.map((link) => (
            <li key={link.to} className="mb-2">
              <Link
                to={link.to}
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
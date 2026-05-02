import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setUser({ role: null }));
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const getRoleDisplay = () => {
    switch (role) {
      case 'user':
        return 'Player';
      case 'vendor':
        return 'Vendor';
      case 'admin':
        return 'Admin';
      default:
        return 'Guest';
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Indoor Sports Booking System</h1>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded"
        >
          <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
            {getRoleDisplay().charAt(0)}
          </div>
          <span>{getRoleDisplay()}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
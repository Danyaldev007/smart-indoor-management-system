import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Explore from './pages/Explore';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';
import VendorDashboard from './pages/VendorDashboard';
import MyFacilities from './pages/MyFacilities';
import AddFacility from './pages/AddFacility';
import BookingRequests from './pages/BookingRequests';
import VendorApprovals from './pages/VendorApprovals';
import UserManagement from './pages/UserManagement';
import PlatformStats from './pages/PlatformStats';
import AdminDashboard from './pages/AdminDashboard';
import FacilityDetails from './pages/FacilityDetails';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/explore" replace />} />
            <Route path="user" element={<Navigate to="/explore" replace />} />
            <Route path="vendor" element={<Navigate to="/vendor/dashboard" replace />} />
            <Route path="explore" element={<Explore />} />
            <Route path="facility/:id" element={<FacilityDetails />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="vendor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/my-facilities"
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <MyFacilities />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/add-facility"
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <AddFacility />
                </ProtectedRoute>
              }
            />
            <Route
              path="vendor/requests"
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <BookingRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/approvals"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VendorApprovals />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/stats"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
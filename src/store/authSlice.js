import { createSlice } from '@reduxjs/toolkit';

const getInitialRole = () => {
  const savedRole = localStorage.getItem('userRole');
  return savedRole || 'user';
};

const getInitialUser = () => {
  const savedUser = localStorage.getItem('userData');
  return savedUser ? JSON.parse(savedUser) : {
    role: getInitialRole(),
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    companyName: 'Sports Co.',
    taxId: '123456789',
    favoriteSports: ['Badminton', 'Futsal'],
  };
};

const initialState = {
  user: getInitialUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('userData', JSON.stringify(state.user));
      if (action.payload?.role) {
        localStorage.setItem('userRole', action.payload.role);
      }
    },
    setRole: (state, action) => {
      state.user.role = action.payload;
      localStorage.setItem('userRole', action.payload);
      localStorage.setItem('userData', JSON.stringify(state.user));
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('userData', JSON.stringify(state.user));
    },
  },
});

export const { setUser, setRole, updateProfile } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [
    {
      id: 1,
      customerName: 'John Doe',
      facilityName: 'Badminton Court A',
      facilityId: 1,
      date: '2026-04-15',
      timeSlots: ['17:00', '18:00'], // 5-7 PM
      status: 'Confirmed',
      totalPrice: 30,
      vendorId: 1, // mock
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      facilityName: 'Futsal Arena',
      facilityId: 2,
      date: '2026-04-20',
      timeSlots: ['14:00', '15:00'], // 2-4 PM
      status: 'Pending',
      totalPrice: 50,
      vendorId: 2,
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      facilityName: 'Basketball Court 1',
      facilityId: 3,
      date: '2026-03-10',
      timeSlots: ['18:00', '19:00'], // 6-8 PM
      status: 'Cancelled',
      totalPrice: 40,
      vendorId: 3,
    },
    {
      id: 4,
      customerName: 'Sarah Wilson',
      facilityName: 'Squash Room B',
      facilityId: 4,
      date: '2026-04-25',
      timeSlots: ['10:00', '11:00'], // 10-12 AM
      status: 'Confirmed',
      totalPrice: 36,
      vendorId: 4,
    },
    {
      id: 5,
      customerName: 'Tom Brown',
      facilityName: 'Badminton Court B',
      facilityId: 5,
      date: '2026-04-18',
      timeSlots: ['16:00', '17:00'], // 4-6 PM
      status: 'Pending',
      totalPrice: 32,
      vendorId: 5,
    },
    {
      id: 6,
      customerName: 'Alice Green',
      facilityName: 'Futsal Field',
      facilityId: 6,
      date: '2026-04-22',
      timeSlots: ['19:00', '20:00'], // 7-9 PM
      status: 'Confirmed',
      totalPrice: 60,
      vendorId: 6,
    },
  ],
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addNewBooking: (state, action) => {
      const newBooking = {
        id: Date.now(), // simple ID
        ...action.payload,
        status: 'Pending', // default status
      };
      state.bookings.push(newBooking);
    },
  },
});

export const { addNewBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
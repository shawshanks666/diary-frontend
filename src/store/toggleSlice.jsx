// src/store/toggleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToggled: true, // Initial state set to false
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isToggled = !state.isToggled; // Toggle the boolean state
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;

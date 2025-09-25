// src/store/keySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const keySlice = createSlice({
  name: 'key',
  initialState,
  reducers: {
    setKey: (state, action) => {
      state.value = action.payload;
    },
    clearKey: (state) => {
      state.value = null;
  },
}
});

export const { setKey, clearKey } = keySlice.actions;
export default keySlice.reducer;
export const selectKey = (state) => state.key.value;

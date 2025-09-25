// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import toggleReducer from './toggleSlice'; // Import your toggle slice
import keyReducer from './keySlice';
import diaryReducer from './diarySlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    toggle: toggleReducer,
    key: keyReducer,
    diary: diaryReducer,
  },
});

export default store;

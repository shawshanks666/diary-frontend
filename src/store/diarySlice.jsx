import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [] // This is the correct property for storing the diary entries
}

const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers: {
        setDiary: (state, action) => {
          // Update the 'value' property, not 'diary'
          state.value = action.payload;
        },
        clearDiary: (state) => {
          state.value = []; // Clear the diary entries
      },
    }
});

export const { setDiary, clearDiary } = diarySlice.actions;
export default diarySlice.reducer;

// Selector to access the diary entries from the Redux state
export const selectDiary = (state) => state.diary.value;

// formSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDirty: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setDirtyState: (state, action) => {
      state.isDirty = action.payload;
    },
  },
});

export const { setDirtyState } = formSlice.actions;
export default formSlice.reducer;

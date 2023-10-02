// dialogSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDialogVisible: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    showDialog: (state) => {
      state.isDialogVisible = true;
    },
    hideDialog: (state) => {
      state.isDialogVisible = false;
    },
  },
});

export const { showDialog, hideDialog } = dialogSlice.actions;
export default dialogSlice.reducer;

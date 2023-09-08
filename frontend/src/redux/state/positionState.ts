import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
	name: "position",
	initialState: {
		position: [],
		isLoading: false,
		isSuccess: true,
		errorMessage: ""
	},
	reducers: {
		getPositionFetch: (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		},
		getPositionSuccess: (state, action) => {
			state.position = action.payload;
			state.isLoading = false;
			state.isSuccess = true;
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		}
	},
});

export const { getPositionFetch, getPositionSuccess, setErrorMessage } = positionSlice.actions;
export default positionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
	name: "position",
	initialState: {
		position: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getPositionFetch: (state) => {
			state.isLoading = true;
		},
		getPositionSuccess: (state, action) => {
			state.position = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	},
});

export const { getPositionFetch, getPositionSuccess, setMessage, setIsLoading } = positionSlice.actions;
export default positionSlice.reducer;

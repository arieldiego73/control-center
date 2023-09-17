import { createSlice } from "@reduxjs/toolkit";

export const technologySlice = createSlice({
	name: "technology",
	initialState: {
		technology: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getTechnologyFetch: (state) => {
			state.isLoading = true;
		},
		getTechnologySuccess: (state, action) => {
			state.technology = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		}
	},
});

export const { getTechnologyFetch, getTechnologySuccess, setMessage } = technologySlice.actions;
export default technologySlice.reducer;

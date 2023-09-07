import { createSlice } from "@reduxjs/toolkit";

export const devPhaseSlice = createSlice({
	name: "devPhase",
	initialState: {
		devPhase: [],
		isLoading: false,
	},
	reducers: {
		getDevPhaseFetch: (state) => {
			state.isLoading = true;
		},
		getDevPhaseSuccess: (state, action) => {
			state.devPhase = action.payload;
			state.isLoading = false;
		},
	},
});

export const { getDevPhaseFetch, getDevPhaseSuccess } = devPhaseSlice.actions;
export default devPhaseSlice.reducer;

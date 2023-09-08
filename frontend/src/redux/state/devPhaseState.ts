import { createSlice } from "@reduxjs/toolkit";

export const devPhaseSlice = createSlice({
	name: "devPhase",
	initialState: {
		devPhase: [],
		isLoading: false,
		isSuccess: true,
		errorMessage: ""
	},
	reducers: {
		getDevPhaseFetch: (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		},
		getDevPhaseSuccess: (state, action) => {
			state.devPhase = action.payload;
			state.isLoading = false;
			state.isSuccess = true;
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		}
	},
});

export const { getDevPhaseFetch, getDevPhaseSuccess, setErrorMessage } = devPhaseSlice.actions;
export default devPhaseSlice.reducer;

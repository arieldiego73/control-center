import { createSlice } from "@reduxjs/toolkit";

export const devPhaseSlice = createSlice({
	name: "devPhase",
	initialState: {
		devPhase: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getDevPhaseFetch: (state) => {
			state.isLoading = true;
		},
		getDevPhaseSuccess: (state, action) => {
			state.devPhase = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		}
	},
});

export const { getDevPhaseFetch, getDevPhaseSuccess, setMessage } = devPhaseSlice.actions;
export default devPhaseSlice.reducer;

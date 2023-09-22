import { createSlice } from "@reduxjs/toolkit";

export const devTypeSlice = createSlice({
	name: "devType",
	initialState: {
		devType: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getDevTypeFetch: (state) => {
			state.isLoading = true;
		},
		getDevTypeSuccess: (state, action) => {
			state.devType = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		}
	},
});

export const { getDevTypeFetch, getDevTypeSuccess, setMessage } = devTypeSlice.actions;
export default devTypeSlice.reducer;

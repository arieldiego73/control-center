import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
	name: "section",
	initialState: {
		section: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getSectionFetch: (state) => {
			state.isLoading = true;
		},
		getSectionSuccess: (state, action) => {
			state.section = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		}
	},
});

export const { getSectionFetch, getSectionSuccess, setMessage } = sectionSlice.actions;
export default sectionSlice.reducer;
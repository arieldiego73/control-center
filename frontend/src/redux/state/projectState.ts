import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "project",
	initialState: {
		projects: [],
		isLoading: false,
		notice: {
			message: "",
			severity: "",
		},
	},
	reducers: {
		getProjectsFetch: (state) => {
			state.isLoading = true;
		},
		getProjectsSuccess: (state, action) => {
			state.projects = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		},
	},
});

export const {
	getProjectsFetch,
	getProjectsSuccess,
	setMessage,
} = userSlice.actions;
export default userSlice.reducer;

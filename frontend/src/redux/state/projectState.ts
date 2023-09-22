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
		isAddSuccess: false,
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
		addProjectSuccess: (state) => {
			state.isAddSuccess = true;
		},
		addProjectReset: (state) => {
			state.isAddSuccess = false;
		},
	},
});

export const {
	getProjectsFetch,
	getProjectsSuccess,
	setMessage,
	addProjectSuccess,
	addProjectReset,
} = userSlice.actions;
export default userSlice.reducer;

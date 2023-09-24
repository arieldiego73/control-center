import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "project",
	initialState: {
		projects: [],
		projectInfo: [],
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
		getProjectInfoSuccess: (state, action) => {
			state.projectInfo = action.payload;
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
		clearProjectInfo: (state) => {
			state.projectInfo = []
		},
	},
});

export const {
	getProjectsFetch,
	getProjectsSuccess,
	getProjectInfoSuccess,
	setMessage,
	addProjectSuccess,
	addProjectReset,
	clearProjectInfo,
} = userSlice.actions;
export default userSlice.reducer;

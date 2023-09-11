import { createSlice } from "@reduxjs/toolkit";

export const projectStatusSlice = createSlice({
	name: "projectStatus",
	initialState: {
		projectStatus: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getProjectStatusFetch: (state) => {
			state.isLoading = true;
		},
		getProjectStatusSuccess: (state, action) => {
			state.projectStatus = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		}
	},
});

export const { getProjectStatusFetch, getProjectStatusSuccess, setMessage } = projectStatusSlice.actions;
export default projectStatusSlice.reducer;

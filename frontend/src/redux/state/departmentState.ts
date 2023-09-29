import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
	name: "department",
	initialState: {
		department: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getDepartmentFetch: (state) => {
			state.isLoading = true;
		},
		getDepartmentSuccess: (state, action) => {
			state.department = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	},
});

export const { getDepartmentFetch, getDepartmentSuccess, setMessage, setIsLoading } = departmentSlice.actions;
export default departmentSlice.reducer;

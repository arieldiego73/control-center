import { createSlice } from "@reduxjs/toolkit";

export const employeeStatusSlice = createSlice({
	name: "employeeStatus",
	initialState: {
		employeeStatus: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getEmployeeStatusFetch: (state) => {
			state.isLoading = true;
		},
		getEmployeeStatusSuccess: (state, action) => {
			state.employeeStatus = action.payload;
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

export const { getEmployeeStatusFetch, getEmployeeStatusSuccess, setMessage, setIsLoading } = employeeStatusSlice.actions;
export default employeeStatusSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
	name: "roles",
	initialState: {
		roles: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getRolesFetch: (state) => {
			state.isLoading = true;
		},
		getRolesSuccess: (state, action) => {
			state.roles = action.payload;
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

export const { getRolesFetch, getRolesSuccess, setMessage, setIsLoading } = roleSlice.actions;
export default roleSlice.reducer;

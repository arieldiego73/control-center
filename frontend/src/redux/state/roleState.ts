import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
	name: "roles",
	initialState: {
		roles: [],
		isLoading: false,
		isSuccess: true,
		errorMessage: ""
	},
	reducers: {
		getRolesFetch: (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		},
		getRolesSuccess: (state, action) => {
			state.roles = action.payload;
			state.isLoading = false;
			state.isSuccess = true;
		},
		setErrorMessage: (state, action) => {
			state.errorMessage = action.payload;
		}
	},
});

export const { getRolesFetch, getRolesSuccess, setErrorMessage } = roleSlice.actions;
export default roleSlice.reducer;

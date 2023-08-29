import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
	name: "roles",
	initialState: {
		roles: [],
		isLoading: false,
	},
	reducers: {
		getRolesFetch: (state) => {
			state.isLoading = true;
		},
		getRolesSuccess: (state, action) => {
			state.roles = action.payload;
			state.isLoading = false;
		},
	},
});

export const { getRolesFetch, getRolesSuccess } = roleSlice.actions;
export default roleSlice.reducer;

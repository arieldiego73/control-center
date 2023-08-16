import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		isLoading: false,
	},
	reducers: {
		getUsersFetch: (state) => {
			state.isLoading = true;
		},
		getUsersSuccess: (state, action) => {
			state.users = action.payload;
			state.isLoading = false;
		},
		getUsersError: (state) => {
			state.isLoading = false;
		},
	},
});

export const { getUsersFetch, getUsersSuccess, getUsersError } =
	userSlice.actions;
export default userSlice.reducer;

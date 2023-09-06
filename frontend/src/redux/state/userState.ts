import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		userInfo: {
			emp_id: "",
			username: "",
			fname: "",
			mname: "",
			lname: "",
			position_name: "",
			email: "",
			title: "",
			section_name: "",
			dept_name: "",
		},
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
		getUserInfoSuccess: (state, action) => {
			state.userInfo = action.payload;
			state.isLoading = false;
		},
		getUsersError: (state) => {
			state.isLoading = false;
		},
	},
});

export const { getUsersFetch, getUsersSuccess, getUserInfoSuccess, getUsersError } =
	userSlice.actions;
export default userSlice.reducer;

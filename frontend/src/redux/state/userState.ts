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
		userRoles: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
		isAddSuccess: false,
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
		getUserRolesSuccess: (state, action) => {
			state.userRoles = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		},
		addUserSuccess: (state) => {
			state.isAddSuccess = true;
		},
		addUserReset: (state) => {
			state.isAddSuccess = false;
		},
	},
});

export const { getUsersFetch, getUsersSuccess, getUserInfoSuccess, getUserRolesSuccess, setMessage, addUserSuccess, addUserReset } =
	userSlice.actions;
export default userSlice.reducer;

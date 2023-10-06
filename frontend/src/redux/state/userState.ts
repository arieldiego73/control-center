import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		userInfo: {
			emp_id: "",
			username: "",
			password: "",
			confirm_password: "",
			fname: "",
			mname: "",
			lname: "",
			position_name: "",
			email: "",
			title: "",
			section_name: "",
			dept_name: "",
			position_id: 0,
			dept_id: 0,
			section_id: 0,
			status_code: "",
		},
		userRoles: [],
		isLoading: false,
		notice: {
			message: "",
			severity: "",
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
		clearUserInfo: (state) => {
			state.userInfo = {
				emp_id: "",
				username: "",
				password: "",
				confirm_password: "",
				fname: "",
				mname: "",
				lname: "",
				position_name: "",
				email: "",
				title: "",
				section_name: "",
				dept_name: "",
				position_id: 0,
				dept_id: 0,
				section_id: 0,
				status_code: "",
			};
			state.userRoles = [];
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	},
});

export const {
	getUsersFetch,
	getUsersSuccess,
	getUserInfoSuccess,
	getUserRolesSuccess,
	setMessage,
	addUserSuccess,
	addUserReset,
	clearUserInfo,
	setIsLoading
} = userSlice.actions;
export default userSlice.reducer;

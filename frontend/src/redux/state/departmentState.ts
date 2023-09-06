import { createSlice } from "@reduxjs/toolkit";

interface Departments {
  dept_id: number,
  dept_name: string
}

const depts: Departments[] = [{
	dept_id: 0,
	dept_name: ""
}]

export const departmentSlice = createSlice({
	name: "departments",
	initialState: {
		departments: depts,
		isLoading: false,
	},
	reducers: {
		getDepartmentsFetch: (state) => {
			state.isLoading = true;
		},
		getDepartmentsSuccess: (state, action) => {
			state.departments = action.payload;
			state.isLoading = false;
		},
		getDepartmentsError: (state) => {
			state.isLoading = false;
		},
	},
});

export const { getDepartmentsFetch, getDepartmentsSuccess, getDepartmentsError } =
	departmentSlice.actions;
export default departmentSlice.reducer;

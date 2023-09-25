import { createSlice } from "@reduxjs/toolkit";

interface ProjectInfoData {
	end_date: string;
	status_code: number;
	tech_id: number[];
	manager_emp_id: number[];
	proj_desc: string;
	member_emp_id: number[];
	proj_name: string;
	dev_type_id: number[];
	proj_code: string;
	dev_phase_id: number[];
	client_id: number;
	start_date: string;
}

const projInfoInitState: ProjectInfoData = {
	end_date: "",
	status_code: 0,
	tech_id: [],
	manager_emp_id: [],
	proj_desc: "",
	member_emp_id: [],
	proj_name: "",
	dev_type_id: [],
	proj_code: "",
	dev_phase_id: [],
	client_id: 0,
	start_date: ""
}

export const projectSlice = createSlice({
	name: "project",
	initialState: {
		projects: [],
		projectInfo: projInfoInitState,
		isLoading: false,
		notice: {
			message: "",
			severity: "",
		},
		isAddSuccess: false,
	},
	reducers: {
		getProjectsFetch: (state) => {
			state.isLoading = true;
		},
		getProjectsSuccess: (state, action) => {
			state.projects = action.payload;
			state.isLoading = false;
		},
		getProjectInfoSuccess: (state, action) => {
			state.projectInfo = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		},
		addProjectSuccess: (state) => {
			state.isAddSuccess = true;
		},
		addProjectReset: (state) => {
			state.isAddSuccess = false;
		},
		clearProjectInfo: (state) => {
			state.projectInfo = projInfoInitState;
		},
	},
});

export const {
	getProjectsFetch,
	getProjectsSuccess,
	getProjectInfoSuccess,
	setMessage,
	addProjectSuccess,
	addProjectReset,
	clearProjectInfo,
} = projectSlice.actions;
export default projectSlice.reducer;

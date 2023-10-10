import { createSlice } from "@reduxjs/toolkit";

export type UserStatus = {
	status_code: string;
	status_name: string;
	year: number,
	month: number,
	total: number, 
}

export type RecentProjects = {
	proj_name: string;
	client_name: string;
	proj_status_name: string;
}

// export type ProjectStatus = {
// 	status_id: number;
// 	status_name: string;
// 	total_project_status: number;
// }

export type ProjectStatus = {
	total: number;
	status_name: string;
	month: string;
	// total_project_status: number;
}


export type GraphsData = {
	user_status: UserStatus[]; //emp status
	project_status: ProjectStatus[]; 
	recent_projects: RecentProjects[]; //usergraph 

}

const initState: GraphsData[] = []

export const graphsDataSlice = createSlice({
	name: "graphsData",
	initialState: {
		graphsData: initState,
		isLoading: false,
	},
	reducers: {
		getGraphsDataFetch: (state) => {
			state.isLoading = true;
		},
		getGraphsDataSuccess: (state, action) => {
			state.graphsData = action.payload;
			state.isLoading = false;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	},
});

export const { getGraphsDataFetch, getGraphsDataSuccess, setIsLoading } = graphsDataSlice.actions;
export default graphsDataSlice.reducer;
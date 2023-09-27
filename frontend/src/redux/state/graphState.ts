import { createSlice } from "@reduxjs/toolkit";

export type UserStatus = {
	status_code: string;
	status_name: string;
	total_user_status: number;
}

export type ProjectStatus = {
	status_id: number;
	status_name: string;
	total_project_status: number;
}

export type TotalUsers = {
	total: number;
	year_registered: number;
}

export type GraphsData = {
	user_status: UserStatus[];
	project_status: ProjectStatus[];
	user_per_year: TotalUsers[];
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
	},
});

export const { getGraphsDataFetch, getGraphsDataSuccess } = graphsDataSlice.actions;
export default graphsDataSlice.reducer;
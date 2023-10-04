import { createSlice } from "@reduxjs/toolkit";

export type UserStatus = {
	status_code: string;
	status_name: string;
	year: number,
	month: number,
	total: number,
}

export type ProjectStatus = {
	status_id: number;
	status_name: string;
	total_project_status: number;
}

export type GraphsData = {
	user_status: UserStatus[];
	project_status: ProjectStatus[];
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
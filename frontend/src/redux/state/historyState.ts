import { createSlice } from "@reduxjs/toolkit";

export type HistoryData = {
	log_id: number;
	username: string;
	log_desc: string;
	log_date: string;
}

const initState: HistoryData[] = []

export const historySlice = createSlice({
	name: "history",
	initialState: {
		history: initState,
		isLoading: false,
	},
	reducers: {
		getHistoryFetch: (state) => {
			state.isLoading = true;
		},
		getHistorySuccess: (state, action) => {
			state.history = action.payload;
			state.isLoading = false;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		}
	},
});

export const { getHistoryFetch, getHistorySuccess, setIsLoading } = historySlice.actions;
export default historySlice.reducer;
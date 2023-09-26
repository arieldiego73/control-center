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
	},
});

export const { getHistoryFetch, getHistorySuccess } = historySlice.actions;
export default historySlice.reducer;
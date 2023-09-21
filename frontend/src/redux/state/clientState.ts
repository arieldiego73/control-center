import { createSlice } from "@reduxjs/toolkit";

export const clientSlice = createSlice({
	name: "client",
	initialState: {
		clients: [],
		isLoading: false,
		notice: {
			message: "",
			severity: ""
		},
	},
	reducers: {
		getClientFetch: (state) => {
			state.isLoading = true;
		},
		getClientSuccess: (state, action) => {
			state.clients = action.payload;
			state.isLoading = false;
		},
		setMessage: (state, action) => {
			state.notice = action.payload;
		}
	},
});

export const { getClientFetch, getClientSuccess, setMessage } = clientSlice.actions;
export default clientSlice.reducer;

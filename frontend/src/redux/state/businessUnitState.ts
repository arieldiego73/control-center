import { createSlice } from "@reduxjs/toolkit";

export const businessUnitSlice = createSlice({
	name: "businessUnit",
	initialState: {
		businessUnit: [],
		isLoading: false,
	},
	reducers: {
		getBusinessUnitFetch: (state) => {
			state.isLoading = true;
		},
		getBusinessUnitSuccess: (state, action) => {
			state.businessUnit = action.payload;
			state.isLoading = false;
		},
	},
});

export const { getBusinessUnitFetch, getBusinessUnitSuccess } = businessUnitSlice.actions;
export default businessUnitSlice.reducer;

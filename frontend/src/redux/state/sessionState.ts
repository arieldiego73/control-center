import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id: number;
	username: string;
}

interface SessionState {
	user: User | null;
}

const initialState: SessionState = {
	user: null,
};

const sessionSlice = createSlice({
	name: "session",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser } = sessionSlice.actions;

export default sessionSlice.reducer;

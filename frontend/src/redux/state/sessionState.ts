// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
// 	id: number;
// 	username: string;
// }

// interface SessionState {
// 	user: User | null;
// }

// const initialState: SessionState = {
// 	user: null,
// };

// const sessionSlice = createSlice({
// 	name: "session",
// 	initialState,
// 	reducers: {
// 		setUser: (state, action: PayloadAction<User | null>) => {
// 			state.user = action.payload;
// 		},
// 		clearUser: (state) => {
// 			state.user = null;
// 		},
// 	},
// });

// export const { setUser, clearUser } = sessionSlice.actions;

// export default sessionSlice.reducer;



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

interface User {
  id: number;
  username: string;
}

interface SessionState {
  user: User | null;
//   isSuccess: boolean;
  isAuthenticated: boolean;
}

const initialState: SessionState = {
  user: null,
//   isSuccess: false,
  isAuthenticated: cookies.get('isAuthenticated') === "true", // Read from cookies
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
	 setUser: (state, action: PayloadAction<User | null>) => {
		state.user = action.payload;
		state.isAuthenticated = true;
		cookies.set('isAuthenticated', 'true', { path: '/' }); // Set the 'isAuthenticated' cookie
	 },
	 clearUser: (state) => {
		state.user = null;
		state.isAuthenticated = false;
		cookies.set('isAuthenticated', 'false', { path: '/' });// Set isAuthenticated to false
		
	  },
	  setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
		state.isAuthenticated = action.payload;
	  },
	  getAuthStatus: (state) => {
		state.isAuthenticated = true; // You can modify this as needed
	  },
	  logoutUser: (state) => {
		state.user = null;
		state.isAuthenticated = false; // Reset isAuthenticated when logging out
	  },
  },
});


export const { 
	setUser, 
	clearUser, 
	setAuthenticationStatus, 
	getAuthStatus,
	logoutUser,
} =
  sessionSlice.actions;

export default sessionSlice.reducer;

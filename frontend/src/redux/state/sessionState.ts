import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  img: string;
  
}

interface SessionState {
  user: User | null;
  // isSuccess: boolean;
  isAuthenticated: boolean;
  username: string | null; // Add the username property
}

const initialState: SessionState = {
  user: null,
  // isSuccess: false,
  isAuthenticated: localStorage.getItem('isAuthenticated') === "true" , // Read from localStorage or cookies
  username: null
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.username = action.payload?.username || null; // Store the username
      cookies.set('isAuthenticated', 'true'); // Set the 'isAuthenticated' cookie
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      cookies.set('isAuthenticated', 'false');// Set isAuthenticated to false
		
	  },
	  setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
		  state.isAuthenticated = action.payload;
	  },
	  getAuthStatus: (state) => {
		  state.isAuthenticated = true; // You can modify this as needed
	  },
	  logoutUser: (state) => {
      state.user = null;
      cookies.set('isAuthenticated', 'false');
	  },
    setUserNameAndEmail: (state, action: PayloadAction<{ fullName: string; email: string; img: string }>) => {
      if (state.user) {
        state.user.fullName = action.payload.fullName;
        state.user.email = action.payload.email;
        state.user.img = action.payload.img;
      }
    },
  },
});


export const { 
	setUser, 
	clearUser, 
	setAuthenticationStatus, 
	getAuthStatus,
	logoutUser,
  setUserNameAndEmail,
} =
  sessionSlice.actions;

export default sessionSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// interface User {
//   id: number;
//   username: string;
// }

// interface SessionState {
//   user: User | null;
//   isSuccess: boolean;
//   isAuthenticated: boolean;
// }

// const initialState: SessionState = {
//   user: null,
//   isSuccess: false,
//   isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
// };

// const sessionSlice = createSlice({
//   name: "session",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true; // Set isAuthenticated to true if user exists
//       state.isAuthenticated = action.payload !== null; // Set isAuthenticated based on user presence
      
//       console.log("is Authenticated (from state)",state.isAuthenticated)
//     },
//     clearUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false; // Reset isAuthenticated when clearing the user
//     },
//     setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
// 	  state.isAuthenticated = action.payload;
//     },
//     getAuthStatus: (state) => {
// 	  state.isAuthenticated = false; // Reset isAuthenticated when logging out
//     },
// 	logoutUser: (state) => {
//       state.user = null;
// 	  state.isAuthenticated = false; // Reset isAuthenticated when logging out
// 	},
//   },
// });

// export const { setUser, clearUser, setAuthenticationStatus, getAuthStatus, logoutUser, } =
//   sessionSlice.actions;

// export default sessionSlice.reducer;

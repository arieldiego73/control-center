
import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import {
	clearUser,
  setAuthenticationStatus,
  setUser
} from "../state/sessionState";
import { createAction } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie'; // Import Cookies from 'universal-cookie'
import axios from "axios";

const cookies = new Cookies(); // Initialize the Cookies instance

// FOR LOGIN
const apiLogin = async (username: string, password: string): Promise<any> => {
  try {
    axios.defaults.withCredentials = true;
    return axios
      .post(
        "http://localhost:8080/auth/login",
        { username, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
          if (res.data.status === "active") {
            // Store authentication status in localStorage
            localStorage.setItem("isAuthenticated", "true");
            return { username: res.data.username };
          } else {
            return null;
        }
      });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Rethrow the error so it can be caught in the loginSaga
  }
};

function* loginSaga(action: ReturnType<typeof login>): any {
  try {
    const user = yield call(
      apiLogin,
      action.payload.username,
      action.payload.password
    );
    if (user) {
      yield put(setUser(user));

      // Set the 'isAuthenticated' cookie to 'true' upon successful login
      cookies.set('isAuthenticated', 'true');
      
      // Set the localStorage value
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("Cookies", "Placed");

		  yield put(setAuthenticationStatus(true)); // Pass true to setAuthenticationStatus
    } else {
      // Handle login failure
      // Set the 'isAuthenticated' cookie to 'false' upon login failure
      cookies.set('isAuthenticated', 'false');

      // Set the localStorage value
      localStorage.setItem("isAuthenticated", "false");
      // Dispatch the authentication status as false
      yield put(setAuthenticationStatus(false)); // Pass false to setAuthenticationStatus
    }
  } catch (error) {
    console.log(error);
    // Handle any error that occurred during the API call
  }
}


// Function for making a logout API call
const apiLogout = async (): Promise<void> => {
	try {
	  // Make a GET request to your backend's logout endpoint
	  await axios.get("http://localhost:8080/auth/logout", {
		withCredentials: true, // Include this option for cookies
		headers: { "Content-Type": "application/json" }, // Adjust headers as needed
	  });
	} catch (error) {
	  console.error("Error during logout:", error);
	  throw error;
	}
  };

// New generator function for handling logout
function* logoutSaga(): any {
	try {
	  // Make a GET request to the logout endpoint
	  yield call(apiLogout);
  
	  // Dispatch the clearUser action to reset the authentication state and user info
    yield put(clearUser());
    cookies.remove('isAuthenticated'); // Make sure the name and path match the login cookie

	  yield put(setAuthenticationStatus(false)); // Pass false to setAuthenticationStatus
	  localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("Cookies", "Remove");
	} catch (error) {
	  console.error("Error during logout:", error);
	}
  }

export const logout = createAction("session/logout");
export const login = createAction<{ username: string; password: string }>("session/login");

export function* sessionSaga() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga); // Watch for the logout action
}

// FOR STATUS CHECK
const fetchStatus = async () => {
	return axios
	  .get("http://localhost:8080/auth/check", 
	  {
		withCredentials: true,
		headers: { "Content-Type": "application/json" },
	  })
	  .then((res) => {
		return res.data.status;
	  });
  };
  
  export const checkStatus = createAction("session/checkStatus");
  
  export function* sessionSagaStatus() {
	yield takeEvery(checkStatus.type, fetchStatus);
  }

// import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
// import {
//   clearUser,
//   setAuthenticationStatus,
//   setUser
// } from "../state/sessionState";
// import { createAction } from "@reduxjs/toolkit";
// import axios from "axios";


// // FOR LOGIN
// const apiLogin = async (username: string, password: string): Promise<any> => {
//   try {
//     axios.defaults.withCredentials = true;
//     return axios
//       .post(
//         "http://localhost:8080/auth/login",
//         { username, password },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       )
//       .then((res) => {
//           localStorage.setItem("isAuthenticated", "true");
//           if (res.data.status === "active") {
//             return { username: res.data.username };
//           } else {
//             return null;
          
//         }
        
//       });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     throw error; // Rethrow the error so it can be caught in the loginSaga
//   }
// };

// function* loginSaga(action: ReturnType<typeof login>): any {
//   try {
//     const user = yield call(
//       apiLogin,
//       action.payload.username,
//       action.payload.password
//     );
//     if (user) {
//       yield put(setUser(user));
//       yield put(setAuthenticationStatus(true)); // Set authentication status to true
//       localStorage.setItem("isAuthenticated", "true");
//     } else {
//       // You can dispatch an action or show an error message
//       yield put(setAuthenticationStatus(false)); // Set authentication status to false
//       localStorage.setItem("isAuthenticated", "false");
//     }
//   } catch (error) {
//     console.log(error);
//     // Handle any error that occurred during the API call
//   }
// }


// // Function for making a logout API call
// const apiLogout = async (): Promise<void> => {
// 	try {
// 	  // Make a GET request to your backend's logout endpoint
// 	  await axios.get("http://localhost:8080/auth/logout", {
// 		withCredentials: true, // Include this option for cookies
// 		headers: { "Content-Type": "application/json" }, // Adjust headers as needed
// 	  });
// 	} catch (error) {
// 	  console.error("Error during logout:", error);
// 	  throw error;
// 	}
//   };

// // New generator function for handling logout
// function* logoutSaga(): any {
// 	try {
// 	  // Make a GET request to the logout endpoint
// 	  yield call(apiLogout);
  
// 	  // Dispatch the clearUser action to reset the authentication state and user info
//     yield put(clearUser());

// 	  yield put(setAuthenticationStatus(false)); // Pass false to setAuthenticationStatus
// 	  localStorage.setItem("isAuthenticated", "false");
// 	} catch (error) {
// 	  console.error("Error during logout:", error);
// 	}
//   }

// export const logout = createAction("session/logout");
// export const login = createAction<{ username: string; password: string }>(
//   "session/login"
// );

// export function* sessionSaga() {
//   yield takeLatest(login.type, loginSaga);
//   yield takeLatest(logout.type, logoutSaga); // Watch for the logout action
// }


// // FOR STATUS CHECK
// const fetchStatus = async () => {
//   return axios
//     .get("http://localhost:8080/auth/check", 
//     {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     })
//     .then((res) => {
//       return res.data.status;
//     });
// };

// export const checkStatus = createAction("session/checkStatus");

// export function* sessionSagaStatus() {
//   yield takeEvery(checkStatus.type, fetchStatus);
// }

  
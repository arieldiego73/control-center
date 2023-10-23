import { call, put, takeEvery } from "redux-saga/effects";
import {
	addUserSuccess,
	getUserInfoSuccess,
	getPrincipalInfoSuccess,
	getUserRolesSuccess,
	getUsersFetch,
	getUsersSuccess,
	setMessage,
	setIsLoading,
	setIsLoadingDialog,
	setError,
	setSaved,
	// changePasswordSuccess,
	clearError,
	clearUserInfo,
} from "../state/userState";
import { createAction } from "@reduxjs/toolkit";
import { GridRowId } from "@mui/x-data-grid";
import axios from "axios";


interface Data {
	emp_id: string;
	username: string;
	password: string;
	confirm_password: string;
	admin_password: string;
	new_password: string;
	confirm_new_password: string;
	fname: string;
	mname: string;
	lname: string;
	position_id: number;
	email: string;
	section_id: number;
	dept_id: number;
	selectedRoles: number[];
	status_code: string;
	img_src: File | null;
}

function* workGetUsersFetch(): any {
	const users = yield call(() =>
		fetch("http://localhost:8080/user/user-table").then((res) => res.json())
	);
	yield put(getUsersSuccess(users));
}

// function* getPrincipalInfo(): any {
// 	const principal = yield call(() =>
// 		fetch("http://localhost:8080/auth/principal").then((res) => res.json())
// 	);
// 	yield put(getPrincipalInfoSuccess(principal.data.userInfoOutput));
// 	console.log("Principal",principal);
// }

function* getPrincipalInfo(): any {
	try {
	  const response = yield call(() =>
		axios.get("http://localhost:8080/auth/principal").then((res) => res.data)
	  );
	  console.log("princpal", response);
	  if (response) {
		yield put(getPrincipalInfoSuccess(response));
	  } else {
		console.error("Invalid response structure", response);
	  }
	} catch (error) {
	  console.error("Error while fetching principal info", error);
	}
  }

export function* userPrincipalSaga() {
	yield takeEvery("users/getPrincipalInfo", getPrincipalInfo);
}

export const getUserPrincipalInfo = createAction("users/getPrincipalInfo");

function* userSaga() {
	yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

// FETCH A SINGLE USER
function* fetchUserInfoSaga(action: ReturnType<typeof getUserInfo>): any {
	try {
		yield put(setIsLoading(true));
		const responseUserInfo = yield call(
			apiFetchUserInfo,
			action.payload.userId
		);
		yield call(validate, responseUserInfo, "info");
	} catch (error) {
		yield call(catchErr, error);
	}
}

export function* userSagaFetchUserInfo() {
	yield takeEvery(getUserInfo.type, fetchUserInfoSaga);
}

const apiFetchUserInfo = async (userId: any): Promise<any> => {
	try {
		return axios.get(`http://localhost:8080/user/info/${userId}`);
	} catch (error) {
		return error;
	}
};

export const getUserInfo = createAction<{
	userId: any;
}>("users/getUserInfo");

// FETCH THE CURRENT USER THAT'S LOGGED IN
// function* fetchPrincipalInfo(action: ReturnType<typeof getPrincipalInfo>): any {
// 	try {
// 	  yield put(setIsLoading(true));
// 	  const responsePrincipalInfo = yield call(apiFetchPrincipalInfo);
// 	  yield call(validate, responsePrincipalInfo, "principal");
// 	  console.log("Current Logged in user", responsePrincipalInfo);
// 	} catch (error) {
// 	  yield call(catchErr, error);
// 	  console.log("Error", error);
// 	}
// 	// try {
// 	// 	yield put(setIsLoading(true));
// 	// 	const responsePrincipalInfo = yield call(apiFetchPrincipalInfo);
// 	// 	yield put(getUserInfoSuccess(responsePrincipalInfo.data.userInfoOutput));
// 	//   } catch (error) {
// 	// 	yield put(setError(error));
// 	//   } finally {
// 	// 	yield put(setIsLoading(false));
// 	//   }
//   }
  
//   export function* userSagaFetchPrincipalInfo() {
// 	yield takeEvery(getPrincipalInfo, fetchPrincipalInfo);
//   }

// const apiFetchPrincipalInfo = async (): Promise<any> => {
// 	try {
// 		const response = await axios.get(`http://localhost:8080/auth/principal`);
// 		console.log("From api Current Logged in user", response.data);
// 		return response.data;
// 	} catch (error) {
// 		console.log("From api Error", error);
// 		return error;
// 	}
// };

// export const getPrincipalInfo = createAction<{}>("users/principalInfo");

// FETCH A SINGLE USER'S ROLES
function* fetchUserRolesSaga(action: ReturnType<typeof getUserRoles>): any {
	try {
		yield put(setIsLoading(true));
		const responseUserRoles = yield call(
			apiFetchUserRoles,
			action.payload.userId
		);
		yield call(validate, responseUserRoles, "roles");
	} catch (error) {
		yield call(catchErr, error);
	}
}

export function* userSagaFetchUserRoles() {
	yield takeEvery(getUserRoles.type, fetchUserRolesSaga);
}

const apiFetchUserRoles = async (userId: any): Promise<any> => {
	try {
		return axios.get(`http://localhost:8080/user/roles/${userId}`);
	} catch (error) {
		return error;
	}
};

export const getUserRoles = createAction<{
	userId: any;
}>("users/getUserRoles");

// ADD
const apiAdd = async (data: Data): Promise<any> => {
	try {
		const url = `http://localhost:8080/user/create-account?${data.emp_id}`;
		const formData = new FormData();
	
		// Append image file if provided
		if (data.img_src) {
		  formData.append("photo", data.img_src as File);
		}
	
		// Append role_ids
		data.selectedRoles.forEach((id) => {
		  formData.append("role_ids", id.toString());
		});
	
		// Append other data fields to the formData object
		formData.append("emp_id", data.emp_id);
		formData.append("username", data.username);
		formData.append("password", data.password);
		formData.append("confirm_password", data.confirm_password);
		formData.append("admin_password", data.admin_password);
		formData.append("fname", data.fname);
		formData.append("mname", data.mname);
		formData.append("lname", data.lname);
		formData.append("position_id", data.position_id.toString());
		formData.append("email", data.email);
		formData.append("section_id", data.section_id.toString());
		formData.append("dept_id", data.dept_id.toString());
		formData.append("status_code", data.status_code);
	
		// Make the PUT request with the FormData containing the data
		const response = await axios.post(url, formData, {
		  headers: {
			"Content-Type": "multipart/form-data",
			Accept : "multipart/form-data"
		  },
		});
	
		return response;
	  } catch (error) {
		return error;
	  }
	// try {
	// 	const params = new URLSearchParams();
	// 	data.selectedRoles.forEach((id) => {
	// 		params.append("role_ids", id.toString());
	// 	});
	// 	const url = `http://localhost:8080/user/create-account?${params}`;
	// 	return axios.post(url, {
	// 		emp_id: data.emp_id,
	// 		username: data.username,
	// 		password: data.password,
	// 		confirm_password: data.confirm_password,
	// 		fname: data.fname,
	// 		mname: data.mname,
	// 		lname: data.lname,
	// 		position_id: data.position_id,
	// 		email: data.email,
	// 		section_id: data.section_id,
	// 		dept_id: data.dept_id,
	// 		status_code: data.status_code,
	// 		img_src: null
	// 	});
	// } catch (error) {
	// 	return error;
	// }
};

export const addUserInfo = createAction<{
	data: Data;
}>("users/addUserInfo");

export function* userSagaAdd() {
	yield takeEvery(addUserInfo.type, addSaga);
}

function* addSaga(action: ReturnType<typeof addUserInfo>): any {
	try {
		yield put(setIsLoading(true));
		const response = yield call(apiAdd, action.payload.data);
		yield call(validate, response, "add");
	} catch (error) {
		yield call(catchErr, error);
	}
}

// UPDATE
const apiUpdate = async (data: Data): Promise<any> => {
	try {
	  const url = `http://localhost:8080/user/edit-account/${data.emp_id}`;
	  const formData = new FormData();
  
	  // Append image file if provided
	  if (data.img_src) {
		formData.append("photo", data.img_src as File);
	  }
  
	  // Append role_ids
	  data.selectedRoles.forEach((id) => {
		formData.append("role_ids", id.toString());
	  });
  
	  // Append other data fields to the formData object
	  formData.append("emp_id", data.emp_id);
	  formData.append("username", data.username);
	  formData.append("password", data.password);
	  formData.append("confirm_password", data.confirm_password);
	  formData.append("admin_password", data.admin_password);
	  formData.append("new_password", data.new_password);
	  formData.append("confirm_new_password", data.confirm_new_password);
	  formData.append("fname", data.fname);
	  formData.append("mname", data.mname);
	  formData.append("lname", data.lname);
	  formData.append("position_id", data.position_id.toString());
	  formData.append("email", data.email);
	  formData.append("section_id", data.section_id.toString());
	  formData.append("dept_id", data.dept_id.toString());
	  formData.append("status_code", data.status_code);
  
	  // Make the PUT request with the FormData containing the data
	  const response = await axios.put(url, formData, {
		headers: {
		  "Content-Type": "multipart/form-data",
		  Accept : "multipart/form-data"
		},
	  });
  
	  return response;
	} catch (error) {
	  return error;
	}
  };

export const updateUserInfo = createAction<{
	data: Data;
}>("users/updateUserInfo");

export function* userSagaUpdate() {
	yield takeEvery(updateUserInfo.type, updateSaga);
}

function* updateSaga(action: ReturnType<typeof updateUserInfo>): any {
	try {
		yield put(setIsLoading(true));
		const response = yield call(apiUpdate, action.payload.data);
		yield call(validate, response, "update");
		console.log("response: ", response)
	} catch (error) {
		yield call(catchErr, error);
		console.log("error: ", error)
	}
}

// DELETE
const apiDelete = async (user_id: number): Promise<any> => {
	try {
		const url = "http://localhost:8080/user/delete/" + user_id;
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

export const deleteUser = createAction<{
	user_id: number;
}>("users/deleteUser");

export function* userSagaDelete() {
	yield takeEvery(deleteUser.type, deleteSaga);
}

function* deleteSaga(action: ReturnType<typeof deleteUser>): any {
	try {
		yield put(setIsLoading(true));
		const response = yield call(apiDelete, action.payload.user_id);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

// BATCH DELETE
const apiBatchDelete = async (batchId: Set<GridRowId>): Promise<any> => {
	try {
		const params = new URLSearchParams();
		batchId.forEach((id) => {
			params.append("ids", id.toString());
		});
		const url = `http://localhost:8080/user/delete-multiple?${params}`;
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

function* deleteBatchSaga(action: ReturnType<typeof deleteUserBatch>): any {
	try {
		yield put(setIsLoading(true));
		const response = yield call(apiBatchDelete, action.payload.batchId);
		yield call(validate, response);
	} catch (error) {
		yield call(catchErr, error);
	}
}

export const deleteUserBatch = createAction<{
	batchId: Set<GridRowId>;
}>("users/deleteUserBatch");

export function* userSagaDeleteBatch() {
	yield takeEvery(deleteUserBatch.type, deleteBatchSaga);
}

//PASSWORD
const apiPassword = async (data: {
	adminPass: string;
	newPass: string;
	confirmNewPass: string;
	assocId: number;
}): Promise<any> => {
	try {
		const params = new URLSearchParams();
		params.append("user_id", data.assocId.toString());
		params.append("admin_password", data.adminPass);
		params.append("new_password", data.newPass);
		params.append("confirm_new_password", data.confirmNewPass);

		const url = `http://localhost:8080/user/password-change/${data.assocId}?${params}`;
		return axios.put(url);
	} catch (error) {
		return error;
	}
};

export const changePassword = createAction<{
	data: {
		adminPass: string;
		newPass: string;
		confirmNewPass: string;
		assocId: number;
	};
}>("users/change-password");

export function* userSagaPass() {
	yield takeEvery(changePassword.type, passwordSaga);
}
function* passwordSaga(action: ReturnType<typeof changePassword>): any {
	try {
		yield put(setIsLoadingDialog(true));
		const response = yield call(apiPassword, action.payload.data);

		if (response?.status === 200) {
			yield put(clearError());
			yield put(setSaved(true)); 
			console.log("---password saved----");
			
		} else {
			yield put(clearError());
			yield put(setError(response?.data));
		}
	} catch (error: any) {
		yield put(clearError());
		yield put(setError(error?.response.data));
	} finally {
		yield put(setIsLoadingDialog(false));
	}
}


//CurrentUser
// function* currentUserSaga(action: ReturnType<typeof getUserInfo>): any {
// 	try {
// 		yield put(setIsLoading(true));
// 		const responseCurrentUserInfo = yield call(
// 			apiFetchCurrentUserInfo,
// 			action.payload.userId,
// 		);
// 		console.log("inside try");
// 		yield call(validate, responseCurrentUserInfo, "info");
// 	} catch (error) {
// 		yield call(catchErr, error);
// 		console.log("inside catch");
// 	}
// }

// export function* CurrentUserSagaFetchUserInfo() {
// 	yield takeEvery(getUserInfo.type, currentUserSaga);
// 	console.log("CurrentUserSagaFetchUserInfo");
// }

// const apiFetchCurrentUserInfo = async (userId: any): Promise<any> => {
// 	try {
// 		return axios.get(`http://localhost:8080/auth/principal`);
// 	} catch (error) {
// 		return error;
// 	}
// };




// VALIDATE THE RESPONSE
function* validate(res: any, action?: string) {
	if (res?.request?.status === 200) {
		switch (action) {
			case "add":
				yield put(
					setMessage({
						message: res?.data + " Redirecting...",
						severity: "success",
					})
				);
				yield put(addUserSuccess()); // if the action is Add User, change the state of isAddSuccess to true
				yield put(setIsLoading(false)); // if the action is Add User, change the state of isAddSuccess to true
				break;
			case "info":
				yield put(getUserInfoSuccess(res?.data));
				break;
			case "roles":
				yield put(getUserRolesSuccess(res?.data));
				break;
			case "update":
				yield put(
					setMessage({
						message: res?.data + " Redirecting...",
						severity: "success",
					})
				);
				yield put(getUsersFetch());
				yield put(addUserSuccess());
				yield put(setIsLoading(false)); //eto -CHA
				break;
			default:
				yield put(
					setMessage({
						message: res?.data,
						severity: "success",
					})
				);
				yield put(getUsersFetch());
				break;
		}
	} else if (res?.request?.status > 200) {
		yield put(setIsLoading(false));
		yield put(
			setMessage({
				message: res?.response?.data,
				severity: "error",
			})
		);
	} else {
		yield put(setIsLoading(false));
		yield put(
			setMessage({
				message: res,
				severity: "error",
			})
		);
	}
}

// CATCH ERROR
function* catchErr(err: any) {
	yield put(getUsersFetch());
	yield put(
		setMessage({
			message: err?.response?.data,
			severity: "error",
		})
	);
}

export default userSaga;

import { call, put, takeEvery } from "redux-saga/effects";
import {
	addUserSuccess,
	getUserInfoSuccess,
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


//PASSWORD
const apiLogin = async (data: {
	username: string;
	password: string;
}): Promise<any> => {
	try {
		const params = new URLSearchParams();
		params.append("username", data.username.toString());
		params.append("password", data.password);


		// const url = `http://localhost:8080/user/password-change/${data.assocId}?${params}`;
        const url = `http://localhost:8080/auth/login`;
		return axios.post(url);
	} catch (error) {
		return error;
	}
};

export const login = createAction<{
	data: {
        username: string;
        password: string;
	};
}>("auth/login");
// }>("users/change-password");

export function* loginUserSaga() {
	yield takeEvery(login.type, loginSaga);
}
function* loginSaga(action: ReturnType<typeof login>): any {
	try {
		yield put(setIsLoadingDialog(true));
		const response = yield call(apiLogin, action.payload.data);

		if (response?.status === 200) {
			yield put(clearError());
			yield put(setSaved(true)); 
			console.log("login successfully!!!!");
			
		} else {
			yield put(clearError());
			yield put(setError(response?.data));
			console.log("error from saga 1", response?.data);
		}
	} catch (error: any) {
		yield put(clearError());
		yield put(setError(error?.response.data));
		console.log("error from saga 2", error?.response.data);

	} finally {
		yield put(setIsLoadingDialog(false));
	}
}

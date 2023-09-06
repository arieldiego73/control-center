import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getUserInfoSuccess, getUsersSuccess } from "../state/userState";
import { createAction } from "@reduxjs/toolkit";

function* workGetUsersFetch(): any {
	const users = yield call(() =>
		fetch("http://localhost:8080/user/all").then((res) => res.json())
	);
	yield put(getUsersSuccess(users));
}

function* userSaga() {
	yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

export function* userSagaFetchUserInfo() {
	yield takeLatest(getUserInfo.type, fetchUserInfoSaga);
}

// FETCH A SINGLE USER
export const getUserInfo = createAction<{
	userId: any;
}>("users/getUserInfo");

function* fetchUserInfoSaga(action: ReturnType<typeof getUserInfo>): any {
	try {
		const user = yield call(apiFetchUserInfo, action.payload.userId);
		if (user) yield put(getUserInfoSuccess(user));
	} catch (error) {
		console.log(error);
	}
}

const apiFetchUserInfo = async (userId: any): Promise<any> => {
	try {
		const response = await fetch(`http://localhost:8080/user/info/${userId}`);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {
		console.error("An error occurred:", error);
	}
};

export default userSaga;

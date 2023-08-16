import { call, put, takeEvery } from "redux-saga/effects";
import { getUsersSuccess } from "../state/userState";

function* workGetUsersFetch(): any {
	const users = yield call(() =>
		fetch("http://localhost:8080/api/all").then((res) => res.json())
	);
	// const formattedUsers = yield users.json();
	yield put(getUsersSuccess(users));
}

function* userSaga() {
	yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

export default userSaga;
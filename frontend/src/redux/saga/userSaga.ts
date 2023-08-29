import { call, put, takeEvery } from "redux-saga/effects";
import { getUsersSuccess } from "../state/userState";

function* workGetUsersFetch(): any {
	const users = yield call(() =>
		fetch("http://localhost:8080/user/all").then((res) => res.json())
	);
	yield put(getUsersSuccess(users));
}

function* userSaga() {
	yield takeEvery("users/getUsersFetch", workGetUsersFetch);
}

export default userSaga;

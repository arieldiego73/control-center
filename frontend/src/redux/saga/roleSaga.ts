import { call, put, takeEvery } from "redux-saga/effects";
import { getRolesSuccess } from "../state/roleState";

function* fetchRoles(): any {
	const roles = yield call(() =>
		fetch("http://localhost:8080/role/all").then((res) => res.json())
	);
	yield put(getRolesSuccess(roles));
}

function* roleSaga() {
	yield takeEvery("roles/getRolesFetch", fetchRoles);
}

export default roleSaga;

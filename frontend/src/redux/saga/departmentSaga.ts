import { call, put, takeEvery } from "redux-saga/effects";
import { getDepartmentsSuccess } from "../state/departmentState";

function* workGetDeptFetch(): any {
	const depts = yield call(() =>
		fetch("http://localhost:8080/department/all").then((res) => res.json())
	);
	yield put(getDepartmentsSuccess(depts));
}

function* departmentSaga() {
	yield takeEvery("departments/getDepartmentsFetch", workGetDeptFetch);
}

export default departmentSaga;
